from flask import Flask, request, jsonify
from flask_cors import CORS
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

 #--- INIZIO API ---
    
# Api per invio delle classifiche
@app.route("/api/score/<int:number>", methods=['GET'])
def send_score(number):
    # se il numero passato nell'url è 1 bisogna passare i dati di snake
    if number==1:
        try:
            db = get_db()
            cur = db.cursor()
            query = 'SELECT username, score, game_id FROM Matches WHERE game_id=1'
            cur.execute(query)
            results = cur.fetchall()
            db.commit()
            
            scores = []
            for row in results:
                score = {
                    "player": row[0],
                    "score": row[1],
                    "id": row[2]
                }
                scores.append(score)
            
            return jsonify(scores)
        
        except Exception as e:
            # Gestione dell'errore durante l'inserimento
            return jsonify({'message': 'Error: {}'.format(str(e))})

    
     # se è 2 quelli di flappy
    elif number==2:
        try:
            db = get_db()
            cur = db.cursor()
            query = 'SELECT username, score, game_id FROM Matches WHERE game_id=2'
            cur.execute(query)
            results = cur.fetchall()
            db.commit()
            
            scores = []
            for row in results:
                score = {
                    "player": row[0],
                    "score": row[1],
                    "id": row[2]
                }
                scores.append(score)
            
            return jsonify(scores)
        
        except Exception as e:
            # Gestione dell'errore durante l'inserimento
            return jsonify({'message': 'Error: {}'.format(str(e))})
    else:
        return "invalid number provided"
    

#Api per ricevere il punteggio della partita e aggiornare il db
@app.route("/api/game", methods=['POST', 'GET'])
def receive_game_score():
    data = request.get_json()
    playername = data['playername']
    score = data['score']
    gameId = data['gameId']

    print(f"{playername} {score} {gameId}")
    try:
        db = get_db()
        cur = db.cursor()
        cur.execute('INSERT INTO Matches (game_id, score, username) VALUES (?, ?, ?)', (gameId, score, playername))
        db.commit()
        return jsonify({'message': 'Done'})
    
    except Exception as e:
        # Gestione dell'errore durante l'inserimento
        return jsonify({'message': 'Error: {}'.format(str(e))})


#Api per controllare che utente possa loggare
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


# Aoi per far iscrivere l'utente all'appilicazione
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