'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendEmailViaEmailJS } from '@/utils/emailService';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage(null);

    let emailSent = false;

    try {
      // Primary method: Use Next.js API route with Nodemailer
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('Message sent successfully via Nodemailer:', data);
        emailSent = true;
      } else {
        const primaryErrorMessage = data?.error || 'Failed to send message via primary method';
        setErrorMessage(primaryErrorMessage);
        throw new Error(primaryErrorMessage);
      }

    } catch (primaryError) {
      console.error('Primary email method failed:', primaryError);
      
      try {
        // Fallback method: Use EmailJS
        console.log('Attempting fallback email method...');
        const emailJSSuccess = await sendEmailViaEmailJS(formData);
        
        if (emailJSSuccess) {
          console.log('Message sent successfully via EmailJS');
          emailSent = true;
        } else {
          const fallbackMessage = 'EmailJS fallback failed or is not configured.';
          setErrorMessage(fallbackMessage);
          throw new Error(fallbackMessage);
        }
      } catch (fallbackError) {
        console.error('Fallback email method also failed:', fallbackError);
        setErrorMessage((fallbackError instanceof Error && fallbackError.message) ? fallbackError.message : 'Message could not be sent. Please try again later.');
      }
    }

    if (emailSent) {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Auto-reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } else {
      setStatus('error');
      
      // Auto-reset error message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const statusMessages = {
    sending: { text: "Sending message...", className: "bg-cyan-900/80 text-cyan-100 border border-cyan-500/20" },
    success: { text: "Message sent successfully!", className: "bg-emerald-900/85 text-emerald-100 border border-emerald-500/20" },
    error: { text: errorMessage || "Failed to send message. Please try again.", className: "bg-red-900/85 text-red-100 border border-red-500/20" }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute w-96 h-96 bg-cyan-500/15 rounded-full mix-blend-multiply filter blur-3xl animate-blob top-0 -right-4"></div>
        <div className="absolute w-96 h-96 bg-blue-500/12 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 bottom-0 -left-4"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={formVariants}
          className="glass-card rounded-[32px] shadow-deep p-8 border border-cyan-500/10"
        >
          <motion.h2
            variants={inputVariants}
            className="text-4xl font-bold text-center mb-8 text-slate-100"
          >
            Get in Touch
          </motion.h2>

          <motion.p
            variants={inputVariants}
            className="text-slate-300 text-center mb-8"
          >
            Have a question or want to work together? Feel free to reach out!
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence>
              {status !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-4 rounded-lg ${statusMessages[status].className}`}
                >
                  {statusMessages[status].text}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={inputVariants}>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-200 mb-2"
              >
                Name
              </label>
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className={`mt-1 block w-full rounded-lg border-2 shadow-sm 
                    ${focusedField === 'name' 
                      ? 'border-cyan-400 ring-2 ring-cyan-300/50' 
                      : 'border-slate-700 dark:border-slate-600'} 
                    dark:bg-slate-950 dark:text-slate-100 
                    focus:outline-none focus:ring-2 focus:ring-cyan-300/40
                    transition-all duration-200 ease-in-out
                    p-3`}
                  placeholder="Your name"
                />
              </motion.div>
            </motion.div>

            <motion.div variants={inputVariants}>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-200 mb-2"
              >
                Email
              </label>
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className={`mt-1 block w-full rounded-lg border-2 shadow-sm p-3
                    ${focusedField === 'email' 
                      ? 'border-cyan-400 ring-2 ring-cyan-300/50' 
                      : 'border-slate-700 dark:border-slate-600'} 
                    dark:bg-slate-950 dark:text-slate-100 
                    focus:outline-none focus:ring-2 focus:ring-cyan-300/40
                    transition-all duration-200 ease-in-out`}
                />
              </motion.div>
            </motion.div>

            <motion.div variants={inputVariants}>
              <label htmlFor="message"
                className="block text-sm font-medium text-slate-200 mb-2"
              >
                Message
              </label>
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className={`mt-1 block w-full rounded-lg border-2 shadow-sm p-3
                    ${focusedField === 'message' 
                      ? 'border-cyan-400 ring-2 ring-cyan-300/50' 
                      : 'border-slate-700 dark:border-slate-600'} 
                    dark:bg-slate-950 dark:text-slate-100 
                    focus:outline-none focus:ring-2 focus:ring-cyan-300/40
                    transition-all duration-200 ease-in-out`}
                />
              </motion.div>
            </motion.div>

            <motion.div variants={inputVariants}>
              <button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full py-3 px-4 rounded-full text-white font-semibold shadow-lg shadow-cyan-500/20 ${
                  status === 'sending'
                    ? 'bg-cyan-600'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400'
                } transition-all duration-200`}
              >
                {status === 'sending'
                  ? 'Sending...'
                  : status === 'success'
                  ? 'Message Sent!'
                  : 'Send Message'}
              </button>
            </motion.div>

            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 text-center mt-2"
              >
                Error sending message. Please try again.
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
