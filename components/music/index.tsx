/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX,
  Music,
  Minimize2,
  Maximize2, 
  Repeat,
  Shuffle
} from 'lucide-react';
import { Slider } from "@/components/ui/slider";

interface Song {
  title: string;
  artist: string;
  url: string;
}

const playlist: Song[] = [
  {
    title: "Hometown Smile",
    artist: "Bahjat",
    url: "/music/1.mp3"
  },
  {
    title: "Oh My God",
    artist: "Alec Benjamin",
    url: "/music/2.mp3"
  },
  {
    title: "Duvet",
    artist: "Boa",
    url: "/music/3.mp3"
  }
];

const MusicPlayerButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    const context = new AudioContext();
    const analyserNode = context.createAnalyser();
    const source = context.createMediaElementSource(audio);
    
    source.connect(analyserNode);
    analyserNode.connect(context.destination);
    
    analyserNode.fftSize = 256; // Increased for better visualization
    
    setAudioContext(context);
    setAnalyser(analyserNode);

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
    
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      context.close();
    };
  }, []);

  const updateProgress = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * duration;
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (audioContext?.state === 'suspended') {
      audioContext.resume();
    }

    if (!isPlaying) {
      audioRef.current.src = playlist[currentSong].url;
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (isShuffled) {
      const nextIndex = Math.floor(Math.random() * playlist.length);
      setCurrentSong(nextIndex);
    } else {
      setCurrentSong((prev) => (prev + 1) % playlist.length);
    }
    if (isPlaying && audioRef.current) {
      const nextIndex = isShuffled 
        ? Math.floor(Math.random() * playlist.length)
        : (currentSong + 1) % playlist.length;
      audioRef.current.src = playlist[nextIndex].url;
      audioRef.current.play();
    }
  };

  const handlePrev = () => {
    if (isShuffled) {
      const prevIndex = Math.floor(Math.random() * playlist.length);
      setCurrentSong(prevIndex);
    } else {
      setCurrentSong((prev) => (prev - 1 + playlist.length) % playlist.length);
    }
    if (isPlaying && audioRef.current) {
      const prevIndex = isShuffled
        ? Math.floor(Math.random() * playlist.length)
        : (currentSong - 1 + playlist.length) % playlist.length;
      audioRef.current.src = playlist[prevIndex].url;
      audioRef.current.play();
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (!audioRef.current) return;
    const newVolume = value[0];
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
    if (isMuted) {
      audioRef.current.volume = volume;
    } else {
      audioRef.current.volume = 0;
    }
  };

  return (
    <motion.div
      className={`fixed z-50 ${
        isFullscreen 
          ? "inset-0 bg-black/90 backdrop-blur-xl" 
          : "top-4 right-4 sm:top-6 sm:right-6"
      }`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`
          relative flex items-center
          ${isExpanded ? 'bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl p-2' : ''}
          ${isFullscreen ? 'h-full flex-col justify-center items-center' : ''}
          ${!isFullscreen && isExpanded ? 'max-w-[95vw] sm:max-w-md' : ''}
        `}
        animate={{ 
          width: isExpanded ? (isFullscreen ? '100%' : 'auto') : '40px',
          height: isFullscreen ? '100%' : 'auto'
        }}
      >
        <motion.button
          className={`
            relative overflow-hidden
            ${isFullscreen ? 'w-32 h-32 sm:w-40 sm:h-40' : 'w-10 h-10 sm:w-12 sm:h-12'}
            rounded-2xl sm:rounded-xl
            bg-gradient-to-r from-violet-600 to-indigo-600
            flex items-center justify-center
            shadow-lg shadow-violet-600/20
            hover:shadow-violet-600/40
            transition-shadow duration-300
            group
            ${isPlaying ? 'animate-pulse' : ''}
          `}
          onClick={() => !isFullscreen && setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Music className={`
            ${isFullscreen ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-5 h-5 sm:w-6 sm:h-6'} 
            text-white relative z-10
          `} />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-violet-600/50 to-indigo-600/50"
            animate={{
              rotate: isPlaying ? 360 : 0,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className={`
                flex items-center gap-2 ml-2
                ${isFullscreen ? 'flex-col mt-8 w-full max-w-2xl' : ''}
                ${!isFullscreen ? 'max-w-[calc(100vw-120px)] sm:max-w-md overflow-x-auto' : ''}
              `}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Control buttons with hover effects */}
              <div className={`
                flex items-center gap-1 sm:gap-2
                ${isFullscreen ? 'flex-col sm:flex-row justify-center w-full' : ''}
              `}>
                {/* Update existing control buttons with new styling */}
                <motion.button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors relative group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  ) : (
                    <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>

                {/* Add similar styling to other control buttons */}
                <motion.button
                  onClick={() => setIsShuffled(!isShuffled)}
                  className={`p-2 hover:bg-white/10 rounded-lg transition-colors relative group ${
                    isShuffled ? 'bg-violet-600' : ''
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Shuffle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>

                <motion.button
                  onClick={handlePrev}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors relative group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <SkipBack className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>

                <motion.button
                  onClick={handlePlayPause}
                  className={`
                    p-2 hover:bg-white/10 rounded-lg transition-colors relative group
                    ${isFullscreen ? 'bg-violet-600 p-8' : ''}
                  `}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isPlaying ? (
                    <Pause className={`${isFullscreen ? 'w-8 h-8' : 'w-4 h-4 sm:w-5 sm:h-5'} text-white`} />
                  ) : (
                    <Play className={`${isFullscreen ? 'w-8 h-8' : 'w-4 h-4 sm:w-5 sm:h-5'} text-white`} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>

                <motion.button
                  onClick={handleNext}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors relative group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <SkipForward className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>

                <motion.button
                  onClick={() => setIsRepeating(!isRepeating)}
                  className={`p-2 hover:bg-white/10 rounded-lg transition-colors relative group ${
                    isRepeating ? 'bg-violet-600' : ''
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Repeat className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </div>

              {isFullscreen && (
                <motion.div 
                  className="mt-8 text-center w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.h2 
                    className="text-2xl sm:text-3xl font-bold text-white mb-2"
                    animate={{
                      background: [
                        'linear-gradient(to right, #8b5cf6, #6366f1)',
                        'linear-gradient(to right, #6366f1, #8b5cf6)',
                      ],
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {playlist[currentSong].title}
                  </motion.h2>
                  <motion.p 
                    className="text-white/80"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {playlist[currentSong].artist}
                  </motion.p>
                </motion.div>
              )}

              <div className={`
                flex items-center gap-2
                ${isFullscreen ? 'flex-col mt-8 w-full max-w-md' : ''}
              `}>
                {!isFullscreen && (
                  <motion.button
                    onClick={handleMute}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1 sm:p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    ) : (
                      <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    )}
                  </motion.button>
                )}
                
                <Slider
                  defaultValue={[1]}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="w-full"
                />
              </div>

              {!isFullscreen && (
                <div className="max-w-[150px] overflow-hidden">
                  <motion.p
                    className="text-sm text-white whitespace-nowrap"
                    initial={{ x: 50 }}
                    animate={{ x: -100 }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  >
                    {playlist[currentSong].title} - {playlist[currentSong].artist}
                  </motion.p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const AudioVisualizer: React.FC<{
  analyser: AnalyserNode | null;
  isPlaying: boolean;
  isFullscreen?: boolean;
}> = ({ analyser, isPlaying, isFullscreen }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!analyser || !isPlaying || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const draw = () => {
      const WIDTH = canvas.width;
      const HEIGHT = canvas.height;

      animationFrameRef.current = requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      if (isFullscreen) {
        // Circular visualizer for fullscreen mode
        const centerX = WIDTH / 2;
        const centerY = HEIGHT / 2;
        const radius = Math.min(WIDTH, HEIGHT) / 3;
        const bars = 180;
        const barWidth = (2 * Math.PI) / bars;

        for (let i = 0; i < bars; i++) {
          const barHeight = (dataArray[i % bufferLength] / 255) * (radius / 2) + 10;
          const angle = i * barWidth;

          const x1 = centerX + Math.cos(angle) * radius;
          const y1 = centerY + Math.sin(angle) * radius;
          const x2 = centerX + Math.cos(angle) * (radius + barHeight);
          const y2 = centerY + Math.sin(angle) * (radius + barHeight);

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.lineWidth = 2;
          
          // Create gradient for each bar
          const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
          gradient.addColorStop(0, '#8b5cf6');
          gradient.addColorStop(1, '#6366f1');
          ctx.strokeStyle = gradient;
          
          ctx.stroke();
        }

        // Add pulsing circle in the center
        ctx.beginPath();
        const pulseRadius = (dataArray.reduce((a, b) => a + b, 0) / bufferLength / 255) * 30;
        ctx.arc(centerX, centerY, pulseRadius, 0, 2 * Math.PI);
        const glowGradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, pulseRadius
        );
        glowGradient.addColorStop(0, 'rgba(139, 92, 246, 0.8)');
        glowGradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
        ctx.fillStyle = glowGradient;
        ctx.fill();

      } else {
        // Enhanced bar visualizer for compact mode
        const barWidth = (WIDTH / bufferLength) * 2.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * HEIGHT;
          
          // Create gradient
          const gradient = ctx.createLinearGradient(0, HEIGHT, 0, HEIGHT - barHeight);
          gradient.addColorStop(0, '#8b5cf6');
          gradient.addColorStop(1, '#6366f1');
          
          ctx.fillStyle = gradient;
          
          // Draw main bar
          ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
          
          // Add glow effect
          ctx.shadowColor = '#8b5cf6';
          ctx.shadowBlur = 15;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          
          // Reset shadow for next iteration
          ctx.shadowBlur = 0;
          
          x += barWidth + 1;
        }
      }
    };

    draw();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [analyser, isPlaying, isFullscreen]);

  return (
    <canvas
      ref={canvasRef}
      width={isFullscreen ? 1200 : 200}
      height={isFullscreen ? 1200 : 40}
      className={`absolute ${
        isFullscreen 
          ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-40'
          : 'bottom-0 left-1/2 transform -translate-x-1/2'
      }`}
    />
  );
};

export default MusicPlayerButton;