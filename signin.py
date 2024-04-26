from flask import request, jsonify

def save_data():

    #ottengo nome utente e password dal client
    data = request.get_json()
    username = data['username']
    password = data['password']

    #debug
    print(f"username: {username}, password: {password}")

    return jsonify({'message': 'Done'})
