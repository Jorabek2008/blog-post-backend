import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    console.log(token);
    try {
      const decoded = jwt.verify(token, "secret123");
      // console.log((req.userId = decoded._id));

      req.userId = decoded._id;
      next();
    } catch (error) {
      return res.status(403).json({
        message: "Token yaroqsiz",
      });
    }
  } else {
    return res.status(404).json({
      message: "Token yaroqsiz",
    });
  }
};
