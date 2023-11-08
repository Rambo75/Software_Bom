import os
import json
from pymongo import MongoClient

# Define the directory where JSON files are located
json_directory = './'

# Connect to the MongoDB server
client = MongoClient(
    'mongodb+srv://RamiBe:EndProj2023@cluster0.znlw7dl.mongodb.net/')

# Select the database and collection
db = client['ProjectData']
collection = db['MyData']

# Function to insert JSON data into the collection


def insert_json_data(json_data):
    result = collection.insert_one(json_data)
    print(f"Record inserted with ID: {result.inserted_id}")

# Function to delete a JSON file


def delete_json_file(json_file_path):
    os.remove(json_file_path)
    print(f"Deleted JSON file: {json_file_path}")


# Check if there is at least one JSON file in the directory
json_files = [filename for filename in os.listdir(
    json_directory) if filename.endswith('.json')]

if json_files:
    # Assuming there may be multiple JSON files, you can check each one before inserting
    for json_file in json_files:
        json_file_path = os.path.join(json_directory, json_file)

        # Read the content of the JSON file
        with open(json_file_path, 'r') as file:
            json_data = json.load(file)

        # Check if the same version string exists in the collection
        existing_data = collection.find_one({"version": json_data["version"]})
        if existing_data is None:
            insert_json_data(json_data)
            # Delete the JSON file after inserting
            delete_json_file(json_file_path)
            print(f"JSON data in {json_file} has been inserted and deleted.")
        else:
            # Compare the data in the JSON file with the data in the collection
            if json_data != existing_data:
                delete_json_file(json_file_path)
                print(
                    f"JSON data in {json_file} is different from the collection and has been deleted.")
else:
    print("No JSON files found in the directory!")

# Close the MongoDB connection
client.close()
