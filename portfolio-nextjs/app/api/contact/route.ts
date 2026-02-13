import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod/v4';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(1, 'Name ist erforderlich').max(100),
  email: z.email('Bitte geben Sie eine gueltige E-Mail-Adresse ein'),
  message: z.string().min(1, 'Nachricht ist erforderlich').max(5000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    await resend.emails.send({
      from: 'Portfolio Kontakt <onboarding@resend.dev>',
      to: ['kravtsov.o@icloud.com'],
      subject: `Neue Kontaktanfrage von ${data.name}`,
      replyTo: data.email,
      text: [
        `Name: ${data.name}`,
        `E-Mail: ${data.email}`,
        '',
        'Nachricht:',
        data.message,
      ].join('\n'),
    });

    return NextResponse.json(
      { message: 'Nachricht erfolgreich gesendet' },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Ungueltige Eingabe', errors: error.issues },
        { status: 400 },
      );
    }

    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'Fehler beim Senden der Nachricht' },
      { status: 500 },
    );
  }
}
