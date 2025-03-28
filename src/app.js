const express = require('express');
const cors = require('cors'); 
require("dotenv").config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const pacienteRoutes = require('./routes/pacientesRoutes');
const profissionalRoutes = require('./routes/profissionalRoutes');
const depoimentoRoutes = require('./routes/depoimentosRoutes');
const grupoApoioRoutes = require('./routes/grupoApoioRoutes');

const app = express();
    
app.use(cors({
    origin: 'http://localhost:5173', // Permite requisições do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
}));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/usuarios', userRoutes);
app.use('/pacientes', pacienteRoutes);
app.use('/profissionais', profissionalRoutes);
app.use('/depoimentos', depoimentoRoutes);
app.use('/grupos-apoio', grupoApoioRoutes);

module.exports = app;