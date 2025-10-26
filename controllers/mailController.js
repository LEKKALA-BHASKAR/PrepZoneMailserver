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
    from: `"PrepZone" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🎉 Welcome to PrepZone - Your Learning Journey Begins!",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to PrepZone</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8f9fa;
            color: #333;
            line-height: 1.6;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            padding: 30px 20px;
            text-align: center;
            color: white;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .logo-icon {
            width: 40px;
            height: 40px;
            background-color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
            color: #4f46e5;
            font-weight: bold;
          }
          .content {
            padding: 40px 30px;
          }
          .welcome-text {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 20px;
            color: #333;
          }
          .message {
            margin-bottom: 30px;
            color: #555;
          }
          .features {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin: 30px 0;
          }
          .feature {
            flex: 1;
            min-width: 150px;
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
          }
          .feature-icon {
            font-size: 24px;
            margin-bottom: 10px;
            color: #4f46e5;
          }
          .feature-title {
            font-weight: 600;
            margin-bottom: 5px;
            color: #333;
          }
          .feature-desc {
            font-size: 14px;
            color: #666;
          }
          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            color: white;
            text-decoration: none;
            padding: 12px 30px;
            border-radius: 50px;
            font-weight: 600;
            margin: 20px 0;
            transition: transform 0.2s;
          }
          .cta-button:hover {
            transform: translateY(-2px);
          }
          .footer {
            background-color: #f8f9fa;
            padding: 30px;
            text-align: center;
            color: #666;
            font-size: 14px;
          }
          .social-links {
            margin: 20px 0;
          }
          .social-link {
            display: inline-block;
            width: 36px;
            height: 36px;
            background-color: #e9ecef;
            border-radius: 50%;
            margin: 0 8px;
            line-height: 36px;
            text-align: center;
            color: #495057;
            text-decoration: none;
          }
          .social-link:hover {
            background-color: #4f46e5;
            color: white;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <div class="logo">
              <div class="logo-icon">P</div>
              PrepZone
            </div>
            <p>Your Gateway to Smarter Learning</p>
          </div>
          
          <div class="content">
            <h1 class="welcome-text">Welcome to PrepZone, ${name}! 🎉</h1>
            <p class="message">
              Thank you for joining our learning community! We're excited to help you achieve your educational goals and unlock your full potential.
            </p>
            
            <div class="features">
              <div class="feature">
                <div class="feature-icon">📚</div>
                <div class="feature-title">Rich Content</div>
                <div class="feature-desc">Access high-quality courses and study materials</div>
              </div>
              <div class="feature">
                <div class="feature-icon">📊</div>
                <div class="feature-title">Track Progress</div>
                <div class="feature-desc">Monitor your learning journey with detailed analytics</div>
              </div>
              <div class="feature">
                <div class="feature-icon">🏆</div>
                <div class="feature-title">Achieve Goals</div>
                <div class="feature-desc">Earn certificates and showcase your skills</div>
              </div>
            </div>
            
            <p class="message">
              Ready to get started? Explore our courses and begin your learning adventure today!
            </p>
            
            <div style="text-align: center;">
              <a href="https://mock-test-ten.vercel.app/" class="cta-button">Explore Courses</a>
            </div>
          </div>
          
          <div class="footer">
            <p>Best regards,<br>The PrepZone Team</p>
            
            <div class="social-links">
              <a href="#" class="social-link">f</a>
              <a href="#" class="social-link">t</a>
              <a href="#" class="social-link">in</a>
              <a href="#" class="social-link">@</a>
            </div>
            
            <p style="margin-top: 20px; font-size: 12px;">
              © 2023 PrepZone. All rights reserved.<br>
              You're receiving this email because you recently created an account on PrepZone.
            </p>
          </div>
        </div>
      </body>
      </html>
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
    subject: `📘 You're Enrolled in ${courseTitle}!`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Course Enrollment Confirmation</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8f9fa;
            color: #333;
            line-height: 1.6;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            padding: 30px 20px;
            text-align: center;
            color: white;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .logo-icon {
            width: 40px;
            height: 40px;
            background-color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
            color: #4f46e5;
            font-weight: bold;
          }
          .content {
            padding: 40px 30px;
          }
          .welcome-text {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 20px;
            color: #333;
          }
          .message {
            margin-bottom: 30px;
            color: #555;
          }
          .course-card {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 25px;
            margin: 30px 0;
            border-left: 4px solid #4f46e5;
          }
          .course-title {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 10px;
            color: #333;
          }
          .course-info {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin-top: 15px;
          }
          .course-info-item {
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #666;
          }
          .info-icon {
            margin-right: 5px;
            color: #4f46e5;
          }
          .next-steps {
            margin: 30px 0;
          }
          .step {
            display: flex;
            align-items: flex-start;
            margin-bottom: 15px;
          }
          .step-number {
            width: 24px;
            height: 24px;
            background-color: #4f46e5;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
            margin-right: 15px;
            flex-shrink: 0;
          }
          .step-content {
            flex: 1;
          }
          .step-title {
            font-weight: 600;
            margin-bottom: 5px;
            color: #333;
          }
          .step-desc {
            font-size: 14px;
            color: #666;
          }
          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            color: white;
            text-decoration: none;
            padding: 12px 30px;
            border-radius: 50px;
            font-weight: 600;
            margin: 20px 0;
            transition: transform 0.2s;
          }
          .cta-button:hover {
            transform: translateY(-2px);
          }
          .footer {
            background-color: #f8f9fa;
            padding: 30px;
            text-align: center;
            color: #666;
            font-size: 14px;
          }
          .social-links {
            margin: 20px 0;
          }
          .social-link {
            display: inline-block;
            width: 36px;
            height: 36px;
            background-color: #e9ecef;
            border-radius: 50%;
            margin: 0 8px;
            line-height: 36px;
            text-align: center;
            color: #495057;
            text-decoration: none;
          }
          .social-link:hover {
            background-color: #4f46e5;
            color: white;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <div class="logo">
              <div class="logo-icon">P</div>
              PrepZone
            </div>
            <p>Your Gateway to Smarter Learning</p>
          </div>
          
          <div class="content">
            <h1 class="welcome-text">Congratulations, ${name}! 🎉</h1>
            <p class="message">
              You're now enrolled in <strong>${courseTitle}</strong>! We're thrilled to have you on board and can't wait to see you succeed.
            </p>
            
            <div class="course-card">
              <div class="course-title">${courseTitle}</div>
              <p>You now have full access to all course materials, videos, and resources.</p>
              <div class="course-info">
                <div class="course-info-item">
                  <span class="info-icon">📚</span>
                  <span>Course Materials</span>
                </div>
                <div class="course-info-item">
                  <span class="info-icon">🎥</span>
                  <span>Video Lessons</span>
                </div>
                <div class="course-info-item">
                  <span class="info-icon">📝</span>
                  <span>Practice Tests</span>
                </div>
                <div class="course-info-item">
                  <span class="info-icon">🏆</span>
                  <span>Certificate</span>
                </div>
              </div>
            </div>
            
            <div class="next-steps">
              <h3 style="margin-bottom: 20px; color: #333;">What's Next?</h3>
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <div class="step-title">Log in to your account</div>
                  <div class="step-desc">Access your dashboard using your registered credentials</div>
                </div>
              </div>
              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <div class="step-title">Navigate to My Courses</div>
                  <div class="step-desc">Find your enrolled course in the dashboard</div>
                </div>
              </div>
              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <div class="step-title">Start Learning</div>
                  <div class="step-desc">Begin with the first module and track your progress</div>
                </div>
              </div>
            </div>
            
            <div style="text-align: center;">
              <a href="https://mock-test-ten.vercel.app/student/dashboard" class="cta-button">Go to Dashboard</a>
            </div>
          </div>
          
          <div class="footer">
            <p>Happy learning!<br>The PrepZone Team</p>
            
            <div class="social-links">
              <a href="#" class="social-link">f</a>
              <a href="#" class="social-link">t</a>
              <a href="#" class="social-link">in</a>
              <a href="#" class="social-link">@</a>
            </div>
            
            <p style="margin-top: 20px; font-size: 12px;">
              © 2023 PrepZone. All rights reserved.<br>
              You're receiving this email because you enrolled in a course on PrepZone.
            </p>
          </div>
        </div>
      </body>
      </html>
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
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8f9fa;
            color: #333;
            line-height: 1.6;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            padding: 30px 20px;
            text-align: center;
            color: white;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .logo-icon {
            width: 40px;
            height: 40px;
            background-color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
            color: #4f46e5;
            font-weight: bold;
          }
          .content {
            padding: 40px 30px;
          }
          .title {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 20px;
            color: #333;
          }
          .info-card {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 25px;
            margin: 20px 0;
            border-left: 4px solid #4f46e5;
          }
          .info-row {
            display: flex;
            margin-bottom: 15px;
          }
          .info-label {
            font-weight: 600;
            width: 100px;
            color: #4f46e5;
          }
          .info-value {
            flex: 1;
            color: #333;
          }
          .message-box {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 25px;
            margin: 20px 0;
            border-left: 4px solid #4f46e5;
          }
          .message-title {
            font-weight: 600;
            margin-bottom: 10px;
            color: #4f46e5;
          }
          .message-content {
            color: #333;
            white-space: pre-wrap;
          }
          .action-buttons {
            display: flex;
            gap: 15px;
            margin-top: 30px;
          }
          .action-button {
            display: inline-block;
            padding: 10px 20px;
            border-radius: 50px;
            font-weight: 600;
            text-decoration: none;
            transition: transform 0.2s;
          }
          .reply-button {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            color: white;
          }
          .view-button {
            background-color: #e9ecef;
            color: #495057;
          }
          .action-button:hover {
            transform: translateY(-2px);
          }
          .footer {
            background-color: #f8f9fa;
            padding: 30px;
            text-align: center;
            color: #666;
            font-size: 14px;
          }
          .timestamp {
            font-size: 12px;
            color: #999;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <div class="logo">
              <div class="logo-icon">P</div>
              PrepZone
            </div>
            <p>Contact Form Submission</p>
          </div>
          
          <div class="content">
            <h1 class="title">New Message from Contact Form</h1>
            
            <div class="info-card">
              <div class="info-row">
                <div class="info-label">From:</div>
                <div class="info-value">${name}</div>
              </div>
              <div class="info-row">
                <div class="info-label">Email:</div>
                <div class="info-value">${email}</div>
              </div>
              <div class="timestamp">Received: ${new Date().toLocaleString()}</div>
            </div>
            
            <div class="message-box">
              <div class="message-title">Message:</div>
              <div class="message-content">${message}</div>
            </div>
            
            <div class="action-buttons">
              <a href="mailto:${email}" class="action-button reply-button">Reply to Sender</a>
              <a href="https://mock-test-ten.vercel.app/admin/contact" class="action-button view-button">View All Messages</a>
            </div>
          </div>
          
          <div class="footer">
            <p>This is an automated notification from PrepZone Contact System.</p>
            <p style="margin-top: 20px; font-size: 12px;">
              © 2023 PrepZone. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "✅ Contact form email sent to site owner!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
