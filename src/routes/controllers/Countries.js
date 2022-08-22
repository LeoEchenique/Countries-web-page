const { Router } = require('express');
const { Country, Activity } = require("../../db");
const router = Router();


router.get("/", async (req, res) => {
    const result = await Country.findAll()
    return res.status(200).json(result);
})
router.get("/query", async (req, res) => {
    const { name } = req.query;
    try {
        const result = await Country.findAll({
            where: {
                Name: name
            }
        })
        if (!result.length) throw new Error("This country does not exists!")
        res.status(200).json(result)
    } catch (error) {
        res.status(404).send(error.message)
    }

})

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    /* el reducer o lo que sea que venga acá previamente debe hacer un filter del store en donde se filtre aquel pais (input search) 
        cuyo id corresponda al name pasado por el input, este id es el enviado acá y se hace todo */
    const countryActivity = await Country.findByPk(id, {
        include: Activity
    })
    /* const summary = countryActivity.Activities; */

    res.status(200).json(countryActivity)
})

router.get("/sort/:by/:order", async (req, res) => {

    const { by, order } = req.params;
    let Countries = await Country.findAll({
        include: Activity
    })
    let sort;
    if (by === "None") sort = Countries;
    if (by === "Name") {
        if (order === "Ascendent") sort = Countries.sort((a, b) => (a.Name > b.Name) ? 1 : -1);
        if (order === "Descendent") sort = Countries.sort((a, b) => (a.Name < b.Name) ? 1 : -1);
        if (order === undefined) sort = Countries.sort((a, b) => (a.Name < b.Name) ? 1 : -1);
    }
    if (by === "Population") {
        if (order === "Ascendent") sort = Countries.sort((a, b) => (a.Population < b.Population) ? 1 : -1);
        if (order === "Descendent") sort = Countries.sort((a, b) => (a.Population > b.Population) ? 1 : -1);
    }
    if (by === "Season") {
        /* puede que esten a la inversa pero tecnicamente los trae */
        if (order === "Ascendent") sort = Countries.sort((a, b) => (a.Activity < b.Activity) ? 1 : -1);
        if (order === "Descendent") sort = Countries.sort((a, b) => (a.Activity > b.Activity) ? 1 : -1);

    }
    res.status(200).json(sort)
})












module.exports = router;