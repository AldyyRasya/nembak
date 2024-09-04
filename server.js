const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.urlencoded({ extended: true }));

app.post('/tembak', (req, res) => {
    const name = req.body.name;
    const pageName = name.toLowerCase().replace(/\s+/g, '-');
    const filePath = path.join(__dirname, `public/${pageName}.html`);

    // Template HTML untuk halaman yang dibuat
    const template = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tembakan untuk ${name}</title>
        <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
        <h1>Halo, ${name}!</h1>
        <p>Ada yang mau menyampaikan perasaannya ke kamu! ❤</p>
    </body>
    </html>
    `;

    // Menyimpan file HTML
    fs.writeFileSync(filePath, template);

    // Redirect ke halaman baru
    res.redirect(`/public/${pageName}.html`);
});

app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});
