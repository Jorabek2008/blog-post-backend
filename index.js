import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import {
  loginValidator,
  postCreateValidator,
  registerValidator,
} from "./validations/auth.js";
import { checkAuth, handleValidateErrors } from "./utils/index.js";
import { UserController, PostController } from "./controller/index.js";
import multer from "multer";

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DB ok");
  })
  .catch((err) => {
    console.log("DB err", err);
  });
const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
});

app.post(
  "/auth/login",
  loginValidator,
  handleValidateErrors,
  UserController.login
);

app.post(
  "/auth/register",
  registerValidator,
  handleValidateErrors,
  UserController.register
);

app.get("/auth/me", checkAuth, UserController.getUser);

app.post("/uploads", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/posts/tags", PostController.getTags);
app.get("/posts/:id", PostController.getOne);
app.get("/posts", PostController.getAll);
app.post(
  "/posts",
  checkAuth,
  postCreateValidator,
  handleValidateErrors,
  PostController.create
);
app.delete("/posts/:id", checkAuth, PostController.deletePost);
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidator,
  handleValidateErrors,
  PostController.update
);

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
