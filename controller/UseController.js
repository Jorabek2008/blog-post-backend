import UserModel from "../modules/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullname: req.body.fullname,
      avatarUrl: req.body.avatarUrl,
      passwordHash,
    });

    const user = await doc.save();
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );
    res.json({
      ...user._doc,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ro'yxatdan o'tishda xatolik",
      error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ message: "Foydalanuchi topilmadi" });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );
    if (!isValidPass) {
      return res.status(401).json({ message: "Parol xato" });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );
    const { passwordHash, ...userData } = user._doc;
    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Kirishda xatolik",
      error,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(401).json({ message: "Token xato" });
    }
    const { passwordHash, ...userData } = user._doc;
    res.json(userData);
  } catch (error) {
    res.status(500).json({
      message: "Kirishda xatolik",
      error,
    });
  }
};
