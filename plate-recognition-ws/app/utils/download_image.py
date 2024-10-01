import uuid
from urllib.parse import urlparse
import requests
import os

def download_image(url):
    """Download the image from the URL and save it locally with a unique name."""
    try:
        unique_id = str(uuid.uuid4())
        parsed_url = urlparse(url)

        _, file_extension = os.path.splitext(parsed_url.path)
        file_name = unique_id + file_extension

        response = requests.get(url)
        if response.status_code != 200:
            raise Exception("Failed to download image")

        with open(file_name, "wb") as file:
            file.write(response.content)

        return file_name

    except Exception as e:
        raise Exception("Error downloading image:" + str(e))