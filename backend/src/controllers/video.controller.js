import { db } from "../config/db.js";
import path from "path";
import fs from "fs";

export const publishVideo = (req, res) => {
  const { title, category, user_id } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ msg: "视频文件缺失" });
  }

  const url = `http://localhost:3001/uploads/${file.filename}`;

  db.query(
    "INSERT INTO video (title, category, url, user_id) VALUES (?, ?, ?, ?)",
    [title, category, url, user_id],
    (err) => {
      if (err) return res.status(500).json({ msg: "上传失败", error: err });

      res.json({ msg: "上传成功, user_id为: " + user_id, url });
    }
  );
};

export const getVideoList = (req, res) => {
  db.query("SELECT * FROM video ORDER BY create_time DESC", (err, rows) => {
    if (err) return res.status(500).json({ msg: "获取列表失败" });
    res.json(rows);
  });
};

export const getMyVideos = (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ msg: "userId is required" });
  }

  db.query(
    "SELECT * FROM video WHERE user_id = ? ORDER BY create_time DESC",
    [userId],
    (err, rows) => {
      if (err) {
        console.log("获取个人视频失败：", err);
        return res.status(500).json({ msg: "DB error" });
      }

      res.json({
        msg: "success",
        data: rows,
      });
    }
  );
};

export const deleteVideo = (req, res) => {
  const { video_id, user_id } = req.body;

  if (!video_id || !user_id) {
    return res.status(400).json({ msg: "video_id 和 user_id 必填" });
  }

  // ① 查询该视频是否存在
  db.query(
    "SELECT * FROM video WHERE id = ?",
    [video_id],
    (err, rows) => {
      if (err) {
        console.log("查询视频失败：", err);
        return res.status(500).json({ msg: "查询失败" });
      }

      if (rows.length === 0) {
        return res.status(404).json({ msg: "视频不存在" });
      }

      const video = rows[0];

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
      db.query(
        "DELETE FROM video WHERE id = ?",
        [video_id],
        (err2) => {
          if (err2) {
            console.log("删除数据库记录失败：", err2);
            return res.status(500).json({ msg: "删除失败" });
          }

          res.json({
            msg: "删除成功",
            video_id,
          });
        }
      );
    }
  );
};
