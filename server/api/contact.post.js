import { buildEmail } from '../utils/emailTemplate'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const contactTo = config.contactTo || process.env.CONTACT_EMAIL || 'contacto@juanmiguel.dev'
  const resendApiKey = config.resendApiKey || process.env.RESEND_API_KEY
  
  // Clean up quotes that Vercel might add
  let rawFrom = config.resendFrom || process.env.RESEND_FROM || 'Portafolio <portafolio@example.com>'
  if (typeof rawFrom === 'string') {
    rawFrom = rawFrom.replace(/^["']|["']$/g, '').trim()
  }
  const resendFromPrimary = rawFrom

  const resendFallbackFrom = config.resendFallbackFrom || process.env.RESEND_FALLBACK_FROM || ''

  if (!resendApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Falta RESEND_API_KEY'
    })
  }

  const name = body?.name?.trim()
  const email = body?.email?.trim()
  const message = body?.message?.trim()

  if (!name || !email || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Todos los campos son obligatorios.'
    })
  }

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
  if (!emailRegex.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Correo no valido.'
    })
  }

  const tryResend = async (fromAddress) => {
    if (!resendApiKey) return { ok: false, reason: 'No Resend API key' }

    const { subject, text: plainText, html } = buildEmail({ name, email, message })

    let response
    try {
      response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [contactTo],
          subject,
          reply_to: email,
          text: plainText,
          html
        })
      })
    } catch (err) {
      console.error('Resend network error', err)
      return { ok: false, reason: 'Network error hacia Resend' }
    }

    if (!response.ok) {
      let bodyText = ''
      try {
        bodyText = await response.text()
      } catch (err) {
        bodyText = 'No response body'
      }
      console.error('Resend API error', response.status, bodyText)
      return { ok: false, status: response.status, body: bodyText.slice(0, 500) }
    }

    return { ok: true, from: fromAddress }
  }

  const firstAttempt = await tryResend(resendFromPrimary)
  if (firstAttempt.ok) return { ok: true, via: 'resend', from: resendFromPrimary }

  let secondAttempt = null
  const bodyLower = (firstAttempt.body || '').toLowerCase()
  if (
    resendFallbackFrom &&
    firstAttempt.status === 403 &&
    bodyLower.includes('not verified') &&
    resendFallbackFrom !== resendFromPrimary
  ) {
    secondAttempt = await tryResend(resendFallbackFrom)
    if (secondAttempt.ok) return { ok: true, via: 'resend', from: resendFallbackFrom }
  }

  const detail = (secondAttempt && (secondAttempt.reason || secondAttempt.body)) || firstAttempt.reason || firstAttempt.body
  throw createError({
    statusCode: 500,
    statusMessage: secondAttempt?.status
      ? `Resend error ${secondAttempt.status}`
      : firstAttempt.status
        ? `Resend error ${firstAttempt.status}`
        : 'No se pudo enviar el correo.',
    data: {
      resend: secondAttempt || firstAttempt,
      detail
    }
  })
})
