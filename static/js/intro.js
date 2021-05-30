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

const startBtn = document.querySelector(".start");
const firstPage = document.querySelector(".section1");
const lastPage = document.querySelector(".all");

//테스트 결과값 저장 및 카운트
let final_result = document.getElementById("result");
let f_r = final_result.textContent;

startBtn.addEventListener("click", function () {
  firstPage.style.display = "none";
  lastPage.style.display = "flex";

  $.ajax({
    type: "POST",
    url: "/result",
    data: {
      result_give: f_r,
    },
    success: function (response) {},
  });
});
