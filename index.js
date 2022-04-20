const express = require('express');
const app = express();
const port = 3000;

const path = require('path');

app.use('/lib/p5', express.static(path.join(__dirname, 'lib', 'p5')));

app.get('/webview/parking-lot', (req, res) => {
    res.sendFile(path.join(__dirname, './view/parking.html'));
});

app.listen(port, () => {
    console.log('web view server run on port : ' + port);
});