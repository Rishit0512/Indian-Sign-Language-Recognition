"use client";
import Navbar from "@/components/hi/Navbar";
import { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";

// Prediction Labels (English only)
const wordLabels = [
  "bad",
  "bye",
  "difficult",
  "easy",
  "fear",
  "food",
  "good",
  "Indian",
  "Language",
  "Namaste",
  "No",
  "Practice",
  "Strong",
  "Thank you",
  "Understood",
  "Welcome",
];

export default function WordTest() {
  const videoRef = useRef(null);
  const [model, setModel] = useState(null);
  const [webcamPrediction, setWebcamPrediction] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadPrediction, setUploadPrediction] = useState("");

  // मॉडल और कैमरा लोड करें
  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await tf.loadLayersModel(
        "/models/Signs/Words_model/model.json"
      );
      setModel(loadedModel);
    };

    const setupCamera = async () => {
      if (navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
      }
    };

    loadModel();
    setupCamera();
  }, []);

  // कैमरा से भविष्यवाणी करें
  const predictWebcam = async () => {
    if (!model || !videoRef.current) return;

    const tensor = tf.browser
      .fromPixels(videoRef.current)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .div(255.0)
      .expandDims();

    const prediction = model.predict(tensor);
    const predictedIndex = prediction.argMax(1).dataSync()[0];
    setWebcamPrediction(`कैमरा से भविष्यवाणी: ${wordLabels[predictedIndex]}`);
  };

  // इमेज अपलोड हैंडल करें
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      setUploadPrediction("");
    }
  };

  // अपलोड की गई इमेज से भविष्यवाणी करें
  const predictUpload = async () => {
    if (!model || !uploadedImage) return;

    const img = new Image();
    img.src = uploadedImage;
    img.onload = () => {
      const tensor = tf.browser
        .fromPixels(img)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .div(255.0)
        .expandDims();

      const prediction = model.predict(tensor);
      const predictedIndex = prediction.argMax(1).dataSync()[0];
      setUploadPrediction(
        `अपलोड की गई इमेज से भविष्यवाणी: ${wordLabels[predictedIndex]}`
      );
    };
  };

  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6">
        <h1 className="text-center font-bold text-2xl">शब्द भविष्यवाणी</h1>

        <div className="w-full flex justify-center gap-4">
          <a
            className="font-semibold border border-gray-700 rounded px-3 py-1 hover:bg-gray-50"
            href="/test"
          >
            अक्षर
          </a>
          <a
            className="font-semibold border border-gray-700 rounded px-3 py-1 bg-yellow-400 hover:bg-yellow-400/90"
            href="/test/words"
          >
            शब्द
          </a>
        </div>

        {/* कैमरा सेक्शन */}
        <div className="flex flex-col items-center gap-6">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-100 h-auto rounded shadow border-yellow-400 border-2"
          />
          <button
            onClick={predictWebcam}
            className="bg-yellow-400 text-black border-2 border-black font-semibold px-4 py-2 rounded hover:bg-yellow-400/90"
          >
            कैमरा से भविष्यवाणी करें
          </button>
          {webcamPrediction && (
            <p className="text-lg font-medium">{webcamPrediction}</p>
          )}
        </div>

        {/* इमेज अपलोड सेक्शन */}
        <div className="flex flex-col items-center gap-4 border border-dashed border-yellow-400 rounded-2xl p-6 shadow-lg w-full max-w-xl mx-auto bg-white">
          <h2 className="text-2xl font-bold text-yellow-700">
            इमेज अपलोड करें भविष्यवाणी के लिए
          </h2>

          <label
            htmlFor="upload"
            className="cursor-pointer w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-yellow-300 rounded-xl transition hover:border-yellow-500 hover:bg-yellow-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-black mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 15a4 4 0 004 4h10a4 4 0 004-4m-4-4l-4-4m0 0l-4 4m4-4v12"
              />
            </svg>
            <span className="text-black font-medium">
              क्लिक करें या इमेज खींचें अपलोड करने के लिए
            </span>
            <input
              id="upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          {uploadedImage && (
            <>
              <img
                src={uploadedImage}
                alt="अपलोड की गई इमेज"
                className="w-64 h-auto rounded-xl border border-gray-300 shadow"
              />
              <button
                onClick={predictUpload}
                className="mt-4 bg-yellow-600 text-white px-6 py-2 rounded-full hover:bg-yellow-700 transition"
              >
                इमेज से भविष्यवाणी करें
              </button>
            </>
          )}

          {uploadPrediction && (
            <div className="mt-4 text-xl font-semibold text-black">
              {uploadPrediction}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
