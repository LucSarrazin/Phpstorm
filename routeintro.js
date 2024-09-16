import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express');
const app = express();
const path = require('path');

import { listeEleves } from "./sources/eleves.mjs";


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

// les deux façons pour les paramètres
// Façon 1
app.get('/etudiant', (requete,reponse) =>{
    const nomEtudiant = requete.query.nomEtudiant;
    reponse.send('Bonjour mr ou mme ' + nomEtudiant)
})
// Façon 2
app.get('/etudiant2/:idEleve', (requete,reponse) =>{
    const nomEtudiant = requete.params.idEleve;
    reponse.send('Bonjour mr ou mme ' + nomEtudiant)
})

app.get('/nombre', (requete,reponse) =>{
    const parametre = requete.query.nombre
    const Nombre = Number(parametre);
    if(Number.isInteger(Nombre)){
        reponse.send('Le nombre choisi est ' + Nombre)
    }
    else{
        reponse.send(parametre + " Le nombre choisi n'est pas un nombre ")
    }
})

app.get('/api/leseleves', (requete,reponse) =>{
    reponse.json(listeEleves)
})

app.listen(3000)