//import { useParams } from "react-router-dom";
import VideoFeed from "../../components/VideoFeed";

import { MOCK_VIDEOS } from "../../mock/videos";

const VideoPage = () => {
    //const { id } = useParams();
    //const startId = Number(id);

    return (
        <div className="video-page" style={{ position: "relative" }}>
            {/* 主播放组件 */}
            <VideoFeed
                videos={MOCK_VIDEOS}
            />
        </div>
    );
};

export default VideoPage;
