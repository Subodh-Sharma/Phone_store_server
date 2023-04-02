import Express from "express";
import dealerauth from "../middleware/dealerauth.js"

const router = Express.Router();

import { addphone,getphones,dealersphone, updatephone, deletephone, getphone, search} from "../controller/phone.js";

router.post("/addphone",dealerauth,addphone);
router.get("/getphones",getphones);
router.get("/getphone/:id",dealerauth,getphone);
router.get("/dealersphone/:id",dealerauth,dealersphone);
router.patch("/updatephone/:id",dealerauth,updatephone);
router.delete("/deletephone/:id",dealerauth,deletephone);
router.get("/search",search);
export default router;