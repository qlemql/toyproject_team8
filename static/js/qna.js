
// 질문지
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
  answer.id = "test";
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
    btn.style.justifyContent = "center";
    btn.style.alignItems = "center";
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
  const status = document.querySelector(".statusBar");
  status.style.width = (100 / EndPoint) * (qIdx + 1) + "%";
}

function begin() {
  let qIdx = 0;
  goNext(qIdx);
}
startBtn.addEventListener("click", begin);

// draw result page --------------------------------
const lastPage = document.querySelector(".all");
const resImageDiv = document.querySelector(".resultImage");
const resImg = document.createElement("img");
const typeName = document.getElementById("result");
const descTitle = document.querySelector(".descTitle");
const typeDesc = document.querySelector(".resultDesc");
const typeRecommed = document.querySelector(".recommId");
const resultItemList = document.querySelector(".itemList");

//when it show up result, result value save and count up , if it haven't same IP for a while.
//also , make statistic and attach value of statistic to result page and all results pages.
function drawResult(resultIndex) {
  resImageDiv.appendChild(resImg);
  resImg.classList.add("typeImage");
  resImg.src = "static/images/animals/" + resultInfo[resultIndex].name + ".png";
  resImg.alt = resultInfo[resultIndex].name;
  resImg.title = resultInfo[resultIndex].name;
  typeName.innerText = resultInfo[resultIndex].subName;
  descTitle.innerText = resultInfo[resultIndex].descTitle;
  typeDesc.innerText = resultInfo[resultIndex].desc;
  typeRecommed.innerText = resultInfo[resultIndex].subName;

  $.ajax({
    type: "GET",
    url: `/api/${resultInfo[resultIndex].api}`,
    data: {},
    success: function (response) {
      for (let j = 0; j < 3; j++) {
        let crwawler = response["items"];
        let name = crwawler[j]["name"];
        let product1_name = crwawler[j]["product1_name"];
        let product1_image = crwawler[j]["product1_image"];
        let product1_link = crwawler[j]["product1_link"];
        let product2_name = crwawler[j]["product2_name"];
        let product2_image = crwawler[j]["product2_image"];
        let product2_link = crwawler[j]["product2_link"];

        let temp_items = `
              <div class="recommendType">
                <div class ='itemTypeName'> 
                    ${name} 
                </div>
                <div class= 'itemContainer'>
                  <div class="itemRecommends">
                    <div class="recommendImage">
                      <img src="${product1_image}" alt="">
                    </div>
                    <div class="recommendName">
                      ${product1_name}
                    </div>
                    <button class="recommendLink">
                      <a href="${product1_link}" target="_blank">Link</a>
                    </button>
                  </div>
                  <div class="itemRecommends2">
                    <div class="recommendImage">
                      <img src="${product2_image}" alt="">
                    </div>
                    <div class="recommendName">
                      ${product2_name}
                    </div>
                    <button class="recommendLink">
                      <a href="${product2_link}" target="_blank">Link</a>
                    </button>
                  </div>
                </div>
              </div>
              `;
        $(".recommendItem" + j).append(temp_items);
      }
    },
  });

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
    const class0 = document.querySelector(".recommendItem0");
    const class1 = document.querySelector(".recommendItem1");
    const class2 = document.querySelector(".recommendItem2");

    function selectItem(index) {
      itemModal.style.display = "flex";
      section3.style.filter = "blur(5px)";
      if (index === 0) {
        class0.style.display = "flex";
        class1.style.display = "none";
        class2.style.display = "none";
      } else if (index === 1) {
        class0.style.display = "none";
        class1.style.display = "flex";
        class2.style.display = "none";
      } else {
        class0.style.display = "none";
        class1.style.display = "none";
        class2.style.display = "flex";
      }
    }

    resultItem.addEventListener("click", (e) => {
      selectItem(i);
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

  setTimeout(function () {
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
          if (list_type[j] === resultInfo[resultIndex].subName) {
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
  }, 1000);

  // let final_result = document.getElementById("result");
  // let f_r = final_result.textContent;
}
//----------------------------------------------------

//calculate result------------------------------------
let type_name = "";
function result() {
  biggest = Math.max(type1, type2, type3, type4);
  lastPage.style.display = "flex";

  if (biggest === type1 && biggest === type3 && biggest === type4) {
    type_name = "안마의자 마니아 캥거루형";
    $.ajax({
      type: "POST",
      url: "/result",
      data: {
        result_give: type_name,
      },
      success: function (response) {},
    });
    drawResult(0);
  } else if (biggest === type1 && biggest === type2 && biggest === type3) {
    type_name = "근면성실 꿀벌형";
    $.ajax({
      type: "POST",
      url: "/result",
      data: {
        result_give: type_name,
      },
      success: function (response) {},
    });
    drawResult(1);
  } else if (biggest === type1 && biggest === type2 && biggest === type4) {
    type_name = "야근요정 부엉이형";
    $.ajax({
      type: "POST",
      url: "/result",
      data: {
        result_give: type_name,
      },
      success: function (response) {},
    });
    drawResult(2);
  } else if (biggest === type2 && biggest === type3 && biggest === type4) {
    type_name = "금강산도 식후경 돼지형";
    $.ajax({
      type: "POST",
      url: "/result",
      data: {
        result_give: type_name,
      },
      success: function (response) {},
    });
    drawResult(3);
  } else if (biggest === type1 && biggest === type3) {
    type_name = "사무실 마이홈 코알라형";
    $.ajax({
      type: "POST",
      url: "/result",
      data: {
        result_give: type_name,
      },
      success: function (response) {},
    });
    drawResult(4);
  } else if (biggest === type3 && biggest === type4) {
    type_name = "유아독존 고양이형";
    $.ajax({
      type: "POST",
      url: "/result",
      data: {
        result_give: type_name,
      },
      success: function (response) {},
    });
    drawResult(5);
  } else if (biggest === type2 && biggest === type3) {
    type_name = "탕비실 지박령 다람쥐형";
    $.ajax({
      type: "POST",
      url: "/result",
      data: {
        result_give: type_name,
      },
      success: function (response) {},
    });
    drawResult(6);
  } else if (biggest === type1 && biggest === type4) {
    type_name = "충혈된 카멜레온형";
    $.ajax({
      type: "POST",
      url: "/result",
      data: {
        result_give: type_name,
      },
      success: function (response) {},
    });
    drawResult(7);
  } else if (biggest === type2 && biggest === type4) {
    type_name = "빡! 집중 고슴도치형";
    $.ajax({
      type: "POST",
      url: "/result",
      data: {
        result_give: type_name,
      },
      success: function (response) {},
    });
    drawResult(8);
  } else if (biggest === type1 && biggest === type2) {
    type_name = "호기심 많은 미어캣형";
    $.ajax({
      type: "POST",
      url: "/result",
      data: {
        result_give: type_name,
      },
      success: function (response) {},
    });
    drawResult(9);
  } else if (biggest === type1) {
    type_name = "반들반들 청결 펭귄형";
    $.ajax({
      type: "POST",
      url: "/result",
      data: {
        result_give: type_name,
      },
      success: function (response) {},
    });
    drawResult(10);
  } else if (biggest === type2) {
    type_name = "영타 500타 원숭이형";
    $.ajax({
      type: "POST",
      url: "/result",
      data: {
        result_give: type_name,
      },
      success: function (response) {},
    });
    drawResult(11);
  } else if (biggest === type3) {
    type_name = "워라밸 판다형";
    $.ajax({
      type: "POST",
      url: "/result",
      data: {
        result_give: type_name,
      },
      success: function (response) {},
    });
    drawResult(12);
  } else if (biggest === type4) {
    type_name = "수다쟁이 앵무새형";
    $.ajax({
      type: "POST",
      url: "/result",
      data: {
        result_give: type_name,
      },
      success: function (response) {},
    });
    drawResult(13);
  }
}

const reloadBtn = document.querySelector('.btn01');

reloadBtn.addEventListener('click', function(){
  window.location.reload();
});
//-------------------------------------------------
