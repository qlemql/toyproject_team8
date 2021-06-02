import requests
from pymongo import MongoClient
from bs4 import BeautifulSoup

client = MongoClient('localhost', 27017)
db = client.dbsparta

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}

def bs(product_name):
    research_site = 'https://search.shopping.naver.com/search/all?query=' + product_name + '&frm=NVSHATC'
    data = requests.get(research_site, headers=headers)
    soup = BeautifulSoup(data.text, 'html.parser')