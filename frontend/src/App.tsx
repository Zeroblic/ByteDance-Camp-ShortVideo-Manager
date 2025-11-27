import "./App.css";
import { Routes, Route } from "react-router-dom";

import RecommendFeed from "./components/RecommendFeed/index";
import VideoFeed from "./components/VideoFeed/index";
import { MOCK_VIDEOS } from "./mock/videos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RecommendFeed initialVideos={MOCK_VIDEOS} />} />
      <Route path="/video/:id" element={<VideoFeed videos={MOCK_VIDEOS} />} />
    </Routes>
  );
}

export default App;
