from flask import jsonify

def flappy_scores():
    scores = [
        {"player": "secondPlayer", "score": 20, "id": 2},
        {"player": "fourthPlayer", "score": 40, "id": 2},
        {"player": "prova", "score": 50, "id": 2},
    ]
    return jsonify(scores)