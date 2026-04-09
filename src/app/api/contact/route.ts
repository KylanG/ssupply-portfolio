import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  console.log('API key present:', !!process.env.RESEND_API_KEY)
  console.log('Contact email:', process.env.CONTACT_EMAIL)

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { firstName, lastName, email, subject, message } = await req.json()

    const subjectLabels: Record<string, string> = {
      generalEnquiry: 'General enquiry',
      support: 'Support',
      partnership: 'Partnership',
      other: 'Other',
    }
    const subjectLabel = subjectLabels[subject] ?? subject

    const { data, error } = await resend.emails.send({
      from: 'SSUPPLY <noreply@seansupply.com>',
      to: process.env.CONTACT_EMAIL!,
      subject: `[SSUPPLY] ${subjectLabel} — from ${firstName} ${lastName}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subjectLabel}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
    }

    console.log('Resend success:', data)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
  }
}