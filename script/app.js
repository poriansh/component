let btnmore = document.querySelector(".load-more-content-btn");
let btnmoretext = document.querySelector(".load-more-content-btn__text");
let contentmore = document.querySelector(".load-more-content");
let headermobailbox = document.querySelectorAll(".header-mobail-box");

headermobailbox.forEach(function (item) {
  item.addEventListener("click", function () {
    document.querySelector(".header-mobail-box--active").classList.remove("header-mobail-box--active");
    this.classList.toggle("header-mobail-box--active");
  });
});
btnmore.addEventListener("click", function () {
  contentmore.classList.toggle("load-more-content--open");
  if (contentmore.classList.contains("load-more-content--open")) {
    btnmoretext.textContent = "مشاهده کمتر";
  } else {
    btnmoretext.textContent = "مشاهده بیشتر";
  }
});
