import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Video = sequelize.define("Video", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    // 视频文件 URL
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    // 视频封面（缩略图）
    thumbnailUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    // 作者名称
    author: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    // 点赞数
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },

    // 评论数
    comments: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },

    category: {
        type: DataTypes.STRING,
    },

    // 数据库里的创建时间
    create_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },

    // 你原有的用户外键
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    tableName: "video",
    timestamps: false,
});
