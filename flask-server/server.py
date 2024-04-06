from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

# Load user data from JSON files
with open('users.json') as f:
    users_data = json.load(f)

with open('potential.json') as f:
    dogwalkers_data = json.load(f)

    
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    role = None

    # Check if the provided credentials match any user in the database
    for group, users in users_data.items():
        for user in users:
            if user['username'] == username and user['password'] == password:
                role = group
                break

    if role:
        return jsonify({'message': 'Login successful', 'role': role}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    role = "dog_walkers"  # Assuming all sign-ups via this route are for dog walkers

    # Add the new user to the dog walkers group
    dogwalkers_data.setdefault(role, []).append({'username': username, 'password': password})

    # Update the JSON file for dog walkers
    with open("potential.json", 'w') as f:
        json.dump(dogwalkers_data, f, indent=4)

    return jsonify({'message': 'User signed up successfully'}), 200

@app.route("/signupDogOwner", methods=["POST"])
def signupDogOwner():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    role = "dog_owners"  # Assuming all sign-ups via this route are for dog owners

    # Add the new user to the dog owners group
    users_data.setdefault(role, []).append({'username': username, 'password': password})

    # Update the JSON file for users
    with open("users.json", 'w') as f:
        json.dump(users_data, f, indent=4)

    return jsonify({'message': 'User signed up successfully'}), 200


if __name__ == "__main__":
    app.run(debug=True)