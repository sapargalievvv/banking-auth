import { betterAuth } from "better-auth";
import { expo } from "@better-auth/expo";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { emailOTP } from "better-auth/plugins";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

export const auth = betterAuth({
  plugins: [
    expo(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        console.log(email, otp, type);
        if (type === "email-verification") {
          const res = await resend.emails.send({
            from: "Auth <no-reply@beka.test.com>",
            to: email,
            subject: "Ваш код для входа",
            html: `
          <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
            <h2 style="color: #4f46e5;">Код подтверждения</h2>
            <p>Привет 👋</p>
            <p>Ваш код для входа:</p>
            <div style="font-size: 28px; font-weight: bold; letter-spacing: 6px; margin: 20px 0; color: #111;">
              ${otp}
            </div>
            <p>Код действителен несколько минут. Если вы не запрашивали вход — просто проигнорируйте письмо.</p>
          </div>
        `,
          });

          console.log(res);
        } else {
          // Send the OTP for password reset
        }
      },
    }),
  ],
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ["myapp:///sign-in"],
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
});
