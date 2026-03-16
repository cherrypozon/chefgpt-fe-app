'use client'

import { useEffect, useState } from "react";

const PageLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing systems...");

  // Status messages at specific progress points
  const getStatusForProgress = (p: number) => {
    if (p >= 90) return "Ready good to go..";
    if (p >= 70) return "Optimizing recipes...";
    if (p >= 50) return "Checking compliance logs...";
    if (p >= 30) return "Syncing analytics...";
    return "Initializing systems...";
  };

  useEffect(() => {
    const startTime = Date.now();
    const duration = 6500;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(100, (elapsed / duration) * 100);
      const currentProgress = Math.floor(p);
      
      setProgress(currentProgress);
      setStatus(getStatusForProgress(currentProgress));

      if (p < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        // Call onComplete after loading finishes
        setTimeout(onComplete, 200);
      }
    };

    requestAnimationFrame(updateProgress);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-background text-text relative">
      
      {/* Loader Icon */}
      <div className="w-16 h-16 mb-6 flex items-center justify-center bg-darkPurple rounded-full">
        <div className="w-8 h-8 bg-corePurple rounded-full shadow-[0_0_20px_var(--corePurple)]"></div>
      </div>

      <h1 className="text-3xl font-bold tracking-tight mb-12 text-text">Chef <span className="text-corePurple">GPT</span></h1>

      <div className="w-[300px] max-w-full px-4">

        {/* Progress Bar */}
        <div className="h-1 w-full mb-4 relative overflow-hidden bg-darkgrey">
          <div 
            className="absolute top-0 left-0 h-full bg-corePurple"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Status Text */}
        <div className="flex justify-between text-xs text-darkgrey tracking-widest">
          <span className="text-darkgrey w-full">{status}</span>
          <span className="text-corePurple">{progress}%</span>
        </div>
      </div>
      <img src="/accenture_logo.png" alt="Accenture Logo" className="absolute bottom-10 right-1/2 transform translate-x-1/2" />
    </div>
  );
};

export default PageLoader;