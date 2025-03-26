const express = require('express');
const cors = require('cors'); 

const userRoutes = require('./routes/userRoutes');
const pacienteRoutes = require('./routes/pacientesRoutes');
const profissionalRoutes = require('./routes/profissionalRoutes');
const depoimentoRoutes = require('./routes/depoimentosRoutes');
const grupoApoioRoutes = require('./routes/grupoApoioRoutes');

const app = express();

//CORS para permitir requisições do front-end
app.use(cors());
//Permite JSON no body das requisições
app.use(express.json());

app.use('/usuarios', userRoutes);
app.use('/pacientes', pacienteRoutes);
app.use('/profissionais', profissionalRoutes);
app.use('/depoimentos', depoimentoRoutes);
app.use('/grupos-apoio', grupoApoioRoutes);

module.exports = app;