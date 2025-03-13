const express = require('express');
const { readFile } = require('fs');
const app = express();

app.get('/', (request, response) => {
    readFile('./index.html', 'utf8', (error, html) => {
        if (error) {
            response.status(500).send('An error occured!');
        }

        response.send(html);
    });
}); 

app.use(express.static('.'));

app.listen(process.env.PORT || 3000, () => console.log('App successful and available on http://localhost:3000'));