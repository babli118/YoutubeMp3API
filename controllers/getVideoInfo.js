import getVideo from "../libs/getVideo.js";
import { Client } from "youtubei";

const getVideoInfo = async (req, res) => {
  const youtube = new Client();

  const youtubeUrl = req.body.url;

  let videoId;

  // Regular expression to extract the video ID
  const regex =
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|watch\?.+&v=))([^"&?\/\s]{11})/;
  const match = youtubeUrl.match(regex);

  // Check if a match is found
  if (match && match[1]) {
    videoId = match[1];
    console.log("Video ID:", videoId);
  } else {
    console.log("Video ID not found in the URL.");
  }
  try {
    const videoInfo = await getVideo(videoId);

    res.status(201).json(videoInfo);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export { getVideoInfo };
