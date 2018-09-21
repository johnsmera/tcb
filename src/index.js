const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./app/controllers/index')(app);

// Try connect with port 3000

const port = process.env.PORT || 3000;
    app.listen(port, (err) => {
        if (err) return console.log('Erro') 
        return console.log('Listen in port 3000')
    });

