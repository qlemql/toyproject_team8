import flask
from pymongo import MongoClient
from datetime import datetime, timezone

from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client.dbsparta


# HTML 화면 보여주기
@app.route('/')
def home():

    # db.visitorCounter.delete_one({"Counts"})
    # db.visitorCounter.insert_one({"Counts" : 0})  # 초기 방문자수 0으로 세팅하기

    visitor_counts = db.visitorCounter.find_one({})['Counts']

    ip_address = flask.request.remote_addr  # 방문자 IP 주소
    db.visitorIP.create_index("date", expireAfterSeconds=5)  # 숫자는 '초' 단위. IP를 얼마나 저장할 것인가
    if db.visitorIP.find({'IP': ip_address}).count() > 0:  # 방문했던 IP 라면 카운트 변동 없음
        return
    else:  # 방문하지 않았던 IP 라면 해당 IP를 DB에 추가하고, 카운트 +1
        db.visitorIP.insert_one({'IP': ip_address, "date": datetime.utcnow()})
        db.visitorCounter.update_one({'Counts': visitor_counts + 1})

    return render_template('index.html')


# API 역할을 하는 부분
@app.route('/api/list', methods=['GET'])
def show_stars():
    sample_receive = request.args.get('sample_give')
    print(sample_receive)
    return jsonify({'msg': 'list 연결되었습니다!'})


@app.route('/api/like', methods=['POST'])
def like_star():
    sample_receive = request.form['sample_give']
    print(sample_receive)
    return jsonify({'msg': 'like 연결되었습니다!'})


@app.route('/api/delete', methods=['POST'])
def delete_star():
    sample_receive = request.form['sample_give']
    print(sample_receive)
    return jsonify({'msg': 'delete 연결되었습니다!'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
