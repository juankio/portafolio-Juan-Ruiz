export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const contactTo = config.contactTo || process.env.CONTACT_EMAIL || 'contacto@juanmiguel.dev'
  const resendApiKey = config.resendApiKey || process.env.RESEND_API_KEY
  const resendFrom = config.resendFrom || process.env.RESEND_FROM || 'Portafolio <portafolio@example.com>'

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

  const tryResend = async () => {
    if (!resendApiKey) return { ok: false, reason: 'No Resend API key' }
    let response
    try {
      response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: resendFrom,
          to: [contactTo],
          subject: `Nuevo mensaje de ${name}`,
          reply_to: email,
          text: `Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`
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

    return { ok: true }
  }

  const resendResult = await tryResend()
  if (resendResult.ok) return { ok: true, via: 'resend' }

  const detail = resendResult.reason || resendResult.body
  throw createError({
    statusCode: 500,
    statusMessage: resendResult.status ? `Resend error ${resendResult.status}` : 'No se pudo enviar el correo.',
    data: {
      resend: resendResult,
      detail
    }
  })
})
