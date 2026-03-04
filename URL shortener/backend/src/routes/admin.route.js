import {getUserStats , TotalNumberOfUser} from "../controllers/admin.controller.js"
import { adminVerify } from "../middleware/adminVerify.middleware.js"
import { Protect } from "../middleware/auth.middleware.js"
import { Router } from "express"

const router = Router()

router.route("/stats").get(Protect , adminVerify ,getUserStats)
router.route("/TotalUser").get(Protect, TotalNumberOfUser);
export default router