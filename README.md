GestureGo: Indian Sign Language Recognition

GestureGo is a web application that enables real-time recognition of Indian Sign Language (ISL) alphabets and words using deep learning and computer vision. It empowers non-verbal individuals to communicate effortlessly by translating hand gestures into text and speech.

## Features

- ✋ **Real-Time Gesture Recognition:** Uses webcam and AI to recognize ISL alphabets and words.
- 📷 **Image Upload Prediction:** Predicts ISL signs from uploaded images.
- 🤖 **Deep Learning Models:** Built with TensorFlow/Keras and MobileNetV2, converted to TensorFlow.js for browser inference.
- 🖐️ **Hand Detection:** Utilizes MediaPipe for accurate hand landmark detection.
- 🌐 **Multilingual Support:** Includes Hindi and English interfaces.
- 📚 **Learning Resources:** Provides sign language learning materials and book recommendations.

### Model Training

- Model training scripts and notebooks are in [`modelTrainning/`](modelTrainning/Untitled2.ipynb).
- Pre-trained models are stored in `public/models/`.

## Usage

- **Live Prediction:** Use your webcam to perform ISL gestures and see real-time predictions.
- **Image Upload:** Upload an image of a hand sign to get its predicted meaning.
- **Test Data:** Sample images are available in [`TestData/`](TestData/Alphabet/) for testing.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TensorFlow.js](https://www.tensorflow.org/js)
- [MediaPipe Hands](https://google.github.io/mediapipe/solutions/hands.html)
- [Keras / TensorFlow (Python)](https://www.tensorflow.org/)

## Acknowledgements

- Indian Sign Language datasets and resources.
- [MediaPipe](https://mediapipe.dev/) for hand tracking.
- [Teachable Machine](https://teachablemachine.withgoogle.com/) for model prototyping.

