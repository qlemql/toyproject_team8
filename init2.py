import warnings
import requests
from pymongo import MongoClient
from bs4 import BeautifulSoup

warnings.filterwarnings("ignore", category=DeprecationWarning)
client = MongoClient('localhost', 27017)
db = client.dbsparta

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}


# 반드시 init.py를 먼저 실행 후 init2.py를 실행시켜주세요!

def bs(product_name):
    if db.visitorsToday.find({'name': product_name}).count() == 0:
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

update_failed = []

def item_try_except(a, b, c):
    try:
        items = [a, b, c]
        for itemA in items:
            bs(itemA)
        print(a + ", " + b + ", " + c + " / DB 업데이트 완료")
    except TypeError:
        try:
            bs(a)
            print(a + " / DB 업데이트 완료")
        except TypeError:
            try:
                bs(b)
                print(b + " / DB 업데이트 완료")
            except TypeError:
                try:
                    bs(c)
                    print(c + " / DB 업데이트 완료")
                except TypeError:
                    for itemB in items:
                        if db.visitorsToday.find({'name': itemB}).count() == 0:
                            print(itemB + " update 실패!!")
                            update_failed.append(itemB)

print("init2.py")
print(".\n.\n.\n")
print("initiate database setup")
item_try_except("팔받침대", "등받이 쿠션", "파티션")
item_try_except("텀블러", "슬리퍼", "이어플러그")
item_try_except("키패드", "손목패드", "인공눈물")
item_try_except("마이크", "카메라", "커피자판기")

if len(update_failed) > 0:
    print("업데이트에 실패한 아이템들을 다시 크롤링합니다...")
while len(update_failed) > 0:
    try:
        for item in update_failed:
            bs(item)
            print(item + " / DB 업데이트 완료")
            update_failed.remove(item)
    except TypeError:
        continue
print("\n주의! DB에 등록된 아이템 목록이 총 24개여야 함!\n")
print("init2.py... DB setting finished")
print("\nAll database settings are finished. Thank you.")