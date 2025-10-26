import express from "express";
import { sendRegisterMail, sendEnrollmentMail, sendContactMail } from "../controllers/mailController.js";

const router = express.Router();

router.post("/register", sendRegisterMail);
router.post("/enroll", sendEnrollmentMail);
router.post("/contact", sendContactMail);

export default router;
