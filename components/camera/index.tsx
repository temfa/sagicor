// components/CameraCapture.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "../button";

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
      <Button buttonText="Take Picture" loading={false} active onClick={takePicture} />

      <canvas ref={canvasRef} style={{ display: "none" }} />

      {image && (
        <div>
          <h3 style={{ marginTop: 21 }}>Captured Image</h3>
          <div style={{ position: "relative", width: "100%", height: 350, marginBottom: 16 }}>
            <Image src={image} alt="Captured" fill />
          </div>
          <Button buttonText="Continue" loading={false} active onClick={action} />
        </div>
      )}
    </div>
  );
}
