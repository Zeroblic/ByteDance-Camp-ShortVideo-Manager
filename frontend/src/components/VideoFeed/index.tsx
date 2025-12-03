import React, { useRef, useState, useEffect } from 'react';
import './style.css';
import { FaHeart, FaCommentDots, FaShare, FaMusic } from 'react-icons/fa';

// 定义视频数据接口
export interface VideoItem {
    id: number;
    url: string;
    title: string;
    author: string;
    description: string;
    likes: number;
    comments: number;
    muted?: boolean;
    thumbnailUrl: string;
    category: string;
}

interface Props {
    videos: VideoItem[];
}

const VideoFeed: React.FC<Props> = ({ videos }) => {
    // 用于管理当前正在播放哪个视频（可选优化）
    // const [currentIndex, setCurrentIndex] = useState(0);
    const [globalMuted, setGlobalMuted] = useState(true);


    return (
        <div className="video-feed-container">
            {videos.map((video, index) => (
                <VideoCard
                    key={video.id}
                    data={video}
                    muted={globalMuted}
                    onToggleMuted={() => setGlobalMuted(m => !m)}
                />

            ))}
        </div>
    );
};

// 单个视频卡片组件
const VideoCard: React.FC<{ data: VideoItem; muted: boolean; onToggleMuted: () => void }>
    = ({ data, muted, onToggleMuted }) => {
        const videoRef = useRef<HTMLVideoElement | null>(null);
        const [isPlaying, setIsPlaying] = useState(false);

        // 点击切换播放/暂停
        const togglePlay = () => {
            if (videoRef.current) {
                if (isPlaying) {
                    videoRef.current.pause();
                } else {
                    videoRef.current.play();
                }
                setIsPlaying(!isPlaying);
            }
        };

        // 使用 IntersectionObserver 实现划走自动暂停 (性能优化关键)
        useEffect(() => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            if (videoRef.current) {
                                videoRef.current.play();
                                setIsPlaying(true);
                            }
                        } else {
                            if (videoRef.current) {
                                videoRef.current.pause();
                                setIsPlaying(false);
                            }
                        }
                    });
                },
                { threshold: 0.6 } // 当60%可见时触发
            );

            if (videoRef.current) {
                observer.observe(videoRef.current);
            }

            return () => {
                if (videoRef.current) observer.unobserve(videoRef.current);
            };
        }, []);

        return (
            <div className="video-card">
                {/* 视频层 */}
                <video
                    ref={videoRef}
                    className="video-player"
                    src={data.url}
                    loop
                    playsInline
                    onClick={togglePlay}
                    muted={muted}
                />

                {/* 底部信息层 */}
                <div className="footer-info">
                    <div className="username">@{data.author}</div>
                    <div className="description">{data.description}</div>
                    <div className="music-note">
                        <FaMusic /> 原始声音 - {data.author}
                    </div>
                </div>

                {/* 右侧交互层 */}
                <div className="sidebar">
                    <div className="icon-wrapper">
                        <div style={{ border: '2px solid white', borderRadius: '50%', width: 45, height: 45, background: '#eee', marginBottom: 10 }}>
                            {/* 这里放头像 img */}
                        </div>
                    </div>
                    <div className="icon-wrapper">
                        <FaHeart />
                        <span>{data.likes}</span>
                    </div>
                    <div className="icon-wrapper">
                        <FaCommentDots />
                        <span>{data.comments}</span>
                    </div>
                    <div className="icon-wrapper">
                        <FaShare />
                        <span>分享</span>
                    </div>
                    <button onClick={onToggleMuted}>
                        {muted ? '🔇' : '🔊'}
                    </button>
                </div>
            </div>
        );
    };

export default VideoFeed;