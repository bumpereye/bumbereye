from flask import Flask, jsonify, request
from utils import download_image, cleanup, recognize_plate

app = Flask(__name__)

@app.route('/recognize', methods=['POST'])
def recognize():
    try:
        data = request.get_json()

        if not data or 'url' not in data:
            return jsonify({'error': 'No URL provided'}), 400

        url = data['url']

        file_name = download_image(url)

        recognition_results = recognize_plate(file_name)

        cleanup(file_name)

        return jsonify(recognition_results), 200

    except Exception as e:
        cleanup(file_name)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000 , debug=True)
