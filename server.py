from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime, timedelta
import json

app = Flask(__name__)

CORS(app)

# Directly reference the file since it's in the same directory
APPOINTMENTS_FILE = 'appointments.json'

def read_appointments():
    try:
        with open(APPOINTMENTS_FILE, 'r') as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        return []  # Return an empty list if the file doesn't exist or is empty

def write_appointments(appointments):
    with open(APPOINTMENTS_FILE, 'w') as file:
        json.dump(appointments, file, indent=4)

# @app.route('/appointments', methods=['GET', 'POST'])
# def handle_appointments():
#     if request.method == 'POST':
#         new_appointment = request.json
#         appointments = read_appointments()
#         if new_appointment not in appointments:
#             appointments.append(new_appointment)
#             write_appointments(appointments)
#         return jsonify(new_appointment), 201
#     else:  # GET request
#         appointments = read_appointments()
#         return jsonify(appointments)
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
    
# @app.route('/past-appointments', methods=['GET'])
# def get_past_appointments():
#     appointments = read_appointments()
#     now = datetime.now()
#     past_appointments = [appt for appt in appointments if datetime.fromisoformat(appt['date']) < now]
#     return jsonify(past_appointments)

@app.route('/past-appointments')
def past_appointments():
    try:
        appointments = read_appointments()
        now = datetime.utcnow()

        # Convert appointment end time to a datetime object and compare
        past_apps = []
        for app in appointments:
            app_date = datetime.strptime(app['date'], '%Y-%m-%dT%H:%M:%S.%fZ')
            # Assuming time slots are like "16-17"
            end_hour = int(app['time'].split("-")[1])
            # Construct the datetime for when the appointment ends
            app_end_time = app_date.replace(hour=end_hour, minute=0)
            
            if app_end_time < now:
                past_apps.append(app)

        return jsonify(past_apps)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400


@app.route('/walkers')
def get_walkers():
    walkers = ["Bob", "John", "Hassan", "Tanvi", "Hanan", "Azan", "Sarhail", "Jai"]
    return jsonify(walkers=walkers)

if __name__ == '__main__':
    app.run(debug=True)