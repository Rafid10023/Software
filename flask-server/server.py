from flask import Flask, request, jsonify
app = Flask(__name__)

def read_credentials():
    with open('credentials.txt', 'r') as file:
        return [line.strip().split(',') for line in file]

def write_credentials(credentials):
    with open('credentials.txt', 'w') as file:
        for username, password in credentials:
            file.write(f"{username},{password}\n")

@app.route('/login', methods=['POST'])
def login():
    username = request.json['email']
    password = request.json['password']
    credentials = read_credentials()
    for stored_username, stored_password in credentials:
        if username == stored_username and password == stored_password:
            return jsonify({'success': True})
    return jsonify({'success': False})

@app.route('/signup', methods=['POST'])
def signup():
    username = request.json['email']
    password = request.json['password']
    credentials = read_credentials()
    credentials.append([username, password])
    write_credentials(credentials)
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True)