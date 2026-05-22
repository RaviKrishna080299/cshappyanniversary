/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // WORKING SAMPLE ASSETS
  const TARGET_MIND_FILE = 'targets (1).mind';
  const OVERLAY_VIDEO_URL = 'video.mp4';

  const startAR = () => {
    // Force play/pause to unlock audio context on mobile
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().then(() => {
        videoRef.current?.pause();
        console.log("Video primed successfully");
      }).catch(err => console.log("Priming error:", err));
    }
    setIsStarted(true);
  };

  useEffect(() => {
    if (isStarted) {
      const v = videoRef.current;
      if (v) {
        const handleCanPlay = () => {
          console.log("Video can play through");
          setIsVideoReady(true);
        };
        v.addEventListener('canplaythrough', handleCanPlay);
        if (v.readyState >= 3) setIsVideoReady(true);

        const initTracking = () => {
          const targetEl = document.querySelector('#target');
          if (targetEl) {
            targetEl.addEventListener('targetFound', () => {
              console.log("Target Found");
              setIsTracking(true);
              if (videoRef.current) {
                videoRef.current.play().catch(e => console.error("Play error:", e));
              }
            });
            targetEl.addEventListener('targetLost', () => {
              console.log("Target Lost");
              setIsTracking(false);
              videoRef.current?.pause();
            });
            return true;
          }
          return false;
        };

        const timer = setInterval(() => {
          if (initTracking()) clearInterval(timer);
        }, 300);
        
        return () => {
          clearInterval(timer);
          v.removeEventListener('canplaythrough', handleCanPlay);
        };
      }
    }
  }, [isStarted]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-sans select-none">
      {!isStarted && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950 text-white p-8 text-center">
          <div className="mb-8 p-8 bg-zinc-900 rounded-3xl border border-zinc-800 shadow-2xl backdrop-blur-xl">
            <h1 className="text-4xl font-black mb-2 italic tracking-tighter uppercase">Lens<span className="text-cyan-500">AR</span></h1>
            <p className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase mb-10">WebAR Image Engine</p>
            
            <button
              onClick={startAR}
              className="w-full py-5 px-10 bg-white text-black hover:bg-cyan-50 rounded-2xl font-black transition-all active:scale-95 shadow-xl uppercase tracking-widest text-sm"
            >
              Start Experience
            </button>

            {typeof window !== 'undefined' && window.location.protocol !== 'https:' && window.location.hostname !== 'localhost' && (
              <div className="mt-10 p-6 bg-red-600/20 border-2 border-red-500 rounded-2xl text-red-400 text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-red-900/40 animate-pulse flex flex-col items-center gap-3">
                <span className="text-2xl">⚠️</span>
                <span>HTTPS Required</span>
                <p className="text-[8px] opacity-70 normal-case font-medium tracking-normal text-center">AR Camera access requires a secure connection.<br/>Please use the HTTPS URL provided in the sidebar.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {isStarted && (
        <div className="fixed inset-0 z-10 w-full h-full">
          {/* Status info */}
          <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
            <div className="flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
              <div className={`w-2 h-2 rounded-full ${isTracking ? 'bg-cyan-400 animate-pulse' : 'bg-zinc-600'}`} />
              <span className="text-white text-[9px] font-bold uppercase tracking-widest">
                {isTracking ? 'Tracking Active' : 'Scanning Target...'}
              </span>
            </div>
            
            {!isVideoReady && (
              <div className="flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 w-fit shadow-lg">
                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                <span className="text-white text-[9px] font-bold uppercase tracking-widest">
                  Loading Assets...
                </span>
              </div>
            )}
          </div>

          {/* @ts-ignore-next-line */}
          <a-scene 
            mindar-image={`imageTargetSrc: ${TARGET_MIND_FILE}; autoStart: true; uiLoading: no; uiError: no; uiScanning: no;`} 
            color-space="sRGB" 
            renderer="colorManagement: true, physicallyCorrectLights" 
            vr-mode-ui="enabled: false" 
            device-orientation-permission-ui="enabled: false"
            embedded
            className="w-full h-full"
          >
            <a-assets timeout="10000">
              <video 
                id="paint-video" 
                ref={videoRef}
                src={OVERLAY_VIDEO_URL}
                preload="auto" 
                loop={true} 
                crossOrigin="anonymous" 
                webkit-playsinline="true"
                playsInline
              ></video>
            </a-assets>

            <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

            {/* @ts-ignore-next-line */}
            <a-entity mindar-image-target="targetIndex: 0" id="target">
              <a-video 
                src="#paint-video" 
                width="1" 
                height="0.6" 
                position="0 0 0.01" 
                rotation="0 0 0"
                material="shader: flat"
              ></a-video>
            </a-entity>
          </a-scene>
        </div>
      )}

      {/* Priming video for mobile browser context */}
      {!isStarted && <video ref={videoRef} src={OVERLAY_VIDEO_URL} className="hidden" muted playsInline />}
    </div>
  );
}
