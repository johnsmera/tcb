const express = require('express');
const authMiddleware = require('./../middlewares/auth');

const router = express.Router();
const Venda = require('./../models/venda');

router.use(authMiddleware); 

router.post('/', async (req,res) => {
    console.log(req.body);
    const { nome, cpf, telefone, produto, usuarioCriacao, retorno, empresa} = req.body;
    try {
        const venda = await Venda.create(req.body);
        
        return res.send({ 
            venda,
         });
    } catch(err) {
        return res.status(400).send({error: 'Registration failed'});
    }

});


module.exports = app => app.use('/novavenda', router);