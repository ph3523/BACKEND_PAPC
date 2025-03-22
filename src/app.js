const express = require('express');
const userRoutes = require('./routes/userRoutes');
const pacienteRoutes = require('./routes/pacientesRoutes');
const profissionalRoutes = require('./routes/profissionalRoutes');
const app = express();

app.use(express.json());
app.use('/usuarios', userRoutes);
app.use('/pacientes', pacienteRoutes);
app.use('/profissionais', profissionalRoutes);

module.exports = app;