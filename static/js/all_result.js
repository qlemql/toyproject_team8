// 민주's js
const modalOverlay = document.querySelector(".modalOverlay");
const modalBtn = document.getElementById("modalBtn");

modalBtn.addEventListener("click", (e) => {
  modalOverlay.style.display = "flex";
});

const closeBtn = document.getElementById("closeBtn");

closeBtn.addEventListener("click", (e) => {
  console.log(e);
  modalOverlay.style.display = "none";
});

modalOverlay.addEventListener("click", (e) => {
  const evTarget = e.target;
  if (evTarget.classList.contains("modalOverlay")) {
    modalOverlay.style.display = "none";
  }
});

const slideList = document.querySelector(".slideList");
const slides = document.querySelectorAll(".slide"); // each slide dom
const prevBtn = document.querySelector(".prevBtn"); // prev button
const nextBtn = document.querySelector(".nextBtn"); // next button
const pagination = document.querySelector(".slidePagination");
const slidesLen = slides.length;
const slideWidth = 400;
const slideSpeed = 300;
const startNum = 0;

slideList.style.width = slideWidth * (slidesLen + 2) + "px";

let firstChild = slideList.firstElementChild;
let lastChild = slideList.lastElementChild;
let clonedFirst = firstChild.cloneNode(true);
let clonedLast = lastChild.cloneNode(true);

slideList.appendChild(clonedFirst);
slideList.insertBefore(clonedLast, slideList.firstElementChild);

let curIndex = startNum;
let curSlide = slides[curIndex];
curSlide.classList.add("slide_active");

slideList.style.transform =
  "transalte3d(-" + slideWidth * (startNum + 2) + "px, 0px, 0px)";

nextBtn.addEventListener("click", function () {
  if (curIndex <= slidesLen - 1) {
    slideList.style.transition = slideSpeed + "ms";
    slideList.style.transform =
      "translate3d(-" + slideWidth * (curIndex + 2) + "px, 0px, 0px)";
  }
  if (curIndex === slidesLen - 1) {
    setTimeout(function () {
      slideList.style.transition = "0ms";
      slideList.style.transform =
        "translate3d(-" + slideWidth + "px, 0px, 0px)";
    }, slideSpeed);
    curIndex = -1;
  }
  curSlide.classList.remove("slide_active");
  curSlide = slides[++curIndex];
  curSlide.classList.add("slide_active");
});

prevBtn.addEventListener("click", function () {
  if (curIndex >= 0) {
    slideList.style.transition = slideSpeed + "ms";
    slideList.style.transform =
      "translate3d(-" + slideWidth * curIndex + "px, 0px, 0px)";
  }
  if (curIndex === 0) {
    setTimeout(function () {
      slideList.style.transition = "0ms";
      slideList.style.transform =
        "translate3d(-" + slideWidth * slidesLen + "px, 0px, 0px)";
    }, slideSpeed);
    curIndex = slidesLen;
  }
  curSlide.classList.remove("slide_active");
  curSlide = slides[--curIndex];
  curSlide.classList.add("slide_active");
});

//------민주's js 끝!!---------------
