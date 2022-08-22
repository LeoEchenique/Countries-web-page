const { Router } = require('express');
const Activity = require("./controllers/Activity.js");
const Country = require("./controllers/Countries.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/Countries", Country);
router.use("/Activity", Activity);

router.get('/', (req, res) => {
    res.send('Leo');
});

module.exports = router;
