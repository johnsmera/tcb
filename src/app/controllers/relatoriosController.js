const express = require('express');
const authMiddleware = require('./../middlewares/auth');
const bodyParser = require('body-parser');

const router = express.Router();
const Venda = require('./../models/venda');

router.use(authMiddleware); 
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json())

router.post('/', function(req, res) {
const {date1,date2} = req.body
console.log(req.body)
try{ 
    Venda.find({ createdAt: {
        $gte: (date1),
        $lt: (date2)
    } }, function(err, data) {
        if (err) {
          alert(err);
          return res.send(500, 'Something Went wrong with Retrieving data');
        } else {
          // console.log(data[0]);
          return res.json(data);
        }
      });
}catch(err){
    return res.status(400).send({error: err.toString()});
};
  
  });

module.exports = app => app.use('/relatorios', router);