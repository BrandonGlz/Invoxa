const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '0323105925@ut-tijuana.edu.mx',
        pass: 'gheb ytwn qscb bwyb'
    }
});

const enviarCodigo = async (correoDestino, codigo) => {
    const mailOptions = {
        from: 'tucorreo@gmail.com',
        to: correoDestino,
        subject: 'CORREO DE VALIDACION',
        text: `${codigo}`
    };
    return transporter.sendMail(mailOptions);
};

module.exports = { enviarCodigo };