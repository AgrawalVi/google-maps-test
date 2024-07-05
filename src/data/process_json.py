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
                path = [{'lat': coord[1], 'lng': coord[0]} for coord in polygon[0]]
                paths.append(path)
        elif geom_type == "Polygon":
            for polygon in coordinates:
                path = [{'lat': coord[1], 'lng': coord[0]} for coord in polygon]
                paths.append(path)

        for path in paths:
            styled_paths.append({'path': path, 'style': style, 'name': name, 'postal_code': postal_code})

    return styled_paths

def random_style():
    return {
        "color": "#%06x" % random.randint(0, 0xFFFFFF),
        "weight": random.randint(1, 10)
    }

def process_json_files(input_folder, output_folder):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for filename in os.listdir(input_folder):
        if filename.endswith(".json"):
            with open(os.path.join(input_folder, filename), 'r') as file:
                geojson = json.load(file)
            
            name = geojson['features'][0]['properties']['city']
            postal_code = geojson['features'][1]['properties']['postal-code'] if 'features' in geojson and len(geojson['features']) > 1 and 'postal-code' in geojson['features'][1]['properties'] else None
            style = random_style()
            styled_paths = extract_polygons(geojson, style, name, postal_code)

            output_filename = os.path.join(output_folder, f"styled_{filename}")
            with open(output_filename, 'w') as outfile:
                json.dump(styled_paths, outfile, indent=2)

if __name__ == "__main__":
    input_folder = '/Users/vishrutagrawal/xorbix/repos/google-maps-test/src/data/WI-unprocessed'  # Replace with your input folder path
    output_folder = 'WI-processed'  # Replace with your output folder path
    process_json_files(input_folder, output_folder)
