import nodemailer from "nodemailer";
import User from "../lib/models/User";
import bcryptjs from "bcryptjs";
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // configure email for usage
    const oneHour = 3600000;
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + oneHour,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + oneHour,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "1f75e1e8471b4e",
        pass: "5aff07531b7228",
      },
    });

    const emailOptions = {
      from: '"FoodByte 🍕" <help@foodbyte.com>', // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
      //   text: "Hello world?", // plain text body
      html:
        emailType === "VERIFY"
          ? `<p><b>Click the link below to verify your email address:</b></p>
           <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Verify your email</a>
           <p>If you did not request this email, you can safely ignore it.</p>  <br>
           <p>${hashedToken} </p>`
          : `<p><b>Click the link below to reset your password:</b></p>
           <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">Reset your password</a>
           <p>If you did not request this email, you can safely ignore it.</p>  <p>${hashedToken} </p>`,
    };

    const emailResponse = await transporter.sendMail(emailOptions);
    return emailResponse;

    // console.log("Message sent: %s", info.messageId);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
