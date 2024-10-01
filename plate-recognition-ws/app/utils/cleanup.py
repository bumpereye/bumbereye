import os

def cleanup(file_name):
    """Delete the local image file."""
    if os.path.exists(file_name):
        os.remove(file_name)