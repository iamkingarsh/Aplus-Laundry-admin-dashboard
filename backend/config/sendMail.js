import nodemailer from "nodemailer"
import dotenv from 'dotenv';
dotenv.config();
// Create a Nodemailer transporter using the Mandrill transport



const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.email',
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.GMAIL_PASS,
  },
});


const mailSend = async (toEmail, subject, text) => {


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
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export const managerInviteMail = async (
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

  await mailSend(managerEmail, subject, body);
};

export const emailVerificationEmail = async (email, otp) => {
  const subject = "Your One Time Password for email verification";
  const body = `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification OTP</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              margin: 0;
              padding: 0;
          }
  
          .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
  
          h1 {
              color: #333;
          }
  
          p {
              color: #666;
          }
  
          .otp {
              font-size: 32px;
              font-weight: bold;
              color: #007bff;
              margin: 10px 0;
          }
  
          .footer {
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              text-align: center;
          }
  
          .footer p {
              color: #888;
              font-size: 12px;
              opacity: 0.7;
              margin-bottom: 5px;
          }
  
          .branding-logo {
              max-width: 100px;
              margin-bottom: 10px;
          }
  
          .branding-text {
              font-size: 14px;
              color: #888;
              opacity: 0.7;
          }
      </style>
  </head>
  
  <body>
      <div class="container">
          <h1>Your One Time Password for Email Verification</h1>
          <p>Dear User,</p>
          <p>Your one-time password is:</p>
          <p class="otp">${otp}</p>
          <p>Please use this OTP to verify your email address.</p>
          <p>If you didn't request this OTP, please ignore this email. Your account is secure.</p>
      </div>
      <div class="footer">
          <img src="aplus_laundry_logo.png" alt="APlus Laundry Logo" class="branding-logo">
          <p class="branding-text">APlus Laundry Branding</p>
          <img src="designerdudes_logo.png" alt="DesignerDudes Logo" class="branding-logo">
          <p class="branding-text">Developed & Managed By DesignerDudes</p>
      </div>
  </body>
  
  </html>
  `;

  await mailSend(email, subject, body);
};

export const emailVerificationSuccess = async (email) => {

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

  await mailSend(email, subject, body);
};






