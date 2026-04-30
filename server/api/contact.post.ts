import { z } from 'zod'
import { buildEmail } from '../utils/emailTemplate'

// Interfaz estándar de respuesta de API
interface ApiResponse {
  success: boolean
  data?: any
  message?: string
  error?: any
}

// Zod Schema para validación estricta
const contactSchema = z.object({
  name: z.string().min(2, 'El nombre es muy corto').max(100, 'El nombre es muy largo'),
  email: z.string().email('El correo no es válido'),
  message: z.string().min(10, 'El mensaje es muy corto').max(2000, 'El mensaje es muy largo')
})

export default defineEventHandler(async (event): Promise<ApiResponse> => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  // Validación estricta con Zod
  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Error de validación',
      data: parsed.error.format()
    })
  }

  const { name, email, message } = parsed.data

  const contactTo = config.contactTo || process.env.CONTACT_EMAIL || 'contacto@juanmiguel.dev'
  const resendApiKey = config.resendApiKey || process.env.RESEND_API_KEY
  
  let rawFrom = config.resendFrom || process.env.RESEND_FROM || 'Portafolio <portafolio@example.com>'
  if (typeof rawFrom === 'string') {
    rawFrom = rawFrom.replace(/^["']|["']$/g, '').trim()
  }
  const resendFromPrimary = rawFrom
  const resendFallbackFrom = config.resendFallbackFrom || process.env.RESEND_FALLBACK_FROM || ''

  if (!resendApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error de configuración del servidor'
    })
  }

  const tryResend = async (fromAddress: string) => {
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
      return { success: false, reason: 'Network error hacia Resend' }
    }

    if (!response.ok) {
      let bodyText = ''
      try {
        bodyText = await response.text()
      } catch (err) {
        bodyText = 'No response body'
      }
      console.error('Resend API error', response.status, bodyText)
      return { success: false, status: response.status, body: bodyText.slice(0, 500) }
    }

    return { success: true, from: fromAddress }
  }

  const firstAttempt = await tryResend(resendFromPrimary)
  if (firstAttempt.success) {
    return { success: true, message: 'Correo enviado con éxito' }
  }

  let secondAttempt: any = null
  const bodyLower = (firstAttempt.body || '').toLowerCase()
  
  if (
    resendFallbackFrom &&
    firstAttempt.status === 403 &&
    bodyLower.includes('not verified') &&
    resendFallbackFrom !== resendFromPrimary
  ) {
    secondAttempt = await tryResend(resendFallbackFrom)
    if (secondAttempt.success) {
      return { success: true, message: 'Correo enviado con éxito (fallback)' }
    }
  }

  const detail = (secondAttempt && (secondAttempt.reason || secondAttempt.body)) || firstAttempt.reason || firstAttempt.body
  
  throw createError({
    statusCode: 500,
    statusMessage: 'No se pudo enviar el correo',
    data: detail
  })
})
