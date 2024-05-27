from flask import jsonify

def snake_scores():
    scores = [
        {"player": "firstPlayer", "score": 10, "id": 1},
        {"player": "thirdPlayer", "score": 30, "id": 1},
        {"player": "fourthPlayer", "score": 40, "id": 1},
        {"player": "fifthPlayer", "score": 50, "id": 1},
        {"player": "prova", "score": 5, "id": 1},
    ]
    return jsonify(scores)