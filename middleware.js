import { createRequire } from "module";             // Nécessaire pour import ES6 versus require (CommonJS)
const require = createRequire(import.meta.url);    // Nécessaire pour import ES6 versus require (CommonJS)

const express = require('express')
const app = express()
let compteur = 0;



app.use((req,res,next) =>{
    compteur = compteur+1;
    console.log(`J'en ai marre d'être sollicité pour tout et pour rien pour la ${compteur}ème fois`)
    next()
})
app.get('/accueil',    (requete, resultat,suivant) => {
        resultat.write('Accueil et on voudrait passer au suivant');
        resultat.end()
        suivant()

    }
)

app.get('/login',    (requete, resultat, suivant) => {
        resultat.write('Login et on voudrait passer au suivant');
        resultat.end()
        suivant()
    }
)

app.get('/',    (requete, resultat, suivant) => {
    resultat.write("Ici c'est la racine et on voudrait passer au suivant");
    resultat.end()
    suivant()
})
app.get('/bonjour',    (requete, resultat, suivant) => {
    resultat.write("Bonjour et on voudrait passer au suivant");
    suivant()
})


app.get('/bonjour',    (requete, resultat, suivant) => {
    console.log("On dit bonjour dans la console en plus")
    resultat.write("\nEncore bonjour vraiment j'insiste et on veut passer au suivant")
    resultat.end()
})
app.use((req,res,next) =>{
    console.log('Time:', Date.now())
    next()
})
app.use((err,req,res,next) =>{
    console.error(err.stack)
    res.status(500).send("Something broke !")
})
app.listen(3000)