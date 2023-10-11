export interface IEmailBody {
  approver_name: string;
  request_id: string;
  requester_name: string;
  date: string;
  quotation_link: string;
}

interface ReturnFunction {
  subject: string;
  body: string;
}

export interface IRequestApproved {
  request_id: string;
  requester_name: string;
  date: string;
  approver_name: string;
  approval_date: string;
  requester_email: string;
  company_name: string;
  quotation_link: string;
}

export interface IRequestRejected {
  request_id: string;
  requester_name: string;
  date: string;
  approver_name: string;
  approval_date: string;
  requester_email: string;
  brief_description: string;
  company_name: string;
}

export interface IInquiryReceived {
  requester_name: string;
  request_id: string;
  brief_description?: string;
  date: string;
  requester_email: string;
  company_name: string;
}

export interface IOrderConfirmed {
  requester_name: string;
  request_id: string;
  date: string;
  total_amount: string;
  delivery_date: string;
  requester_email: string;
  company_name: string;
}

interface IInquiryModification {
  requester_name: string;
  request_id: string;
  date: string;
  brief_description: string;
  requester_email: string;
  company_name: string;
}

interface IApprovalRequest {
  requester_name: string;
  request_id: string;
  date: string;
  total_amount: string;
  requester_email: string;
  quotation_link: string;
  company_name: string;
}

// TODO: WILL COMEBACK LATER
export const approvalRequiredEmail = (
  subject: string,
  body: IEmailBody
): ReturnFunction => {
  return {
    subject: `Approval Required: ${subject}`,
    body: `<!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        .email-content{ 
          font-size: 18px;
        }
        .email-container {
          padding: 20px;
        }
        .email-header {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 15px;
        }
        .email-details {
          margin-top: 8px;
          margin-bottom: 16px;
        }
        .email-signature {
          margin-top: 20px;
        }
        .reason {
          padding-bottom: 16px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          Dear ${body?.approver_name},
        </div>
        <div class="email-content">
        An approval is required for the following request:
        <ul class="email-details">
            <li>Request Id: <strong>${body?.request_id}</strong></li>
            <li>Requested by: <strong>${body?.requester_name}</strong></li>
            <li>Requested on: <strong>${body?.date}</strong></li>
          </ul>
          <p>Please review the request and provide your approval by clicking on the appropriate link below:</p>
          <p><a href="${body?.quotation_link}">View Quotation</a></p>
          <p>Thank you for your prompt attention to this matter.</p>
          <div class="email-signature">
          Best regards,<br />
          </div>
        </div>
      </div>
    </body>
    </html>
    `,
  };
};

export const requestApproved = (
  subject: string,
  body: IRequestApproved
): ReturnFunction => {
  return {
    subject: `Request Approved: ${subject}`,
    body: `<!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        .email-content{ 
          font-size: 18px;
        }
        .email-container {
          padding: 20px;
        }
        .email-header {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 15px;
        }
        .email-details {
          margin-top: 8px;
          margin-bottom: 16px;
        }
        .email-signature {
          margin-top: 20px;
        }
        .reason {
          padding-bottom: 16px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          Dear ${body?.requester_name},
        </div>
        <div class="email-content">
              We are pleased to inform you that your request has been approved:
          <ul class="email-details">
            <li>Request Quote Id: <strong>${body?.request_id}</strong></li>
            <li>Requested by: <strong>${body?.requester_name}</strong></li>
            <li>Requested on: <strong>${body?.date}</strong></li>
            <li>Approved by: <strong>${body?.approver_name}</strong></li>
            <li>Approved on: <strong> ${body?.approval_date}</strong></li>
          </ul>
          Your requested action will now proceed as planned.
          <p>Thank you for your attention to this matter.</p>
          <p><a href="${body?.quotation_link}">View Quotation</a></p>
          <div class="email-signature">
          Best regards,<br />
          </div>
        </div>
      </div>
    </body>
    </html>
    `,
  };
};

export const requestRejected = (
  subject: string,
  body: IRequestRejected
): ReturnFunction => {
  return {
    subject: `Request Rejected: ${subject}`,
    body: `<!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        .email-content{ 
          font-size: 18px;
        }
        .email-container {
          padding: 20px;
        }
        .email-header {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 15px;
        }
        .email-details {
          margin-top: 8px;
          margin-bottom: 16px;
        }
        .email-signature {
          margin-top: 20px;
        }
        .reason {
          padding-bottom: 16px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          Dear ${body?.requester_name},
        </div>
        <div class="email-content">
            We regret to inform you that your request has been rejected
          <ul class="email-details">
            <li>Request Quote ID: <strong>${body?.request_id}</strong></li>
            <li>Requested By: <strong>${body?.requester_name}</strong></li>
            <li>Requested on: <strong>${body?.date}</strong></li>
            <li>Rejected By: <strong>${body?.approver_name}</strong></li>
            <li>Rejected Date: <strong> ${body?.approval_date}</strong></li>
          </ul>
          <p class="reason"><strong>Reason:</strong> ${body?.brief_description}</p>
          If you have any questions or need further clarification, please contact at <a href="mailto:${body?.requester_email}">${body?.requester_email}</a> or <a href=tel:+966558276677>+966.55.827.6677</a>.
          <div class="email-signature">
          Thank you for your understanding.<br /><br />
          Best regards,<br />
          </div>
        </div>
      </div>
    </body>
    </html>
    `,
  };
};

export const inquiryReceived = (
  subject: string,
  body: IInquiryReceived
): ReturnFunction => {
  return {
    subject: `Inquiry Received: ${subject}`,
    body: `<!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        .email-content{ 
          font-size: 18px;
        }
        .email-container {
          padding: 20px;
        }
        .email-header {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 15px;
        }
        .email-details {
          margin-top: 8px;
          margin-bottom: 16px;
        }
        .email-signature {
          margin-top: 20px;
        }
        .reason {
          padding-bottom: 16px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          Dear ${body?.requester_name},
        </div>
        <div class="email-content">
        This is to confirm that we have received your inquiry. We appreciate your interest in our offerings.
        <ul class="email-details">
            <li>Inquiry ID: <strong>${body?.request_id}</strong></li>
            <li>Date: <strong>${body?.date}</strong></li>
          </ul>
          Our team is currently reviewing your inquiry and will respond with the relevant information as soon as possible. If you have any immediate questions or require assistance, please contact our support team at <a href="mailto:${body?.requester_email}">${body?.requester_email}</a> or <a href=tel:+966558276677>+966.55.827.6677</a>.
          <p>Thank you for considering us for your needs.</p>
          <div class="email-signature">
          Best regards,<br/>
          ${body?.company_name}
          </div>
        </div>
      </div>
    </body>
    </html>
    `,
  };
};

export const orderConfirmed = (
  subject: string,
  body: IOrderConfirmed
): ReturnFunction => {
  return {
    subject: `Order Confirmation: ${subject}`,
    body: `<!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        .email-content{ 
          font-size: 18px;
        }
        .email-container {
          padding: 20px;
        }
        .email-header {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 15px;
        }
        .email-details {
          margin-top: 8px;
          margin-bottom: 16px;
        }
        .email-signature {
          margin-top: 20px;
        }
        .reason {
          padding-bottom: 16px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          Dear ${body?.requester_name},
        </div>
        <div class="email-content">
        Thank you for placing an order with us. Your order with reference number ${body?.request_id} has been confirmed and is now being processed.
        <ul class="email-details">
            <li>Order Number: <strong>${body?.request_id}</strong></li>
            <li>Order Date: <strong>${body?.date}</strong></li>
            <li>Total Amount: <strong>${body?.total_amount}</strong></li>
            <li>Estimated Delivery Date: <strong>${body?.delivery_date}</strong></li>
          </ul>
          Please review the order details and ensure that all information is accurate. If you have any questions or need further assistance, feel free to contact us at <a href="mailto:${body?.requester_email}">${body?.requester_email}</a> or <a href=tel:+966558276677>+966.55.827.6677</a>.
          <p>We appreciate your business and look forward to serving you.</p>
          <div class="email-signature">
          Best regards,<br/>
          ${body?.company_name}
          </div>
        </div>
      </div>
    </body>
    </html>
    `,
  };
};

export const inquiryModification = (
  subject: string,
  body: IInquiryModification
): ReturnFunction => {
  return {
    subject: `Inquiry Modification: ${subject}`,
    body: `<!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .email-header {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 15px;
        }
        .email-details {
          margin-bottom: 10px;
        }
        .email-signature {
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          Dear ${body?.requester_name},
        </div>
        <div class="email-content">
        We would like to inform you that a modification has been made to your inquiry regarding ${body?.brief_description}.
        <ul class="email-details">
            <li>Inquiry ID: ${body?.request_id}</li>
            <li>Date of Modification: ${body?.date}</li>
            <li>Modified Details: ${body?.brief_description}</li>
            <li>Estimated Delivery Date: ${body?.date}</li>
          </ul>
          Please review the updated details. If you have any questions or need further clarification, please contact our support team at <a href="mailto:${body?.requester_email}">${body?.requester_email}</a> or <a href="phone:+966558276677">+966.55.827.6677</a>.
          <div class="email-signature">
          Thank you for considering ${body?.company_name}.
          <br />
          Best regards,<br><br />
            ${body?.company_name}
          </div>
        </div>
      </div>
    </body>
    </html>
    `,
  };
};

export const approvalRequest = (
  subject: string,
  body: IApprovalRequest
): ReturnFunction => {
  return {
    subject: `Quotation Approval Request: ${subject}`,
    body: `<!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .email-header {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 15px;
        }
        .email-details {
          margin-bottom: 10px;
        }
        .email-signature {
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          Dear ${body?.requester_name},
        </div>
        <div class="email-content">
        An approval is required for the following quotation:
        <ul class="email-details">
            <li>Quotation Number: ${body?.request_id}</li>
            <li>Requested By: ${body?.date}</li>
            <li>Date: ${body?.date}</li>
            <li>Total Amount: ${body?.total_amount}</li>
          </ul>
          Please review the quotation and provide your approval by clicking on the appropriate link below:
          ${body?.quotation_link} 
          <br />
          If you have any questions or concerns, please contact ${body?.requester_name} at ${body?.requester_email} or ${body?.requester_name} at ${body?.requester_email}.
        <br />         
        Thank you for your prompt attention to this matter.
        <br />
          Best regards,<br><br />
            ${body?.company_name}
          </div>
        </div>
      </div>
    </body>
    </html>
    `,
  };
};

export class EmailError extends Error {
    constructor(message: any) {
      super(message);
      this.name = "EmailError";
    }
  }
