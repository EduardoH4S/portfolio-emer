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
  const [scrollProps, setScrollProps] = useState({
    opacity: 0,
    y: 50,
    scale: 0.95
  });
  // Hook para animar com base na visibilidade
  const [ref, inView] = useInView({
    threshold: 0.6, // Elemento está 60% visível
    triggerOnce: false
  });
  // Animar quando estiver em visualização
  useEffect(() => {
    if (inView) {
      setScrollProps({
        opacity: 1,
        y: 0,
        scale: 1
      });
    } else {
      setScrollProps({
        opacity: 0,
        y: 50,
        scale: 0.95
      });
    }
  }, [inView]);
  // Usar um segundo hook para controlar a reprodução do vídeo
  const [playRef, isPlaying] = useInView({
    threshold: 0.7, // Precisa estar mais visível para reproduzir
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
      className="video-item"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{
        opacity: scrollProps.opacity,
        y: scrollProps.y,
        scale: scrollProps.scale,
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
