document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document
      .querySelector("#sphere")
      .setAttribute("dynamic-body", "shape: sphere; mass: 2000");
  }, 2000);
});
