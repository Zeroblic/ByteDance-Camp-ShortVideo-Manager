import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const banners = [
    {
        id: 1,
        image: "https://picsum.photos/id/1018/1200/350",
        title: "推荐视频：定制内容 1"
    },
    {
        id: 2,
        image: "https://picsum.photos/id/1025/1200/350",
        title: "热门内容：定制内容 2"
    },
    {
        id: 3,
        image: "https://picsum.photos/id/1035/1200/350",
        title: "科技专题：定制内容 3"
    }
];

const BannerCarousel: React.FC = () => {
    const [index, setIndex] = useState(0);

    const navigate = useNavigate();

    // 自动轮播，每 3 秒切换
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex(i => (i + 1) % banners.length);
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    const prev = () => {
        setIndex((index - 1 + banners.length) % banners.length);
    };

    const next = () => {
        setIndex((index + 1) % banners.length);
    };

    return (
        <div className="banner-container">
            <div
                className="banner-track"
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {banners.map(b => (
                    <div key={b.id} className="banner-slide" onClick={() => navigate(`/video/${b.id}`)}>
                        <img src={b.image} alt={b.title} />
                        <div className="banner-title">{b.title}</div>
                    </div>
                ))}
            </div>

            {/* 左箭头 */}
            <button className="banner-btn left" onClick={prev}>
                ❮
            </button>

            {/* 右箭头 */}
            <button className="banner-btn right" onClick={next}>
                ❯
            </button>

            {/* 底部指示点 */}
            <div className="banner-dots">
                {banners.map((_, i) => (
                    <div
                        key={i}
                        className={`dot ${index === i ? "active" : ""}`}
                        onClick={() => setIndex(i)}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default BannerCarousel;
