import json 
from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Path to the potential.json and accepted.json files
POTENTIAL_FILE_PATH = 'potential.json'
ACCEPTED_FILE_PATH = 'accepted.json'

# Function to load data from a JSON file
def load_json_file(file_path):
    try:
        with open(file_path, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return []

# Function to save data to a JSON file
def save_json_file(file_path, data):
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)

@app.route("/members")
def members():
    return {"members": ["Member1", "Member2,", "Member3"]}

@app.route('/potential')
def get_potential_walkers():
    try:
        data = load_json_file(POTENTIAL_FILE_PATH)
        return jsonify(data)
    except json.JSONDecodeError:
        return jsonify({"error": "Error decoding JSON in potential.json"})

@app.route('/accept', methods=['POST'])
def accept_request():
    try:
        data = load_json_file(POTENTIAL_FILE_PATH)
        request_name = request.json['name']
        for item in data:
            if item['name'] == request_name:
                data.remove(item)
                save_json_file(POTENTIAL_FILE_PATH, data)
                accepted_data = load_json_file(ACCEPTED_FILE_PATH)
                # Format the date as DD/MM/YY
                current_date = datetime.now().strftime("%d/%m/%y")
                accepted_data.append({"name": request_name, "date": current_date})
                save_json_file(ACCEPTED_FILE_PATH, accepted_data)
                return jsonify({"message": "Name accepted and moved to accepted.json"})
        return jsonify({"error": "Name not found in potential.json"})
    except KeyError:
        return jsonify({"error": "Invalid request body"})
    except json.JSONDecodeError:
        return jsonify({"error": "Error decoding JSON in potential.json"})

@app.route('/deny', methods=['POST'])
def deny_request():
    try:
        data = load_json_file(POTENTIAL_FILE_PATH)
        request_name = request.json['name']
        for item in data:
            if item['name'] == request_name:
                data.remove(item)
                save_json_file(POTENTIAL_FILE_PATH, data)
                return jsonify({"message": "Name denied and removed from potential.json"})
        return jsonify({"error": "Name not found in potential.json"})
    except KeyError:
        return jsonify({"error": "Invalid request body"})
    except json.JSONDecodeError:
        return jsonify({"error": "Error decoding JSON in potential.json"})
    
@app.route('/accepted')
def get_accepted_users():
    try:
        data = load_json_file(ACCEPTED_FILE_PATH)
        return jsonify(data)
    except json.JSONDecodeError:
        return jsonify({"error": "Error decoding JSON in accepted.json"})

if __name__ == "__main__":
    app.run(debug=True)
