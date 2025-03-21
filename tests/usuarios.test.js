const request = require('supertest');
const app = require('../src/app');

describe('Testes da rota /usuarios', () => {

  it('Deve retornar todos os usuários (GET /usuarios)', async () => {
    const res = await request(app).get('/usuarios');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('Deve criar um novo usuário (POST /usuarios)', async () => {
    const novoUsuario = {
      nome_usuario: "Teste",
      email: "teste@example.com",
      senha: "123456",
      tipo: "PACIENTE"
    };

    const res = await request(app).post('/usuarios').send(novoUsuario);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe(novoUsuario.email);
  });

});
