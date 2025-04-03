// pages/api/contact.js
import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body

    // Set up transporter with credentials stored in env variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    try {
      await transporter.sendMail({
        from: email,
        to: process.env.MY_EMAIL,
        subject: `New Message from ${name}`,
        text: message
      })

      res.status(200).json({ message: 'Email sent successfully!' })
    } catch (error) {
      res.status(500).json({ error: 'Error sending email' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
