const mongoose = require('./../../database');
const bcrypt = require('bcryptjs');

const UserEmpresaSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: true,
    },
    empresa: {
        type: Number,
        required: true,
    },
    usuarioCriacao: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

const UserEmpresa = mongoose.model('UserEmpresa', UserEmpresaSchema);

module.exports = UserEmpresa;