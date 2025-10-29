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

/* 💌 Common Email Footer */
const emailFooter = `
  <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;">
  <p style="font-size:14px;color:#6b7280;">
    📞 <strong>8431761279</strong> | 
    📧 <a href="mailto:support@prepzon.com" style="color:#2563eb;text-decoration:none;">support@prepzon.com</a> | 
    🌐 <a href="http://prepzon.com/" style="color:#2563eb;text-decoration:none;">prepzon.com</a>
  </p>
  <p style="font-size:12px;color:#9ca3af;">
    © ${new Date().getFullYear()} PrepZon. All rights reserved.
  </p>
`;

/* 1️⃣ Registration Email */
export const sendRegisterMail = async (req, res) => {
  const { name, email } = req.body;

  const mailOptions = {
    from: `"PrepZon" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🎉 Welcome to PrepZon!",
    html: `
      <div style="font-family:Inter,Arial,sans-serif;padding:24px;background:#f9fafb;border-radius:12px;">
        <h2 style="color:#1e3a8a;">Hi ${name},</h2>
        <p>Welcome to <strong>PrepZon</strong> — your gateway to smarter learning!</p>
        <p>Start exploring our courses and enhance your skills today.</p>
        <br/>
        <p>Best,<br/><strong>The PrepZon Team</strong></p>
        ${emailFooter}
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
    from: `"PrepZon" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `📘 You’re Enrolled in ${courseTitle}!`,
    html: `
      <div style="font-family:Inter,Arial,sans-serif;padding:24px;background:#f9fafb;border-radius:12px;">
        <h2 style="color:#1e3a8a;">Hey ${name},</h2>
        <p>Congratulations on enrolling in <strong>${courseTitle}</strong>!</p>
        <p>Start learning right away by logging into your PrepZon dashboard.</p>
        <br/>
        <p>Cheers,<br/><strong>PrepZon Team</strong></p>
        ${emailFooter}
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
    from: `"PrepZon Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.SITE_OWNER_EMAIL,
    subject: `📩 New Contact Form Submission from ${name}`,
    html: `
      <div style="font-family:Inter,Arial,sans-serif;padding:24px;background:#f9fafb;border-radius:12px;">
        <h3 style="color:#1e3a8a;">Contact Form Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
        ${emailFooter}
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

/* 4️⃣ Notify All Students */
export const sendMailToAll = async (req, res) => {
  const { title, update, description } = req.body;

  try {
    const response = await fetch("https://mocktest-bckx.onrender.com/api/v1/admin/students");
    const data = await response.json();
    const students = data?.data?.students || [];

    for (const student of students) {
      const mailOptions = {
        from: `"PrepZon Updates" <${process.env.EMAIL_USER}>`,
        to: student.email,
        subject: `📢 ${title} — ${update}`,
        html: `
          <div style="font-family:Inter,Arial,sans-serif;padding:24px;background:#f9fafb;border-radius:12px;">
            <h3 style="color:#1e3a8a;">${title}</h3>
            <p><strong>Update:</strong> ${update}</p>
            <p><strong>Details:</strong><br/>${description}</p>
            <br/>
            <p>Hi ${student.name || "Student"},</p>
            <p>Stay tuned for more updates from <strong>PrepZon</strong>!</p>
            ${emailFooter}
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    }

    res.json({ message: "✅ Mail successfully sent to all students!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
