const nodemailer = require('nodemailer');

const sendEmail = async (to, template, subject = "Urban Aid Notification") => {
  try {
    // Create a transporter using environment variables
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Setup email options
    const mailOptions = {
      from: `"Urban Aid" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: template,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    
    console.log(`Email sent: ${info.messageId}`);
    
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports = sendEmail;
