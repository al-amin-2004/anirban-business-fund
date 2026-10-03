import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, code: string) => {
  try {
    await resend.emails.send({
      from: "Anirban Business Fund <onboarding@resend.dev>",
      to: email,
      subject: "Verify your email — Anirban Business Fund",
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>Verify Your Email</title>
          </head>

          <body
            style="
              margin: 0;
              padding: 0;
              background-color: #f8f7f2;
              font-family: Arial, Helvetica, sans-serif;
              color: #17201a;
            "
          >
            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="background-color: #f8f7f2; padding: 40px 16px;"
            >
              <tr>
                <td align="center">

                  <!-- Main Container -->
                  <table
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                    style="
                      max-width: 560px;
                      background-color: #ffffff;
                      border: 1px solid #dde5df;
                      border-radius: 16px;
                      overflow: hidden;
                    "
                  >

                    <!-- Header -->
                    <tr>
                      <td
                        style="
                          background-color: #0b3b22;
                          padding: 28px 32px;
                          text-align: center;
                        "
                      >
                        <div
                          style="
                            display: inline-block;
                            font-size: 20px;
                            font-weight: 700;
                            letter-spacing: 1px;
                            color: #ffffff;
                          "
                        >
                          ANIRBAN
                        </div>

                        <div
                          style="
                            margin-top: 5px;
                            font-size: 12px;
                            letter-spacing: 2px;
                            color: #d4a72c;
                            font-weight: 600;
                          "
                        >
                          BUSINESS FUND
                        </div>
                      </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px 36px 32px;">

                        <!-- Icon -->
                        <div
                          style="
                            width: 52px;
                            height: 52px;
                            line-height: 52px;
                            margin: 0 auto 22px;
                            text-align: center;
                            border-radius: 50%;
                            background-color: #e8f3ec;
                            color: #14532d;
                            font-size: 24px;
                          "
                        >
                          ✓
                        </div>

                        <h1
                          style="
                            margin: 0;
                            text-align: center;
                            font-size: 26px;
                            line-height: 34px;
                            color: #17201a;
                          "
                        >
                          Verify Your Email
                        </h1>

                        <p
                          style="
                            margin: 14px 0 0;
                            text-align: center;
                            font-size: 15px;
                            line-height: 24px;
                            color: #52605a;
                          "
                        >
                          Use the verification code below to confirm
                          your email address and continue creating your
                          Anirban Business Fund account.
                        </p>

                        <!-- OTP Box -->
                        <div
                          style="
                            margin: 30px 0;
                            padding: 22px;
                            text-align: center;
                            background-color: #f8f7f2;
                            border: 1px solid #dde5df;
                            border-radius: 12px;
                          "
                        >
                          <div
                            style="
                              margin-bottom: 10px;
                              font-size: 12px;
                              font-weight: 600;
                              letter-spacing: 1.5px;
                              color: #7a8580;
                              text-transform: uppercase;
                            "
                          >
                            Verification Code
                          </div>

                          <div
                            style="
                              font-size: 34px;
                              line-height: 42px;
                              font-weight: 700;
                              letter-spacing: 8px;
                              color: #14532d;
                            "
                          >
                            ${code}
                          </div>
                        </div>

                        <!-- Expiry -->
                        <div
                          style="
                            padding: 12px 16px;
                            background-color: #f8efcf;
                            border-radius: 8px;
                            text-align: center;
                            font-size: 13px;
                            line-height: 20px;
                            color: #5c4b16;
                          "
                        >
                          This verification code will expire in
                          <strong>2 minutes</strong>.
                        </div>

                        <p
                          style="
                            margin: 28px 0 0;
                            text-align: center;
                            font-size: 13px;
                            line-height: 21px;
                            color: #7a8580;
                          "
                        >
                          If you didn't request this verification code,
                          you can safely ignore this email.
                        </p>

                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td
                        style="
                          padding: 22px 32px;
                          background-color: #f8f7f2;
                          border-top: 1px solid #dde5df;
                          text-align: center;
                        "
                      >
                        <div
                          style="
                            font-size: 13px;
                            font-weight: 600;
                            color: #14532d;
                          "
                        >
                          Anirban Business Fund
                        </div>

                        <div
                          style="
                            margin-top: 6px;
                            font-size: 12px;
                            color: #7a8580;
                          "
                        >
                          A part of Anirban Organization
                        </div>

                        <div
                          style="
                            margin-top: 12px;
                            font-size: 11px;
                            color: #9aa39e;
                          "
                        >
                          This is an automated email. Please do not reply.
                        </div>
                      </td>
                    </tr>

                  </table>

                  <!-- Bottom Text -->
                  <div
                    style="
                      max-width: 560px;
                      margin-top: 18px;
                      text-align: center;
                      font-size: 11px;
                      line-height: 18px;
                      color: #9aa39e;
                    "
                  >
                    © ${new Date().getFullYear()} Anirban Business Fund.
                    All rights reserved.
                  </div>

                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    return { success: true, message: "Verification email sent successfully" };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return { success: false, message: "Failed to send verification email" };
  }
};
