// 백엔드 js


// input js
function visitors() {
  let visitors = $('#visitor__name').val()

  $.ajax({
      type: "POST",
      url: "/visitor",
      data: {name_receive:visitors},
      success: function (response) {
          alert(response["msg"]);
          window.location.reload();
      }
  })
}


//  일일 방문자 js
$(document).ready(function () {
  showCounts();
  showTotalCounts();
  makeStatistic();
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


// 총 방문자 js
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


// 크롤링 js
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

// 통계값
function makeStatistic() {
  $.ajax({
    type: "GET",
    url: "/result/statistic",
    data: {},
    success: function (response) {
      let statistic = response[0]["statistic"];
      let total_counts = response[1]["total_count"];
      let list_id = ["#stat_01", "#stat_02", "#stat_03", "#stat_04", "#stat_05", "#stat_06", "#stat_07", "#stat_08", "#stat_09", "#stat_10", "#stat_11", "#stat_12", "#stat_13", "#stat_14"]
      let final_result = document.getElementById('result');
      let f_r = final_result.textContent;
      let type = [];
      for (let i = 0; i < statistic.length; i++) {
        let final_counts = statistic[i]["counts"]
        let temp_html = `<span>${(final_counts / total_counts).toFixed(2)}%  ${final_counts}명</span>`;
        $(list_id[i]).append(temp_html);
        let temp_type = statistic[i]["type"] + "@"
        type += temp_type
      }
      let list_type = type.split("@")

      for (let j = 0; j < type.length; j++) {
        if (list_type[j] === f_r) {
          let final_counts = statistic[j]["counts"]
          let temp_html = `<span>${(final_counts / total_counts).toFixed(2)}%  ${final_counts}명</span>`;
          $("#individual").append(temp_html);
        }

      }


    }
  })
}