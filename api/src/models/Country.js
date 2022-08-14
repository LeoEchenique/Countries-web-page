const { DataTypes, STRING, } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    Id: {
      type: DataTypes.STRING(3),
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Img_Flag: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Continent: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Sub_Region: {
      type: DataTypes.STRING,
    },
    Capital: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Area: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Population: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Describe_Population: {
      type: DataTypes.VIRTUAL,
      get() {
        return `Population: ${this.Population} Habitants.`
      }

    },
    OfficialName: {
      type: DataTypes.STRING,
    },
    Independent: {
      type: DataTypes.STRING,
    },
    Summary: {
      type: DataTypes.VIRTUAL,
      get() {
        return "This country it's " + this.Independent + ". The official name is" + ` '${this.OfficialName}'` + " and has a population of " + this.Population + " habitants."
      }
    }
    /* agregar más.. */
  }, { timestamps: false });

};

/* [ ] País con las siguientes propiedades:
ID (Código de 3 letras) *
Nombre *
Imagen de la bandera *
Continente *
Capital *
Subregión
Área
Población */