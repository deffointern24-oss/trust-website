const sendEmail = require('./sendEmail');

// Helper function to format currency
const formatCurrency = (amountInPaise) => {
  return `₹${(amountInPaise / 100).toLocaleString('en-IN')}`;
};

// Helper function to format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Send Donation Receipt Email
const sendDonationReceipt = async (donation, donor) => {
  try {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
    .amount-box { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; text-align: center; border-radius: 10px; margin: 20px 0; }
    .amount { font-size: 36px; font-weight: bold; margin: 10px 0; }
    .details { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e0e0e0; }
    .detail-label { font-weight: bold; color: #666; }
    .detail-value { color: #333; }
    .footer { background: #f5f5f5; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 14px; color: #666; }
    .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .impact-box { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🙏 Thank You for Your Donation!</h1>
      <p>Your generosity makes a difference</p>
    </div>
    
    <div class="content">
      <p>Dear <strong>${donor.name}</strong>,</p>
      
      <p>We are deeply grateful for your generous donation to ${process.env.TRUST_NAME || 'Arul Trust'}. Your contribution will help us continue our mission of providing quality education to underprivileged students.</p>
      
      <div class="amount-box">
        <div style="font-size: 18px;">Donation Amount</div>
        <div class="amount">${formatCurrency(donation.amount)}</div>
        <div style="font-size: 14px;">${donation.donationType === 'monthly' ? 'Monthly Donation' : 'One-time Donation'}</div>
      </div>
      
      <div class="impact-box">
        <strong>🌟 Your Impact:</strong> Your donation of ${formatCurrency(donation.amount)} will help provide educational resources, support teacher training programs, and create lasting positive change in our community.
      </div>
      
      <div class="details">
        <h3 style="margin-top: 0; color: #667eea;">Transaction Details</h3>
        <div class="detail-row">
          <span class="detail-label">Receipt Number:</span>
          <span class="detail-value">${donation.orderId || donation.razorpay_order_id}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Amount:</span>
          <span class="detail-value">${formatCurrency(donation.amount)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Date & Time:</span>
          <span class="detail-value">${formatDate(donation.paidAt || new Date())}</span>
        </div>
        <div class="detail-row" style="border-bottom: none;">
          <span class="detail-label">Status:</span>
          <span class="detail-value" style="color: #28a745; font-weight: bold;">✓ Completed</span>
        </div>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.TRUST_WEBSITE || 'https://arultrust.org'}" class="button">Visit Our Website</a>
      </div>
    </div>
    
    <div class="footer">
      <p style="margin: 5px 0;"><strong>${process.env.TRUST_NAME || 'Arul Education Trust'}</strong></p>
      <p style="margin: 15px 0 5px 0; font-size: 12px;">
        © ${new Date().getFullYear()} ${process.env.TRUST_NAME || 'Arul Trust'}. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
        `;

    return await sendEmail({
      email: donor.email,
      name: donor.name,
      subject: `Thank You for Your Donation - Receipt #${donation.orderId || donation.razorpay_order_id}`,
      html: htmlContent
    });

  } catch (error) {
    console.error('Error sending receipt email:', error);
    throw error;
  }
};

// Send Tax Certificate Email
const sendTaxCertificate = async (donation, donor, certificateNumber) => {
  try {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
    .certificate-box { background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%); padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center; }
    .certificate-number { font-size: 24px; font-weight: bold; color: #2d3436; }
    .details { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .detail-row { padding: 10px 0; border-bottom: 1px solid #e0e0e0; }
    .footer { background: #f5f5f5; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 14px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📄 80G Tax Exemption Certificate</h1>
      <p>Income Tax Deduction Certificate</p>
    </div>
    
    <div class="content">
      <p>Dear <strong>${donor.name}</strong>,</p>
      
      <p>Thank you for your generous donation to ${process.env.TRUST_NAME || 'Arul Trust'}. This is to certify that we have received your donation, which is eligible for tax deduction under Section 80G of the Income Tax Act, 1961.</p>
      
      <div class="certificate-box">
        <div style="font-size: 16px; margin-bottom: 10px;">Certificate Number</div>
        <div class="certificate-number">${certificateNumber}</div>
      </div>
      
      <div class="details">
        <h3 style="margin-top: 0; color: #11998e;">Donation Details</h3>
        <div class="detail-row">
          <strong>Donor Name:</strong> ${donor.name}
        </div>
        <div class="detail-row">
          <strong>Amount Donated:</strong> ${formatCurrency(donation.amount)}
        </div>
        <div class="detail-row">
          <strong>Date of Donation:</strong> ${formatDate(donation.paidAt || new Date())}
        </div>
      </div>
      
      <p style="margin-top: 30px;">With warm regards,<br><strong>${process.env.TRUST_NAME || 'Arul Trust'}</strong></p>
    </div>
    
    <div class="footer">
      <p style="margin: 15px 0 5px 0; font-size: 12px;">
        © ${new Date().getFullYear()} ${process.env.TRUST_NAME || 'Arul Trust'}. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
        `;

    return await sendEmail({
      email: donor.email,
      name: donor.name,
      subject: `80G Tax Exemption Certificate - ${certificateNumber}`,
      html: htmlContent
    });

  } catch (error) {
    console.error('Error sending tax certificate email:', error);
    throw error;
  }
};

// Send Welcome Email to New Donor
const sendWelcomeEmail = async (donor) => {
  try {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
    .footer { background: #f5f5f5; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 14px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🙏 Welcome to Our Family!</h1>
    </div>
    
    <div class="content">
      <p>Dear <strong>${donor.name}</strong>,</p>
      
      <p>Welcome to the ${process.env.TRUST_NAME || 'Arul Trust'} family! We are honored to have you as a supporter of our mission to provide quality education to underprivileged students.</p>
      
      <p style="margin-top: 30px;">With gratitude,<br><strong>${process.env.TRUST_NAME || 'Arul Trust'} Team</strong></p>
    </div>
    
    <div class="footer">
      <p style="margin: 5px 0;">${process.env.TRUST_EMAIL || 'info@arultrust.org'}</p>
    </div>
  </div>
</body>
</html>
        `;

    return await sendEmail({
      email: donor.email,
      name: donor.name,
      subject: `Welcome to ${process.env.TRUST_NAME || 'Arul Trust'} Family!`,
      html: htmlContent
    });

  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
};

// Send Password Reset Email
const sendPasswordResetEmail = async (admin, resetUrl) => {
  try {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
    .button { display: inline-block; background: #ff416c !important; color: white !important; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
    .footer { background: #f5f5f5; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 14px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔐 Password Reset Request</h1>
    </div>
    
    <div class="content">
      <p>Hello <strong>${admin.name}</strong>,</p>
      
      <p>You are receiving this email because a password reset request was made for your account.</p>
      
      <div style="text-align: center;">
        <a href="${resetUrl}" class="button">Reset Password</a>
      </div>
      
      <p>If the button doesn't work, copy and paste this link:</p>
      <p style="word-break: break-all; color: #ff416c;">${resetUrl}</p>
      
      <p><strong>Note:</strong> This link will expire in 30 minutes.</p>
    </div>
    
    <div class="footer">
      <p>Arul Education Trust</p>
    </div>
  </div>
</body>
</html>
        `;

    return await sendEmail({
      email: admin.email,
      name: admin.name,
      subject: 'Password Reset Request',
      html: htmlContent
    });

  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

module.exports = {
  sendDonationReceipt,
  sendTaxCertificate,
  sendWelcomeEmail,
  sendPasswordResetEmail
};
