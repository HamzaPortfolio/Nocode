document.addEventListener("DOMContentLoaded", () => {
  function loadPage(path) {
    if (path === "/") {
      // Directly use inner HTML for default
      document.getElementById("content").innerHTML = `
        <h2>Welcome to Home!</h2>
        <p>This is default content.</p>
      `;
      history.pushState(null, "", "/");
      return;
    }

    let file = "/pages" + path + ".html";

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

  loadPage(location.pathname);

  window.addEventListener("popstate", () => {
    loadPage(location.pathname);
  });
});
