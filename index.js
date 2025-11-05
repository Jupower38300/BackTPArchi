import express from "express";
import http from "http";
import cors from "cors";
import { ChatController } from "./api/chat.controler.js";
import { WhoAmControler } from "./api/whoami.controler.js";



export const clients = []; // <--- Liste d'IP clients

const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);

// Enregistrement d'un client (Client A)
app.post("/register", (req, res) => {
  const { ip } = req.body;
  if (!clients.includes(ip)) {
    clients.push(ip);
    console.log("✅ Client enregistré :", ip);
  }
  res.sendStatus(200);
});

// API
app.get("/api/whoami", WhoAmControler.get);
app.post("/api/chat", ChatController.post);

server.listen(PORT, () => {
  console.log(`Service X actif sur http://localhost:${PORT}`);
});
