import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { JWT_SECRET } from "../config/config.js";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const hash = bcrypt.hashSync(password, 10);

    await User.create({
      username,
      password: hash
    });

    res.json({ msg: "Register success" });

  } catch (err) {
    console.error("注册时数据库错误:", err);
    return res.status(500).json({ msg: "User exists or DB error", error: err });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ msg: "Login success", token });

  } catch (err) {
    console.error("数据库查询错误:", err);
    res.status(500).json({ msg: "Database error", error: err });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId, username, password } = req.body;
    let message = "更新成功";

    if (!userId) {
      return res.status(400).json({ msg: "缺少 userId" });
    }

    const updateData = {};

    if (username) {
      updateData.username = username;
      message += ", 昵称已修改";
    }

    if (password) {
      updateData.password = bcrypt.hashSync(password, 10);
      message += ", 密码已修改";
    }

    if (Object.keys(updateData).length === 0) {
      return res.json({ msg: "没有需要更新的内容" });
    }

    await User.update(updateData, {
      where: { id: userId }
    });

    // 重新签发 token
    const newToken = jwt.sign(
      { userId, username },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      msg: message,
      token: newToken
    });

  } catch (err) {
    console.error("更新失败:", err);
    res.status(500).json({ msg: "数据库错误", error: err });
  }
};
