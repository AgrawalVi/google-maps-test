import os
import json
import random
import numpy as np


def extract_polygons(geojson, style, name, postal_code):
    features = geojson.get('features', [])
    styled_paths = []

    for feature in features:
        paths = []
        geometry = feature.get('geometry', {})
        coordinates = geometry.get('coordinates', [])
        geom_type = geometry.get('type', '')

        if geom_type == "MultiPolygon":
            for polygon in coordinates:
                path = [{'lat': coord[1], 'lng': coord[0]}
                        for coord in polygon[0]]
                paths.append(path)
        elif geom_type == "Polygon":
            for polygon in coordinates:
                path = [{'lat': coord[1], 'lng': coord[0]}
                        for coord in polygon]
                paths.append(path)

        for path in paths:
            styled_paths.append(
                {'path': path, 'style': style, 'name': name, 'postal_code': postal_code})

    return styled_paths


def random_style():

    color = 'orange'
    mean = 500  # Center of the range (1 to 1000)
    std_dev = 150  # Standard deviation

    # generate a random number between 1 and 100
    random_number = random.randint(1, 100)
    if (random_number < 60):
        transparency_value = 0
        stroke_opacity = 0
        stroke_weight = 0
    else:
        random_number = np.random.normal(mean, std_dev)
        # Ensure the number is within the range of 1 to 1000
        random_number = max(1, min(1000, int(random_number)))
        transparency_value = (random_number - 1) / (1000 - 1)
        stroke_opacity = 0.2
        stroke_weight = 1
        if (transparency_value > 0.8):
            color = '#FC6A03'

    return {
        'fillColor': color,
        'fillOpacity': transparency_value,
        'strokeColor': 'red',
        'strokeOpacity': stroke_opacity,
        'strokeWeight': stroke_weight
    }


def combine_json_files(input_folder, output_file):
    combined_styled_paths = []

    # Iterate through all files in the input folder
    for filename in os.listdir(input_folder):
        if filename.endswith(".json"):
            file_path = os.path.join(input_folder, filename)

            # Open and read each JSON file
            with open(file_path, 'r') as file:
                geojson = json.load(file)

            # Extract necessary details
            name = geojson['features'][1]['properties']['city']
            postal_code = geojson['features'][1]['properties']['postal-code'] if 'features' in geojson and len(
                geojson['features']) > 1 and 'postal-code' in geojson['features'][1]['properties'] else None
            style = random_style()
            styled_paths = extract_polygons(geojson, style, name, postal_code)
            combined_styled_paths.extend(styled_paths)

    # Write the combined data to the output file
    with open(output_file, 'w') as outfile:
        json.dump(combined_styled_paths, outfile, indent=2)


if __name__ == "__main__":
    # Replace with your input folder path
    input_folder = '/Users/vishrutagrawal/xorbix/repos/google-maps-test/src/data/WI-raw'
    # Replace with your desired output file path
    output_file = '/Users/vishrutagrawal/xorbix/repos/google-maps-test/src/data/wisconsin_data.json'
    combine_json_files(input_folder, output_file)
