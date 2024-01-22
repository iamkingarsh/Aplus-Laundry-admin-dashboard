
// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure

import twilio from 'twilio';

const accountSid = "AC174d9f4e3396d74c65ff050a96a290d6";
const authToken = "55bc7f1ef70a3e4d06fdf8c2fd6c63c5"; 
const verifySid = "VAf813d0718e6a93163bda9b52951c1e80";

const client = twilio(accountSid, authToken);

export const sendVerificationCode = async (to) => {
    console.log('to',to);
  try {
    const verification = await client.verify.services(verifySid)
      .verifications.create({ to, channel: 'sms' });

    console.log(verification.status);
    return verification;
  } catch (error) {
    console.error('Error sending verification code:', error);
    throw error;
  }
};

export const checkVerificationCode = async (to, otpCode) => {
  try {
    const verificationCheck = await client.verify.services(verifySid)
      .verificationChecks.create({ to, code: otpCode });

    console.log(verificationCheck.status);
    return verificationCheck;
  } catch (error) {
    console.error('Error checking verification code:', error);
    throw error;
  }
};

// module.exports = { sendVerificationCode, checkVerificationCode };
