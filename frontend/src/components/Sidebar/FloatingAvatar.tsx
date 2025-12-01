import React from "react";
import "./style.css";

interface Props {
    onHover: () => void;
    onLeave: () => void;
}

const FloatingAvatar: React.FC<Props> = ({ onHover, onLeave }) => {
    return (
        <div 
            className="floating-avatar"
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
            <img 
                src="https://i.pravatar.cc/60"
                alt="avatar"
            />
        </div>
    );
};

export default FloatingAvatar;
