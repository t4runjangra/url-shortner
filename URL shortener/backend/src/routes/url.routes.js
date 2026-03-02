import {createShortUrl , redirectUrl , getMyUrl} from "../controllers/url.controller.js"
import { ValidateUrl } from "../middleware/urlValidater.middleware.js";
import { Protect } from "../middleware/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.route("/create").post(ValidateUrl , Protect , createShortUrl)
router.route("/getUrl").get(Protect , getMyUrl)
router.route("/:shortID").get(redirectUrl)
export default router;