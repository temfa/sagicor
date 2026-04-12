"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "../button";

type CameraType = "user" | "environment";

export default function CameraCapture({ action, cameraType }: { action: () => void; cameraType: CameraType }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: cameraType },
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
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [cameraType]); // 👈 only change

  const takePicture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/jpeg", 0.9);
    setImage(imageData);
  };

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        width="100%"
        height="200px"
        onLoadedMetadata={() => setIsCameraReady(true)}
        style={{
          opacity: isCameraReady ? 1 : 0,
          transition: "opacity 0.2s ease",
          objectFit: "cover",
        }}
      />

      <Button buttonText="Take Picture" loading={false} active onClick={takePicture} />

      <canvas ref={canvasRef} style={{ display: "none" }} />

      {image && (
        <div>
          <h3 style={{ marginTop: 21 }}>Captured Image</h3>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 250,
              marginBottom: 16,
            }}>
            <Image src={image} alt="Captured" fill />
          </div>

          <Button buttonText="Continue" loading={false} active onClick={action} />
        </div>
      )}
    </div>
  );
}
