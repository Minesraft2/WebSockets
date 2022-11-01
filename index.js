const express = require("express");
const WebSocket = require("ws");
const SocketServer = WebSocket.Server;

const server = express().listen(process.env.PORT || 3000);
const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
    console.log("[Server] A client was connected");
    ws.on('close', () => console.log("[Server] A client was disconnected"))
    ws.on('message', (message) => {
        console.log("[Server] Recieved message: %s", message);
        for (client of wss.clients) {
            if(client != ws && client.readyState === WebSocket.OPEN)client.send(message)
        }
    })
});

const ws = new WebSocket("wss://WebSockets.oneminesraft2.repl.co");