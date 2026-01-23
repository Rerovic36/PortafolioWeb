const express = require('express');
const { Resend } = require('resend');
const cors = require('cors');
require('dotenv').config();

const app = express();
// Configuración de CORS para que tu HTML pueda pegarle a la API de Render
app.use(cors()); 
app.use(express.json({ limit: '50mb' })); // Importante aumentar el límite para recibir el Base64
const token = process.env.TOKEN

const resend = new Resend('re_MgoF1mXr_GNLsU3EXtYVeUYTFeGUVyCeh');
app.use(express.static('public'));
app.post('/send-email', async (req, res) => {
    const { nombre, mensaje, fileName, fileContent } = req.body;

    try {
        const data = await resend.emails.send({
            from: 'Tu App <onboarding@resend.dev>', // O tu dominio verificado
            to: ['victor23rerovic@gmail.com'],
            subject: `Nuevo mensaje de ${nombre}`,
            html: `<p><strong>Nombre:</strong> ${nombre}</p>
                   <p><strong>Mensaje:</strong> ${mensaje}</p>`,
            attachments: [
                {
                    filename: fileName,
                    content: fileContent, // El string Base64 que viene del front
                },
            ],
        });

        res.status(200).json({ success: true, data });
        console.log('se envió el correo')
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al enviar el correo' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);

});
