from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from datetime import datetime
import pytz


app = Flask(__name__)
CORS(app)

# Function to load existing data from the JSON file
def load_json_file(filename):
    try:
        with open(filename, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return []

# Members API route
@app.route("/members")
def members():
    # Load the contents of the JSON file
    members_data = load_json_file("submitted_data.json")
    # Return the loaded JSON data
    return jsonify(members_data)

# Submit data route
@app.route("/submit_data", methods=["POST"])
def submit_data():
    data = request.json
    # Load existing data from the JSON file
    existing_data = load_json_file("submitted_data.json")
    # Append the new data to the existing content
    existing_data.append(data)
    # Write the updated content back to the JSON file
    with open("submitted_data.json", "w") as f:
        json.dump(existing_data, f, indent=4)
    return jsonify({"message": "Data submitted successfully"})

# Route to handle deletion of data
@app.route("/delete_data/<int:array_index>/<int:obj_index>", methods=["DELETE"])
def delete_data(array_index, obj_index):
    # Load existing data from the JSON file
    existing_data = load_json_file("submitted_data.json")
    
    # Check if the array index is valid
    if 0 <= array_index < len(existing_data):
        # Check if the object index is valid
        if 0 <= obj_index < len(existing_data[array_index]):
            # Delete the object from the specified indices
            del existing_data[array_index][obj_index]
            
            # Check if the array is empty after deleting the object
            if not existing_data[array_index]:
                # If the array is empty, delete the entire array
                del existing_data[array_index]
                
            # Write the updated content back to the JSON file
            with open("submitted_data.json", "w") as f:
                json.dump(existing_data, f, indent=4)
            return jsonify({"message": "Data deleted successfully"})
        else:
            return jsonify({"error": "Invalid object index"}), 400
    else:
        return jsonify({"error": "Invalid array index"}), 400
    
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




#   ------=Dog owner code=------


APPOINTMENTS_FILE = './dogowner_json/appointments.json'
TASKS_FILE = './dogowner_json/tasks.json'



def read_appointments():
    try:
        with open(APPOINTMENTS_FILE, 'r') as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        return []  # Return an empty list if the file doesn't exist or is empty

def write_appointments(appointments):
    with open(APPOINTMENTS_FILE, 'w') as file:
        json.dump(appointments, file, indent=4)


@app.route('/appointments', methods=['GET', 'POST'])
def handle_appointments():
    if request.method == 'POST':
        # Your existing POST logic
        new_appointment = request.get_json()
        appointments = read_appointments()

        if not any(app['id'] == new_appointment['id'] for app in appointments):
            appointments.append(new_appointment)
            write_appointments(appointments)
            return jsonify(new_appointment), 201
        else:
            return jsonify({"error": "Appointment already exists"}), 409

    elif request.method == 'GET':
        # Your existing GET logic
        owner_username = request.args.get('ownerUsername')
        appointments = read_appointments()
        
        if owner_username:
            filtered_appointments = [app for app in appointments if app.get('ownerUsername') == owner_username]
            return jsonify(filtered_appointments)
        else:
            # If no username is provided, return all appointments
            # Consider whether you want to keep this functionality
            return jsonify(appointments)

@app.route('/past-appointments')
def past_appointments():
    appointments = read_appointments()
    # Define BST timezone
    bst = pytz.timezone('Europe/London')
    
    now = datetime.now(pytz.utc)  # Get current time in UTC
    now_bst = now.astimezone(bst)  # Convert current UTC time to BST

    past_apps = []
    for app in appointments:
        app_date_utc = datetime.strptime(app['date'], '%Y-%m-%dT%H:%M:%S.%fZ')
        app_date_utc = pytz.utc.localize(app_date_utc)  # Assume appointment dates are stored in UTC
        end_hour = int(app['time'].split("-")[1])
        
        # Replace with end hour in BST
        app_end_time_bst = app_date_utc.astimezone(bst).replace(hour=end_hour, minute=0, second=0, microsecond=0)

        if app_end_time_bst < now_bst:
            past_apps.append(app)

    return jsonify(past_apps)
    
@app.route('/appointments/<uuid:appointment_id>', methods=['PUT'])
def update_appointment(appointment_id):
    update_data = request.get_json()
    appointments = read_appointments()
    
    # Find the appointment with the given ID
    for app in appointments:
        if app["id"] == str(appointment_id):
            app['rating'] = update_data.get('rating', app['rating'])
            write_appointments(appointments)
            return jsonify(app), 200
    
    # If no appointment is found with the given ID, return a 404 error
    return jsonify({"error": "Appointment not found"}), 404


@app.route('/walkers')
def get_walkers():
    # Load user data from JSON file
    with open('users.json') as f:
        users_data = json.load(f)
    
    # Extract usernames of dog walkers
    walker_usernames = [walker['username'] for walker in users_data['dog_walkers']]
    
    return jsonify(walkers=walker_usernames)

#Tasks

def read_tasks():
    try:
        with open(TASKS_FILE, 'r') as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}

def write_tasks(tasks):
    with open(TASKS_FILE, 'w') as file:
        json.dump(tasks, file, indent=4)

@app.route('/tasks/<username>', methods=['GET'])
def get_user_tasks(username):
    tasks = read_tasks()
    user_tasks = tasks.get(username, [])
    return jsonify(user_tasks)

@app.route('/tasks/<username>', methods=['POST'])
def add_user_task(username):
    tasks = read_tasks()
    new_task = request.get_json()
    
    # Assuming new_task is a dictionary with task details
    user_tasks = tasks.get(username, [])
    user_tasks.append(new_task)
    tasks[username] = user_tasks
    
    write_tasks(tasks)
    return jsonify(new_task), 201

# Admin
POTENTIAL_FILE_PATH = 'potential.json'
ACCEPTED_FILE_PATH = 'accepted.json'

@app.route("/admin-login", methods=["POST"])
def adminlogin():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    role = None

    # Check if the provided credentials match any user in the database
    for group, users in users_data.items():
        if group == 'system_admins':
            for user in users:
                if user['username'] == username and user['password'] == password:
                    role = group
                    break

    if role == 'system_admins':
        return jsonify({'message': 'Login successful', 'role': role}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

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

if __name__ == "__main__":
    app.run(debug=True)


