import uuid
import os

def generate_file_name(original_filename):
    try:
        unique_id = str(uuid.uuid4())

        _, file_extension = os.path.splitext(original_filename)
        file_name = unique_id + file_extension

        return file_name

    except Exception as e:
        raise Exception("error generation file name:" + str(e))