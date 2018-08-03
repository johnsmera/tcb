const mongoose = require('./../../database');
const bcrypt = require('bcryptjs');

const VendaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    empresa: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
        lowercase: true,
    },
    telefone: {
        type: String,
        required: true,
        select: false,
    },
    produto: {
        type: String,
        required: true,
    },
    retorno: {
        type: String,
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

const Venda = mongoose.model('Venda', VendaSchema);

module.exports = Venda;