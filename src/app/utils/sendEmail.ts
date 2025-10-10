import nodemailer from "nodemailer";
import envVariables from "../../config/env";

const sendEmail = async (to: string, subject: string, text: string, resetLink?: string) => {
  const port = parseInt(envVariables.SMTP.PORT);
  const secure = port === 465; // true for 465, false for other ports like 587

  const transporter = nodemailer.createTransport({
    host: envVariables.SMTP.HOST,
    port,
    secure,
    auth: {
      user: envVariables.SMTP.USER,
      pass: envVariables.SMTP.PASS,
    },
    tls: {
      rejectUnauthorized: false, // Allow self-signed certificates if needed
    },
  });

  // Create HTML content if resetLink is provided
  const htmlContent = resetLink
    ? `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #f9f9f9; padding: 30px; border-radius: 10px; text-align: center;">
        <h2 style="color: #2c3e50; margin-bottom: 20px;">Portfolio Password Reset Request</h2>
        
        <p style="font-size: 16px; margin-bottom: 30px; color: #555;">
          You requested a password reset for your account. Click the button below to reset your password:
        </p>
        
        <div style="margin: 30px 0;">
          <a href="${resetLink}" 
             style="background-color: #3498db; color: white; padding: 15px 30px; text-decoration: none; 
                    border-radius: 5px; font-size: 16px; font-weight: bold; display: inline-block; 
                    transition: background-color 0.3s;">
            Reset Password
          </a>
        </div>
        
        <p style="font-size: 14px; color: #666; margin-top: 30px;">
          If the button doesn't work, copy and paste this link into your browser:
        </p>
        
        <p style="font-size: 14px; color: #3498db; word-break: break-all; margin-top: 10px;">
          ${resetLink}
        </p>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        
        <p style="font-size: 12px; color: #888;">
          This link will expire in 1 hour. If you didn't request this password reset, please ignore this email.
        </p>
      </div>
    </body>
    </html>
  `
    : undefined;

  const mailOptions = {
    from: envVariables.SMTP.FROM,
    to,
    subject,
    text,
    ...(htmlContent && { html: htmlContent }),
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
