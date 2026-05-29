import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});
export const sendEmail = async (to, subject, html) => {
    console.log('SMTP_HOST:', process.env.SMTP_HOST);
    console.log('SMTP_USER:', process.env.SMTP_USER);
    console.log('SMTP_PASS défini:', !!process.env.SMTP_PASS);
    try {
        await transporter.sendMail({
            from: `"GMAO Pro" <${process.env.SMTP_FROM}>`,
            to,
            subject,
            html
        });
        console.log(`✅ Email envoyé à ${to}`);
    }
    catch (error) {
        console.error('❌ Erreur envoi email:', error);
    }
};
//# sourceMappingURL=emailNotifService.js.map