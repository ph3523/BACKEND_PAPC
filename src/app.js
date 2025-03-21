const express = require('express');
const cors = require('cors'); 

const userRoutes = require('./routes/userRoutes');
const pacienteRoutes = require('./routes/pacientesRoutes');

const app = express();

// Habilita CORS para permitir requisições do front-end
app.use(cors());
// Permite JSON no body das requisições
app.use(express.json());

app.use('/usuarios', userRoutes);
app.use('/pacientes', pacienteRoutes);

module.exports = app;