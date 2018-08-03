const express = require('express');
const authMiddleware = require('./../middlewares/auth');

const router = express.Router();
const UserEmpresa = require('./../models/userempresa');

router.use(authMiddleware); 

router.post('/', async (req,res) => {
    console.log(req.body);
    const { email, empresa } = req.body;
    try {
        const userEmpresa = await UserEmpresa.create(req.body);
        
        return res.send({ 
            userEmpresa,
         });
    } catch(err) {
        return res.status(400).send({error: 'Registration failed'});
    }

});


module.exports = app => app.use('/userempresa', router);