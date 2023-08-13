const express = require('express');
const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000; // Change this to any port number you prefer

const filePath = path.join(__dirname, 'logs', 'log_20230730.log');

let clients = [];

const watcher = chokidar.watch(filePath);

watcher.on('change', () => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
    } else {
      const content = data;
      clients.forEach(client => {
        client.res.write(`data: ${content}\n\n`);
      });
    }
  });
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/stream', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  const newClient = {
    id: Date.now(),
    res
  };

  clients.push(newClient);

  res.on('close', () => {
    clients = clients.filter(client => client.id !== newClient.id);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
