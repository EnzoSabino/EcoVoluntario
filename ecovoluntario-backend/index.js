const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '@Enzo123',
  port: 5432,
});

app.get('/', (req, res) => {
  res.send('ecovoluntario API está rodandando!');
});

app.get('/usuarios', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM usuarios');
    res.json(resultado.rows);
  } catch (erro) {
    console.error('Erro ao buscar usuários:', erro);
    res.status(500).send('Error interno no servidor');
  }
});



app.post('/usuarios', async (req, res) => {
  console.log("=== Recebendo requisição ===");
  console.log("Dados recebidos (req.body)", req.body);
  const { nome, email, tipo, bairro } = req.body;

  if (!nome || !email || nome.trim() ==="" || email.trim() ==="") {
    console.log("Barrando requisição!");
    return res.status(400).json({
      erro: "Dados inválidos",
      mensagem: "O nome e o e-mail são campos obrigatórios para realizar o cadastro."
    });
  }

  try {
    const textQuery = 'INSERT INTO usuarios (nome, email, tipo, bairro) VALUES ($1, $2, $3, $4) RETURNING *';
    const valores = [nome, email, tipo, bairro];
    const resultado = await pool.query(textQuery, valores);
    res.status(201).json(resultado.rows[0]);
  } catch (erro) {
    if (erro.code === '23505') {
      console.log('Tentativa de cadastro com email já existente:', email);
      return res.status(409).json({
        erro: 'Email já cadastrado',
        mensagem: 'O e-mail informado já está cadastrado no sistema.'
      });
    }
    console.error('Erro ao criar usuário:', erro);
    res.status(500).send('Error interno no servidor');
}
}); 

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// Rota para cadastrar um novo evento validado
app.post('/eventos', async (req, res) => {
  const { titulo, descricao, data_evento, localizacao, organizador_id } = req.body;

  if (!organizador_id) {
    return res.status(400).json({ mensagem: 'O evento precisa de um organizador cadastrado!' });
  }

  try {
    // 1. Verifica no banco se o organizador realmente existe
    const usuarioExiste = await pool.query('SELECT * FROM usuarios WHERE id = $1', [organizador_id]);

    if (usuarioExiste.rows.length === 0) {
      return res.status(404).json({ mensagem: 'Organizador não encontrado no sistema.' });
    }

    // 2. Insere o evento no banco vinculado ao organizador
    const novoEvento = await pool.query(
      'INSERT INTO eventos (titulo, descricao, data_evento, localizacao, organizador_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [titulo, descricao, data_evento, localizacao, organizador_id]
    );

    res.status(201).json(novoEvento.rows[0]);
  } catch (erro) {
    console.error('Erro ao salvar evento:', erro);
    res.status(500).json({ mensagem: 'Erro interno ao salvar evento no banco de dados.' });
  }
});