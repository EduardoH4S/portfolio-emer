import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VideoItem({ video, isInView }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const thumbnailUrl = `https://drive.google.com/thumbnail?id=${video.id}&sz=w1000`;
  
  // Detectar quando está rodando no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Controlar reprodução automática quando o item está em visualização
  useEffect(() => {
    if (!isClient) return;
    if (isInView && !isPlaying) {
      setIsAutoPlaying(true);
    } else {
      setIsAutoPlaying(false);
    }
  }, [isInView, isPlaying, isClient]);
  
  // URL para player incorporado com reprodução automática e silencioso
  const getAutoplayEmbedUrl = () => {
    return `https://drive.google.com/file/d/${video.id}/preview?autoplay=1&mute=1`;
  };
  
  // URL para player incorporado normal (com som)
  const getRegularEmbedUrl = () => {
    return `https://drive.google.com/file/d/${video.id}/preview`;
  };
  
  return (
    <>
      <motion.div
        className={`video-wrapper ${isAutoPlaying ? 'playing' : ''}`}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        onClick={() => setIsPlaying(true)}
      >
        {/* Thumbnail sempre visível quando não estiver em visualização */}
        {!isAutoPlaying && (
          <img
            src={thumbnailUrl}
            alt={video.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        )}
        {/* Player incorporado com autoplay quando estiver em visualização */}
        {isClient && isAutoPlaying && !isPlaying && (
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <iframe
              src={getAutoplayEmbedUrl()}
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                border: 'none'
              }}
              allowFullScreen
              allow="autoplay"
            />
            {/* Camada transparente para capturar cliques */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 2,
                cursor: 'pointer'
              }}
              onClick={() => setIsPlaying(true)}
            />
          </div>
        )}
      </motion.div>
      <div className="video-info">
        <span className="video-title">{video.title}</span>
        <span className="video-year">{video.year}</span>
      </div>
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            className="video-player-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsPlaying(false);
            }}
          >
            <button
              className="close-button"
              onClick={() => setIsPlaying(false)}
            >
              ×
            </button>
            <div className="video-player" onClick={(e) => e.stopPropagation()}>
              <iframe
                src={getRegularEmbedUrl()}
                width="100%"
                height="100%"
                allowFullScreen
                frameBorder="0"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
