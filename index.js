//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require('axios')
const { Country } = require("./src/db.js")
// Syncing all the models at once.  
<<<<<<< HEAD:api/index.js

const PORT = process.env.PORT || 3001;



conn.sync({ force: false }).then(() => {
  server.listen(PORT, async () => {
=======
const PORT = process.env.PORT || 3001;


conn.sync({ force: true }).then(() => {
  server.listen(PORT, async () => {

>>>>>>> b4664cbdb68ee6e445676708c5ba26cd0384e91c:index.js
    const result2 = await Country.findAll();
    if (!result2.length) {
      const alterCountries = await axios.get('https://restcountries.com/v3/all');
      alterCountries.data.map(async (e) => {
        if (e.flags.png === undefined) e.flags.png = "Not avaiable"
        if (e.capital === undefined) e.capital = "This country don't have a Capital!";
        if (Array.isArray(e.capital)) e.capital = e.capital[0]
        if (e.independent === true) e.independent = "An independent State";
        if (e.independent === false) e.independent = "not an independent State"
        await Country.create({
          Id: e.cca3,
          Name: e.name.common,
          Img_Flag: e.flags[1],
          Continent: e.continents[0],
          Sub_Region: e.subregion,
          Capital: e.capital,
          Population: e.population,
          OfficialName: e.name.official,
          Independent: e.independent,
          Area: e.area
        });
      });
      await Country.findAll();
    }


    console.log(result2.length, "Iniziated")
    /*  return res.status(201).json(result2) */
    // eslint-disable-line no-console
  });
});
