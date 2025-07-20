import cv2
import os
import mediapipe as mp
import numpy as np
import random

# Setup
GESTURE_CLASSES = list("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
SAVE_DIR = "hand_dataset"
AUG_PER_CAPTURE = 15
IMG_SIZE = 224

# MediaPipe Hands (multi-hand)
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=False, max_num_hands=2, min_detection_confidence=0.7)

# Create folders
for gesture in GESTURE_CLASSES:
    os.makedirs(os.path.join(SAVE_DIR, gesture), exist_ok=True)

# Augmentation
def augment_image(image):
    augmented = []
    for _ in range(AUG_PER_CAPTURE):
        img = image.copy()

        # Flip
        if random.choice([True, False]):
            img = cv2.flip(img, 1)

        # Brightness & contrast
        alpha = 1.0 + (0.4 * (random.random() - 0.5))
        beta = random.randint(-40, 40)
        img = cv2.convertScaleAbs(img, alpha=alpha, beta=beta)

        # Rotation
        angle = random.uniform(-20, 20)
        M = cv2.getRotationMatrix2D((IMG_SIZE // 2, IMG_SIZE // 2), angle, 1.0)
        img = cv2.warpAffine(img, M, (IMG_SIZE, IMG_SIZE), borderMode=cv2.BORDER_REFLECT)

        # Noise
        if random.choice([True, False]):
            noise = np.random.randint(0, 25, (IMG_SIZE, IMG_SIZE, 3), dtype='uint8')
            img = cv2.add(img, noise)

        augmented.append(img)
    return augmented

# Webcam
cap = cv2.VideoCapture(0)
current_index = 0

print("Controls:")
print("• 's' to save 15 images for current letter")
print("• 'n' next letter, 'p' previous letter, 'q' to quit")

while True:
    ret, frame = cap.read()
    if not ret:
        break

    frame = cv2.flip(frame, 1)
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(rgb)

    label = GESTURE_CLASSES[current_index]
    height, width, _ = frame.shape
    hand_img = None

    # Detect multiple hands and calculate one bounding box for all
    if results.multi_hand_landmarks:
        x_vals = []
        y_vals = []
        for hand_landmarks in results.multi_hand_landmarks:
            x_vals.extend([lm.x for lm in hand_landmarks.landmark])
            y_vals.extend([lm.y for lm in hand_landmarks.landmark])

        x_min = int(min(x_vals) * width) - 20
        y_min = int(min(y_vals) * height) - 20
        x_max = int(max(x_vals) * width) + 20
        y_max = int(max(y_vals) * height) + 20

        x_min = max(x_min, 0)
        y_min = max(y_min, 0)
        x_max = min(x_max, width)
        y_max = min(y_max, height)

        hand_img = frame[y_min:y_max, x_min:x_max]
        hand_img = cv2.resize(hand_img, (IMG_SIZE, IMG_SIZE))

        # Draw bounding box around both hands
        cv2.rectangle(frame, (x_min, y_min), (x_max, y_max), (0, 255, 0), 2)

    # Show current letter
    cv2.putText(frame, f"Letter: {label}", (10, 40),
                cv2.FONT_HERSHEY_SIMPLEX, 1.2, (0, 255, 255), 3)

    cv2.imshow("Webcam", frame)
    if hand_img is not None:
        cv2.imshow("Hand Crop", hand_img)

    key = cv2.waitKey(1)

    if key == ord('s') and hand_img is not None:
        print(f"📸 Saving 15 images for '{label}'...")
        aug_imgs = augment_image(hand_img)
        path = os.path.join(SAVE_DIR, label)
        base = len(os.listdir(path)) // 2
        for i, img in enumerate(aug_imgs):
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            cv2.imwrite(os.path.join(path, f"{base+i}_rgb.jpg"), img)
            cv2.imwrite(os.path.join(path, f"{base+i}_gray.jpg"), gray)
        print(f"✅ Saved to {label} ({base + AUG_PER_CAPTURE} total)")

    elif key == ord('n'):
        current_index = (current_index + 1) % len(GESTURE_CLASSES)
        print(f"➡️ Now on: {GESTURE_CLASSES[current_index]}")

    elif key == ord('p'):
        current_index = (current_index - 1 + len(GESTURE_CLASSES)) % len(GESTURE_CLASSES)
        print(f"⬅️ Back to: {GESTURE_CLASSES[current_index]}")

    elif key == ord('q'):
        print("❌ Quitting...")
        break

cap.release()
cv2.destroyAllWindows()
