const express = require('express')
const app = express()
const path = require('path');

app.get('/', (requete,reponse) =>{
    reponse.send('1ere route express en SIO2')
})

app.get('/accueil', (requete,reponse) =>{
    reponse.send('Vous êtes arrivés sur la page d’accueil du site')
})

app.get('/bienvenue', (requete,reponse) =>{
    reponse.sendFile(path.join(__dirname + '/bienvenue.html'));
})

app.get('/panorama', (requete,reponse) =>{
    reponse.sendFile(path.join(__dirname + '/planDuSite.html'));
})

app.listen(3000)