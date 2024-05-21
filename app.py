from flask import Flask, request
from flask_cors import CORS
from get_score import receive_game_score as rGS
from login import get_data as gD
from signin import save_data as sD
from send_score_snake import snake_scores as Ss
from send_score_flappy import flappy_scores as Fs

app = Flask(__name__)
cors = CORS (app, origins="*")


@app.route("/api/score/<int:number>", methods=['GET'])
def send_score(number):
    if number==1:
        return Ss() 
    elif number==2:
        return Fs()
    else:
        return "invalid number provided"


@app.route("/api/game", methods=['POST', 'GET'])
def receive_score():
    return rGS()

@app.route("/api/login", methods =['POST'])
def login():
    return gD()

@app.route("/api/signin", methods=['POST'])
def singin():
    return sD()

if __name__ == '__main__':
    app.run(debug=True)