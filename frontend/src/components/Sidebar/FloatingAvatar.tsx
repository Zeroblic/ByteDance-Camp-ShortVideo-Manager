import React from "react";
import "./style.css";

interface Props {
    onHover: () => void;
}

const FloatingAvatar: React.FC<Props> = ({ onHover }) => {
    return (
        <div 
            className="floating-avatar"
            onMouseEnter={onHover}
        >
            <img 
                src="https://i.pravatar.cc/60"
                alt="avatar"
            />
        </div>
    );
};

export default FloatingAvatar;
