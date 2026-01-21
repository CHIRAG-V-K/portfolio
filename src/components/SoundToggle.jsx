import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

const SoundToggle = () => {
  const [isSoundOn, setIsSoundOn] = useState(false); // Default OFF
  const audioRef = useRef(null);

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      // Using royalty-free background music from a CDN
      audio.src =
        "https://assets.mixkit.co/active_storage/sfx/2715/2715-preview.mp3";
      audio.loop = true;
      audio.volume = 0.6; // Set volume to 60%
      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;

    if (!isSoundOn) {
      // Turn sound ON
      audioRef.current.play().catch((err) => {
        console.log("Audio autoplay prevented by browser:", err);
        // Browser blocked autoplay - user must interact first
      });
      setIsSoundOn(true);
    } else {
      // Turn sound OFF
      audioRef.current.pause();
      setIsSoundOn(false);
    }
  };

  return (
    <button
      onClick={toggleSound}
      className={`fixed top-8 right-8 z-50 w-12 h-12 rounded-full shadow-card flex items-center justify-center transition-all duration-200 ease-in-out ${
        isSoundOn
          ? "bg-primary text-white hover:shadow-lg"
          : "bg-gray-400 text-white hover:shadow-lg"
      }`}
      title={isSoundOn ? "Sound On" : "Sound Off"}
    >
      {isSoundOn ? <Volume2 size={24} /> : <VolumeX size={24} />}
    </button>
  );
};

export default SoundToggle;
