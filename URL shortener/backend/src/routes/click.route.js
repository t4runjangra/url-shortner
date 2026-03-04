import {Urlstats} from "../controllers/click.controller.js"
import { Router } from "express";
import { Protect } from "../middleware/auth.middleware.js";
const router = Router();

router.route("/stats/:id").get(Protect , Urlstats)

export default router