import cv2
import numpy as np
from tensorflow.keras.models import load_model

# Load the trained word recognition model
model = load_model("WordModels/word_model_fixed.h5")

# List of word class names
GESTURE_CLASSES = [
    "Indian","Language","Namaste","No","Practice","Strong","Thank you","Understood","Welcome","bad","bye","difficult","easy","fear","food","good",
]

# Image size expected by the model
IMG_SIZE = 224

# Start webcam
cap = cv2.VideoCapture(0)
if not cap.isOpened():
    print("Error: Cannot access webcam.")
    exit()

while True:
    ret, frame = cap.read()
    if not ret:
        print("Failed to capture frame.")
        break

    # Flip frame horizontally for mirror view
    frame = cv2.flip(frame, 1)

    # Get frame dimensions
    h, w, _ = frame.shape

    # Define a centered ROI box (300x300)
    box_size = 300
    x1 = w // 2 - box_size // 2
    y1 = h // 2 - box_size // 2
    x2 = x1 + box_size
    y2 = y1 + box_size

    # Draw the ROI box
    cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 255), 2)

    # Extract ROI
    roi = frame[y1:y2, x1:x2]

    # Preprocess ROI
    try:
        img = cv2.resize(roi, (IMG_SIZE, IMG_SIZE))
    except:
        continue  # skip frames with faulty ROI (e.g., camera not initialized)

    img = img.astype("float32") / 255.0
    img = np.expand_dims(img, axis=0)

    # Predict gesture
    pred = model.predict(img, verbose=0)
    class_index = np.argmax(pred[0])
    confidence = np.max(pred[0])
    label = f"{GESTURE_CLASSES[class_index]} ({confidence*100:.1f}%)"

    # Display prediction
    cv2.putText(frame, label, (x1, y1 - 10),
                cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 255), 2)

    # Show the frame
    cv2.imshow("Real-Time Word Sign Recognition", frame)

    # Exit on pressing 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Cleanup
cap.release()
cv2.destroyAllWindows()
