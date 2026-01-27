"use client";
import React from "react";
import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="loader-container">
      <div className="loader-overlay">
        <div className="loader-text">
          <ScaleLoader color="#000000" width={4} />
        </div>
      </div>
    </div>
  );
};

export default Loading;
