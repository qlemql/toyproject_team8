import flask
import crawler

from pymongo import MongoClient
from datetime import datetime

from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client.dbsparta


print(list(db.crawling.find({"name": {'$in': ["인체공학의자", "높이조절가능책상", "모니터암"]}}, {'_id': False})))