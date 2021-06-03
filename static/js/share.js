function setshare() {

}

function kakaoshare() {
    Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
        title: '제목',
        description: '설명',
        imageUrl:
            'http://mud-kage.kakao.co.kr/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
        link: {
            mobileWebUrl: 'https://developers.kakao.com',
        },
     },
        buttons: [
        {
            title: '웹으로 이동',
            link: {
            mobileWebUrl: 'https://developers.kakao.com',
            },
        },
        ]
    });
}