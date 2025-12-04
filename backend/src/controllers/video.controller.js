import path from "path";
import fs from "fs";
import { Video } from "../models/video.js";

export const publishVideo = async (req, res) => {
  try {
    const { title, category, user_id } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ msg: "视频文件缺失" });
    }

    const url = `http://localhost:3001/uploads/${file.filename}`;

    await Video.create({
      title,
      category,
      url,
      user_id,
    });

    res.json({ msg: "上传成功, user_id为: " + user_id, url });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "上传失败", err });
  }
};

export const getVideoList = async (req, res) => {
  try {
    const videos = await Video.findAll({
      order: [["create_time", "DESC"]],
    });

    res.json(videos);

  } catch (err) {
    res.status(500).json({ msg: "获取列表失败" });
  }
};


export const getMyVideos = async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ msg: "userId is required" });
    }

    const videos = await Video.findAll({
      where: { user_id: userId },
      order: [["create_time", "DESC"]],
    });

    res.json({
      msg: "success",
      data: videos,
    });

  } catch (err) {
    console.log("获取个人视频失败：", err);
    res.status(500).json({ msg: "DB error" });
  }
};


export const deleteVideo = async (req, res) => {
  try {
    const { video_id, user_id } = req.body;

    if (!video_id || !user_id) {
      return res.status(400).json({ msg: "video_id 和 user_id 必填" });
    }

    // ① 查询该视频
    const video = await Video.findByPk(video_id);

    if (!video) {
      return res.status(404).json({ msg: "视频不存在" });
    }

    // ② 权限验证
    if (video.user_id !== Number(user_id)) {
      return res.status(403).json({ msg: "无权限删除此视频" });
    }

    // ③ 删除本地文件
    const filePath = path.join("src/uploads", path.basename(video.url));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // ④ 删除数据库记录
    await video.destroy();

    res.json({
      msg: "删除成功",
      video_id,
    });

  } catch (err) {
    console.log("删除失败：", err);
    res.status(500).json({ msg: "删除失败" });
  }
};
