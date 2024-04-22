from flask import request, jsonify

check = False

def get_data():
    #ottengo nome utente e password dal client
    data = request.get_json()
    username = data['username']
    password = data['password']

    #debug
    print(f"username: {username}, password: {password}")

    #TODO controllo al db con questioni di sicurezza ovviamente, restituisce un bool

    #se sono corretti invio esito positvo al client
    if check == True : 
        return jsonify({'message': 'Yes'})
    #altimenti negativo
    else:
        return jsonify({'message': 'No'})