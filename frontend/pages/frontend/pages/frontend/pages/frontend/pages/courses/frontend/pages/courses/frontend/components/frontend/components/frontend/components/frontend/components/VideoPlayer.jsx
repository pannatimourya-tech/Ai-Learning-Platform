export default function VideoPlayer({ videoUrl, title }) {
  if (!videoUrl) return <p className="text-gray-500 dark:text-gray-400">No video available.</p>;

  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl shadow-md">
      {title && <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</h4>}
      <video
        src={videoUrl}
        controls
        className="w-full rounded-lg max-h-[500px] shadow-md"
      />
    </div>
  );
}
