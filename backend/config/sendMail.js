import  nodemailer from "nodemailer"
import dotenv from 'dotenv';
dotenv.config();
// Create a Nodemailer transporter using the Mandrill transport

const mailSend = (toEmail, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.email",
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.GMAIL_PASS,
    },
  });

  // Define email content
  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: toEmail,
    subject: subject,
    html: ` 
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .btn {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007BFF;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
            }
            .img{
                width: 200px;
                height: 300px;
            }
        </style>
    </head>
    <body>
        <div class="container">
${text}
            
        </div>
        <footer> <img src='/images/fullLogo.svg'   />  </footer>
    </body>
    </html>
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

export const managerInviteMail = (
  managerName,
  managerEmail,
  adminName,
  link
) => {
  const subject = "Join Our Aplus App - Create Your Account";
  const body = `<p>Dear ${managerName},</p>
  <p>Mr. ${adminName} invites you to join our MedTech app. It streamlines our medical practice. Click the link below to create your account:</p>
  <a class="btn" href="${link}">Create Account</a>
  <p>Thank you for your contribution.</p>  `;

  mailSend(managerEmail, subject, body);
};

export const emailVerificationEmail = (email, otp) => {
  const subject = "Your One Time Password for email verification";
  const body = `<p>Dear User,</p>
  <h1>Your OTP Code</h1>
  <p>Your one-time password is:</p>
  <h2>${otp}</h2>
  <p>Please use this OTP to verify your email address.</p>
  <p>If you didn't request this OTP, please ignore this email. Your account is secure.</p>`;

  mailSend(email, subject, body);
};

export const emailVerificationSuccess = (email) => {
  
  const subject = "Account Successfully Verified";

  const body = `
    <html>
      <body>
        <p>Dear User,</p>
        <p>Congratulations! Your email address has been successfully verified.</p>
        <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
        <p>Thank you for choosing our service.</p>
        <p>Best regards,</p>
        <p>Aplus team</p>
      </body>
    </html>
  `;

  mailSend(email, subject, body);
};






 