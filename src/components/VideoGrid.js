import VideoItem from './VideoItem';

export default function VideoGrid({ videos }) {
  return (
    <div className="video-grid">
      {videos.map((video, index) => (
        <VideoItem key={video.id} video={video} index={index} />
      ))}
    </div>
  );
}
