function loadPage(path) {
  fetch(`/pages${path}.html`)
    .then(res => {
      if (!res.ok) throw new Error("Not found");
      return res.text();
    })
    .then(html => {
      document.getElementById("content").innerHTML = html;
      history.pushState(null, "", path);
    })
    .catch(() => {
      document.getElementById("content").innerHTML = "<h2>404 - Page Not Found</h2>";
    });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".spa-link").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const path = this.getAttribute("href");
      loadPage(path);
    });
  });

  // Initial load if direct access like /home1
  if (location.pathname !== "/") {
    loadPage(location.pathname);
  }

  window.addEventListener("popstate", () => {
    loadPage(location.pathname);
  });
});


