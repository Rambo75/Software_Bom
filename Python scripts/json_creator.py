import argparse
import json
import os
import subprocess
from datetime import datetime


def get_current_commit_id(directory):
    try:
        current_directory = os.getcwd()
        parent_directory = os.path.dirname(current_directory)
        target_directory = os.path.join(parent_directory, directory)
        os.chdir(target_directory)

        # Execute the Git command to retrieve the commit ID
        result = subprocess.run(
            ['git', 'rev-parse', '--short', 'HEAD'], capture_output=True, text=True)
        commit_id = result.stdout.strip()

        # Change back to the original directory
        os.chdir(current_directory)

        return commit_id
    except Exception as e:
        print(f"Error retrieving Git commit ID: {str(e)}")
        return None


# Create an ArgumentParser object
parser = argparse.ArgumentParser(description='Create project JSON file')

# Add arguments with switches to the ArgumentParser
parser.add_argument('-n', '--project-name', required=True, help='Project name')
parser.add_argument('-v', '--version', required=True, help='Version')
parser.add_argument('-c', '--configuration',
                    required=True, help='Configuration')
parser.add_argument('-m', '--map-file', required=True, help='Map file path')
parser.add_argument('-o', '--output-file', required=True,
                    help='Output file path')

# Parse the command-line arguments
args = parser.parse_args()


def create_project_json(project_name, version, configuration, map_file_path, output_file):
    bsp_commit_id = get_current_commit_id('bsp')
    maytronics_commit_id = get_current_commit_id('maytronicsservices')
    commonservices_commit_id = get_current_commit_id('commonservices')

    # Read the content of the map file
    with open(map_file_path, 'r') as map_file:
        map_file_content = map_file.readlines()

    # Filter the rows based on prefixes
    filtered_maytronics = [line.strip(
    ) for line in map_file_content if line.startswith('../MaytronicsServices')]
    filtered_common = [
        line.strip() for line in map_file_content if line.startswith('../CommonServices')]
    filtered_bsp = [line.strip()
                    for line in map_file_content if line.startswith('../BSP')]

    # Create the dependencies dictionary
    dependencies = {
        "MaytronicsServices": filtered_maytronics,
        "CommonServices": filtered_common,
        "BSP": filtered_bsp
    }

    data = {
        "date": datetime.now().strftime("%Y-%m-%d"),
        "time": datetime.now().strftime("%H:%M:%S"),
        "project_name": project_name,
        "version": version,
        "configuration": configuration,
        "dependencies": dependencies,
        "bsp_commit_id": bsp_commit_id,
        "maytronics_commit_id": maytronics_commit_id,
        "commonservices_commit_id": commonservices_commit_id
    }

    with open(output_file, 'w') as file:
        json.dump(data, file, indent=4)


# Call the function to create the JSON file
create_project_json(args.project_name, args.version,
                    args.configuration, args.map_file, args.output_file)
print("JSON file created successfully")
