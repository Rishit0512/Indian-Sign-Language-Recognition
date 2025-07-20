"use client";

import Navbar from "@/components/Navbar";
import SignPrediction from "@/components/SignPrediction";
import * as tf from "@tensorflow/tfjs"; // 👈 Add this
import { useEffect, useState } from "react";

export default function AlphabetTest() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadPrediction, setUploadPrediction] = useState("");
  const [model, setModel] = useState<tf.LayersModel | null>(null); // 👈 Add this

  // ✅ Load the model for upload use
  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await tf.loadLayersModel(
        "/models/Alphabets/Alphabet_model/model.json"
      );
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      setUploadPrediction("");
    }
  };

  const predictUpload = async (imageSrc) => {
    if (!model) {
      console.error("Model not loaded");
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = async () => {
      const tensor = tf.browser
        .fromPixels(img)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .div(255.0)
        .expandDims();
      const prediction = model.predict(tensor);
      const predictedIndex = prediction.argMax(1).dataSync()[0];
      setUploadPrediction(
        `Uploaded Image Prediction: ${String.fromCharCode(65 + predictedIndex)}`
      );
    };
  };

  return (
    <>
      <Navbar />
      <div className="p-6 space-y-8">
        <h1 className="text-center font-bold text-2xl">Alphabets Prediction</h1>
        <div className="flex justify-center gap-6 mb-4">
          <a
            className="font-semibold border border-gray-700 rounded py-1 px-2 bg-yellow-400 hover:bg-yellow-400/90"
            href="/test"
          >
            Alphabets
          </a>
          <a
            className="font-semibold border border-gray-700 rounded py-1 px-2 hover:bg-gray-50"
            href="/test/word"
          >
            Words
          </a>
        </div>

        <SignPrediction />

        <div className="mt-12 flex flex-col items-center gap-4 border border-dashed border-yellow-400 rounded-2xl p-6 shadow-lg w-full max-w-xl mx-auto bg-white">
          <h2 className="text-2xl font-bold text-yellow-700">
            Upload Image for Prediction
          </h2>

          <label
            htmlFor="upload"
            className="cursor-pointer flex flex-col items-center justify-center p-6 border-2 border-dashed border-yellow-300 rounded-xl hover:border-yellow-500 hover:bg-yellow-50 w-full"
          >
            <span className="text-black font-medium">
              Click or drag image to upload
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
                alt="Uploaded Preview"
                className="w-64 h-auto rounded-xl border border-gray-300 shadow"
              />
              <button
                onClick={() => predictUpload(uploadedImage)}
                className="mt-4 bg-yellow-600 text-white px-6 py-2 rounded-full hover:bg-yellow-700"
              >
                Predict Uploaded Image
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
