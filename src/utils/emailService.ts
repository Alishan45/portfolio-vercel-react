import emailjs from '@emailjs/browser';

// EmailJS configuration - you'll need to set these up in your EmailJS account
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_AUTO_REPLY_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

export interface EmailData {
  name: string;
  email: string;
  message: string;
}

export const sendEmailViaEmailJS = async (data: EmailData): Promise<boolean> => {
  try {
    const emailJSConfigured = EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY;
    if (!emailJSConfigured) {
      console.warn('EmailJS not configured; skipping fallback submission.');
      return false;
    }

    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      message: data.message,
      to_name: 'Ali Shan',
    };

    // Send the main inquiry email to the owner
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );
    console.log('Email sent successfully via EmailJS');

    // Send the auto-reply to the user if the template is configured
    if (EMAILJS_AUTO_REPLY_TEMPLATE_ID) {
      const autoReplyParams = {
        to_name: data.name,
        to_email: data.email, // Variable to map to the user's email in EmailJS auto-reply template
        reply_to: 'ali3819381@gmail.com',
      };

      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_AUTO_REPLY_TEMPLATE_ID,
          autoReplyParams,
          EMAILJS_PUBLIC_KEY
        );
        console.log('Auto-reply sent successfully via EmailJS');
      } catch (autoReplyError) {
        console.error('Error sending auto-reply via EmailJS:', autoReplyError);
      }
    }

    return true;
  } catch (error) {
    console.error('Error sending email via EmailJS:', error);
    return false;
  }
};

// Fallback email service using a simple form submission
export const sendEmailViaFormSubmit = async (data: EmailData): Promise<boolean> => {
  try {
    // This is a simple fallback that just logs the data
    // In a real scenario, you might use a service like Formspree, Netlify Forms, etc.
    console.log('Fallback email service - Contact form data:', {
      ...data,
      timestamp: new Date().toISOString(),
    });
    
    // Simulate success
    return true;
  } catch (error) {
    console.error('Error in fallback email service:', error);
    return false;
  }
};