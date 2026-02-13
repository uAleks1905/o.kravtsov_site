'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v4';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, Loader2, CheckCircle, XCircle, MessageSquare } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(1, 'Name ist erforderlich').max(100),
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
  message: z.string().min(1, 'Nachricht ist erforderlich').max(5000),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Fehler beim Senden');
      }

      setStatus('success');
      form.reset();

      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Es gab einen Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut.'
      );
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-1/4 right-10 w-80 h-80 border-[12px] border-brand-pink rotate-12"></div>
        <div className="absolute bottom-1/4 left-10 w-64 h-64 border-[12px] border-brand-secondary -rotate-12"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-brand-pink border-4 border-brand-text px-6 py-3 mb-6 shadow-[6px_6px_0px_0px_rgba(15,15,15,1)]">
            <MessageSquare className="w-6 h-6" strokeWidth={3} />
            <span className="font-['var(--font-ibm-mono)'] text-sm font-bold">CONTACT.HTML</span>
          </div>
          <h2 className="font-['var(--font-bebas)'] text-6xl sm:text-7xl lg:text-8xl leading-none mb-6">
            KONTAKT
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Hast du ein spannendes Projekt oder möchtest du zusammenarbeiten? Lass uns reden!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Email */}
            <div className="bg-brand-primary border-4 border-brand-text p-6 shadow-[8px_8px_0px_0px_rgba(15,15,15,1)] hover:shadow-[4px_4px_0px_0px_rgba(15,15,15,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200">
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-brand-text p-3 border-3 border-brand-text">
                  <Mail className="w-6 h-6 text-brand-primary" strokeWidth={3} />
                </div>
                <h3 className="font-['var(--font-bebas)'] text-2xl">E-MAIL</h3>
              </div>
              <a
                href="mailto:kravtsov.o@icloud.com"
                className="font-['var(--font-ibm-mono)'] text-sm hover:underline"
              >
                kravtsov.o@icloud.com
              </a>
            </div>

            {/* Phone */}
            <div className="bg-brand-secondary border-4 border-brand-text p-6 shadow-[8px_8px_0px_0px_rgba(15,15,15,1)] hover:shadow-[4px_4px_0px_0px_rgba(15,15,15,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200">
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-brand-text p-3 border-3 border-brand-text">
                  <Phone className="w-6 h-6 text-brand-secondary" strokeWidth={3} />
                </div>
                <h3 className="font-['var(--font-bebas)'] text-2xl">TELEFON</h3>
              </div>
              <a
                href="tel:+4917683302770"
                className="font-['var(--font-ibm-mono)'] text-sm hover:underline"
              >
                +49 176 83302770
              </a>
            </div>

            {/* Decorative quote */}
            <div className="bg-brand-text text-brand-accent border-4 border-brand-text p-6 shadow-[6px_6px_0px_0px_rgba(0,255,136,1)]">
              <p className="font-['var(--font-ibm-mono)'] text-sm leading-relaxed">
                "The best way to predict the future is to invent it."
              </p>
              <p className="font-['var(--font-ibm-mono)'] text-xs mt-2 opacity-70">
                — Alan Kay
              </p>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name field */}
              <div>
                <label className="block font-['var(--font-bebas)'] text-xl mb-2">
                  NAME*
                </label>
                <input
                  {...form.register('name')}
                  type="text"
                  className="w-full bg-brand-container border-4 border-brand-text p-4 font-['var(--font-ibm-mono)'] text-sm focus:outline-none focus:border-brand-primary focus:shadow-[4px_4px_0px_0px_rgba(0,255,136,1)] transition-all"
                  placeholder="Dein Name"
                />
                {form.formState.errors.name && (
                  <p className="mt-2 text-sm text-brand-pink font-['var(--font-ibm-mono)']">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              {/* Email field */}
              <div>
                <label className="block font-['var(--font-bebas)'] text-xl mb-2">
                  E-MAIL*
                </label>
                <input
                  {...form.register('email')}
                  type="email"
                  className="w-full bg-brand-container border-4 border-brand-text p-4 font-['var(--font-ibm-mono)'] text-sm focus:outline-none focus:border-brand-primary focus:shadow-[4px_4px_0px_0px_rgba(0,255,136,1)] transition-all"
                  placeholder="deine@email.com"
                />
                {form.formState.errors.email && (
                  <p className="mt-2 text-sm text-brand-pink font-['var(--font-ibm-mono)']">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              {/* Message field */}
              <div>
                <label className="block font-['var(--font-bebas)'] text-xl mb-2">
                  NACHRICHT*
                </label>
                <textarea
                  {...form.register('message')}
                  rows={6}
                  className="w-full bg-brand-container border-4 border-brand-text p-4 font-['var(--font-ibm-mono)'] text-sm focus:outline-none focus:border-brand-primary focus:shadow-[4px_4px_0px_0px_rgba(0,255,136,1)] transition-all resize-none"
                  placeholder="Deine Nachricht..."
                />
                {form.formState.errors.message && (
                  <p className="mt-2 text-sm text-brand-pink font-['var(--font-ibm-mono)']">
                    {form.formState.errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="
                  w-full flex items-center justify-center gap-3
                  bg-brand-primary text-brand-text border-4 border-brand-text
                  px-8 py-4 font-['var(--font-bebas)'] text-2xl tracking-wider
                  shadow-[8px_8px_0px_0px_rgba(15,15,15,1)]
                  hover:shadow-[4px_4px_0px_0px_rgba(15,15,15,1)]
                  hover:translate-x-[4px] hover:translate-y-[4px]
                  active:shadow-none active:translate-x-[8px] active:translate-y-[8px]
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200
                "
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" strokeWidth={3} />
                    WIRD GESENDET...
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6" strokeWidth={3} />
                    NACHRICHT SENDEN
                  </>
                )}
              </button>

              {/* Success message */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-brand-primary border-4 border-brand-text p-4 shadow-[6px_6px_0px_0px_rgba(15,15,15,1)]"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 shrink-0" strokeWidth={3} />
                    <p className="font-['var(--font-ibm-mono)'] text-sm">
                      Nachricht erfolgreich gesendet! Ich melde mich bald bei dir.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Error message */}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-brand-pink border-4 border-brand-text p-4 shadow-[6px_6px_0px_0px_rgba(15,15,15,1)]"
                >
                  <div className="flex items-center gap-3">
                    <XCircle className="w-6 h-6 shrink-0" strokeWidth={3} />
                    <p className="font-['var(--font-ibm-mono)'] text-sm">
                      {errorMessage}
                    </p>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-brand-primary"></div>
    </section>
  );
}
