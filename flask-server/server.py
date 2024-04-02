from flask import Flask, jsonify, request
import json

app = Flask(__name__)

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
    # Check if the array index and object index are valid
    if 0 <= array_index < len(existing_data) and 0 <= obj_index < len(existing_data[array_index]):
        # Delete the object from the specified indices
        del existing_data[array_index][obj_index]
        # Write the updated content back to the JSON file
        with open("submitted_data.json", "w") as f:
            json.dump(existing_data, f, indent=4)
        return jsonify({"message": "Data deleted successfully"})
    else:
        return jsonify({"error": "Invalid array or object index"}), 400

if __name__ == "__main__":
    app.run(debug=True)