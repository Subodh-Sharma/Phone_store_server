import Express from "express";
const router = Express.Router();
import userauth from "../middleware/userauth.js";
import { addincart, addonecart, emptycart, getcart, removefromcart, removeonecart, signin, signup } from "../controller/user.js";

router.post("/signup",signup);
router.post("/signin",signin);
router.patch("/addincart",userauth,addincart);
router.patch("/removefromcart/:id",userauth,removefromcart);
router.patch("/addonecart/:id",userauth,addonecart);
router.patch("/removeonecart/:id",userauth,removeonecart);
router.patch("/emptycart/:id",userauth,emptycart);
router.get("/getcart/:id",userauth,getcart);


export default router;

