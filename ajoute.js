import { createRequire } from "module"; //Nécessaire pour import ES6 versus require (CommonJS)
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const require = createRequire(import.meta.url); //Nécessaire pour import ES6 versus require 'CommonJS)
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const path = require('path');
const mysql = require('mysql2');



const connection = await mysql.createConnection({host:'localhost',user:'root', password:'', database:'nodejs'});

app.post('/testPost', (requete, resultat) => {
    let donneesRecues = requete.body;
    resultat.send('Données recues: ' + JSON.stringify(donneesRecues));
})

app.get('/ajoute', (requete, resultat) => {
    resultat.sendFile(path.join(__dirname + '/ajoutEleve.html'));
})

app.post('/ajoute', (req, res) => {
        const nomEleve = req.body.nomEleve;
        const prenomEleve = req.body.prenomEleve;
        if (!nomEleve || !prenomEleve) {
            res.send('Veuillez remplir tous les champs du formulaire');
        }
        else {
            const query = `INSERT INTO eleves (NOM, PRENOM) VALUES (?, ?)`;
            connection.query(query, [nomEleve, prenomEleve]);

            res.send('Thanks for your data, now eating cookies');
        }
})
app.listen(3000)