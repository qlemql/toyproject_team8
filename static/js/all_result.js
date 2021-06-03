// 민주's js
const modalOverlay = document.querySelector(".modalOverlay");
const modalBtn = document.getElementById("modalBtn");
const section3 = document.querySelector(".all");

modalBtn.addEventListener("click", (e) => {
  modalOverlay.style.display = "flex";
  section3.style.filter = "blur(5px)";
});

const closeBtn = document.getElementById("closeBtn");

closeBtn.addEventListener("click", (e) => {
  modalOverlay.style.display = "none";
  section3.style.filter = "blur(0px)";
});

modalOverlay.addEventListener("click", (e) => {
  const evTarget = e.target;
  if (evTarget.classList.contains("modalOverlay")) {
    modalOverlay.style.display = "none";
    section3.style.filter = "blur(0px)";
  }
});

const slideList = document.querySelector(".slideList");

function addSlide() {
  for (let i = 0; i < resultInfo.length; i++) {
    const slide = document.createElement("div");
    const typeImage = document.createElement("img");
    const typeName = document.createElement("div");
    const resultValue = document.createElement("h3");
    const typeDesc = document.createElement("p");
    const itemList = document.createElement("ul");
    slide.classList.add("slide");
    typeImage.classList.add("image");
    typeName.classList.add("typeName");
    resultValue.classList.add("resultValue");
    resultValue.id = "result" + i;
    typeDesc.classList.add("desc");
    itemList.classList.add("resultsItems");
    slideList.appendChild(slide);
    slide.appendChild(typeImage);
    slide.appendChild(typeName);
    slide.appendChild(resultValue);
    slide.appendChild(typeDesc);
    slide.appendChild(itemList);
    typeImage.src = "/static/images/animals/" + resultInfo[i].name + ".png";
    typeName.innerHTML = resultInfo[i].subName;
    typeDesc.innerHTML = resultInfo[i].desc;
    for (let j = 0; j < 3; j++) {
      const item = document.createElement("li");
      const slideItemImage = document.createElement("img");
      itemList.appendChild(item);
      item.appendChild(slideItemImage);
      item.classList.add("item");
      slideItemImage.classList.add("slideItem");
      slideItemImage.src =
        "static/images/items/" + resultInfo[i].items[j] + ".png";
    }
  }
}

addSlide();

const slides = document.querySelectorAll(".slide"); // each slide dom
const prevBtn = document.querySelector(".prevBtn"); // prev button
const nextBtn = document.querySelector(".nextBtn"); // next button
const slidesLen = slides.length;
const slideWidth = 400;
const slideSpeed = 300;
const startNum = 0;

slideList.style.width = slideWidth * (slidesLen + 2) + "px";

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
