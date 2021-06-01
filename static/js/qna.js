const section1 = document.querySelector(".section1"); 
const qna = document.querySelector(".QnA");

function addAnswer(answerText, qIdx){
    const a = document.querySelector('.Answer');
    const answer = document.createElement('button');
    answer.classList.add('answerList');
    a.appendChild(answer);
    answer.innerHTML = answerText;
    answer.addEventListener("click", function(){
        const children = document.querySelectorAll('.answerList');
        for(let i = 0; i < children.length; i++){
            children[i].disabled = true;
            children[i].style.display = 'none';
        }
        goNext(++qIdx);
    }, false);
}

function goNext(qIdx){
    const q = document.querySelector('.Question');
    q.innerHTML = qnaList[qIdx].q;
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx);
    }
}


function begin(){
    section1.style.display ="none";  
    qna.style.display = "block";
    let qIdx = 0;
    goNext(qIdx);
}
