// 태현's js

// dark mode
const btn = document.querySelector(".dark__mode");
const currentTheme = localStorage.getItem("theme");

if (currentTheme == "dark") {
  document.body.classList.add("dark-theme");
}

btn.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");
  let theme = "light";
  if (document.body.classList.contains("dark-theme")) {
    theme = "dark";
  }
  localStorage.setItem("theme", theme);
});

// fontAwesome icon change
btn.onclick = function () {
  btn.classList.toggle("active");

  const iconSun = document.querySelector(".sun");
  const iconMoon = document.querySelector(".moon");
  iconSun.style.justifyContent = "center";
  iconMoon.style.justifyContent = "center";

  if (iconMoon.style.display == "flex") {
    iconSun.style.display = "flex";
    iconMoon.style.display = "none";
  } else {
    iconMoon.style.display = "flex";
    iconSun.style.display = "none";
  }
};

const firstPage = document.querySelector(".section1");
// const secondPage = document.querySelector('section2');
// const secondPage = document.querySelector('section3');

// save name
const nameInput = document.querySelector("input");
const userName = document.querySelector(".userName");

function handleName(event) {
  firstPage.style.display = "none";
  // 새로고침 방지
  event.preventDefault();
  // 사용자가 입력한 이름값
  const currentValue = nameInput.value;
  // 사용자가 입력한 이름을 보여주는 것
  paintToName(currentValue);
  // enter 또는 시작하기 눌렀을때 input창 초기화
  nameInput.value = "";
}

function paintToName(text) {
  userName.innerText = text;
}

startBtn.addEventListener("click", handleName);
