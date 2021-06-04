import requests
from pymongo import MongoClient
from bs4 import BeautifulSoup

client = MongoClient('localhost', 27017,
                     username='test',
                     password='test')
db = client.dbsparta

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}

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

    doc = {"product1_name": product1_name, "product1_image": product1_image, "product1_link": product1_link, "product2_name": product2_name, "product2_image": product2_image, "product2_link": product2_link}
    db.crawling.update({'name': product_name}, {'$set': doc})


# def item_selector(a, b, c):
#     items = [a, b, c]
#     db.crawling.remove()
#     for item in items:
#         bs(item)
#
# item_selector("인체공학의자", "높이조절가능책상", "모니터암")
# print(list(db.crawling.find({}, {'_id': False})))