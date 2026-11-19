import { Resend } from "resend";
import OTP from "../models/otpModel.js";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function sendOtpService(email) {
  if (!resend) {
    const error = new Error("Email delivery is not configured.");
    error.status = 503;
    throw error;
  }

  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  // Upsert OTP (replace if it already exists)
  await OTP.findOneAndUpdate(
    { email },
    { otp, createdAt: new Date() },
    { upsert: true }
  );

  const html = `
    <div style="font-family:sans-serif;">
      <h2>Your OTP is: ${otp}</h2>
      <p>This OTP is valid for 10 minutes.</p>
    </div>
  `;

  await resend.emails.send({
    from: "Storage App <otp@procodrr.dev>",
    to: email,
    subject: "Storage App OTP",
    html,
  });

  return { success: true, message: `OTP sent successfully on ${email}` };
}
