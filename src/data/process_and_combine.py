import os
import json
import random


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


colorOptions = ['#0000FF', '#00FFFF', '#00FF00', '#ADFF2F',
                '#FFFF00', '#FFD700', '#FFA500', '#FF4500', '#FF0000', '#8B0000']


def random_style():
    return {
        'fillColor': random.choice(colorOptions),
        'fillOpacity': random.randint(0, 100) / 100,
        'strokeColor': random.choice(colorOptions),
        'strokeOpacity': random.randint(0, 100) / 100,
        'strokeWeight': 1
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
