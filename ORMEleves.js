import { createRequire } from "module";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const require = createRequire(import.meta.url);
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
    'nodejs',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const path = require('path');
sequelize.authenticate().then(()=>{
    console.log('La config et connection BDD est correcte');
}).catch((erreurEventuelle)=>{
    console.log('Impossible de se connecter à la BDD ', erreurEventuelle);
});

// Define Eleves model
const Eleves = sequelize.define('eleves',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nom:{
        type: DataTypes.STRING
    },
    prenom:{
        type: DataTypes.STRING
    }
}, {
    timestamps: false
});

// Define Notes model
const Notes = sequelize.define('notes_eleves',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    coeff:{
        type: DataTypes.FLOAT
    },
    matiere:{
        type: DataTypes.STRING
    },
    appreciation:{
        type: DataTypes.TEXT
    },
    eleveId:{
        type: DataTypes.INTEGER,
        references: {
            model: Eleves,
            key: 'id'
        }
    }
});

await sequelize.drop();
await sequelize.sync();

await sequelize.query(`
  ALTER TABLE eleves
  ADD COLUMN createdAt DATETIME,
  ADD COLUMN updatedAt DATETIME
`);
export const migration = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('eleves', 'createdAt', {
            type: Sequelize.DATE,
        });
        await queryInterface.addColumn('eleves', 'updatedAt', {
            type: Sequelize.DATE,
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('eleves', 'updatedAt');
        await queryInterface.removeColumn('eleves', 'createdAt');
    },
};

// Create tables
sequelize.sync().then(async()=>{
    console.log('Tables créées avec succés');

    // Create a few eleves for demonstration purposes
    const eleve1 = await Eleves.create({
        nom: 'Doe',
        prenom: 'John'
    });
    const eleve2 = await Eleves.create({
        nom: 'Doe',
        prenom: 'Jane'
    });

    // Create a note for an eleve
    const note = await Notes.create({
        coeff: 2.0,
        matiere: 'Math',
        appreciation: 'Bien joué!',
        eleveId: eleve1.id
    });
    console.log(note.toJSON())
}).catch((erreur) =>{
    console.error('Impossible de créer les tables', erreur);
});
