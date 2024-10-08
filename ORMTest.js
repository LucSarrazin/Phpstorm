import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize(
    'nodejs',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);
sequelize.authenticate().then(()=>{
    console.log('La config et connection BDD est correcte');
}).catch((erreurEventuelle)=>{
    console.log('Impossible de se connecter à la BDD ', erreurEventuelle);
});

const Notes = sequelize.define('notes_eleves',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    note:{
        type: DataTypes.FLOAT
    },
    date_eval:{
        type: DataTypes.DATEONLY
    }
})

sequelize.sync().then(async()=>{
    console.log('Table Notes créée avec succés');
    const noteTim = await Notes.create({
        note: 12.5,
        date_eval: new Date(2023,10,9),
    });
    console.log(noteTim.toJSON())
}).catch((erreur) =>{
    console.error('Impossible de créer la table Notes', erreur);
});