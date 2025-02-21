/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftCircle, ChevronRightCircle, ZoomIn, ZoomOut, X } from 'lucide-react';

interface ImageSliderProps {
  images: string[];
  autoPlay?: boolean;
}

interface ImageModalProps {
  image: string;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  image,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrevious
}) => {
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onPrevious, onNext, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className="relative w-full h-full flex items-center justify-center p-4"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <motion.button
          className="absolute top-4 right-4 p-2 bg-gray-800/50 rounded-full text-white/80 hover:text-white z-50"
          whileHover={{ scale: 1.1 }}
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </motion.button>

        {/* Image counter */}
        <div className="absolute top-4 left-4 px-4 py-2 bg-gray-800/50 rounded-full text-white/80">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Zoom controls */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
          <motion.button
            className="p-2 bg-gray-800/50 rounded-full text-white/80 hover:text-white"
            whileHover={{ scale: 1.1 }}
            onClick={() => setScale(s => Math.max(1, s - 0.5))}
          >
            <ZoomOut className="w-6 h-6" />
          </motion.button>
          <motion.button
            className="p-2 bg-gray-800/50 rounded-full text-white/80 hover:text-white"
            whileHover={{ scale: 1.1 }}
            onClick={() => setScale(s => Math.min(3, s + 0.5))}
          >
            <ZoomIn className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Main image */}
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          <motion.img
            src={image}
            alt="Enlarged view"
            className="max-w-full max-h-full object-contain"
            animate={{ scale }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            dragElastic={0.1}
          />
        </motion.div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <motion.button
              className="absolute left-4 p-3 bg-gray-800/50 rounded-full text-white/80 hover:text-white"
              whileHover={{ scale: 1.1, x: -2 }}
              onClick={onPrevious}
            >
              <ChevronLeftCircle className="w-8 h-8" />
            </motion.button>
            <motion.button
              className="absolute right-4 p-3 bg-gray-800/50 rounded-full text-white/80 hover:text-white"
              whileHover={{ scale: 1.1, x: 2 }}
              onClick={onNext}
            >
              <ChevronRightCircle className="w-8 h-8" />
            </motion.button>
          </>
        )}

        {/* Thumbnails */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-gray-800/50 rounded-full">
          {images.map((thumb, idx) => (
            <motion.button
              key={idx}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
              whileHover={{ scale: 1.2 }}
              onClick={() => {
                const img = new Image();
                img.src = images[idx];
                setScale(1);
                // Update current index through parent
                onNext();
                onPrevious();
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const ImageSlider: React.FC<ImageSliderProps> = ({ images, autoPlay = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative group" ref={containerRef}>
      {/* Main Image Container */}
      <div 
        className="relative h-64 overflow-hidden rounded-xl cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Enhanced hover overlay with clear call-to-action */}
        <motion.div
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300 flex items-center justify-center gap-4"
        >
          <motion.button
            className="px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm text-white
                      flex items-center gap-2 border border-white/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ZoomIn className="w-5 h-5" />
            <span className="text-sm">View Full Image</span>
          </motion.button>
        </motion.div>

        {/* Image counter */}
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/50 rounded-full 
                      text-white/90 text-xs backdrop-blur-sm">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Navigation Arrows - Only show if there are multiple images */}
        {images.length > 1 && (
          <>
            <motion.button
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full 
                        bg-black/50 text-white/90 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.1, x: -2 }}
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
            >
              <ChevronLeftCircle className="w-6 h-6" />
            </motion.button>
            <motion.button
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full 
                        bg-black/50 text-white/90 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.1, x: 2 }}
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              <ChevronRightCircle className="w-6 h-6" />
            </motion.button>
          </>
        )}
      </div>

      {/* Enhanced Modal View */}
      <AnimatePresence>
        {showModal && (
          <ImageModal
            image={images[currentIndex]}
            images={images}
            currentIndex={currentIndex}
            onClose={() => setShowModal(false)}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
