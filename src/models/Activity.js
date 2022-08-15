const { DataTypes, } = require('sequelize');


module.exports = (sequelize => {
    sequelize.define("Activity", {

        Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Level: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Duration: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Season: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Comments: {
            type: DataTypes.STRING(200),
            defaultValue: "This activity has no comments yet!"
        },
        Contact: {
            type: DataTypes.STRING,
            defaultValue: "There's no contact information... Yet!"
        }
    }, { timestamps: false });
})

/* [ ] Actividad Turística con las siguientes propiedades:
ID
Nombre
Dificultad (Entre 1 y 5)
Duración
Temporada (Verano, Otoño, Invierno o Primavera)
 */