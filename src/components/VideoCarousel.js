import { useRef, useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import VideoItem from './VideoItem';

export default function VideoCarousel({ videos }) {
  const carouselRef = useRef(null);
  const controls = useAnimationControls();
  
  // Hook para efeito inicial
  useEffect(() => {
    controls.start({ opacity: 1, transition: { delay: 1 } });
  }, [controls]);
  
  return (
    <>
      <div className="video-carousel" ref={carouselRef}>
        {videos.map((video, index) => (
          <ScrollItem
            key={video.id}
            index={index}
            video={video}
          />
        ))}
      </div>
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={controls}
      >
        <div>Scroll</div>
        <div className="scroll-arrow"></div>
      </motion.div>
    </>
  );
}

// Componente para cada item do carrossel com client-side animation
function ScrollItem({ video, index }) {
  // Hook para animar com base na visibilidade - aumentado o threshold para melhor visibilidade
  const [ref, inView] = useInView({
    threshold: 0.6, // Elemento está 60% visível para melhor experiência
    triggerOnce: false
  });
  
  // Usar um segundo hook para controlar a reprodução do vídeo
  const [playRef, isPlaying] = useInView({
    threshold: 0.7, // Aumentado para melhor controle de reprodução
    triggerOnce: false
  });
  
  // Combinando as referências
  const setRefs = (el) => {
    ref(el);
    playRef(el);
  };
  
  // Cálculo para atraso na entrada com base no índice
  const entryDelay = index * 0.1;
  
  return (
    <motion.div
      ref={setRefs}
      className={`video-item ${inView ? 'in-view' : 'out-view'}`}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ 
        opacity: inView ? 1 : 0.4,
        y: inView ? 0 : 50,
        scale: inView ? 1 : 0.95
      }}
      transition={{
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1],
        delay: entryDelay
      }}
    >
      <VideoItem video={video} isInView={isPlaying} />
    </motion.div>
  );
}
