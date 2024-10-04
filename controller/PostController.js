import PostModel from "../modules/Post.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    res.json(posts);
  } catch (error) {
    res.status(503).json({
      message: "Maqolalarni ololmadi",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await PostModel.findOneAndUpdate(
      { _id: postId }, // Qidirilayotgan post ID
      { $set: req.body }, // Yangilanishlar
      { new: true } // Yangilangan postni qaytarish
    );

    if (!post) {
      return res.status(404).json({ message: "Maqola topilmadi" });
    }

    return res.json(post);
  } catch (error) {
    res.status(503).json({
      message: "Maqolalarni ololmadi",
    });
  }
};
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const deletedPost = await PostModel.findByIdAndDelete(postId); // Postni o'chirish

    if (!deletedPost) {
      return res.status(404).json({ message: "Maqola topilmadi" });
    }

    return res.json({ message: "Maqola muvaffaqiyatli o'chirildi" }); // O'chirish muvaffaqiyatli bo'lsa
  } catch (error) {
    res.status(503).json({
      message: "Maqolani o'chirishda xatolik",
      error: error.message, // Xatolik haqida ma'lumot
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    res.status(503).json({
      message: "Maqola yaratib bo'lmadi",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags,
      }
    );

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(503).json({
      message: "Maqola yaratib bo'lmadi",
    });
  }
};

export const getTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();
    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);
    res.json(tags);
  } catch (error) {
    res.status(503).json({
      message: "Sonli maqolalarni ololmadi",
    });
  }
};
