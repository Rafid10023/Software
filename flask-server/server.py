from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from datetime import datetime
# from uuid import UUID
import pytz



app = Flask(__name__)
CORS(app)

#    ------=Login Code=------


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





#   ------=Dog walker code=------

APPOINTMENTS_FILE_WALKER = './dogwalker_json/appointments.json'

def read_appointments_walker():
    try:
        with open(APPOINTMENTS_FILE_WALKER, 'r') as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        return []  # Return an empty list if the file doesn't exist or is empty

def write_appointments_walker(appointments):
    with open(APPOINTMENTS_FILE_WALKER, 'w') as file:
        json.dump(appointments, file, indent=4)


@app.route('/appointmentsWalker', methods=['GET', 'POST'])
def handle_appointments_walker():
    if request.method == 'POST':
        # Your existing POST logic
        new_appointment = request.get_json()
        appointments = read_appointments_walker()

        if not any(app['id'] == new_appointment['id'] for app in appointments):
            appointments.append(new_appointment)
            write_appointments_walker(appointments)
            return jsonify(new_appointment), 201
        else:
            return jsonify({"error": "Appointment already exists"}), 409

    elif request.method == 'GET':
        # Your existing GET logic
        walker_username = request.args.get('walkerUsername')
        appointments = read_appointments_walker()
        
        if walker_username:
            filtered_appointments = [app for app in appointments if app.get('walkerUsername') == walker_username]
            return jsonify(filtered_appointments)
        else:
            # If no username is provided, return all appointments
            # Consider whether you want to keep this functionality
            return jsonify(appointments)

@app.route('/past-appointmentsWalker')
def past_appointments_walker():
    appointments = read_appointments_walker()
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
    
@app.route('/appointmentsWalker/<uuid:appointment_id>', methods=['PUT'])
def update_appointment_walker(appointment_id):
    update_data = request.get_json()
    appointments = read_appointments_walker()
    
    # Find the appointment with the given ID
    for app in appointments:
        if app["id"] == str(appointment_id):
            app['rating'] = update_data.get('rating', app['rating'])
            write_appointments_walker(appointments)
            return jsonify(app), 200
    
    # If no appointment is found with the given ID, return a 404 error
    return jsonify({"error": "Appointment not found"}), 404

# @app.route('/dogs')
# def get_dogs():
#     dogs = ["Max", "Charlie", "Ash", "Neo", "Cooper", "Luna", "Milo", "Leo"]
#     return jsonify(dogs=dogs)

@app.route('/dogs')
def get_dogs():
    # Load user data from JSON file
    with open('users.json') as f:
        users_data = json.load(f)
    
    # Extract dognames of dog owners
    dogowner_dognames = [dogowner['dogname'] for dogowner in users_data['dog_owners']]
    
    return jsonify(dogs=dogowner_dognames)

# @app.route('/walkers')
# def get_walkers():
#     # Load user data from JSON file
#     with open('users.json') as f:
#         users_data = json.load(f)
    
#     # Extract usernames of dog walkers
#     walker_usernames = [walker['username'] for walker in users_data['dog_walkers']]
    
#     return jsonify(walkers=walker_usernames)

if __name__ == "__main__":
    app.run(debug=True)