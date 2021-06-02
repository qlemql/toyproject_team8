const section1 = document.querySelector(".section1");
const qna = document.querySelector(".QnA");
const startBtn = document.querySelector(".start");
const EndPoint = 10;

let type1 = 0;
let type2 = 0;
let type3 = 0;
let type4 = 0;
let biggest = 0;

function addAnswer(allAnswer, qIdx) {
  const a = document.querySelector(".Answer");
  const answer = document.createElement("button");
  answer.classList.add("answerList");
  a.appendChild(answer);
  answer.innerHTML = allAnswer.answer;
  answer.addEventListener(
    "click",
    function () {
      const children = document.querySelectorAll(".answerList");
      for (let i = 0; i < children.length; i++) {
        children[i].disabled = true;
        children[i].style.display = "none";
      }
      if (allAnswer.type === 1) {
        type1++;
      } else if (allAnswer.type === 2) {
        type2++;
      } else if (allAnswer.type === 3) {
        type3++;
      } else if (allAnswer.type === 4) {
        type4++;
      }
      goNext(++qIdx);
    },
    false
  );
}

const loadingDiv = document.querySelector(".load");

function end() {
  qna.style.display = "none";
  loadingDiv.style.display = "flex";
  setTimeout(function () {
    loadingDiv.style.display = "none";
    btn.style.display ='block';
    result();
  }, 5000);
}

function goNext(qIdx) {
  const q = document.querySelector(".Question");
  if (qIdx === 10) {
    return end();
  }
  q.innerHTML = qnaList[qIdx].q;
  for (let i in qnaList[qIdx].a) {
    addAnswer(qnaList[qIdx].a[i], qIdx);
  }
  const status = document.querySelector(".status_bar");
  status.style.width = (100 / EndPoint) * (qIdx + 1) + "%";
}

function begin() {
  let qIdx = 0;
  goNext(qIdx);
}
startBtn.addEventListener("click", begin);

// draw result page --------------------------------
const lastPage = document.querySelector(".all");
const resImageDiv = document.querySelector(".result-image");
const resImg = document.createElement("img");
const typeName = document.getElementById("result");
const typeDesc = document.querySelector(".result-desc");
const typerecommed = document.querySelector('.recommId')



//when it show up result, result value save and count up , if it haven't same IP for a while.
//also , make statistic and attach value of statistic to result page and all results pages.
function drawResult(resultIndex) {
  resImageDiv.appendChild(resImg);
  resImg.classList.add("type-image");
  resImg.src = "static/images/" + resultInfo[resultIndex].name + ".png";
  resImg.alt = resultInfo[resultIndex].name;
  resImg.title = resultInfo[resultIndex].name;
  typeName.innerText = resultInfo[resultIndex].subName;
  typeDesc.innerText = resultInfo[resultIndex].desc;
  typerecommed.innerText = resultInfo[resultIndex].subName;


  let final_result = document.getElementById("result");
  let f_r = final_result.textContent;
  $.ajax({
    type: "POST",
    url: "/result",
    data: {
      result_give: f_r,
    },
    success: function (response) {},
  });
  $.ajax({
    type: "GET",
    url: "/result/statistic",
    data: {},
    success: function (response) {
      let statistic = response[0]["statistic"];
      let total_counts = response[1]["total_count"];
      let list_id = [
        "#stat_01",
        "#stat_02",
        "#stat_03",
        "#stat_04",
        "#stat_05",
        "#stat_06",
        "#stat_07",
        "#stat_08",
        "#stat_09",
        "#stat_10",
        "#stat_11",
        "#stat_12",
        "#stat_13",
        "#stat_14",
      ];
      let final_result = document.getElementById("result");
      let f_r = final_result.textContent;
      let type = [];
      for (let i = 0; i < statistic.length; i++) {
        let final_counts = statistic[i]["counts"];
        let temp_html = `<span>${(final_counts / total_counts * 100).toFixed(
          2
        )}%  ${final_counts}명</span>`;
        $(list_id[i]).append(temp_html);
        let temp_type = statistic[i]["type"] + "@";
        type += temp_type;
      }
      let list_type = type.split("@");

      for (let j = 0; j < type.length; j++) {
        if (list_type[j] === f_r) {
          let final_counts = statistic[j]["counts"];
          let temp_html = `<span>${(final_counts / total_counts * 100).toFixed(
            2
          )}%  ${final_counts}명</span>`;
          $("#individual").append(temp_html);
        }
      }
    },
  });
}
//----------------------------------------------------

//calculate result------------------------------------
function result() {
  biggest = Math.max(type1, type2, type3, type4);
  lastPage.style.display = "flex";

  if (biggest === type1 && biggest === type3 && biggest === type4) {
    drawResult(0);
  } else if (biggest === type1 && biggest === type2 && biggest === type3) {
    drawResult(1);
  } else if (biggest === type1 && biggest === type2 && biggest === type4) {
    drawResult(2);
  } else if (biggest === type2 && biggest === type3 && biggest === type4) {
    drawResult(3);
  } else if (biggest === type1 && biggest === type3) {
    drawResult(4);
  } else if (biggest === type3 && biggest === type4) {
    drawResult(5);
  } else if (biggest === type2 && biggest === type3) {
    drawResult(6);
  } else if (biggest === type1 && biggest === type4) {
    drawResult(7);
  } else if (biggest === type2 && biggest === type4) {
    drawResult(8);
  } else if (biggest === type1 && biggest === type2) {
    drawResult(9);
  } else if (biggest === type1) {
    drawResult(10);
  } else if (biggest === type2) {
    drawResult(11);
  } else if (biggest === type3) {
    drawResult(12);
  } else if (biggest === type4) {
    drawResult(13);
  }
}
//-------------------------------------------------