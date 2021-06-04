import threading
import flask
import crawler

from pymongo import MongoClient
from datetime import datetime

from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

client = MongoClient('mongodb://test:test@localhost', 27017)
db = client.dbsparta


# DB 크롤링 함수
def item_selector(a, b, c):
    item_list = list(db.crawling.find({"name": {'$in': [a, b, c]}}, {'_id': False}))  # 갱신하는 코드

    def item_thread(item_name) -> None:  # 이게 크롤링하는 코드
        crawler.bs(item_name)
        print(item_name + " / DB 업데이트 완료")

    threading.Thread(target=item_thread(a)).start()
    threading.Thread(target=item_thread(b)).start()
    threading.Thread(target=item_thread(c)).start()
    return item_list


# HTML 화면 보여주기
@app.route('/')
def home():
    visitor_counts = db.visitorCounter.find_one({})['Counts']  # 총 방문자수
    today_visitor_counts = db.todayCounter.find_one({})['todayCounts']  # 일일 방문자수

    ip_address = flask.request.remote_addr  # 방문자 IP 주소

    today = str(datetime.now())
    today_date = today.split(' ')[0]

    # 일일 방문자수 로직
    if db.visitorsToday.find({'today date': today_date}).count() > 0:  # 날짜가 그대로라면
        if db.visitorIP.find({'IP': ip_address}).count() > 0:  # 방문했던 IP 라면 카운트 변동 없음
            pass
        else:  # 날짜가 그대로고, 방문했던 IP가 아니라면
            updated_today_visitor_counts = today_visitor_counts + 1
            db.todayCounter.update_one({'todayCounts': today_visitor_counts},
                                       {'$set': {'todayCounts': updated_today_visitor_counts}})
    else:  # 날짜가 바뀌었다면
        db.visitorsToday.insert_one({'today date': today_date})  # DB 날짜를 업데이트
        db.todayCounter.update_one({'todayCounts': today_visitor_counts},
                                   {'$set': {'todayCounts': 0}})  # 일일 방문자수를 0으로 세팅
        if db.visitorIP.find({'IP': ip_address}).count() > 0:  # 방문했던 IP 라면 카운트 변동 없음
            pass
        else:  # 날짜가 그대로고, 방문했던 IP가 아니라면
            db.todayCounter.update_one({'todayCounts': 0},
                                       {'$set': {'todayCounts': 1}})

    # 총 방문자수 로직
    if db.visitorIP.find({'IP': ip_address}).count() > 0:  # 방문했던 IP 라면 카운트 변동 없음
        pass
    else:  # 방문하지 않았던 IP 라면 해당 IP를 DB에 추가하고, 카운트 +1
        db.visitorIP.create_index("date", expireAfterSeconds=3600)  # 숫자는 '초' 단위. IP를 얼마나 저장할 것인가
        db.visitorIP.insert_one({'IP': ip_address, "date": datetime.utcnow()})
        updated_visitor_counts = visitor_counts + 1
        db.visitorCounter.update_one({'Counts': visitor_counts}, {'$set': {'Counts': updated_visitor_counts}})

    return render_template('home.html')


# API 역할을 하는 부분
@app.route('/api/todayCounts', methods=['GET'])
def show_todayCounts():
    db_today_counts = list(db.todayCounter.find({}, {'_id': False}))
    return jsonify({'today_counts': db_today_counts})


@app.route('/api/totalCounts', methods=['GET'])
def show_totalCounts():
    db_total_counts = list(db.visitorCounter.find({}, {'_id': False}))
    return jsonify({'total_counts': db_total_counts})


@app.route('/api/penguin', methods=['GET'])
def show_items1():
    return jsonify({'items': item_selector("인체공학의자", "높이조절가능책상", "모니터암")})


@app.route('/api/monkey', methods=['GET'])
def show_items2():
    return jsonify({'items': item_selector("기계식 키보드", "마우스", "피벗모니터")})


@app.route('/api/parrot', methods=['GET'])
def show_items3():
    return jsonify({'items': item_selector("손마사지기", "가습기", "인공눈물")})


@app.route('/api/panda', methods=['GET'])
def show_items4():
    return jsonify({'items': item_selector("헤드셋", "간식박스", "블루라이트차단경")})


@app.route('/api/koala', methods=['GET'])
def show_items5():
    return jsonify({'items': item_selector("팔받침대", "등받이 쿠션", "인체공학의자")})


@app.route('/api/cat', methods=['GET'])
def show_items6():
    return jsonify({'items': item_selector("헤드셋", "파티션", "이어플러그")})


@app.route('/api/squirrel', methods=['GET'])
def show_items7():
    return jsonify({'items': item_selector("간식박스", "텀블러", "슬리퍼")})


@app.route('/api/chameleon', methods=['GET'])
def show_items8():
    return jsonify({'items': item_selector("블루라이트차단경", "손목패드", "팔받침대")})


@app.route('/api/hedgehog', methods=['GET'])
def show_items9():
    return jsonify({'items': item_selector("키패드", "인공눈물", "기계식 키보드")})


@app.route('/api/meerkat', methods=['GET'])
def show_items10():
    return jsonify({'items': item_selector("마이크", "카메라", "마우스")})


@app.route('/api/kangaroo', methods=['GET'])
def show_items11():
    return jsonify({'items': item_selector("인체공학의자", "손마사지기", "등받이 쿠션")})


@app.route('/api/honeybee', methods=['GET'])
def show_items12():
    return jsonify({'items': item_selector("모니터암", "높이조절가능책상", "손목패드")})


@app.route('/api/owl', methods=['GET'])
def show_items13():
    return jsonify({'items': item_selector("높이조절가능책상", "가습기", "모니터암")})


@app.route('/api/pig', methods=['GET'])
def show_items14():
    return jsonify({'items': item_selector("간식박스", "커피자판기", "텀블러")})


@app.route('/result', methods=['POST'])
def count_result():
    ip_address = flask.request.remote_addr
    result_receive = request.form['result_give']
    count_receive = -1
    db.result_IP.create_index("date", expireAfterSeconds=3600)
    db.result_IP.insert_one({'IP': ip_address, "date": datetime.utcnow()})

    doc = {
        'type': result_receive,
        'counts': count_receive
    }
    if db.result_IP.find({'IP': ip_address}).count() > 1:  # 방문했던 IP 라면 카운트 변동 없음
        pass
    else:
        db.final_result.insert_one(doc)
        if (db.final_result.find_one({'counts': -1})['type']) == "반들반들 청결 펭귄형":
            counts = db.final_result.find_one({'type': '반들반들 청결 펭귄형'})['counts']
            updated_counts = counts + 1
            db.final_result.update_one({'type': '반들반들 청결 펭귄형'}, {'$set': {'counts': updated_counts}})
        elif (db.final_result.find_one({'counts': -1})['type']) == '영타 500타 원숭이형':
            counts = db.final_result.find_one({'type': '영타 500타 원숭이형'})['counts']
            updated_counts = counts + 1
            db.final_result.update_one({'type': '영타 500타 원숭이형'}, {'$set': {'counts': updated_counts}})
        elif (db.final_result.find_one({'counts': -1})['type']) == '수다쟁이 앵무새형':
            counts = db.final_result.find_one({'type': '수다쟁이 앵무새형'})['counts']
            updated_counts = counts + 1
            db.final_result.update_one({'type': '수다쟁이 앵무새형'}, {'$set': {'counts': updated_counts}})
        elif (db.final_result.find_one({'counts': -1})['type']) == '워라밸 판다형':
            counts = db.final_result.find_one({'type': '워라밸 판다형'})['counts']
            updated_counts = counts + 1
            db.final_result.update_one({'type': '워라밸 판다형'}, {'$set': {'counts': updated_counts}})
        elif (db.final_result.find_one({'counts': -1})['type']) == '사무실 마이홈 코알라형':
            counts = db.final_result.find_one({'type': '사무실 마이홈 코알라형'})['counts']
            updated_counts = counts + 1
            db.final_result.update_one({'type': '사무실 마이홈 코알라형'}, {'$set': {'counts': updated_counts}})
        elif (db.final_result.find_one({'counts': -1})['type']) == '유아독존 고양이형':
            counts = db.final_result.find_one({'type': '유아독존 고양이형'})['counts']
            updated_counts = counts + 1
            db.final_result.update_one({'type': '유아독존 고양이형'}, {'$set': {'counts': updated_counts}})
        elif (db.final_result.find_one({'counts': -1})['type']) == '탕비실 지박령 다람쥐형':
            counts = db.final_result.find_one({'type': '탕비실 지박령 다람쥐형'})['counts']
            updated_counts = counts + 1
            db.final_result.update_one({'type': '탕비실 지박령 다람쥐형'}, {'$set': {'counts': updated_counts}})
        elif (db.final_result.find_one({'counts': -1})['type']) == '충혈된 카멜레온형':
            counts = db.final_result.find_one({'type': '충혈된 카멜레온형'})['counts']
            updated_counts = counts + 1
            db.final_result.update_one({'type': '충혈된 카멜레온형'}, {'$set': {'counts': updated_counts}})
        elif (db.final_result.find_one({'counts': -1})['type']) == '빡! 집중 고슴도치형':
            counts = db.final_result.find_one({'type': '빡! 집중 고슴도치형'})['counts']
            updated_counts = counts + 1
            db.final_result.update_one({'type': '빡! 집중 고슴도치형'}, {'$set': {'counts': updated_counts}})
        elif (db.final_result.find_one({'counts': -1})['type']) == '호기심 많은 미어캣형':
            counts = db.final_result.find_one({'type': '호기심 많은 미어캣형'})['counts']
            updated_counts = counts + 1
            db.final_result.update_one({'type': '호기심 많은 미어캣형'}, {'$set': {'counts': updated_counts}})
        elif (db.final_result.find_one({'counts': -1})['type']) == '안마의자 마니아 캥거루형':
            counts = db.final_result.find_one({'type': '안마의자 마니아 캥거루형'})['counts']
            updated_counts = counts + 1
            db.final_result.update_one({'type': '안마의자 마니아 캥거루형'}, {'$set': {'counts': updated_counts}})
        elif (db.final_result.find_one({'counts': -1})['type']) == '근면성실 꿀벌형':
            counts = db.final_result.find_one({'type': '근면성실 꿀벌형'})['counts']
            updated_counts = counts + 1
            db.final_result.update_one({'type': '근면성실 꿀벌형'}, {'$set': {'counts': updated_counts}})
        elif (db.final_result.find_one({'counts': -1})['type']) == '야근요정 부엉이형':
            counts = db.final_result.find_one({'type': '야근요정 부엉이형'})['counts']
            updated_counts = counts + 1
            db.final_result.update_one({'type': '야근요정 부엉이형'}, {'$set': {'counts': updated_counts}})
        elif (db.final_result.find_one({'counts': -1})['type']) == '금강산도 식후경 돼지형':
            counts = db.final_result.find_one({'type': '금강산도 식후경 돼지형'})['counts']
            updated_counts = counts + 1
            db.final_result.update_one({'type': '금강산도 식후경 돼지형'}, {'$set': {'counts': updated_counts}})
        db.final_result.delete_many({'counts': -1})

        list_result = list(db.final_result.find({}, {'_id': False}))
        r_count = list_result
        total_count = 0
        for i in range(len(r_count)):
            result_count = r_count[i]['counts']
            total_count += result_count
        db.total_count.update_one({}, {'$set': {'total_count': total_count}})

    return jsonify({'result': 'success'})


@app.route('/result/statistic', methods=['GET'])
def make_statistic():
    result_list = list(db.final_result.find({}, {'_id': False}))
    total_count = db.total_count.find_one({}, {'_id': False})["total_count"]
    return jsonify({'statistic': result_list}, {'total_count': total_count})


# @app.route('/api/like', methods=['POST'])
# def like_star():
#     visitor_today_receive = request.form['sample_give']
#     print(sample_receive)
#     return jsonify({'msg': 'like 연결되었습니다!'})
#
#
# @app.route('/api/delete', methods=['POST'])
# def delete_star():
#     sample_receive = request.form['sample_give']
#     print(sample_receive)
#     return jsonify({'msg': 'delete 연결되었습니다!'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
