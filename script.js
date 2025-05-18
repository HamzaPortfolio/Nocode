document.addEventListener("DOMContentLoaded", () => {
  function loadPage(path) {
    let file = "/pages" + path + ".html";
    if (path === "/") file = "/pages/index.html"; // Default content

    fetch(file)
      .then(res => res.text())
      .then(data => {
        document.getElementById("content").innerHTML = data;
        history.pushState(null, "", path);
      })
      .catch(err => {
        document.getElementById("content").innerHTML = "<h2>Page not found</h2>";
      });
  }

  document.querySelectorAll(".spa-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const href = e.target.getAttribute("href");
      loadPage(href);
    });
  });

  // Load correct content on first page load
  loadPage(location.pathname);

  // Handle back/forward navigation
  window.addEventListener("popstate", () => {
    loadPage(location.pathname);
  });
});
