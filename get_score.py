from flask import jsonify, request

def receive_game_score():
    data = request.get_json()
    playername = data['playername']
    score = data['score']
    gameId = data['gameId']

    print(f"{playername} {score} {gameId}")