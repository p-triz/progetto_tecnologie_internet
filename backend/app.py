from flask import Flask, request, jsonify
from flask_cors import CORS
from get_score import receive_game_score as rGS
#from login import get_data as gD
#from signin import save_data as sD
from send_score_snake import snake_scores as Ss
from send_score_flappy import flappy_scores as Fs
from flask import g
import os
import sqlite3

app = Flask(__name__)
cors = CORS (app, origins="*")

app.config.from_object(__name__)

app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'database.db'),
    SCHEMA=os.path.join(app.root_path, 'schema.sql')
))

def connect_db():
    """Connects to the specific database."""
    rv = sqlite3.connect(app.config['DATABASE'])
    rv.row_factory = sqlite3.Row
    return rv

def get_db():
    """Opens a new database connection if there is none yet for the
    current application context.
    """
    if not hasattr(g, 'sqlite_db'):
        g.sqlite_db = connect_db()
    return g.sqlite_db

@app.teardown_appcontext
def close_db(error):
    """Closes the database again at the end of the request."""
    if hasattr(g, 'sqlite_db'):
        g.sqlite_db.close()

def init_db():
    db = get_db()
    with app.open_resource(app.config['SCHEMA'], mode='r') as f:
        db.cursor().executescript(f.read())
    db.commit()

@app.cli.command('initdb')
def initdb_command():
    """Initializes the database."""
    init_db()
    print('Initialized the database.')

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
def get_data():
    # Ottengo nome utente e password dal client
    data = request.get_json()
    username = data['username']
    password = data['password']

    # Debug
    print(f"username: {username}, password: {password}")

    db = get_db()
    cur = db.cursor()
    query = 'SELECT username, user_password FROM User WHERE username = ? AND user_password = ?'
    cur.execute(query, (username, password))

    # Controlla se la query ha restituito risultati
    user = cur.fetchone()

    if user:
        # La query ha restituito un risultato, quindi le credenziali sono corrette
        return jsonify({'message': 'Correct'})
    else:
        # La query non ha restituito risultati, quindi le credenziali sono errate
        return jsonify({'message': 'Incorrect'})

@app.route("/api/signin", methods=['POST'])
def save_data():

    #ottengo nome utente e password dal client
    data = request.get_json()
    username = data['username']
    password = data['password']

    #debug
    print(f"username: {username}, password: {password}")

    try:
        db = get_db()
        cur = db.cursor()
        cur.execute('INSERT INTO User (username, user_password) VALUES (?, ?)', (username, password))
        db.commit()
        return jsonify({'message': 'Done'})
    
    except Exception as e:
        # Gestione dell'errore durante l'inserimento
        return jsonify({'message': 'Error: {}'.format(str(e))})

    


if __name__ == '__main__':
    app.run(debug=True)