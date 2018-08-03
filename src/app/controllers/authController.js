const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('./../../config/auth')

const User = require('./../models/user');
const Venda = require('./../models/venda');
const UserEmpresa = require('./../models/userempresa')

const router = express.Router();

function generateToken(params={}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 4200,
    });
}

router.post('/register', async (req,res) => {
    const { email } = req.body;
    
    try {
        if (await User.findOne( { email } ))
            return res.status(400).send({erro: 'User already exists.'})

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({ 
            user,
            token: generateToken({id: user.id})
         });
    } catch(err) {
        return res.status(400).send({error: 'Registration failed'});
    }

});



router.post('/authenticate', async (req, res) => {
try{
    //console.log(req.body);

    const { email, password, empresa } = req.body;

    const idEmpresa = empresa;
    
    const user = await User.findOne({ email }).select('+password');

    if(!user)
        return res.status(400).send({ error: 'Usuário nao encontrado' });

    const userEmpresa = await UserEmpresa.findOne({empresa: idEmpresa, email: user.email});

    if(!empresa)
        return res.status(400).send({ error: 'Empresa não indentificada'});
   
    if(!userEmpresa) 
        return res.status(400).send({ error: 'Usuario/Empresa não confere' });

    if(!await bcrypt.compare(password, user.password) )
        return res.status(400).send({ error: 'Senha incorreta'});

    user.password = undefined;

    res.send({ 
        user, 
        token: generateToken({id: user.id}),
    });
} catch(err) {
    return res.status(400).send({ error: 'Erro interno, entre em contato com o suporte'});
}

});


module.exports = app => app.use('/auth', router);