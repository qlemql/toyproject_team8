import threading
import warnings
import requests
from pymongo import MongoClient
from bs4 import BeautifulSoup

warnings.filterwarnings("ignore", category=DeprecationWarning)
client = MongoClient('localhost', 27017)
db = client.dbsparta

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}


#  파일 첫 실행 때 돌려주세요! (반드시 먼저 init.py를 실행시켜주시고, init2.py를 실행시켜주세요!)

def bs(product_name):
    research_site = 'https://search.shopping.naver.com/search/all?frm=NVSHMDL&origQuery' + product_name + '&pagingIndex=1&pagingSize=40&productSet=model&query=' + product_name + '&sort=rel&timestamp=&viewType=list'
    data = requests.get(research_site, headers=headers)
    soup = BeautifulSoup(data.text, 'html.parser')

    product1_link = soup.select_one('#__next > div > div.style_container__1YjHN > div.style_inner__18zZX > div.style_content_wrap__1PzEo > div.style_content__2T20F > ul > div > div:nth-child(1) > li > div > div.basicList_img_area__a3NRA > div > a')['href']
    product1_name = soup.select_one('#__next > div > div.style_container__1YjHN > div.style_inner__18zZX > div.style_content_wrap__1PzEo > div.style_content__2T20F > ul > div > div:nth-child(1) > li > div > div.basicList_info_area__17Xyo > div.basicList_title__3P9Q7 > a').text
    data1 = requests.get(product1_link, headers=headers)
    soup1 = BeautifulSoup(data1.text, 'html.parser')
    product1_image = soup1.select_one('#__next > div > div.style_container__3iYev > div.style_inner__1Eo2z > div.style_content_wrap__2VTVx > div.style_content__36DCX > div > div.image_thumb_area__1dzNx > div.image_photo_area__44Fqz > div > img')['src']

    product2_link = soup.select_one('#__next > div > div.style_container__1YjHN > div.style_inner__18zZX > div.style_content_wrap__1PzEo > div.style_content__2T20F > ul > div > div:nth-child(2) > li > div > div.basicList_img_area__a3NRA > div > a')['href']
    product2_name = soup.select_one('#__next > div > div.style_container__1YjHN > div.style_inner__18zZX > div.style_content_wrap__1PzEo > div.style_content__2T20F > ul > div > div:nth-child(2) > li > div > div.basicList_info_area__17Xyo > div.basicList_title__3P9Q7 > a').text
    data2 = requests.get(product2_link, headers=headers)
    soup2 = BeautifulSoup(data2.text, 'html.parser')
    product2_image = soup2.select_one('#__next > div > div.style_container__3iYev > div.style_inner__1Eo2z > div.style_content_wrap__2VTVx > div.style_content__36DCX > div > div.image_thumb_area__1dzNx > div.image_photo_area__44Fqz > div > img')['src']

    doc = {'name': product_name, "product1_name": product1_name, "product1_image": product1_image, "product1_link": product1_link, "product2_name": product2_name, "product2_image": product2_image, "product2_link": product2_link}
    db.crawling.insert_one(doc)

def item_selector(a, b, c):
    items = [a, b, c]
    for item in items:
        threading.Thread(target=bs(item)).start()


print("init.py")
print(".\n.\n.\n")
print("initiate database setup")
db.crawling.remove()
item_selector("인체공학의자", "높이조절가능책상", "모니터암")
print("인체공학의자, 높이조절가능책상, 모니터암 / DB 업데이트 완료")
item_selector("기계식 키보드", "마우스", "피벗모니터")
print("기계식 키보드, 마우스, 피벗모니터 / DB 업데이트 완료")
item_selector("손마사지기", "가습기", "인공눈물")
print("손마사지기, 가습기, 인공눈물 / DB 업데이트 완료")
item_selector("헤드셋", "간식박스", "블루라이트차단경")
print("헤드셋, 간식박스, 블루라이트차단경 / DB 업데이트 완료")
db.visitorCounter.insert_one({'Counts': 0})
db.visitorsToday.insert_one({'today date': "2021-05-30"})
db.todayCounter.insert_one({'todayCounts': 0})
db.visitorIP.insert_one({'IP': 0})
db.visitorIP.remove()
db.final_result.remove()
db.final_result.insert_one({"type": "안마의자 마니아 캥거루형", "counts": 0})
db.final_result.insert_one({"type": "근면성실 꿀벌형", "counts": 0})
db.final_result.insert_one({"type": "야근요정 부엉이형", "counts": 0})
db.final_result.insert_one({"type": "금강산도 식후경 돼지형", "counts": 0})
db.final_result.insert_one({"type": "사무실 마이홈 코알라형", "counts": 0})
db.final_result.insert_one({"type": "유아독존 고양이형", "counts": 0})
db.final_result.insert_one({"type": "탕비실 지박령 다람쥐형", "counts": 0})
db.final_result.insert_one({"type": "충혈된 카멜레온형", "counts": 0})
db.final_result.insert_one({"type": "빡! 집중 고슴도치형", "counts": 0})
db.final_result.insert_one({"type": "호기심 많은 미어캣형", "counts": 0})
db.final_result.insert_one({"type": "반들반들 청결 펭귄형", "counts": 0})
db.final_result.insert_one({"type": "영타 500타 원숭이형", "counts": 0})
db.final_result.insert_one({"type": "워라밸 판다형", "counts": 0})
db.final_result.insert_one({"type": "수다쟁이 앵무새형", "counts": 0})
db.total_count.remove()
db.total_count.insert_one({"total_count": 0})
print("init.py... DB setting finished")
print("\nPlease run \"init2.py\" file.")
print("주의! 1분 정도 기다리신 뒤 init2.py 파일을 실행해주세요!")