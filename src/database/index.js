const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/telechamps', (err) => {if (err) return err});
mongoose.Promise = global.Promise;

module.exports = mongoose;