import bcrypt from "bcryptjs"; //加密密码
import jwt from "jsonwebtoken"; //用于生成登录 token，让用户保持登录状态。
import { db } from "../config/db.js";
import { JWT_SECRET } from "../config/config.js"; //JWT 密钥，所有 token 都要用这个钥匙来签名。

export const register = (req, res) => {
  const { username, password } = req.body;

  const hash = bcrypt.hashSync(password, 10);

  db.query(
    "INSERT INTO user (username, password) VALUES (?, ?)",
    [username, hash],
    (err, result) => {

      if (err) {
        console.error("注册时数据库错误:", err);
        return res.status(500).json({ msg: "User exists or DB error", error: err });
      }

      res.json({ msg: "Register success" });
    }
  );
};


export const login = (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM user WHERE username=?",
    [username],
    (err, rows) => {

      if (err) {
        console.error("数据库查询错误:", err);
        return res.status(500).json({ msg: "Database error", error: err });
      }

      if (!rows || rows.length === 0) {
        return res.status(400).json({ msg: "User not found" });
      }

      const user = rows[0];

      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ msg: "Wrong password" });
      }

      const token = jwt.sign(
        { userId: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({ msg: "Login success", token });
    }
  );
};

export const updateUser = (req, res) => {
  const { userId, username, password } = req.body;
  let message = "更新成功";

  if (!userId) {
    return res.status(400).json({ msg: "缺少 userId" });
  }

  let fields = [];
  let values = [];

  // 修改昵称
  if (username) {
    fields.push("username=?");
    values.push(username);
    message += ", 昵称已修改";
  }

  // 修改密码
  if (password) {
    // 密码需要加密
    const hash = bcrypt.hashSync(password, 10);
    password = hash;
    fields.push("password=?");
    values.push(password);
    message += ", 密码已修改";
  }

  if (fields.length === 0) {
    return res.json({ msg: "没有需要更新的内容" });
  }

  values.push(userId);

  db.query(
    `UPDATE user SET ${fields.join(", ")} WHERE id=?`, values,
    (err, result) => {
      if (err) {
        console.error("更新失败:", err);
        return res.status(500).json({ msg: "数据库错误", error: err });
      }

      // 修改密码 → 必须生成新的 token（安全措施）
      let newToken = null;

      newToken = jwt.sign(
        { userId: userId, username: username }, // 如果修改昵称则一起更新进去
        JWT_SECRET,
        { expiresIn: "7d" }
      );


      res.json({
        msg: message,
        token: newToken, // 前端只在存在 token 时更新
      });
    }
  );
};
