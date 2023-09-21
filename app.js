const express = require('express');
const app = express();
const port = 3000; // Escolha a porta que desejar

// Middleware para processar JSON
app.use(express.json());

// Dados fictícios de estoque para este exemplo
const estoque = [];

// Rota para cadastrar um item no estoque
app.post('/api/estoque/cadastrar/:id/:nome/:qtd', (req, res) => {
  const { id, nome, qtd } = req.params;
  const item = { id, nome, qtd };
  estoque.push(item);
  res.json(item);
});

// Rota para listar todos os itens do estoque
app.get('/api/estoque/listar', (req, res) => {
  res.json(estoque);
});

// Rota para editar a quantidade de um item no estoque
app.put('/api/estoque/editar/:id/:qtd', (req, res) => {
  const { id, qtd } = req.params;
  const item = estoque.find((item) => item.id === id);
  if (!item) {
    return res.status(404).json({ message: 'Item não encontrado' });
  }
  item.qtd = qtd;
  res.json(item);
});

// Rota para remover um item do estoque
app.delete('/api/estoque/remover/:id', (req, res) => {
  const { id } = req.params;
  const index = estoque.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Item não encontrado' });
  }
  estoque.splice(index, 1);
  res.json({ message: 'Item removido com sucesso' });
});

// Inicialize o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
