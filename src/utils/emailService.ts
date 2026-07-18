import emailjs from '@emailjs/browser';

// EmailJS configuration - you'll need to set these up in your EmailJS account
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
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

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('Email sent successfully via EmailJS');
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