import subprocess
import json
import os

scripts_directory = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'scripts'))
script_path = os.path.join(scripts_directory, 'openalpr.sh')

def recognize_plate(file_name):
    """Run OpenALPR on the given image file and return the parsed results."""
    try:
        output = subprocess.run([script_path, file_name], stdout=subprocess.PIPE)
        decoded_output = output.stdout.decode('utf-8')

        return json.loads(decoded_output)

    except json.JSONDecodeError:
        raise Exception("Failed to parse OpenALPR output as JSON")
    except Exception as e:
        raise Exception("Error recognizing image:" + str(e))