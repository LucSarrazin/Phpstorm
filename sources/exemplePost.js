import { createRequire } from "module"; //Nécessaire pour import ES6 versus require (CommonJS)
const require = createRequire(import.meta.url); //Nécessaire pour import ES6 versus require 'CommonJS)
import { dirname } from 'path';
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const __dirname = dirname(__filename);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const path = require('path');

app.post('/testPost', (requete, resultat) => {
    let donneesRecues = requete.body;
    resultat.send('Données recues: ' + JSON.stringify(donneesRecues));
})

app.get('/login', (requete, resultat) => {
    resultat.sendFile(path.join(__dirname + '/login.html'));
})

app.post('/login', (req, res) => {
    const identifiant = req.body.pseudo;
    const motDePasse = req.body.motDePasse;
    if (identifiant === 'admin' && motDePasse === 'admin') {
        res.send('Bonjour mr l\'administrateur');
    }
    else {
        res.send('login invalide');
    }
})

app.listen(3000)