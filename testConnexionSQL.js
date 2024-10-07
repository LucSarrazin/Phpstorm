import { createRequire} from "module";
const require = createRequire(import.meta.url);
const path = require('path');
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mysql = require('mysql2');



const connection = await mysql.createConnection({host:'localhost',user:'root', password:'', database:'nodejs'});

connection.execute('SELECT * FROM ELEVES', (err,lignes,colonnes) =>{
    if(err){
        console.error('Erreur lors de l\'execution de la requête :', err.message);
        return;
    }
    console.log('Lignes: ', lignes);
    console.log('Colonnes: ', colonnes);

});

connection.end();