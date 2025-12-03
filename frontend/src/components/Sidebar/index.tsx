import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { getUserName } from "../GetUserInfo";

interface Props {
    visible: boolean;
    onLeave: () => void;
}

const Sidebar: React.FC<Props> = ({ visible, onLeave }) => {
    const navigate = useNavigate();
    return (
        <div
            className={`sidebar-float ${visible ? "show" : ""}`}
            onMouseLeave={onLeave}
        >
            <h2>Hello! {getUserName()}</h2>
            <div className="menu" onClick={() => navigate(`/`)}>首页</div>
            <div className="menu" onClick={() => navigate(`/create`)}>创作中心</div>
            <div className="menu" onClick={() => navigate(`/my`)}>我的主页</div>
            <div className="menu" onClick={() => navigate(`/settings`)}>设置</div>
            <div className="menu" onClick={() => {
                localStorage.removeItem("token");
                navigate(`/login`);
            }}>
                退出登录
            </div>
        </div>
    );
};

export default Sidebar;
