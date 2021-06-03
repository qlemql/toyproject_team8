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
  answer.id = 'test';
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
    btn.style.display = "flex";
    btn.style.justifyContent = 'center';
    btn.style.alignItems = 'center';
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
const typeRecommed = document.querySelector(".recommId");
const resultItemList = document.querySelector(".itemlist");

//when it show up result, result value save and count up , if it haven't same IP for a while.
//also , make statistic and attach value of statistic to result page and all results pages.
function drawResult(resultIndex) {
  resImageDiv.appendChild(resImg);
  resImg.classList.add("type-image");
  resImg.src = "static/images/animals/" + resultInfo[resultIndex].name + ".png";
  resImg.alt = resultInfo[resultIndex].name;
  resImg.title = resultInfo[resultIndex].name;
  typeName.innerText = resultInfo[resultIndex].subName;
  typeDesc.innerText = resultInfo[resultIndex].desc;
  typeRecommed.innerText = resultInfo[resultIndex].subName;

  for (let i = 0; i < 3; i++) {
    const resultItem = document.createElement("li");
    const resultItemImage = document.createElement("img");
    resultItem.classList.add("resultItemFrame");
    resultItemImage.classList.add("itemImage");
    resultItemList.appendChild(resultItem);
    resultItem.appendChild(resultItemImage);
    resultItemImage.src =
      "static/images/items/" + resultInfo[resultIndex].items[i] + ".png";

    const itemModal = document.querySelector(".itemModal");
    const itemModalCloseBtn = document.querySelector(".itemModalCloseBtn");

    resultItem.addEventListener("click", () => {
      itemModal.style.display = "flex";
      section3.style.filter = "blur(5px)";
    });

    itemModalCloseBtn.addEventListener("click", (e) => {
      itemModal.style.display = "none";
      section3.style.filter = "blur(0px)";
    });

    itemModal.addEventListener("click", (e) => {
      const evTarget = e.target;
      if (evTarget.classList.contains("itemModal")) {
        itemModal.style.display = "none";
        section3.style.filter = "blur(0px)";
      }
    });
  }

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
      let type = [];

      for (let i = 0; i < statistic.length; i++) {
        let final_counts = statistic[i]["counts"];
        $(`#result${i}`).text(
          `${((final_counts / total_counts) * 100).toFixed(
            2
          )}%  ${final_counts}명`
        );
      }

      for (let i = 0; i < statistic.length; i++) {
        if (i < 13) {
          let temp_type = statistic[i]["type"] + "@";
          type += temp_type;
        } else {
          let temp_type = statistic[i]["type"];
          type += temp_type;
        }
      }
      let list_type = type.split("@");

      for (let j = 0; j < type.length; j++) {
        if (list_type[j] === f_r) {
          let final_counts = statistic[j]["counts"];
          $(".static").text(`
              ${((final_counts / total_counts) * 100).toFixed(
                2
              )}% ${final_counts}명
            `);
        }
      }

      let firstChild = slideList.firstElementChild;
      let lastChild = slideList.lastElementChild;
      let clonedFirst = firstChild.cloneNode(true);
      let clonedLast = lastChild.cloneNode(true);
      slideList.appendChild(clonedFirst);
      slideList.insertBefore(clonedLast, slideList.firstElementChild);
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
    $.ajax({
      type: "GET",
      url: "/api/kangaroo",
      data: {},
      success: function (response) {
        let crwawler = response;
        console.log(crwawler);
      }
    })
  } else if (biggest === type1 && biggest === type2 && biggest === type3) {
    drawResult(1);
    $.ajax({
      type: "GET",
      url: "/api/honeybee",
      data: {},
      success: function (response) {
        let crwawler = response;
        console.log(crwawler);
      }
    })
  } else if (biggest === type1 && biggest === type2 && biggest === type4) {
    drawResult(2);
    $.ajax({
      type: "GET",
      url: "/api/owl",
      data: {},
      success: function (response) {
        let crwawler = response;
        console.log(crwawler);
      }
    })
  } else if (biggest === type2 && biggest === type3 && biggest === type4) {
    drawResult(3);
    $.ajax({
      type: "GET",
      url: "/api/pig",
      data: {},
      success: function (response) {
        let crwawler = response;
        console.log(crwawler);
      }
    })
  } else if (biggest === type1 && biggest === type3) {
    drawResult(4);
    $.ajax({
      type: "GET",
      url: "/api/koala",
      data: {},
      success: function (response) {
        let crwawler = response;
        console.log(crwawler);
      }
    })
  } else if (biggest === type3 && biggest === type4) {
    drawResult(5);
    $.ajax({
      type: "GET",
      url: "/api/cat",
      data: {},
      success: function (response) {
        let crwawler = response;
        console.log(crwawler);
      }
    })
  } else if (biggest === type2 && biggest === type3) {
    drawResult(6);
    $.ajax({
      type: "GET",
      url: "/api/squirrel",
      data: {},
      success: function (response) {
        let crwawler = response;
        console.log(crwawler);
      }
    })
  } else if (biggest === type1 && biggest === type4) {
    drawResult(7);
    $.ajax({
      type: "GET",
      url: "/api/chameleon",
      data: {},
      success: function (response) {
        let crwawler = response;
        console.log(crwawler);
      }
    })
  } else if (biggest === type2 && biggest === type4) {
    drawResult(8);
    $.ajax({
      type: "GET",
      url: "/api/hedgehog",
      data: {},
      success: function (response) {
        let crwawler = response;
        console.log(crwawler);
      }
    })
  } else if (biggest === type1 && biggest === type2) {
    drawResult(9);
    $.ajax({
      type: "GET",
      url: "/api/meerkat",
      data: {},
      success: function (response) {
        let crwawler = response;
        console.log(crwawler);
      }
    })
  } else if (biggest === type1) {
    drawResult(10);
    $.ajax({
      type: "GET",
      url: "/api/penguin",
      data: {},
      success: function (response) {
        let crwawler = response;
        console.log(crwawler);
      }
    })
  } else if (biggest === type2) {
    drawResult(11);
    $.ajax({
      type: "GET",
      url: "/api/monkey",
      data: {},
      success: function (response) {
        let crwawler = response;
        console.log(crwawler);
      }
    })
  } else if (biggest === type3) {
    drawResult(12);
    $.ajax({
      type: "GET",
      url: "/api/panda",
      data: {},
      success: function (response) {
        let crwawler = response;
        console.log(crwawler);
      }
    })
  } else if (biggest === type4) {
    drawResult(13);
    $.ajax({
      type: "GET",
      url: "/api/parrot",
      data: {},
      success: function (response) {
        let crwawler = response;
        console.log(crwawler);
      }
    })
  }
}
//-------------------------------------------------
