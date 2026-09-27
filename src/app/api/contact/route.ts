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
      subject: `✨ New Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7fb; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); }
            .header { background: linear-gradient(135deg, #0284c7 0%, #3b82f6 100%); padding: 30px 40px; color: #ffffff; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.5px; }
            .content { padding: 40px; color: #334155; }
            .field { margin-bottom: 25px; }
            .label { font-size: 13px; text-transform: uppercase; color: #64748b; font-weight: 600; letter-spacing: 0.5px; margin-bottom: 8px; }
            .value { font-size: 16px; color: #0f172a; background: #f8fafc; padding: 12px 16px; border-radius: 6px; border: 1px solid #e2e8f0; }
            .message-box { font-size: 15px; line-height: 1.6; color: #1e293b; background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; white-space: pre-wrap; }
            .footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 13px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Sender Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email Address</div>
                <div class="value">
                  <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
                </div>
              </div>
              <div class="field">
                <div class="label">Message</div>
                <div class="message-box">${message}</div>
              </div>
            </div>
            <div class="footer">
              Sent securely from your Portfolio Website &copy; ${new Date().getFullYear()}
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const autoReplyOptions = {
      from: `"Ali Shan" <${senderEmail}>`,
      to: email,
      subject: 'Message Received - I will get back to you soon!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7fb; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); }
            .header { background: linear-gradient(135deg, #0284c7 0%, #06b6d4 100%); padding: 40px; text-align: center; }
            .header img { width: 60px; height: 60px; border-radius: 50%; border: 3px solid rgba(255, 255, 255, 0.2); margin-bottom: 15px; }
            .header h1 { margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; }
            .content { padding: 40px; color: #334155; line-height: 1.7; }
            .greeting { font-size: 18px; font-weight: 600; color: #0f172a; margin-bottom: 20px; }
            .quote-box { background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #06b6d4; margin: 30px 0; font-style: italic; color: #475569; }
            .btn { display: inline-block; background: #0ea5e9; color: white !important; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; margin-top: 20px; }
            .footer { background: #f8fafc; padding: 25px 40px; text-align: center; font-size: 13px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
            .social-links { margin-top: 15px; }
            .social-links a { color: #0ea5e9; text-decoration: none; margin: 0 10px; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Reaching Out!</h1>
            </div>
            <div class="content">
              <div class="greeting">Hi ${name},</div>
              <p>Thank you so much for getting in touch. I've successfully received your message and I'm thrilled to connect with you.</p>
              
              <div class="quote-box">
                "${message}"
              </div>
              
              <p>I am currently reviewing your inquiry and will get back to you as soon as possible with a detailed response. In the meantime, feel free to explore my portfolio for more of my recent work.</p>
              
              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-vercel-react.vercel.app'}" class="btn">Return to Portfolio</a>
              </div>
            </div>
            <div class="footer">
              <p>Best regards,</p>
              <p style="font-weight: 600; color: #334155; font-size: 16px; margin: 5px 0;">Ali Shan</p>
              <p>Data Scientist & AI/ML Engineer</p>
              <div class="social-links">
                <a href="https://github.com/Alishan45">GitHub</a> &bull; 
                <a href="https://www.linkedin.com/in/ali-shan-542246235/">LinkedIn</a>
              </div>
            </div>
          </div>
        </body>
        </html>
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