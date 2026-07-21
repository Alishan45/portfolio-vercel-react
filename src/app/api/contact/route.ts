import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get email configuration from environment variables.
    const senderEmail = (process.env.EMAIL || process.env.SMTP_EMAIL || '').trim();
    const senderPassword = (process.env.EMAIL_PASSWORD || process.env.SMTP_PASSWORD || '').trim();
    const recipientEmail = senderEmail;

    if (!senderEmail || !senderPassword) {
      console.error('Email configuration missing:', {
        senderEmail: !!senderEmail,
        senderPassword: !!senderPassword,
      });
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Create transporter with simple Gmail SMTP settings.
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: senderEmail,
        pass: senderPassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    try {
      await transporter.verify();
      console.log('SMTP server is ready to take our messages');
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError);
      return NextResponse.json(
        {
          error:
            'Email service authentication failed. Check EMAIL and EMAIL_PASSWORD, and use a Gmail app password if using Gmail.',
        },
        { status: 500 }
      );
    }

    const ownerMailOptions = {
      from: `"Portfolio Website" <${senderEmail}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #4F46E5;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 12px;">
            This message was sent from your portfolio contact form on ${new Date().toLocaleString()}.
          </p>
        </div>
      `,
    };

    const autoReplyOptions = {
      from: `"Portfolio Website" <${senderEmail}>`,
      to: email,
      subject: 'We received your message',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
            Thanks for reaching out!
          </h2>
          <p>Hi ${name},</p>
          <p>Thank you for your message. I have received it and will get back to you as soon as possible.</p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #4F46E5; margin-top: 0;">Your Message:</h3>
            <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #4F46E5;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p>I'll review your message and respond as soon as possible.</p>
          <p>Best regards,<br/>Ali Shan</p>
        </div>
      `,
    };

    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(autoReplyOptions),
    ]);

    console.log('Emails sent successfully for contact form submission:', {
      name,
      email,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message:
          'Message sent successfully! Thank you for reaching out. You should receive a confirmation email shortly.',
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('Invalid login')) {
        return NextResponse.json(
          { error: 'Email service authentication failed' },
          { status: 500 }
        );
      }
      if (error.message.includes('Network')) {
        return NextResponse.json(
          { error: 'Network error while sending email' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}