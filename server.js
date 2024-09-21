//ultima atualização do arquivo server, contudo, apos testes realizados, foi descartado para dar lugar ao valor embutido do cache no arquivo "mediofim.js"
//disclaimer:last update of the server file, however, after tests were carried out, it was discarded to make way for the embedded cache value in the "mediofim.js" file


//função para criar o server.js

 const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || //number;

const username = 'user'; // Substitua pelo nome do usuário do GitHub
const url = `https://api.github.com/users/name/repos`;
const cacheDuration = 60 * 60 * 1000; // 1 hora
let cache = {
    data: null,
    timestamp: null
};

// Importação dinâmica do node-fetch
let fetch;
(async () => {
    fetch = (await import('node-fetch')).default;
})();

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, '.')));

async function fetchCommits(repoName) {
   const commitUrl = `https://api.github.com/repos/user/${repoName}/commits?since=${new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString()}`;
    
   const response = await fetch(commitUrl);
    return response.json();
}

async function fetchActivity() {
    if (cache.data && (Date.now() - cache.timestamp < cacheDuration)) {
        return cache.data; // Retorna dados do cache
    }

    const response = await fetch(url);
    const repos = await response.json();
    const allCommits = [];

    for (const repo of repos) {
        const commits = await fetchCommits(repo.name);
        allCommits.push(...commits);
    }

    cache.data = allCommits;
    cache.timestamp = Date.now();

    return allCommits;
}

app.get('/api/activity', async (req, res) => {
    try {
        const activity = await fetchActivity();
        res.json(activity);
    } catch (error) {
        res.status(500).send('Erro ao buscar atividade.');
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
