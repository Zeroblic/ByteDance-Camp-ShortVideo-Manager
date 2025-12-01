import React from "react";
import "./style.css";

interface Props {
    visible: boolean;
    onLeave: () => void;
}

const Sidebar: React.FC<Props> = ({ visible, onLeave }) => {
    return (
        <div 
            className={`sidebar-float ${visible ? "show" : ""}`}
            onMouseLeave={onLeave}
        >
            <h2>短视频后台</h2>
            <div className="menu">推荐视频</div>
            <div className="menu">创作中心</div>
            <div className="menu">我的主页</div>
            <div className="menu">设置</div>
            <div className="menu">退出登录</div>
        </div>
    );
};

export default Sidebar;
