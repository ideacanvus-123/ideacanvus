import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "jyotivankala123@gmail.com", // Apna email
        pass: "ltry rhoc lliz lcxj", // Apna app password
      },
    });

    const mailOptions = {
      from: `"Support Team" <jyotivankala123@gmail.com>`, // Apna email use kar
      to: "ideacanvus@gmail.com",
      subject: `📩 New Message from ${name}`, // Subject improve kiya
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`, // Plain text
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 10px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #007BFF;">📩 New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #f8f9fa; padding: 10px; border-radius: 5px;">${message}</p>
          <p>📧 This email was sent via the contact form.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
