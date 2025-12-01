import React, { useState } from "react";
import FloatingAvatar from "../components/Sidebar/FloatingAvatar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            {/* 悬浮头像 */}
            <FloatingAvatar 
                onHover={() => setOpen(true)} 
                onLeave={() => setOpen(false)}
            />

            {/* 悬浮侧边栏 */}
            <Sidebar 
                visible={open} 
                onLeave={() => setOpen(false)} 
            />

            {/* 页面内容（显示子路由页面） */}
            <div style={{ paddingLeft: 0 }}>
                <Outlet />   {/* 渲染 HomePage、VideoPage... */}
            </div>
        </div>
    );
};

export default MainLayout;
