"use client";
import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="loader-container">
      <div className="loader-text">
        <ScaleLoader color="#2B388F" width={4} />
      </div>
    </div>
  );
};

export default Loading;
