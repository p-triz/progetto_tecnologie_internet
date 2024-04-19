from flask import jsonify, request

def receive_game_score():
    data = request.args.to_dict()
    playername = data.get('playername')
    score = data.get('score')
    gameId = data.get('gameId')

    print(f"{playername} {score} {gameId}")