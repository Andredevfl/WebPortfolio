//função para criar o server.js

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Importação dinâmica do node-fetch
let fetch;
(async () => {
    fetch = (await import('node-fetch')).default;
})();

app.get('/api/activity', async (req, res) => {
    // Exemplo simples para testar
    res.send('API funcionando!');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
