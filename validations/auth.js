import { body } from "express-validator";

export const registerValidator = [
  body("email", "Sizning kiritgan emailingiz xato").isEmail(),
  body("password", "Parolingiz 8 tadan ko'p bo'lishi kerak").isLength({
    min: 8,
  }),
  body("fullname", "Ismingiz 3 tadan ko'p bo'lishi kerak").isLength({ min: 3 }),
  body("avatarUrl", "Rasmingiz URL bo'lishi kerak").optional().isURL(),
];

export const loginValidator = [
  body("email", "Sizning kiritgan emailingiz xato").isEmail(),
  body("password", "Parolingiz 8 tadan ko'p bo'lishi kerak").isLength({
    min: 8,
  }),
];

export const postCreateValidator = [
  body("title", "Maqola sarlavhasini kiritadi").isLength({ min: 3 }).isString(),
  body("text", "Maqola matnini kiritadi").isLength({ min: 10 }).isString(),
  body("tags", "Teg formati noto'g'ri, massivni belgilang")
    .optional()
    .isArray(),
  body("imageUrl", "Noto'g'ri rasm havolasi").optional().isString(),
];
