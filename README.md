# PAPC - Plataforma de Apoio Psicológico e Comunitário(BACKEND)

## Visão Geral

BACKEND_PAPC é uma plataforma backend para gerenciamento de grupos de apoio psicológico, profissionais de saúde mental, pacientes e depoimentos. A plataforma facilita a conexão entre pessoas que buscam ajuda e profissionais qualificados, além de promover a formação de grupos de apoio, o repositorio do front end se encontra nesse link(https://github.com/ph3523/PAPC).

## Tecnologias Utilizadas

- Node.js - Ambiente de execução JavaScript
- Express - Framework web para Node.js
- Prisma ORM - ORM para comunicação com o banco de dados
- PostgreSQL - Banco de dados relacional
- JWT - Autenticação baseada em tokens
- bcryptjs - Criptografia de senhas
- Jest - Framework de testes

## Estrutura do Projeto

```
├── prisma/               # Configurações e migrações do Prisma
├── src/
│   ├── controllers/      # Controladores da aplicação
│   ├── middleware/       # Middlewares (autenticação, etc.)
│   ├── models/           # Modelos de dados
│   ├── routes/           # Rotas da API
│   ├── app.js            # Configuração do Express
│   ├── prisma.js         # Instância do Prisma
│   └── server.js         # Servidor da aplicação
└── tests/                # Testes automatizados
```

## Modelos de Dados

- Usuário: Gerenciamento de contas (pacientes e profissionais)
- Paciente: Informações de pessoas que buscam atendimento
- Profissional: Informações de profissionais de saúde mental
- Grupo de Apoio: Encontros para compartilhamento de experiências
- Depoimento: Relatos de pacientes sobre suas experiências
- Anamnese: Histórico do paciente com avaliação do profissional
- Sessão de Atendimento: Registro de consultas

## Instalação e Execução

1. Clone o repositório:

```sh
git clone https://github.com/seu-usuario/backend_PAPC.git
cd backend_PAPC
```

2. Instale as dependências:

```sh
npm install
```

3. Configure as variáveis de ambiente:
    - Crie um arquivo ``.env`` na raiz do projeto
    - Adicione as seguintes variáveis:

```sh
DATABASE_URL="postgresql://usuario:senha@localhost:5432/papc_db"
JWT_SECRET="sua_chave_secreta"
PORT=3001
```

4. Execute as migrações do banco de dados:

```sh
npx prisma migrate dev
```

5. Inicie o servidor:

```sh
npm run dev
```

## Endpoints da API

#### Autenticação

- ``POST /auth/register`` - Registro de usuários
- ``POST /auth/login`` - Login de usuários

#### Usuários

- ``GET /usuarios`` - Listar todos os usuários
- ``GET /usuarios/:id`` - Buscar usuário por ID
- ``GET /usuarios/email/:email`` - Buscar usuário por email
- ``POST /usuarios`` - Criar novo usuário
- ``PUT /usuarios/:id`` - Atualizar usuário
- ``DELETE /usuarios/:id`` - Excluir usuário

#### Grupos de Apoio

- ``GET /grupos-apoio`` - Listar todos os grupos
- ``GET /grupos-apoio/:id`` - Buscar grupo por ID
- ``POST /grupos-apoio`` - Criar novo grupo
- ``PUT /grupos-apoio/:id`` - Atualizar grupo
- ``DELETE /grupos-apoio/:id`` - Excluir grupo

#### Depoimentos

- ``GET /depoimentos`` - Listar todos os depoimentos
- ``GET /depoimentos/:id`` - Buscar depoimento por ID
- ``POST /depoimentos`` - Criar novo depoimento (requer autenticação)
- ``PUT /depoimentos/:id`` - Atualizar depoimento (requer autenticação)
- ``DELETE /depoimentos/:id`` - Excluir depoimento (requer autenticação)

#### Pacientes e Profissionais

- ``GET /depoimentos`` - Listar todos os depoimentos
- ``GET /depoimentos/:id`` - Buscar depoimento por ID
- ``POST /depoimentos`` - Criar novo depoimento (requer autenticação)
- ``PUT /depoimentos/:id`` - Atualizar depoimento (requer autenticação)
- ``DELETE /depoimentos/:id`` - Excluir depoimento (requer autenticação)

#### Pacientes e Profissionais

- Endpoints semelhantes estão disponíveis para pacientes e profissionais

## Exemplo de Uso: Criação de Grupo de Apoio

```sh
POST /grupos-apoio
{
  "nome": "Grupo de Apoio à Ansiedade",
  "descricao": "Grupo de apoio para pessoas que sofrem com ansiedade e seus familiares",
  "local": "Rua Example, 123 - Centro",
  "horario": "Terças e Quintas, 19h-21h",
  "publico_alvo": "Adultos com ansiedade",
  "tipo_atendimento": "Presencial",
  "gratuito": true,
  "valor": "R$ 0,00",
  "image": "../assets/img_grupo.jpg"
}
```

## Contribuição
1. Faça um fork do projeto
2. Crie uma branch para sua feature (``git checkout -b feature/nova-feature``)
3. Faça commit das alterações (``git commit -m 'Adiciona nova feature'``)
4. Faça push para a branch (``git push origin feature/nova-feature``)
5. Abra um Pull Request

## Responsabilidades da Equipe 1

- Pedro Barroso: Não houve uma divisão nesse repositorio eu fiz a maioria do backend.

- Wesley Franklin: Incorporação da Implementação do Cadastro de usuarios e depoimentos.

## Colaboradores

<table>
  <tr>
    <td align="center"><a href="https://github.com/ph3523"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/80484091?v=4" width="100px;" alt=""/><br /><sub><b>Pedro Barroso</b></sub></a><br /><a href="mailto:ph.barroso3523@gmail.com" title="Email">✉️</a></td>
    <td align="center"><a href="https://github.com/EldFranklin"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/105466304?v=4" width="100px;" alt=""/><br /><sub><b>Wesley Franklin</b></sub></a><br /><a href="mailto:wesleyfranklin@alu.ufc.br" title="Email">✉️</a></td>
 
  </tr>
 
</table>