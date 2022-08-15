const { Router } = require('express');
const { Country, Activity } = require('../../db.js');
const router = Router();

/* Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
Crea una actividad turística en la base de datos */
router.post("/", async (req, res) => {

    const { Id, Name, Level, Duration, Season, Comments, Contact, PkCountry } = req.body;

    console.log(PkCountry, Comments, Contact, "pk")

    for (let i = 0; i < PkCountry.length; i++) {

        const isCreated = await Activity.findByPk(Id)
        const country = await Country.findByPk(PkCountry[i].id)
        if (isCreated) {
            await isCreated.addCountry(country);
        } else {
            const activity = await Activity.create({
                Id: Id,
                Name: Name,
                Season: Season,
                Level: Level,
                Duration: Duration,
                Comments: Comments ? Comments : undefined,
                Contact: Contact ? Contact : undefined
            });
            await activity.addCountry(country);

        }
    }
    res.status(201).json("done!")

    /* PkCountry.map(async (e) => {
        const isCreated = await Activity.findByPk(Id)
        const country = await Country.findByPk(e.id)
        if (isCreated) {
            await isCreated.addCountry(country);
            res.status(200).json(isCreated)
        } else {
            const activity = await Activity.create({
                Id: Id,
                Name: Name,
                Season: Season,
                Level: Level,
                Duration: Duration,
                Comments: Comments,
                Contact: Contact
            });
            await activity.addCountry(country);
            res.status(201).json(activity)
        }
    }) */





    /*  if (isCreated) {
         console.log("Enrte", isCreated)
         await isCreated.addCountry(country);
         return res.json(isCreated)
     }
     const activity = await Activity.create({
         Id: Id,
         Name: Name,
         Season: Season,
         Level: Level,
         Duration: Duration,
         Comments: Comments,
         Contact: Contact
     });
 
 
 
     await activity.addCountry(country);
     res.status(201).json(activity) */
})

router.get("/all", async (req, res) => {

    try {
        const allActivities = await Activity.findAll();
        res.json(allActivities)
    } catch (error) {
        res.status(404).json("There's no activity. Create your own!")
    }

})

module.exports = router;