import yagmail

EMAIL_USER = '0323105925@ut-tijuana.edu.mx'
EMAIL_PASS = 'gheb ytwn qscb bwyb'

def enviar_codigo(correo_destino, codigo):
    yag = yagmail.SMTP(EMAIL_USER, EMAIL_PASS)
    yag.send(
        to=correo_destino,
        subject='Código de verificación - Invoxa',
        contents=f'Tu código de recuperación es: {codigo}'
    )