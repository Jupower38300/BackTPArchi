import express from "express";
import http from "http";
import cors from "cors"; // ✅

import { ChatSocket } from "./chat/chat.socket.js";
import { ChatControler } from "./api/chat.controler.js";
import { WhoAmControler } from "./api/whoami.controler.js";

const PORT = 3000;
const app = express();
app.use(cors()); // ✅ autorise l'accès du front
app.use(express.json());

const server = http.createServer(app);

// Websocket
ChatSocket.INSTANCE.setup(server);

// API
app.get("/api/whoami", WhoAmControler.get);
app.post("/api/chat", ChatControler.post);

// Lancement
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
