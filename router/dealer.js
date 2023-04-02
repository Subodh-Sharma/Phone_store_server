import Express from "express";
import { signin, signup } from "../controller/dealer.js";
const router = Express.Router();

router.post("/signup",signup);
router.post("/signin",signin);

export default router;