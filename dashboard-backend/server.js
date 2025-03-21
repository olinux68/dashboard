// 📌 Étape 1 : Initialisation du backend Express
const express = require('express');
const os = require('os');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
const PORT = 7500;

app.use(cors());
app.use(express.json());

// Route pour récupérer l'utilisateur Linux connecté
app.get('/api/user', (req, res) => {
    exec('whoami', (err, stdout) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ user: stdout.trim() });
    });
});

// Route pour récupérer l'utilisation du CPU et de la RAM
app.get('/api/system', (req, res) => {
    const cpuLoad = os.loadavg()[0];
    const totalMem = os.totalmem();
    const freeMem = os.freemem();

    res.json({
        cpuLoad,
        totalMem,
        freeMem,
        usedMem: totalMem - freeMem
    });
});

// Route pour récupérer l'utilisation du disque
app.get('/api/disk', (req, res) => {
    exec('df -h --output=source,size,used,avail,pcent /', (err, stdout) => {
        if (err) return res.status(500).json({ error: err.message });
        
        const lines = stdout.split('\n');
        const data = lines[1]?.split(/\s+/);
        if (data) {
            res.json({
                filesystem: data[0],
                total: data[1],
                used: data[2],
                available: data[3],
                usage: data[4]
            });
        } else {
            res.status(500).json({ error: 'Impossible de récupérer les données du disque' });
        }
    });
});

// Route pour récupérer les processus en cours
app.get('/api/processes', (req, res) => {
    exec('ps aux --sort=-%cpu | head -10', (err, stdout) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ processes: stdout.split('\n') });
    });
});

// Route pour récupérer les ports utilisés
app.get('/api/ports', (req, res) => {
    exec("netstat -tulnp | awk '{print $4, $7}'", (err, stdout) => {
        if (err) return res.status(500).json({ error: err.message });
        
        const lines = stdout.split('\n').slice(2); // Ignorer les deux premières lignes d'en-tête
        const ports = lines.map(line => {
            const parts = line.trim().split(' ');
            return { port: parts[0], process: parts[1] || 'Unknown' };
        }).filter(entry => entry.port);
        
        res.json({ ports });
    });
});

// Route pour lister les modèles IA disponibles via Ollama
app.get('/api/ollama/models', (req, res) => {
    exec('ollama list', (err, stdout) => {
        if (err) return res.status(500).json({ error: err.message });
        
        const models = stdout.split('\n').filter(line => line).map(line => line.split(' ')[0]);
        res.json({ models });
    });
});

// Route pour exécuter une requête IA avec Ollama
app.post('/api/ollama/run', async (req, res) => {
    const { model, prompt } = req.body;
    if (!model || !prompt) {
        return res.status(400).json({ error: 'Modèle et prompt requis' });
    }

    console.log("🟡 Envoi de la requête à Ollama avec le modèle:", model, "et le prompt:", prompt);

    try {
        const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ model, prompt, stream: false })
        });

        if (!response.ok) {
            throw new Error(`Erreur Ollama: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("✅ Réponse de Ollama :", data);

        res.json({ response: data.response });
    } catch (error) {
        console.error("❌ Erreur lors de l'appel à Ollama :", error);
        res.status(500).json({ error: error.message });
    }
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`✅ Serveur backend démarré sur http://localhost:${PORT}`);
});
