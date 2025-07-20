"use client";

import Navbar from "@/components/Navbar";
import SignPredictionWords from "@/components/SignPredictionWords";
import * as tf from "@tensorflow/tfjs";
import { useEffect, useState } from "react";

const WORD_LABELS = [
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
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadPrediction, setUploadPrediction] = useState<string>("");
  const [model, setModel] = useState<tf.LayersModel | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await tf.loadLayersModel(
        "/models/Signs/Words_model/model.json"
      );
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      setUploadPrediction("");
    }
  };

  const predictUpload = async (imageSrc: string) => {
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
      const prediction = model.predict(tensor) as tf.Tensor;
      const predictionData = await prediction.data();
      const predictedIndex = predictionData.indexOf(
        Math.max(...predictionData)
      );
      setUploadPrediction(
        `Uploaded Image Prediction: ${WORD_LABELS[predictedIndex]}`
      );
    };
  };

  return (
    <>
      <Navbar />
      <div className="p-6 space-y-8">
        <h1 className="text-center font-bold text-2xl">Words Prediction</h1>
        <div className="flex justify-center gap-6 mb-4">
          <a
            className="font-semibold border border-gray-700 rounded py-1 px-2 hover:bg-gray-50"
            href="/test"
          >
            Alphabets
          </a>
          <a
            className="font-semibold border border-gray-700 rounded py-1 px-2 bg-yellow-400 hover:bg-yellow-400/90"
            href="/test/word"
          >
            Words
          </a>
        </div>
        <SignPredictionWords />

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
