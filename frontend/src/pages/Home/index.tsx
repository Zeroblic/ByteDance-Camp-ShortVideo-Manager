import { MOCK_VIDEOS } from "../../mock/videos";

import RecommendFeed from "../../components/RecommendFeed";
import BannerCarousel from "../../components/BannerCarousel";
import HomeRightRecommend from "../../components/HomeRightRecommend";
import HeaderTopBar from "../../components/HeaderTopBar";

import "../../index.css"; // 全局样式

const HomePage = () => {
    return (
        <>
        
        <HeaderTopBar />

        <div className="home-page">
            
            <div className="top-section">
                {/* 左侧轮播 */}

                <div className="banner-area">
                    <BannerCarousel />
                </div>

                {/* 右侧推荐区 */}
                <div className="right-recommend-area">
                    <HomeRightRecommend videos={MOCK_VIDEOS} />
                </div>
            </div>

            {/* 推荐视频流*/}
            <RecommendFeed initialVideos={MOCK_VIDEOS} />
        </div>
        </>
    );
};

export default HomePage;
