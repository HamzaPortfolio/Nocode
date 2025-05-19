document.addEventListener("DOMContentLoaded", () => {
  const styleLinks = document.querySelectorAll('link[rel="stylesheet"]');

  styleLinks.forEach(link => {
    const connectPath = link.getAttribute("connect");
    const href = link.getAttribute("href");

    // Agar connect attribute exist karta hai aur href bhi diya gaya hai
    if (connectPath && href) {
      // Clean leading './' or '/'
      const cleanHref = href.replace(/^\.\/|^\//, "");

      // Final path bana ke set karo
      const fullPath = connectPath.endsWith("/")
        ? connectPath + cleanHref
        : connectPath + "/" + cleanHref;

      link.setAttribute("href", fullPath);
    }
  });
});
