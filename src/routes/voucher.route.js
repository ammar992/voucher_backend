import { Router } from "express";
import { createVoucher, findAllVoucher, updateVoucher } from "../controllers/voucher.controller.js";
import { verifyToken } from "../middlerwares/verify.js";
const router = Router();



router.route("/create").post(verifyToken,createVoucher);
router.route("/get").get(verifyToken,findAllVoucher);
router.route("/update/:id").put(verifyToken,updateVoucher);


export default router;