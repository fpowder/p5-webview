const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

const path = require('path');

app.use(cookieParser());
app.use('/lib', express.static(path.join(__dirname, 'lib')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/ref', express.static(path.join(__dirname, 'ref')));

app.get('/', (req, res) => {
    res.redirect(301, '/webview/parking-lot');
}); 

app.get('/webview/parking-lot', (req, res) => {

    //res.clearCookie('webView');
    //res.cookie('webView', req.cookies);
    res.sendFile(path.join(__dirname, './view/parking.html'));
    
});

app.get('/car-soccer', (req, res) => {
    res.sendFile(path.join(__dirname, './view/carSoccer.html'));
});

app.listen(port, () => {
    console.log('web view server run on port : ' + port);
});