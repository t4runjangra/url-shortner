import { Router } from "express";
import { createProduct } from "../controllers/admin.controlles.js";
import { Protect } from "../middleware/auth.middleware.js";
import { adminVerify } from "../middleware/admin.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/create").post(
  Protect,
  adminVerify,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "images", maxCount: 5 }
  ]),
  createProduct
);

export default router;