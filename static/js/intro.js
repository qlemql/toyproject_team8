// 태현's js

// dark mode
const btn = document.querySelector(".darkMode");
const currentTheme = localStorage.getItem("theme");
const body = document.querySelector("body");
const inputBtn = document.querySelector(".name");
const modal = document.querySelector('.modalFrame');
const itemsBox = document.querySelector('.items');

if (currentTheme == "dark") {
  document.body.classList.add("dark-theme");
}

btn.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");
  let theme = "light";
  if (document.body.classList.contains("dark-theme")) {
    startBtn.style.color = "#121212";
    startBtn.style.backgroundColor = "transparent";
    startBtn.style.border = "1px solid #121212";
    inputBtn.style.border = "1px solid #121212";
    itemsBox.style.border = "1px solid #121212";
    inputBtn.style.color = '#121212';
    inputBtn.style.backgroundColor = 'transparent';
    body.style.backgroundImage = "url(https://i.imgur.com/mZT110x.png)";
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center bottom";
    btn.style.backgroundColor = "#121212";
    btn.style.color = "white";
    modal.style.backgroundColor = '#eee';
  } else {
    theme = "dark";
    startBtn.style.color = "#eee";
    startBtn.style.backgroundColor = "transparent";
    startBtn.style.border = "1px solid #eee";
    inputBtn.style.border = "1px solid #eee";
    itemsBox.style.border = "1px solid #eee";
    inputBtn.style.color = '#eee';
    inputBtn.style.backgroundColor = 'transparent';
    body.style.backgroundImage = "url(https://i.imgur.com/oYS2gZf.png)";
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center bottom";
    btn.style.backgroundColor = "white";
    btn.style.color = "#121212";
    modal.style.backgroundColor = '#121212';
  }
  localStorage.setItem("theme", theme);
});

// fontAwesome icon change
btn.onclick = function () {
  btn.classList.toggle("active");

  const iconSun = document.querySelector(".sun");
  const iconMoon = document.querySelector(".moon");
  iconSun.style.justifyContent = "center";
  iconSun.style.alignItems = "center";
  iconMoon.style.justifyContent = "center";
  iconMoon.style.alignItems = "center";

  if (iconSun.style.display == "flex") {
    iconSun.style.display = "none";
    iconMoon.style.display = "flex";
  } else {
    iconMoon.style.display = "none";
    iconSun.style.display = "flex";
  }
};

// page change
const firstPage = document.querySelector(".section1");
const secondPage = document.querySelector(".section2");

// save name
const nameInput = document.querySelector("input");
const userName = document.querySelector(".userName");

function handleName(event) {
  const currentValue = nameInput.value;
  if (currentValue == "") {
    alert("이름을 입력해주세요.");
    firstPage.style.display = "flex";
    secondPage.style.display = "none";
  } else {
    event.preventDefault();
    firstPage.style.display = "none";
    secondPage.style.display = "flex";
    secondPage.style.justifyContent = "center";
    secondPage.style.alignItems = "center";
    secondPage.style.flexDirection = "column";
    btn.style.display = 'none';
    // 새로고침 방지
    // 사용자가 입력한 이름값

    // 사용자가 입력한 이름을 보여주는 것
    paintToName(currentValue);
    // enter 또는 시작하기 눌렀을때 input창 초기화
    nameInput.value = "";
  }
}

function paintToName(text) {
  userName.innerText = text;
}

startBtn.addEventListener("click", handleName);