def transform_response(original_data):
    try:
        # Extract relevant information
        epoch_time = original_data.get("epoch_time", None)
        img_height = original_data.get("img_height", None)
        img_width = original_data.get("img_width", None)
        searching_plate_processing_time_ms = original_data.get("processing_time_ms", None)
        
        results = original_data.get("results", [])
        if results:
            result = results[0]  # Assuming we take the first result
            recognition_plate_processing_time_ms = result.get("processing_time_ms", None)
            plate = result.get("plate", None)
            region = result.get("region", None)
            candidates = result.get("candidates", [])
            coordinates = result.get("coordinates", [])
        else:
            recognition_plate_processing_time_ms = None
            plate = None
            region = None
            candidates = []
            coordinates = []

        # Construct the new format
        transformed_data = {
            "startDate": epoch_time,
            "imgHeight": img_height,
            "imgWidth": img_width,
            "searchingPlateProcessingTimeMs": searching_plate_processing_time_ms,
            "recognitionPlateProcessingTimeMs": recognition_plate_processing_time_ms,
            "plate": plate,
            "metadata": {
                "region": region,
                "candidates": candidates,
                "coordinates": coordinates
            }
        }

        return transformed_data

    except Exception as e:
        return {"error": str(e)}