const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const dotenv = require('dotenv').config();

// Environment variables
const PORT = process.env.PORT || 5000;
const ENVIRONMENT = process.env.ENVIRONMENT || '';
process.env.TZ = "America/Mexico_City";

// Server configuration
let app = express();
let server = http.createServer(app);
let static_files = path.join(__dirname, '../assets');

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload({
    createParentPath: true
}));

// Routes files
let home = require('../routes/home');
let providers = require('../routes/providers');

// Routes web
app.get('/', (req, res) => res.send(`API${ENVIRONMENT} de Gapsi`));
app.use('/home', home);
app.use('/providers', providers);

app.use('/assets', express.static(static_files));

// Server init
server.listen(PORT, function () {
    console.log(`Server running on port ${PORT}`);
});