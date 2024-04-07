from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime, timezone
import json
from uuid import UUID

app = Flask(__name__)

CORS(app)

# Directly reference the file since it's in the same directory
APPOINTMENTS_FILE = 'appointments.json'
OWNERS_FILE = 'owners.json'

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
        new_appointment = request.get_json()  # Fixed this line
        appointments = read_appointments()
        
        # Here you might want to add a more sophisticated duplicate check
        # For example, check if the date and time already exist
        # rather than just if the entire appointment object exists.
        if new_appointment not in appointments:
            appointments.append(new_appointment)
            write_appointments(appointments)
            return jsonify(new_appointment), 201
        else:
            return jsonify({"error": "Appointment already exists"}), 409  # 409 Conflict

    else:  # GET request
        appointments = read_appointments()
        return jsonify(appointments)
    
    
# @app.route('/past-appointments')
# def past_appointments():
#     try:
#         appointments = read_appointments()
#         now = datetime.utcnow()

#         # Convert appointment end time to a datetime object and compare
#         past_apps = []
#         for app in appointments:
#             app_date = datetime.strptime(app['date'], '%Y-%m-%dT%H:%M:%S.%fZ')
#             # Assuming time slots are like "16-17"
#             end_hour = int(app['time'].split("-")[1])
#             # Construct the datetime for when the appointment ends
#             app_end_time = app_date.replace(hour=end_hour, minute=0)
            
#             if app_end_time < now:
#                 past_apps.append(app)

#         return jsonify(past_apps)
#     except ValueError as e:
#         return jsonify({"error": str(e)}), 400
@app.route('/past-appointments')
def past_appointments():
    appointments = read_appointments()
    now = datetime.now(timezone.utc)
    print(f"Current UTC Time: {now}")

    past_apps = []
    for app in appointments:
        app_end_time = calculate_appointment_end_time(app)
        print(f"Appointment End Time: {app_end_time} for {app}")

        if app_end_time < now:
            past_apps.append(app)

    return jsonify(past_apps)

def calculate_appointment_end_time(app):
    app_date_str = app['date']
    app_time_range = app['time']
    start_hour, end_hour = map(int, app_time_range.split("-"))

    app_date = datetime.strptime(app_date_str, '%Y-%m-%dT%H:%M:%S.%fZ').replace(tzinfo=timezone.utc)
    app_end_time = app_date.replace(hour=end_hour, minute=0)

    return app_end_time
    
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
    walkers = ["Bob", "John", "Hassan", "Tanvi", "Hanan", "Azan", "Sarhail", "Jai"]
    return jsonify(walkers=walkers)

def read_owners():
    try:
        with open(OWNERS_FILE, 'r') as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

# def write_owners(owners):
#     with open(OWNERS_FILE, 'w') as file:
#         json.dump(owners, file, indent=4) Maybe not need



if __name__ == '__main__':
    app.run(debug=True)