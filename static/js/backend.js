// 백엔드 js

$(document).ready(function () {
  showCounts();
  showTotalCounts();
});

function showTotalCounts() {
  $.ajax({
    type: "GET",
    url: "/api/todayCounts",
    data: {},
    success: function (response) {
      let todayCounts = response["today_counts"];
      for (let i = 0; i < todayCounts.length; i++) {
        let today = todayCounts[i]["todayCounts"];
        console.log(today);
        let temp_html = `<div class="totady">일일 방문자 수 : ${today}명</div>`;
        $("#counter").append(temp_html);
      }
    },
  });
}

function showCounts() {
  $.ajax({
    type: "GET",
    url: "/api/totalCounts",
    data: {},
    success: function (response) {
      let totalCounts = response["total_counts"];
      for (let i = 0; i < totalCounts.length; i++) {
        let total = totalCounts[i]["Counts"];
        console.log(total);
        let temp_html = `<div class="visitors">총 방문자 수 : ${total}명</div>`;
        $("#counter").append(temp_html);
      }
    },
  });
}

const itemBtn = document.querySelector(".item00");
itemBtn.addEventListener("click", (e) => {
  $.ajax({
    type: "GET",
    url: "/api/monitor",
    data: {},
    success: function (response) {
      console.log(response);
    },
  });
});
