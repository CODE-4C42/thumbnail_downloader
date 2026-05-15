import { useState } from "react";
import copy from "copy-to-clipboard";

const Index = () => {
  const [videoURL, setVideoURL] = useState("");
  const [thumbnailOptions, setThumbnailOptions] = useState([]);

  const getYouTubeThumbnail = (url) => {
    let regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    let match = url.match(regExp);

    if (match && match[1].length === 11) {
      const videoURL = match[1];
      const thumbnailBaseUrl = "http://img.youtube.com/vi/";

      const options = [
        { resolution: "HD (1280x720)", code: "maxresdefault" },
        { resolution: "SD (640x480)", code: "sddefault" },
        { resolution: "Normal (480x360)", code: "hqdefault" },
        { resolution: "Medium (320x180)", code: "mqdefault" },
        { resolution: "Low (120x90)", code: "default" },
      ];

      const thumbnailOptions = options.map((option) => ({
        resolution: option.resolution,
        url: `${thumbnailBaseUrl}${videoURL}/${option.code}.jpg`,
      }));

      setThumbnailOptions(thumbnailOptions);
      setVideoURL("");
    } else {
      setThumbnailOptions([]);
    }
  };

  const downloadImage = async (url, resolution) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `youtube-thumbnail-${resolution.replace(/\s+/g, "-").toLowerCase()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      // Fallback if fetch fails (CORS)
      window.open(url, "_blank");
    }
  };

  return (
    <div className="main-container">
      <div className="glass-panel">
        <header>
          <h1 className="title">
            YouTube <span>Thumbnail</span> Downloader
          </h1>
          <p className="subtitle">
            Extract high-quality preview images from any YouTube video in seconds.
          </p>
        </header>

        <div className="input-group">
          <input
            type="text"
            placeholder="Paste YouTube URL here..."
            value={videoURL}
            onChange={(e) => setVideoURL(e.target.value)}
          />
          <button
            className="btn-primary"
            onClick={() => getYouTubeThumbnail(videoURL)}
          >
            Get Thumbnails
          </button>
        </div>

        {thumbnailOptions.length > 0 && (
          <div className="results-section">
            <h2 className="section-title">Available Resolutions</h2>
            <div className="thumbnail-grid">
              {thumbnailOptions.map((option, index) => (
                <div key={index} className="thumbnail-card">
                  <img src={option.url} alt={`Thumbnail ${index + 1}`} />
                  <div className="card-footer">
                    <span className="resolution-tag">{option.resolution}</span>
                    <div className="button-group">
                      <button
                        className="btn-outline btn-small"
                        onClick={() => copy(option.url)}
                      >
                        Copy URL
                      </button>
                      <button
                        className="btn-primary btn-small"
                        onClick={() => downloadImage(option.url, option.resolution)}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} Youtube Thumbnail Downloader • Simple &
          Fast
        </p>
      </footer>
    </div>
  );
};

export default Index;
