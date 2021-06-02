const section1 = document.querySelector(".section1");
const qna = document.querySelector(".QnA");
const startBtn = document.querySelector(".start");

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
}

function begin() {
  // section1.style.display = "none";
  // qna.style.display = "block";
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

function drawResult(resultIndex) {
  resImageDiv.appendChild(resImg);
  resImg.classList.add("type-image");
  resImg.src = "static/images/" + resultInfo[resultIndex].name + ".png";
  resImg.alt = resultInfo[resultIndex].name;
  resImg.title = resultInfo[resultIndex].name;
  typeName.innerText = resultInfo[resultIndex].subName;
  typeDesc.innerText = resultInfo[resultIndex].desc;
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
