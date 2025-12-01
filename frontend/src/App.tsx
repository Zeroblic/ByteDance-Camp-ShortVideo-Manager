import "./App.css";
import { Routes, Route } from "react-router-dom";

// import RecommendFeed from "./components/RecommendFeed";
// import VideoFeed from "./components/VideoFeed";
// import { MOCK_VIDEOS } from "./mock/videos";
import HomePage from "./pages/Home";
import VideoPage from "./pages/VideoPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Create from "./pages/Create";
import MainLayout from "./layout/MainLayout";
import MyVideos from "./pages/MyVideos";

function App() {
  return (
    <Routes>

      {/* 公开页面（不显示侧边栏） */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 登录后页面（显示侧边栏） */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/video/:id" element={<VideoPage />} />
        <Route path="/create" element={<Create />} />
        <Route path="/my" element={<MyVideos />} />
      </Route>
    </Routes>
  );
}

export default App;
