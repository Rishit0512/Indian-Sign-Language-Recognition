import cv2
import numpy as np
from tensorflow.keras.models import load_model
import string

# Load MobileNetV2 trained model
model = load_model("Model/Alphabets/mobilenet_9936.h5")

# Class labels A-Z
class_names = list(string.ascii_uppercase)

# Image size expected by model
IMG_SIZE = 224

# Start webcam
cap = cv2.VideoCapture(0)
if not cap.isOpened():
    print("Error: Webcam not accessible.")
    exit()

while True:
    ret, frame = cap.read()
    if not ret:
        print("Failed to capture frame.")
        break

    # Flip for mirror view
    frame = cv2.flip(frame, 1)

    # Get frame dimensions
    h, w, _ = frame.shape

    # Define centered ROI box (300x300)
    box_size = 300
    x1 = w // 2 - box_size // 2
    y1 = h // 2 - box_size // 2
    x2 = x1 + box_size
    y2 = y1 + box_size

    # Extract ROI
    roi = frame[y1:y2, x1:x2]

    # Preprocess image
    img = cv2.resize(roi, (IMG_SIZE, IMG_SIZE))
    img = img.astype("float32") / 255.0
    img = np.expand_dims(img, axis=0)

    # Predict
    pred = model.predict(img)
    class_index = np.argmax(pred[0])
    confidence = np.max(pred[0])
    label = f"{class_names[class_index]} ({confidence*100:.1f}%)"

    # Draw ROI box and prediction
    cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 255), 2)
    cv2.putText(frame, label, (x1, y1 - 15),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 255), 2)

    # Show the frame
    cv2.imshow("Real-Time A-Z Sign Recognition", frame)

    # Exit on 'q' key
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release resources
cap.release()
cv2.destroyAllWindows()
