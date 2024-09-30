import {createRequire} from "module";
const require = createRequire(import.meta.url);

const mysql = require('mysql2/promise');

const connection = await mysql.createConnection({host:'localhost',user:'root',database:'nodejs'});
const [lignes,colonnes] = await connection.execute('SELECT * FROM eleves');
console.log(lignes)
console.log(colonnes)