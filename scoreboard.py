from flask import jsonify

def send_score():
    scores = [
        {"player": "firstPlayer", "score": 10, "id": 1},
        {"player": "secondPlayer", "score": 20, "id": 2},
        {"player": "thirdPlayer", "score": 30, "id": 1},
        {"player": "fourthPlayer", "score": 40, "id": 2},
        {"player": "fifthPlayer", "score": 50, "id": 2},
        {"player": "fourthPlayer", "score": 40, "id": 1},
        {"player": "fifthPlayer", "score": 50, "id": 1},
        {"player": "fifthPlayer", "score": 5, "id": 1},
    ]
    return jsonify(scores)