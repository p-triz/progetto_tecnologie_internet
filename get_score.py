from flask import request, jsonify

def receive_game_score():
    data = request.get_json()
    playername = data['playername']
    score = data['score']
    gameId = data['gameId']

    print(f"{playername} {score} {gameId}")


    return jsonify({'message': 'Game score received'})