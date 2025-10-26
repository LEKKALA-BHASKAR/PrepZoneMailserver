import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* 1️⃣ Registration Email */
export const sendRegisterMail = async (req, res) => {
  const { name, email } = req.body;

  const mailOptions = {
    from: `"PrepZon" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🎉 Welcome to PrepZone!",
    html: `
      <div style="font-family:sans-serif;padding:20px;">
        <h2>Hi ${name},</h2>
        <p>Welcome to <strong>PrepZone</strong> — your gateway to smarter learning!</p>
        <p>Start exploring our courses and enhance your skills today.</p>
        <br/>
        <p>Best,<br/>The PrepZone Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "✅ Registration email sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* 2️⃣ Course Enrollment Email */
export const sendEnrollmentMail = async (req, res) => {
  const { name, email, courseTitle } = req.body;

  const mailOptions = {
    from: `"PrepZone" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `📘 You’re Enrolled in ${courseTitle}!`,
    html: `
      <div style="font-family:sans-serif;padding:20px;">
        <h2>Hey ${name},</h2>
        <p>Congratulations on enrolling in <strong>${courseTitle}</strong>!</p>
        <p>Start learning right away by logging into your PrepZone dashboard.</p>
        <br/>
        <p>Cheers,<br/>PrepZone Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "✅ Enrollment email sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* 3️⃣ Contact Form Email */
export const sendContactMail = async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: `"PrepZone Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.SITE_OWNER_EMAIL,
    subject: `📩 New Contact Form Submission from ${name}`,
    html: `
      <div style="font-family:sans-serif;padding:20px;">
        <h3>Contact Form Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "✅ Contact form email sent to site owner!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
