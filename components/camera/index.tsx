// components/CameraCapture.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function CameraCapture({ action }: { action: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" }, // use 'user' for selfie
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Camera access denied:", error);
      }
    };

    startCamera();

    return () => {
      // Stop camera on unmount
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const takePicture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/jpeg");
    setImage(imageData);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline width="100%" />
      <button onClick={takePicture}>Take Picture</button>

      <canvas ref={canvasRef} style={{ display: "none" }} />

      {image && (
        <div>
          <h3>Captured Image</h3>
          <div style={{ position: "relative", width: 350, height: 350 }}>
            <Image src={image} alt="Captured" fill />
          </div>
          <button onClick={action}>Continue</button>
        </div>
      )}
    </div>
  );
}
