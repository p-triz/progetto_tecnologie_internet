from flask import request, jsonify

def get_data():

    #ottengo nome utente e password dal client
    data = request.get_json()
    username = data['username']
    password = data['password']

    #debug
    print(f"username: {username}, password: {password}")

    #TODO controllo al db con questioni di sicurezza ovviamente, restituisce un bool
    check = True

    if check == True : 
        return jsonify({'message': 'Correct'})

    else:
        return jsonify({'message': 'Incorrect'})