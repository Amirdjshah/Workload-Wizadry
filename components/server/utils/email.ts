import * as nodemailer from "nodemailer";

// Create a transporter object using your email service provider's SMTP settings
const transporter = nodemailer.createTransport({
  service: "gmail", // E.g., 'Gmail', 'Outlook', or use your own SMTP settings
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Function to send an email
const sendEmail = async (
  to: string[] | string,
  subject: string,
  text: string,
  html: string
): Promise<boolean> => {
  try {
    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: `UC Workload Manager <${process.env.EMAIL_USER}>`, // Sender's email address
      to, // Recipient's email address
      subject, // Subject line
      text, // Plain text version of the email
      html, // HTML version of the email
    });
    console.log("Email sent:", info.response);
    return true; // Email sent successfully
  } catch (error) {
    console.log("ERR", error);
    return false; // Email failed to send
  }
};

const signupVerificationEmail = (
  email: string,
  name: string,
  verificationCode: string,
  baseUrl: string
) => {
  const emailBody = `<!DOCTYPE html>
  <html>
  
  <head>
      <title>Welcome to UC Workload Manager</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f0f0f0;
              display: flex;
              width: 100%;
              justify-content: left;
              align-items: left;
              height: 100vh;
          }
  
          .container {
              background-color: #ffffff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0px 0px 10px #888888;
              max-width: 400px;
              text-align: left;
          }
  
          a.button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #007BFF;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
          }
      </style>
  </head>
  
  <body>
          <div class="container">
              <p>Hi ${name},</p>
              <p>Welcome to UC Workload Manager!</p>
              <p>To activate your account, click the button below:</p>
              <p style="text-align: left;"><a class="button"
                      href="${baseUrl}/verify/${verificationCode}">Activate Your Account</a></p>
              <p>Best regards,<br>Workload Wizardry</p>
          </div>
  </body>
  
  </html>`;
  return sendEmail([email], "Welcome to the UC Workload Manager", "", emailBody);
};

const forgotPasswordEmail = async (
  email: string,
  name: string,
  resetToken: string,
  baseUrl: string
) => {
  const body = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Forgot Password</title>
      <style>
          /* Reset some default styles */
          body, html {
              margin: 0;
              padding: 0;
              text-align: left; /* Align all content to the left */
          }
  
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
          }
  
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              text-align: left; /* Align content within the container to the left */
          }
  
          .logo {
              margin-bottom: 20px;
              text-align: left; /* Align the logo to the left */
          }
  
          h1 {
              color: #333;
              text-align: left; /* Align the heading to the left */
          }
  
          p {
              color: #666;
              text-align: left; /* Align paragraphs to the left */
          }
  
          .btn {
              display: inline-block;
              padding: 10px 20px;
              background-color: #007bff;
              color: #fff !important;
              text-decoration: none;
              border-radius: 3px;
          }
  
          .btn:hover {
              background-color: #0056b3;
          }
          .btn:visited {
              color: #fff;
          }
  
          .notice {
              color: #ff6600;
              margin-top: 10px;
          }
  
          .warning-icon {
              font-size: 24px;
              vertical-align: middle;
              margin-right: 5px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <p>Hi ${name},</p> <!-- Include personalized greeting with the username -->
          <h1>Forgot Your Password?</h1>
          <p>No worries! To reset your password, click the button below:</p>
          <p><a class="btn" href="${baseUrl}/reset/${resetToken}">Reset Password</a></p>
          <p class="notice">
              <span class="warning-icon">⚠</span> Please note that the password reset token will expire in 1 hour. Be sure to reset your password within this time frame.
          </p>
          <p>If you didn't request a password reset, please ignore this email.</p>
          <p>Thanks,<br>Your Team</p>
      </div>
  </body>
  </html>`;
  return sendEmail(email, "Forget Your Password ?", "", body);
};

const sendEmailToCapabilityLeader = (
  workload_id: number,
  emails: any[],
  user: any,
  baseUrl: string
) => {
  const body = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Workload Request</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
                text-align: left;
            }
            .container {
                background-color: #fff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
            .btn {
                display: inline-block;
                background-color: #007BFF;
                color: #fff !important;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>New Workload Request</h1>
            <p>Hi,</p>
            <p>You have received a new workload request. Please click the "View Request" button below to review and take action accordingly.</p>
            <p>
                <a href="${baseUrl}/workload/view/${workload_id}" class="btn">View Request</a>
            </p>
            <p>Thank you for your prompt attention to this request.</p>
            <p>Best regards,</p>
            <p>Workload Wizardry</p>
        </div>
    </body>
    </html>`;
  return sendEmail(
    emails,
    `New Workload Request - By ${user?.firstName} ${user?.lastName}`,
    "",
    body
  );
};

const signUpRequestApprove = (email: string, user: any) => {
  const body = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Signup Request Approved</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f2f2f2;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333;
            }
            p {
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Signup Request Approved</h1>
            <p>
                Dear ${user.firstName} ${user.lastName},<br><br>
                
                Your signup request has been approved by the administrator. You can now create a workload using the provided credentials.
                
                <br><br>
                
                Best regards,<br>
                Workload Wizardry
            </p>
        </div>
    </body>
    </html>
    `;
  return sendEmail(email, `Signup Request Approved`, "", body);
};
const signUpRequestReject = (email: string, user: any) => {
  const body = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>User Signup Reject</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f2f2f2;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333;
            }
            p {
                color: #666;
            }
            .note {
                color: #999;
            }
            .button {
                background-color: #007bff;
                color: #fff;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                display: inline-block;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>User Signup Reject</h1>
            <p>
                Dear  ${user.firstName} ${user.lastName},<br><br>
                
                We inform you that your signup request has been rejected by the administrator. If you believe this is in error or if you have any questions, please contact the administrator for further assistance.
                
                <br><br>
                
                <span class="note">Please contact the administrator if you should get signup approval.</span>
                
                <br><br>
                
                Best regards,<br>
                Workload Wizardry
            </p>
        </div>
    </body>
    </html>
    `;
  return sendEmail(email, `Signup Request Rejected`, "", body);
};
const userSignupRequest = (email: string[], baseUrl: string) => {
  const body = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Signup Request</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
        }
        p {
            color: #666;
        }
        .button {
            background-color: #007bff;
            color: #fff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>User Signup Request</h1>
        <p>
            Hi,<br><br>
            
            You have received a user signup request. Please review the user's details and perform the necessary action.
            
            <br><br>
            Note: For security reasons, please ensure that the email address domain corresponds to your university domain before proceeding.
            
            <br><br>
            <a href="${baseUrl}/users/" class="btn">View Signup Request</a>
            <br><br>
            Best regards,<br>
   			Workload Wizardry
        </p>
    </div>
</body>
</html>
`;
  return sendEmail(email, `User Signup Request`, "", body);
};
const workloadApproveEmail = (email: string, user: any) => {
  const body = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Workload Request Has Been Approved</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
        }
        p {
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Your Workload Request Has Been Approved</h1>
        <p>
            Dear ${user.firstName} ${user.lastName},<br><br>
            
            I hope this email finds you well. We pleased to inform you that your workload request has been successfully approved.

            <br><br>
            Best regards,
            <br>Workload Wizardry</p>
        </p>
    </div>
</body>
</html>
`;
  return sendEmail(email, `Workload Approve`, "", body);
};
const workloadRejectEmail = (email: string, user: any, reason: string) => {
  const body = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Workload Request Has Been Rejected</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
        }
        p {
            color: #666;
        }
        .inp {
            padding: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Your Workload Request Has Been Rejected</h1>
        <p>
            Dear ${user.firstName} ${user.lastName},<br><br>
            
            Your workload request has been rejected due to the following reason:
            
            <br><br>
            <b>Reason:</b><br />
            <input disabled value='${reason}' class='inp'></input>
            <br><br>
            To make necessary edits based on the rejected reason and resubmit your workload request, please go to the workload application.
            <br><br>
            Best regards,
			<br>Workload Wizardry
        </p>
    </div>
</body>
</html>
`;
  return sendEmail(email, `Workload Reject`, "", body);
};

export {
  sendEmail,
  signupVerificationEmail,
  forgotPasswordEmail,
  sendEmailToCapabilityLeader,
  signUpRequestApprove,
  signUpRequestReject,
  userSignupRequest,
  workloadApproveEmail,
  workloadRejectEmail,
};
