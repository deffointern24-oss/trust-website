const axios = require('axios');

const sendEmail = async (options) => {
    try {
        if (!process.env.BREVO_API_KEY) {
            throw new Error('BREVO_API_KEY missing in environment variables');
        }

        if (!process.env.BREVO_SENDER_EMAIL) {
            throw new Error('BREVO_SENDER_EMAIL missing in environment variables');
        }

        const response = await axios.post(
            'https://api.brevo.com/v3/smtp/email',
            {
                sender: {
                    name: process.env.BREVO_SENDER_NAME || 'Arul Trust',
                    email: process.env.BREVO_SENDER_EMAIL,
                },
                to: [
                    {
                        email: options.email,
                        name: options.name || 'User',
                    },
                ],
                subject: options.subject,
                htmlContent: options.html || `<p>${options.message}</p>`,
                textContent: options.message,
            },
            {
                headers: {
                    'api-key': process.env.BREVO_API_KEY,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('✅ Email sent successfully:', response.data.messageId);

        return {
            success: true,
            messageId: response.data.messageId,
        };

    } catch (error) {
        const errorMessage =
            error.response?.data?.message ||
            error.response?.data ||
            error.message;

        console.error('❌ Email sending failed:', errorMessage);

        throw new Error(errorMessage);
    }
};

module.exports = sendEmail;