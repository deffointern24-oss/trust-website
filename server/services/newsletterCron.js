const cron = require('node-cron');
const Subscriber = require('../model/Subscriber');
const sendEmail = require('./sendEmail');

const processWelcomeEmails = async () => {
    try {
        const newSubscribers = await Subscriber.find({
            isActive: true,
            welcomeEmailSent: false
        });

        if (newSubscribers.length === 0) return;

        console.log(`✉️ Sending welcome emails to ${newSubscribers.length} new subscribers...`);

        for (const sub of newSubscribers) {
            try {
                await sendEmail({
                    email: sub.email,
                    subject: `Welcome to ${process.env.TRUST_NAME || 'Arul Education Trust'}!`,
                    message: `Thank you for joining our newsletter! We'll keep you updated on our mission and impact.`,
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; color: #333;">
                            <div style="text-align: center; border-bottom: 2px solid #667eea; padding-bottom: 10px; margin-bottom: 20px;">
                                <h1 style="margin: 0; color: #667eea;">${process.env.TRUST_NAME || 'Arul Trust'}</h1>
                            </div>
                            
                            <h2 style="color: #333; text-align: center;">🙏 Thank You for Subscribing!</h2>
                            <p>Hello,</p>
                            <p>Thank you for joining the <strong>${process.env.TRUST_NAME || 'Arul Education Trust'}</strong> newsletter. We're excited to have you as part of our community.</p>
                            
                            <p>By subscribing, you'll receive updates on:</p>
                            <ul>
                                <li>Our latest educational programs</li>
                                <li>Impact stories from our students</li>
                                <li>Upcoming events and volunteering opportunities</li>
                                <li>Progress reports on our mission</li>
                            </ul>

                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${process.env.TRUST_WEBSITE || 'https://arultrust.org'}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; text-transform: uppercase; font-size: 13px; letter-spacing: 1px;">Visit Our Website</a>
                            </div>

                            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; font-size: 13px; color: #666;">
                                <strong>About Us:</strong> Our mission is to provide quality education to underprivileged students and create lasting positive change in our community.
                            </div>

                            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                            <p style="text-align: center; color: #999; font-size: 12px;">© ${new Date().getFullYear()} ${process.env.TRUST_NAME || 'Arul Trust'}. All rights reserved.</p>
                        </div>
                    `
                });

                sub.welcomeEmailSent = true;
                await sub.save();
            } catch (err) {
                console.error(`❌ Failed to send welcome email to ${sub.email}:`, err.message);
            }
        }
    } catch (error) {
        console.error('❌ Error in Welcome Email processor:', error);
    }
};

// Initialize the cron job
const initNewsletterCron = () => {
    // Run every 10 minutes for testing, or as needed
    const schedule = process.env.NODE_ENV === 'production' ? '*/30 * * * *' : '* * * * *';

    cron.schedule(schedule, () => {
        console.log('--- 🕒 Starting Newsletter Cron Job ---');
        processWelcomeEmails();
    });

    console.log(`🚀 Newsletter Cron Initialized (${schedule})`);
};

module.exports = initNewsletterCron;
