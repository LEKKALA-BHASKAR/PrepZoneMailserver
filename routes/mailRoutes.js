import express from "express";
import { sendRegisterMail, sendEnrollmentMail, sendContactMail,sendMailToAll } from "../controllers/mailController.js";

const router = express.Router();

router.post("/register", sendRegisterMail);
router.post("/enroll", sendEnrollmentMail);
router.post("/contact", sendContactMail);
router.post("/notify-all", sendMailToAll);

export default router;
