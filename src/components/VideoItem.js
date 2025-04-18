import { useRef, useEffect } from 'react';

export default function VideoItem({ video, isInView }) {
  const videoRef = useRef(null);
  
  // Função para extrair o ID do YouTube da URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    
    // Para URLs no formato youtu.be/XXXXXXXXXXX
    if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1].split('?')[0];
    }
    
    // Para URLs no formato youtube.com/watch?v=XXXXXXXXXXX
    if (url.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(new URL(url).search);
      return urlParams.get('v');
    }
    
    // Para URLs no formato youtube.com/embed/XXXXXXXXXXX
    if (url.includes('youtube.com/embed/')) {
      return url.split('youtube.com/embed/')[1].split('?')[0];
    }
    
    return null;
  };
  
  const youtubeVideoId = getYouTubeVideoId(video.url);
  
  // Controle de reprodução baseado na visibilidade
  useEffect(() => {
    if (videoRef.current && isInView !== undefined) {
      try {
        if (isInView) {
          videoRef.current.contentWindow?.postMessage(
            JSON.stringify({ event: 'command', func: 'playVideo' }), 
            '*'
          );
          videoRef.current.parentElement.classList.add('playing');
        } else {
          videoRef.current.contentWindow?.postMessage(
            JSON.stringify({ event: 'command', func: 'pauseVideo' }), 
            '*'
          );
          videoRef.current.parentElement.classList.remove('playing');
        }
      } catch (e) {
        console.log('YouTube iframe API error:', e);
      }
    }
  }, [isInView]);

  return (
    <div className="video-container">
      {video.title && <h3 className="video-title">{video.title}</h3>}
      {video.year && <div className="video-year">{video.year}</div>}
      
      {youtubeVideoId ? (
        <div className={`video-wrapper ${isInView ? 'playing' : ''}`}>
          <iframe
            ref={videoRef}
            src={`https://www.youtube.com/embed/${youtubeVideoId}?enablejsapi=1&rel=0&modestbranding=1&autoplay=${isInView ? 1 : 0}&mute=${isInView ? 0 : 1}&controls=0&showinfo=0&loop=1&playlist=${youtubeVideoId}&color=white&iv_load_policy=3&fs=0`}
            title={video.title || "YouTube video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="video-error">URL de vídeo inválida</div>
      )}
    </div>
  );
}
