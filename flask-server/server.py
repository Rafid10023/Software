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

@app.route('/reviews')
def get_reviews():
    try:
        with open('rnr.json', 'r') as file:
            reviews_data = json.load(file)
        return jsonify(reviews_data)
    except FileNotFoundError:
        return jsonify({"error": "File not found"})
    except json.JSONDecodeError:
        return jsonify({"error": "Error decoding JSON"})
    

@app.route('/reviews/<int:review_id>', methods=['PUT'])
def update_review(review_id):
    try:
        data = load_json_file('rnr.json')
        updated_review = request.json
        for review in data:
            if review['id'] == review_id:
                # Update review fields including the rating
                review['rating'] = updated_review['rating']
                review['review'] = updated_review['review']  # Update other fields if necessary
                save_json_file('rnr.json', data)
                return jsonify({"message": "Review updated successfully"})
        return jsonify({"error": "Review not found"})
    except KeyError:
        return jsonify({"error": "Invalid request body"})
    except json.JSONDecodeError:
        return jsonify({"error": "Error decoding JSON"})


@app.route('/potential/<string:user_type>')
def get_potential_users(user_type):
    try:
        data = load_json_file(POTENTIAL_FILE_PATH)
        filtered_data = [user for user in data if user["type"] == user_type]
        return jsonify(filtered_data)
    except json.JSONDecodeError:
        return jsonify({"error": "Error decoding JSON in potential.json"})

@app.route('/accept', methods=['POST'])
def accept_request():
    try:
        data = load_json_file(POTENTIAL_FILE_PATH)
        request_name = request.json['name']
        for item in data:
            if item['name'] == request_name and item['type'] == user_type:
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
    
@app.route('/delete/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        accepted_data = load_json_file(ACCEPTED_FILE_PATH)
        user_found = False
        for index, user in enumerate(accepted_data):
            if user['id'] == user_id:
                del accepted_data[index]
                user_found = True
                break
        
        if user_found:
            save_json_file(ACCEPTED_FILE_PATH, accepted_data)
            return jsonify({"message": "User deleted successfully"})
        else:
            return jsonify({"error": "User not found"})
    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    app.run(debug=True)
