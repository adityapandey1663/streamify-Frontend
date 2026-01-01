import React from "react";
import { VideoIcon } from "lucide-react";

const CallButton = ({ handleVideoCall }) => {
  return (
    <div className="fixed top-0 right-0 z-50 w-full max-w-7xl mx-auto flex justify-end p-3">
      <button
        onClick={handleVideoCall}
        aria-label="Start video call"
        className="
          group
          flex items-center justify-center
          h-11 w-11 sm:h-12 sm:w-12
          rounded-full
          bg-green-500
          text-white
          shadow-md
          transition-all duration-200
          hover:bg-green-600 hover:scale-105 hover:shadow-lg
          active:scale-95
          focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2
        "
      >
        <VideoIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
    </div>
  );
};

export default CallButton;
