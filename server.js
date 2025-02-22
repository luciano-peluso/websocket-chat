const express = require('express')
const { WebSocketServer } = require('ws')

const app = express()
const PORT = 3000

app.use(express.static('public'));

const server = app.listen(PORT, () => {
    console.log("Servidor escuchando en http://localhost/"+PORT);
})

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log("Nuevo cliente conectado");

    ws.on('message', (message) => {
        console.log("Mensaje recibido: "+ message)

        wss.clients.forEach((client) => {
            if (client.readyState === client.OPEN){
                client.send(message);
            }
        });    
    });

    ws.on('close', () => {
        console.log("Cliente desconectado");
    });
});

