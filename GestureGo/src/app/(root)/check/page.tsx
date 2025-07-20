"use client";

import React, { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

const CLASS_LABELS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function SignRecognizer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [model, setModel] = useState<tf.LayersModel | null>(null);

  // Load TF model
  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await tf.loadLayersModel(
        "/models/Alphabets/Alphabet_model/model.json"
      );
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  useEffect(() => {
    let camera: any;

    const setup = async () => {
      const handsModule = await import("@mediapipe/hands");
      const cameraUtils = await import("@mediapipe/camera_utils");

      const hands = new handsModule.Hands({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.7,
      });

      hands.onResults(async (results: any) => {
        if (
          results.multiHandLandmarks &&
          results.multiHandLandmarks.length > 0 &&
          videoRef.current &&
          canvasRef.current &&
          model
        ) {
          const video = videoRef.current;
          const width = video.videoWidth;
          const height = video.videoHeight;
          const ctx = canvasRef.current.getContext("2d");
          if (!ctx) return;

          const allX: number[] = [];
          const allY: number[] = [];

          results.multiHandLandmarks.forEach((landmarks: any) => {
            landmarks.forEach((lm: any) => {
              allX.push(lm.x);
              allY.push(lm.y);
            });
          });

          const minX = Math.min(...allX) * width;
          const maxX = Math.max(...allX) * width;
          const minY = Math.min(...allY) * height;
          const maxY = Math.max(...allY) * height;

          const margin = 20;
          const x = Math.max(minX - margin, 0);
          const y = Math.max(minY - margin, 0);
          const w = Math.min(maxX - minX + 2 * margin, width - x);
          const h = Math.min(maxY - minY + 2 * margin, height - y);

          canvasRef.current.width = w;
          canvasRef.current.height = h;
          ctx.drawImage(video, x, y, w, h, 0, 0, w, h);

          const dataUrl = canvasRef.current.toDataURL();
          setCroppedImage(dataUrl);

          const inputTensor = await preprocessImage(dataUrl);
          const predictionTensor = model.predict(inputTensor) as tf.Tensor;
          const predictionData = await predictionTensor.data();
          const predictedIndex = predictionData.indexOf(
            Math.max(...predictionData)
          );
          setPrediction(CLASS_LABELS[predictedIndex]);
        }
      });

      camera = new cameraUtils.Camera(videoRef.current!, {
        onFrame: async () => {
          await hands.send({ image: videoRef.current! });
        },
        width: 640,
        height: 480,
      });

      camera.start();
    };

    setup();

    return () => {
      if (camera) camera.stop();
    };
  }, [model]);

  const preprocessImage = async (dataUrl: string): Promise<tf.Tensor4D> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = 224;
        tempCanvas.height = 224;
        const ctx = tempCanvas.getContext("2d");
        if (!ctx) return reject("No context");

        ctx.drawImage(img, 0, 0, 224, 224);
        const imageData = ctx.getImageData(0, 0, 224, 224);

        const tensor = tf.browser
          .fromPixels(imageData)
          .toFloat()
          .div(255)
          .expandDims(0);
        resolve(tensor);
      };
      img.onerror = reject;
      img.src = dataUrl;
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sign Recognition (A–Z)</h1>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="rounded border shadow"
        width={640}
        height={480}
      />
      <canvas ref={canvasRef} className="hidden" />

      {croppedImage && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Cropped Hand:</h2>
          <img
            src={croppedImage}
            alt="Hand Crop"
            className="border rounded w-56"
          />
        </div>
      )}

      {prediction && (
        <div className="mt-4 text-xl font-bold text-blue-600">
          Predicted Sign: <span>{prediction}</span>
        </div>
      )}
    </div>
  );
}
