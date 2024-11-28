from flask import Flask, jsonify, request
from utils import generate_file_name, cleanup, recognize_plate, transform_response

app = Flask(__name__)

@app.route('/recognize', methods=['POST'])
def recognize():
    try:
        file = request.files.get('file')

        if not file:
            return jsonify({'error': 'No file provided'}), 400

        file_name = generate_file_name(file.filename)

        file.save(file_name)

        recognition_results = recognize_plate(file_name)

        result = transform_response(recognition_results)

        cleanup(file_name)

        return jsonify(result), 200

    except Exception as e:
        cleanup(file_name)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000 , debug=True)
