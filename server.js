import { createRequire } from "module";             // Nécessaire pour import ES6 versus require (CommonJS)
const require = createRequire(import.meta.url);    // Nécessaire pour import ES6 versus require (CommonJS)

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3001

import {listeEleves} from "./sources/eleves.mjs";

app.get('/api/leseleves', (requete, resultat, suivant) => {
    const listePartielle = listeEleves.map(eleve => {
        return { nomEleve: eleve.nom, prenomEleve: eleve.prenom }
    })
    resultat.json(listePartielle)
})

app.listen(port,
    () => console.log(`Le serveur écoute sur le port ${port} et renvoie des eleves sur l'api /api/leseleves`))