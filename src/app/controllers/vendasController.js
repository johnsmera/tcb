const express = require('express');
const authMiddleware = require('./../middlewares/auth');

const router = express.Router();
const Venda = require('./../models/venda');

router.use(authMiddleware); 

router.get('/', function(req, res) {
try{
    Venda.find({}, function(err, data) {
      if (err) {
        alert(err);
        return res.send(500, 'Something Went wrong with Retrieving data');
      } else {
        // console.log(data[0]);
        return res.json(data);
      }
    });
}catch(err){
    return res.status(400).send({error: 'Registration failed'});
};
  
  });

module.exports = app => app.use('/vendas', router);