"use server";
import nodemailer from "nodemailer";

export async function SendMail({
  reciepientEmail,
  otp,
  expiresAt,
}: {
  reciepientEmail: string;
  otp: string;
  expiresAt: string;
}) {
  try {
    const transporter = nodemailer.createTransport({
      host: "live.smtp.mailtrap.io",
      port: 587,
      auth: {
        user: "api",
        pass: "d0b388a3094a334dce0fe22277c42b0d",
      },
    });

    // Define mail options
    const mailOptions = {
      from: "zeus@vishawdeepsingh.in",
      to: reciepientEmail,
      subject: "Your OTP Code for Zeus",
      text: `Your OTP code is: ${otp}`,
      html: `<b>Your OTP code is: ${otp} and expires in 30 mins</b>`,
    };

    // Send the email using the transporter
    const info = await transporter.sendMail(mailOptions);

    console.log("Message sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}
