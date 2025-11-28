export function buildEmail({ name, email, message }) {
  const safeMessage = message || ''
  const subject = `Nuevo mensaje de ${name}`
  const text = `Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${safeMessage}`
  const html = `
  <table style="width:100%;background:#0b0b0d;padding:32px;font-family:'Inter',Segoe UI,Arial,sans-serif;color:#e5e7eb;">
    <tr>
      <td style="max-width:640px;margin:0 auto;background:#111217;border:1px solid #1f2028;border-radius:16px;padding:24px;">
        <p style="letter-spacing:0.2em;text-transform:uppercase;font-size:12px;color:#9ca3af;margin:0 0 12px;">Portafolio</p>
        <h1 style="color:#f3f4f6;font-size:22px;margin:0 0 18px;">Nuevo mensaje de ${name}</h1>
        <div style="background:#15161d;border:1px solid #222433;border-radius:14px;padding:16px;margin-bottom:16px;">
          <p style="margin:0 0 6px;color:#9ca3af;font-size:13px;">Nombre</p>
          <p style="margin:0;color:#f3f4f6;font-size:15px;font-weight:600;">${name}</p>
        </div>
        <div style="background:#15161d;border:1px solid #222433;border-radius:14px;padding:16px;margin-bottom:16px;">
          <p style="margin:0 0 6px;color:#9ca3af;font-size:13px;">Correo</p>
          <p style="margin:0;color:#f3f4f6;font-size:15px;font-weight:600;">${email}</p>
        </div>
        <div style="background:#15161d;border:1px solid #222433;border-radius:14px;padding:16px;margin-bottom:20px;">
          <p style="margin:0 0 6px;color:#9ca3af;font-size:13px;">Mensaje</p>
          <p style="margin:0;color:#e5e7eb;font-size:15px;line-height:1.5;">${safeMessage.replace(/\n/g, '<br/>')}</p>
        </div>
        <p style="color:#ef4444;font-size:13px;margin:0;">Enviado desde el portafolio de Juan Miguel.</p>
      </td>
    </tr>
  </table>`

  return { subject, text, html }
}
