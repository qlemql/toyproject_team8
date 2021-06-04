const shareBtn = document.querySelector(".btn00");

function kakaoshare() {
  Kakao.Link.sendDefault({
    objectType: "feed",
    content: {
      title: "개발자도구",
      description: "동물들이 전해주는 오피스 아이템!",
      imageUrl:
        "https://i.imgur.com/K9p2F7a.png",
      link: {
        mobileWebUrl: "http://animal-tool.site",
        webUrl: "http://animal-tool.site",
      },
    },
  });
}

shareBtn.addEventListener("click", kakaoshare);
