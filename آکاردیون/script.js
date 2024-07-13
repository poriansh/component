const accordionHeaders = document.querySelectorAll(".accordion-header");
const accordionicon = document.querySelectorAll(".icon-accordion");
accordionHeaders.forEach((item) => {
  item.addEventListener("click", () => {
    const targetId = item.getAttribute("data-target");
    const content = document.getElementById(targetId);

    document.querySelectorAll(".accordion-content").forEach((item1) => {
      if (item1 !== content) {
        item1.style.maxHeight = null;
      } else if (content.style.maxHeight) {
        content.style.maxHeight = null;
        item.classList.remove("active");
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        item.classList.add("active");
      }
      document.querySelectorAll(".accordion-header").forEach((headerItem) => {
        if (headerItem !== item) {
          headerItem.classList.remove("active");
        }
      });
    });
  });
});
