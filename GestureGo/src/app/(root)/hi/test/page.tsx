"use client";
// pages/test/alphabet.js
import Navbar from "@/components/hi/Navbar";
import { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";

export default function AlphabetTest() {
  const videoRef = useRef(null);
  const fileInputRef = useRef();
  const [model, setModel] = useState(null);
  const [webcamPrediction, setWebcamPrediction] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadPrediction, setUploadPrediction] = useState("");

  // Load the model on mount
  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await tf.loadLayersModel(
        "/models/Alphabets/Alphabet_model/model.json"
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

  // Predict from webcam
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
    setWebcamPrediction(
      `लाइव भविष्यवाणी: ${String.fromCharCode(65 + predictedIndex)}`
    );
  };

  // Handle image upload and prediction
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      setUploadPrediction("");
    }
  };

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
        `अपलोड की गई छवि की भविष्यवाणी: ${String.fromCharCode(
          65 + predictedIndex
        )}`
      );
    };
  };

  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6">
        <h1 className="text-center font-bold text-2xl">अक्षर भविष्यवाणी</h1>
        <div className="w-full items-center justify-center flex gap-10">
          <a
            className="font-semibold border border-gray-700 rounded py-1 px-2 bg-yellow-400 hover:bg-yellow-400/90"
            href="/hi/test"
          >
            अक्षर
          </a>
          <a
            className="font-semibold border border-gray-700 rounded py-1 px-2 hover:bg-gray-50"
            href="/hi/test/word"
          >
            शब्द
          </a>
        </div>
        {/* <div className="flex flex-col items-center gap-6">
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
            वेबकैम से पूर्वानुमान लगाएं
          </button>
          {webcamPrediction && <p className="text-lg">{webcamPrediction}</p>}
        </div> */}

        {/* Image Upload Section */}
        {/* Designer Upload Image Section */}
        <div className="flex flex-col items-center gap-4 border border-dashed border-yellow-400 rounded-2xl p-6 shadow-lg w-full max-w-xl mx-auto bg-white">
          <h2 className="text-2xl font-bold text-yellow-700">
            पूर्वानुमान के लिए छवि अपलोड करें
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
              अपलोड करने के लिए छवि पर क्लिक करें या खींचें
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
                alt="अपलोड की गई पूर्वावलोकन छवि"
                className="w-64 h-auto rounded-xl border border-gray-300 shadow"
              />
              <button
                onClick={predictUpload}
                className="mt-4 bg-yellow-600 text-white px-6 py-2 rounded-full hover:bg-yellow-700 transition"
              >
                अपलोड की गई छवि का पूर्वानुमान लगाएं
              </button>
            </>
          )}

          {uploadPrediction && (
            <div className="mt-4 text-xl font-semibold text-black ">
              {uploadPrediction}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
