from flask import Flask, send_from_directory
from flask_cors import CORS
from scoreboard import send_score as sC
from get_score import receive_game_score as rGS

app = Flask(__name__)
cors = CORS (app, origins="*")


@app.route("/api/score", methods=['GET'])
def send_score():
    return sC()    

@app.route("/api/game", methods=['POST', 'GET'])
def receive_score():
    return rGS()

@app.route("/api/login")
def login():
    return "prova"

if __name__ == '__main__':
    app.run(debug=True)