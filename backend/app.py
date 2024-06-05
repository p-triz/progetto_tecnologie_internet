from flask import Flask, request, jsonify
from flask_cors import CORS
from flask import g
import os
import sqlite3
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash


app = Flask(__name__)
cors = CORS (app, origins="*")

#the secret key is generated through this piece of code:
# import secrets;
# print(secrets.token_hex())
#
#as suggested from the flask documentation
app.secret_key = 'a421c210278fd00c726cf138acbe3780410109e3857df5b7475d847cd4813a31'

app.config.from_object(__name__)

app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'database.db'),
    SCHEMA=os.path.join(app.root_path, 'schema.sql')
))

#connects to the specific sqlite3 database
def connect_db():
    rv = sqlite3.connect(app.config['DATABASE'])
    rv.row_factory = sqlite3.Row
    return rv

#opens a new connection for this context g
def get_db():
    if not hasattr(g, 'sqlite_db'):
        g.sqlite_db = connect_db()
    return g.sqlite_db

#this is executed every time the context is teardown, it closes the connection
@app.teardown_appcontext
def close_db(error):
    if hasattr(g, 'sqlite_db'):
        g.sqlite_db.close()

#this is the function called in the flask script defined below, it uses the schema to initialize the database
#IT WILL DROP EVERY TABLE PRESENT IF CALLED
def init_db():
    db = get_db()
    with app.open_resource(app.config['SCHEMA'], mode='r') as f:
        db.cursor().executescript(f.read())
    db.commit()

#definition of the flask script, now you can write "flask initdb" in the terminal to initialize the database
@app.cli.command('initdb')
def initdb_command():
    """Initializes the database."""
    init_db()
    print('Initialized the database.')

 #--- API ---
    
#sending the scoreboards data
@app.route("/api/score/<int:number>", methods=['GET'])
def send_score(number):
    #if the number in the url is equal to 1 we need snake's data
    if number==1:
        try:
            db = get_db()
            cur = db.cursor()
            query = 'SELECT distinct username, score, game_id FROM Matches WHERE game_id=1'
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
            return jsonify({'message': 'Error: {}'.format(str(e))})

    
     #if number is 2, flappy bird's data is sent
    elif number==2:
        try:
            db = get_db()
            cur = db.cursor()
            query = 'SELECT distinct username, score, game_id FROM Matches WHERE game_id=2'
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
            return jsonify({'message': 'Error: {}'.format(str(e))})
    else:
        #otherwise something happened
        return "invalid number provided"
    

#receivin the match data and inserting it into the database
@app.route("/api/game", methods=['POST'])
def receive_game_score():
    data = request.get_json()
    playername = data['playername']
    score = data['score']
    gameId = data['gameId']

    try:
        db = get_db()
        cur = db.cursor()
        cur.execute('INSERT INTO Matches (game_id, score, username) VALUES (?, ?, ?)', (gameId, score, playername))
        db.commit()
        return jsonify({'message': 'Done'})
    
    except Exception as e:
        return jsonify({'message': 'Error: {}'.format(str(e))})


#login control
@app.route("/api/login", methods =['POST'])
def get_data():
    #client sends username and password
    data = request.get_json()
    username = data['username']
    password = data['password']


    db = get_db()
    cur = db.cursor()
    #extract the password hash from the database if present
    cur.execute('SELECT username, user_password FROM User WHERE username = ?', (username,))

    user = cur.fetchone()

    if user is None:   
        #the query result is empty, the credentials are worng!
        return jsonify({'message': 'Incorrect'})
    elif not check_password_hash(user["user_password"], password):
        #check_password_hash() returned false! the passwords do not match
        return jsonify({'message': 'Incorrect'})
    else :
        #everything is good, the user can login
        return jsonify({'message': 'Correct'})


#sign in a new user
@app.route("/api/signin", methods=['POST'])
def save_data():

    #get username and password from client
    data = request.get_json()
    username = data['username']
    password = data['password']


    #since username is a primary key for the User table no duplicates are allowed, so no check is needed, if the username is invalid
    #the exception will be executed
    try:
        db = get_db()
        cur = db.cursor()
        cur.execute('INSERT INTO User (username, user_password) VALUES (?, ?)', (username, generate_password_hash(password)))
        db.commit()
        return jsonify({'message': 'Done'})
    
    except Exception as e:
        # the username was already used
        return jsonify({'message': 'Error: {}'.format(str(e))})

#send  information about the games names and descriptions 
@app.route("/api/info", methods=['GET'])
def send_info():
    try:
        db = get_db()
        cur = db.cursor()
        # extract game name and description from db
        cur.execute('SELECT game_id, game_name, game_description FROM Game')
        games = cur.fetchall()
        return jsonify([{"game_id": game[0], "game_name": game[1], "game_description": game[2]} for game in games])
    except Exception as e:
        return jsonify({'message': 'Error: {}'.format(str(e))})

if __name__ == '__main__':
    app.run(debug=True)