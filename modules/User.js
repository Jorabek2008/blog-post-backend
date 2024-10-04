import mongoose from "mongoose";

const UserScheme = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/i,
    },
    passwordHash: {
      type: String,
      required: true,
      minlength: 8,
    },
    avatarUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserScheme);
