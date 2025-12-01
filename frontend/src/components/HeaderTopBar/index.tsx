import React from "react";
import "./style.css";
import { CiSearch } from "react-icons/ci";

const categories = [
    "热门","影视","动画","鬼畜","舞蹈","娱乐",
    "科技","美食","体育","游戏","知识"
];

const HeaderTopBar = () => {
    return (
        <>
        <div className="header-banner"></div>

        <div className="header-content-wrapper">
            {/* 分类导航 */}
            <div className="top-nav">
                {categories.map(c => (
                    <span key={c}>{c}</span>
                ))}
            </div>

            {/* 中心内容（搜索框 + 投稿） */}
            <div className="center-content">
                <div className="search-box">
                    <input type="text" placeholder="搜索你感兴趣的内容..." />
                </div>

                <button className="publish-btn">投稿</button>
            </div>
        </div>
        </>
    );
};

export default HeaderTopBar;
