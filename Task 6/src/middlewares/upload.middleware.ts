import multer from "multer";
import path from "path";
import fs from "fs";
import { AppError } from "../utils/appError";

const uploadDirectory = path.join(process.cwd(), "public/uploads");

// Ensure the upload directory exists
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedExtensions = /jpeg|jpg|png|webp|gif/;
  const extension = path.extname(file.originalname).toLowerCase();
  const isExtensionAllowed = allowedExtensions.test(extension);
  const isMimeAllowed = allowedExtensions.test(file.mimetype);

  if (isExtensionAllowed && isMimeAllowed) {
    cb(null, true);
  } else {
    cb(new AppError(400, "Only image files (jpg, jpeg, png, webp, gif) are allowed!") as any, false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit
  },
});
