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
            // body {
            //     font-family: Arial, sans-serif;
            //     background-color: #f4f4f4;
            // }
            // .container {
            //     max-width: 600px;
            //     margin: 0 auto;
            //     padding: 20px;
            // }
            // .btn {
            //     display: inline-block;
            //     padding: 10px 20px;
            //     background-color: #007BFF;
            //     color: #fff;
            //     text-decoration: none;
            //     border-radius: 5px;
            // }
            // .img{
            //     width: 200px;
            //     height: 300px;
            // }
        </style>
        </head>
        <body>
        <table class="m_-5049272237331082851table--wrapper" align="center" cellpadding="0" cellspacing="0" border="0"
        width="700">
        <tbody>
            <tr>
                <td align="center" bgcolor="#2E3190" valign="top" style="
                
              background-color: #2E3190
            ">
                    <div>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" style="width: 600px"
                            class="m_-5049272237331082851table--content">
                            <tbody>
                                <tr>
                                    <td align="center" valign="top" style="padding: 30px"
                                        class="m_-5049272237331082851logo">
                                        <table align="center" cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td class="m_-5049272237331082851newLine">
                                                        <a href="https://www.apluslaundry.in/
                                                            target="_blank" style="display: flex;flex-wrap: wrap; text-align: center;align-items: center;gap: 16px;width: fit-content;margin: 0 auto;
                                                            text-decoration: none;"
                                                            data-saferedirecturl="https://www.apluslaundry.in/">
                                                            <img alt="Aplus Logo"
                                                                src="https://firebasestorage.googleapis.com/v0/b/aplus-laundry-storage.appspot.com/o/apluslaundry%2FSymbolWhite.svg?alt=media&token=0cd389ea-c6af-481d-b4f8-274a5ea8f1ba"
                                                                 width="70" style="
                                    display: block;
                                    font-family: Helvetica, Arial, sans-serif;
                                    color: #ffffff;
                                    font-size: 16px; 
                                  " border="0" class="CToWUd" data-bit="iit" /> <p style="
                                    font-family: Helvetica, Arial, sans-serif;
                                    height: fit-content;
                                    color: #ffffff;
                                    font-size: 20px; 
                                    font-weight: 900;
                                    
                                  " >A Plus Laundry</p> 
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </td>
            </tr>
      
      
            <tr>
                
                <td align="center"
                    bgcolor="#F6F6F6" valign="top" style="
            
            ">
            
                    <div>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" style="width: 600px;margin: -1000px 0"
                            class="m_-5049272237331082851table--content">
                            <tbody>
                                <tr>
                                    <td bgcolor="#fff" align="left" valign="top"
                                        class="m_-5049272237331082851table--content--details"
                                        style="border-radius: 4px; padding: 40px; margin: 0 auto" >
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tbody>
        ${text}                                                
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" class="m_-5049272237331082851table--footer" valign="middle"
                                        style="padding-top: 50px">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td style="padding-bottom: 40px">
                                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left" style="padding-bottom: 24px">
                                                                        <a href="https://www.apluslaundry.in/"
                                                                            target="_blank"
                                                                            data-saferedirecturl="https://www.apluslaundry.in/" style="text-decoration: none;"> <p>A Plus</p> </a>
                                                                    </td>
                                                                    <td align="right" style="padding-bottom: 24px">
                                                                        <table style="
                                          list-style: none;
                                          margin: 0;
                                          overflow: hidden;
                                          padding: 0;
                                        ">
                                                                            <tbody>
                                                                                <tr> 
                                                                                    <td style="padding-right: 16px">
                                                                                        <a href="https://www.facebook.com/6300207721@Aplus6300"
                                                                                            target="_blank"
                                                                                            data-saferedirecturl="https://www.facebook.com/6300207721@Aplus6300"><img
                                                                                                alt="A Plus on Facebook"
                                                                                                src="https://ci3.googleusercontent.com/meips/ADKq_NYoQfU8D-y84Pfi-wn5hQchI2BFlacfLRNmvd3Wk2YjV2CqlKOxps5cm5j1_j-sHImKKggl1jK0C3OonhJ8IbTgUqRLvnE_deI4OTAUJQKlVTQvfywjY5HNS8g=s0-d-e1-ft#https://cdn.getsimpl.com/images/email/transactions/simpl-facebook.png"
                                                                                                width="17"
                                                                                                class="CToWUd"
                                                                                                data-bit="iit" /></a>
                                                                                    </td>
                                                                                    <td style="padding-right: 16px">
                                                                                        <a href="https://www.instagram.com/apluslaundry.in/"
                                                                                            target="_blank"
                                                                                            data-saferedirecturl="https://www.instagram.com/apluslaundry.in/"><img
                                                                                                alt="A Plus on Instagram"
                                                                                                src="https://ci3.googleusercontent.com/meips/ADKq_NZX0lknWQLRiBxtRLXhagocpcWiQcO5I2DUJD1qZ44GM9G20BdF8adSRxlVyzEfF6M6W6ZIlS5TFRlYd2tBYSTSjfZrcSCzZ_ys0m6rjesIGdxLANFgjSXaPZQJ=s0-d-e1-ft#https://cdn.getsimpl.com/images/email/transactions/simpl-instagram.png"
                                                                                                width="17"
                                                                                                class="CToWUd"
                                                                                                data-bit="iit" /></a>
                                                                                    </td>
                                                                                   
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <hr style="background: #888; border: 0; height: 1px" />
                                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left" valign="top" style="
                                        padding-bottom: 24px;
                                        padding-top: 24px;
                                      ">
                                                                        <table style="
                                          list-style: none;
                                          margin: 0;
                                          padding: 0;
                                          font-family: Source Sans Pro,
                                            Helvetica, Arial, sans-serif;
                                          font-size: 16px;
                                          font-weight: 600;
                                          line-height: 20px;
                                        ">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="m_-5049272237331082851siteLink"
                                                                                        style="
                                                font-size: 16px;
                                                font-weight: normal;
                                                line-height: 18px;
                                                padding-right: 16px;
                                              ">
                                                                                        <a href="https://www.apluslaundry.in/"
                                                                                            style="
                                                  color: #888 !important;
                                                  display: block;
                                                  text-decoration: none;
                                                  text-transform: uppercase;
                                                " target="_blank" data-saferedirecturl="https://www.apluslaundry.in/">View
                                                                                            Dashboard</a>
                                                                                    </td>
                                                                                    <td class="m_-5049272237331082851siteLink"
                                                                                        style="
                                                font-size: 16px;
                                                font-weight: normal;
                                                line-height: 18px;
                                                padding-right: 16px;
                                              ">
                                                                                        <a href="https://www.apluslaundry.in/refund-&-returns"
                                                                                            style="
                                                  color: #888 !important;
                                                  display: block;
                                                  text-decoration: none;
                                                  text-transform: uppercase;
                                                " target="_blank" data-saferedirecturl="https://www.apluslaundry.in/refund-&-returns">
                                                Refunds & Returns</a>
                                                                                    </td>
                                                                                    <td class="m_-5049272237331082851siteLink"
                                                                                        style="
                                                font-size: 16px;
                                                font-weight: normal;
                                                line-height: 18px;
                                                padding-right: 16px;
                                              ">
                                                                                        <a href="https://www.apluslaundry.in/terms-and-conditions"
                                                                                            style="
                                                  color: #888 !important;
                                                  display: block;
                                                  text-decoration: none;
                                                  text-transform: uppercase;
                                                " target="_blank" data-saferedirecturl="https://www.apluslaundry.in/terms-and-conditions">Terms
                                                                                            & Conditions</a>
                                                                                    </td>
                                                                                    <td class="m_-5049272237331082851siteLink"
                                                                                        style="
                                                font-size: 16px;
                                                font-weight: normal;
                                                line-height: 18px;
                                              ">
                                                                                        <a href="https://www.apluslaundry.in/privacy-policy"
                                                                                            style="
                                                  color: #888 !important;
                                                  display: block;
                                                  text-decoration: none;
                                                  text-transform: uppercase;
                                                " target="_blank" data-saferedirecturl="https://www.apluslaundry.in/privacy-policy">Privacy
                                                                                            Policy</a>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="left" valign="top"
                                                                        style="padding-bottom: 24px">
                                                                        <table style="
                                          list-style: none;
                                          margin: 0;
                                          overflow: hidden;
                                        ">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td valign="top" style="
                                                height: 24px;
                                                padding: 0;
                                                padding-right: 12px;
                                              ">
                                                                                        <h3 style="
                                                  margin: 0;
                                                  padding: 0;
                                                  color: #888;
                                                  font-family: Source Sans Pro,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 14px;
                                                  font-weight: normal;
                                                  line-height: 18px;
                                                ">
                                                                                            Get the app:
                                                                                        </h3>
                                                                                    </td>
                                                                                   
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <p style="
      margin: 0;
      padding: 8px 0 16px;
      font-family: Source Sans Pro, Helvetica, Arial, sans-serif;
      font-size: 12px;
      font-weight: normal;
      line-height: 16px;
      color: #888;
      width: 80%;
      ">
      © A Plus 2024. 1-1211/12, Main Road, Revenue Ward No. 1, Near Universal Shop, Kurnool Road, Chimakurthy, Andhra Pradesh-523226
      </p>
      
      <p style="
      margin: 0;
      padding: 8px 0 16px;
      font-family: Source Sans Pro, Helvetica, Arial, sans-serif;
      font-size: 12px;
      font-weight: normal;
      line-height: 16px;
      color: #888;
      width: 80%;
      ">
      Developed and maintained by DesignerDudes Pvt. Ltd.
      </p>
      
      <p style="
      margin: 0;
      padding: 8px 0 16px;
      font-family: Source Sans Pro, Helvetica, Arial, sans-serif;
      font-size: 12px;
      font-weight: normal;
      line-height: 16px;
      color: #888;
      ">
      For any queries, reach out to us at
      <a href="https://www.apluslaundry.in/contactUs" style="color: #444;" title="Link: apluslaundry.in/contactUs" target="_blank">
      apluslaundry.in/contactUs
      </a>
      </p>
      
      
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div align="center" bgcolor="#2E3190" valign="top" style="
                
            background-color: #2E3190;width:100%;padding: 20px 0;
          "></div>
                </td>
            </tr>
        </tbody>
      </table>
    
        
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

export const emailVerificationEmail = async (email, otp,fullName) => {
  const subject = "Your One Time Password for email verification";
  const body = ` 
  <tr>
                  <td align="left" valign="middle"
                      class="m_-5049272237331082851newLine m_-5049272237331082851resetPadding"
                      style="
color: #888;
font-family: Source Sans Pro, Helvetica, Arial,
sans-serif;
font-weight: normal;
font-size: 16px;
line-height: 20px;
margin: 0;
padding: 0;
">
                      <h1 class="m_-5049272237331082851headerText" style="
display: block;
margin: 0;
color: #000000;
font-family: Source Sans Pro, Helvetica, Arial,
  sans-serif;
font-size: 18px;
font-weight: normal;
line-height: 28px;
">
                          Hey ${fullName} ,
                      </h1>
                      <p style="
display: block;
font-family: Source Sans Pro, Helvetica, Arial,
  sans-serif;
font-size: 18px;
font-weight: normal;
color: #000000;
line-height: 28px;
margin: 0;
padding: 16px 0 0;
">
                          The OTP to verify this email id is
                      </p>
                      <p style="margin: 0; padding: 16px 0 0">
                          <b style="
  background: #F6F6F6;
  border-radius: 8px;
  color: #000;
  display: inline-block;
  font-size: 36px;
  font-weight: 600;
  line-height: 44px;
  letter-spacing: 1px;
  padding: 8px 32px;
">${otp}</b>
                      </p>
                      <p style="
display: block;
font-family: Source Sans Pro, Helvetica, Arial,
  sans-serif;
font-size: 18px;
font-weight: normal;
color: #000000;
line-height: 24px;
margin: 0;
padding: 16px 0 0;
">
                          In case there’s been a mistake, hit reply and
                          let us know right away.
                      </p>
                      <p style="
display: block;
font-family: Source Sans Pro, Helvetica, Arial,
  sans-serif;
font-size: 18px;
font-weight: normal;
color: #000000;
line-height: 24px;
margin: 0;
padding: 32px 0 0;
">
                          Thanks, <br />Team A Plus 
                      </p>
                  </td>
              </tr>
             
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


 
 
 
export const orderConfirmationEmail = async (email, orderDetails) => {
  const subject = "Order Confirmation";

  const laundryItemsTable = `
  <table style="border-collapse: collapse; width: 100%;">
      <thead>
          <tr>
              <th style="border: 1px solid #ddd; padding: 8px;">Item Name</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Total</th>

          </tr>
      </thead>
      <tbody>
          ${orderDetails.laundryItems.map(item => `
              <tr>
                  <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${item.price}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${ item.quantity * item.price}</td>

              </tr>
          `).join('')}
      </tbody>
  </table>
  `;

  const body = `
 
   
        <p>Dear Customer,</p>
        <p>Thank you for placing your order with Aplus Laundry. Below are the details of your order:</p>
        <p><strong>Order ID:</strong> ${orderDetails.orderId}</p>
        <p><strong>Order Type:</strong> ${orderDetails.orderType}</p>
        <p><strong>Order Date:</strong> ${new Date(orderDetails.orderDate).toLocaleDateString()}</p>
        <p><strong>Service:</strong> ${orderDetails.service}</p>
        <p><strong>Laundry Items:</strong></p>
        ${laundryItemsTable}
        <p><strong>Total Amount:</strong> ${orderDetails.totalAmount}</p>
        <p><strong>Status:</strong> ${orderDetails.status}</p>
        
        <p>Your order is being processed and will be delivered soon. We will keep you updated on the status of your order.</p>
        <p>If you have any questions or concerns, please feel free to contact us.</p>
        <p>Thank you for choosing Aplus Laundry.</p>
        <p>Best regards,</p>
        <p>Aplus Laundry Team</p>
        
        
        `;
        
        await mailSend(email, subject, body);
    };
    
    // <p><strong>Total Amount Paid:</strong> ${orderDetails.totalAmountPaid}</p>


export const orderStatusUpdateEmail = async (email, orderDetails) => {
  const subject = "Order Status Update";
 

  const body = `
  
 
 
    <p>Dear Customer,</p>
    <p>We are writing to inform you about the status update of your order with Aplus Laundry. Below are the updated details:</p>
    <p><strong>Order ID:</strong> ${orderDetails.orderId}</p>
    <p><strong>Updated Order Status:</strong> ${orderDetails.status}</p>
    <p>Your order is being processed and will be delivered soon. We will keep you updated on the status of your order.</p>
    <p>If you have any questions or concerns, please feel free to contact us.</p>
    <p>Thank you for choosing Aplus Laundry.</p> 
 

  `;

  await mailSend(email, subject, body);
};

 

   

