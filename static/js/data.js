const qnaList = [
  {
    q: '1. 친구가 말했다."너 입사 선물로 뭐 갖고 싶어?',
    a: [
      { answer: "a. 최신 핸드폰", type: 1 },
      { answer: "b. 침대", type: 2 },
      { answer: "c. 블루투스 이어폰", type: 3 },
      { answer: "d. 너(you)", type: 4 },
    ],
  },
  {
    q: "2. 첫 IT회사에 입사해서 빈 책상에 가장 먼저 놓고 싶은 물건은?",
    a: [
      { answer: "a. 컴퓨터", type: 1 },
      { answer: "b. 노트북 거치대", type: 2 },
      { answer: "c. 무선 충전기", type: 3 },
      { answer: "d. 부장님 사진", type: 4 },
    ],
  },
  {
    q: "3. 부장님 사무실에 들어갔다. 가장 먼저 눈에 들어오는 것은?",
    a: [
      { answer: "a. 트리플 모니터", type: 1 },
      { answer: "b. 고급 소파", type: 2 },
      { answer: "c. 명패", type: 3 },
      { answer: "d. 부장님의 까진 머리", type: 4 },
    ],
  },
  {
    q: "4. 처음 발령이 났다. 발령지는?",
    a: [
      { answer: "a. 서울", type: 1 },
      { answer: "b. 해외", type: 2 },
      { answer: "c. 제주", type: 3 },
      { answer: "d. 북한", type: 4 },
    ],
  },
  {
    q: "5. 컴퓨터가 고장났는데 어떤 오류일까?",
    a: [
      { answer: "a. 하드웨어 결함", type: 1 },
      { answer: "b. 모니터가 망가졌다", type: 2 },
      { answer: "c. USB포트 고장", type: 3 },
      { answer: "d. 고양가 전선을 건드렸다", type: 4 },
    ],
  },
  {
    q: "6. 회사 휴게실에 가장 눈에 띄는 물품은?",
    a: [
      { answer: "a. 정수기", type: 1 },
      { answer: "b. 안마기", type: 2 },
      { answer: "c. 수면안대", type: 3 },
      { answer: "d. 탈출용 해머", type: 4 },
    ],
  },
  {
    q: "7. 아침에 차고 갈 시계 종류?",
    a: [
      { answer: "a. 핸드폰으로 충분하다", type: 1 },
      { answer: "b. 롤렉스", type: 2 },
      { answer: "c. 카시오 전자시계", type: 3 },
      { answer: "d. 캐릭터 시계", type: 4 },
    ],
  },
  {
    q: "8. 출퇴근 시 이용하는 교통수단은?",
    a: [
      { answer: "a. 자가용", type: 1 },
      { answer: "b. 대중교통", type: 2 },
      { answer: "c. 전기 킥보드", type: 3 },
      { answer: "d. 날아간다", type: 4 },
    ],
  },
  {
    q: "9. 오늘 저녁 회식 메뉴는?",
    a: [
      { answer: "a. 소고기", type: 1 },
      { answer: "b. 돈까스", type: 2 },
      { answer: "c. 김치찌개", type: 3 },
      { answer: "d. 인절미 빙수", type: 4 },
    ],
  },
  {
    q: "10. 사직서에 쓰고 싶은 말은?",
    a: [
      { answer: "a. 이직", type: 1 },
      { answer: "b. 잘 배우고 갑니다", type: 2 },
      { answer: "c. 개인사유", type: 3 },
      { answer: "d. 로또 1등 당첨됐어요", type: 4 },
    ],
  },
];

const resultInfo = [
  {
    name: "캥거루형",
    subName: "안마의자 마니아 캥거루형",
    desc: "가구, 편함, 4차원",
    items: ["인체공학의자", "손마시지기", "등받이 쿠션"],
  },
  {
    name: "꿀벌형",
    subName: "근면성실 꿀벌형",
    desc: "가구, 기기, 편함",
    items: ["", "", ""],
  },
  {
    name: "부엉이형",
    subName: "야근요정 부엉이형",
    desc: "가구, 기기, 4차원",
    items: ["", "", ""],
  },
  {
    name: "돼지형",
    subName: "금강산도 식후경 돼지형",
    desc: "기기, 편함, 4차원",
    items: ["", "", ""],
  },
  {
    name: "코알라형",
    subName: "사무실 마이홈 코알라형",
    desc: "가구, 편함",
    items: ["", "", ""],
  },
  {
    name: "고양이형",
    subName: "유아독존 고양이형",
    desc: "편함, 4차원",
    items: ["", "", ""],
  },
  {
    name: "다람쥐형",
    subName: "탕비실 지박령 다람쥐형",
    desc: "기기, 편함",
    items: ["", "", ""],
  },
  {
    name: "카멜레온형",
    subName: "충혈된 카멜레온형",
    desc: "가구, 4차원",
    items: ["", "", ""],
  },
  {
    name: "고슴도치형",
    subName: "빡! 집중 고슴도치형",
    desc: "기기, 4차원",
    items: ["", "", ""],
  },
  {
    name: "미어캣형",
    subName: "호기심 많은 미어캣형",
    desc: "가구, 기기",
    items: ["", "", ""],
  },
  {
    name: "펭귄형",
    subName: "반들반들 청결 펭귄형",
    desc: "가구",
    items: ["", "", ""],
  },
  {
    name: "원숭이형",
    subName: "영타 500타 원숭이형",
    desc: "기기",
    items: ["", "", ""],
  },
  {
    name: "판다형",
    subName: "워라밸 판다형",
    desc: "편암형",
    items: ["", "", ""],
  },
  {
    name: "앵무새형",
    subName: "수다쟁이 앵무새형",
    desc: "4차원형",
    items: ["", "", ""],
  },
];
