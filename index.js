import express from "express";
import http from "http";
import { ChatSocket } from "./chat/chat.socket.js";
import { ChatControler } from "./api/chat.controler.js";
import { WhoAmControler } from "./api/whoami.controler.js";

const PORT = 3000;
const app = express();
const server = http.createServer(app);

// Websocket
ChatSocket.INSTANCE.setup(server);

// Middlewares
app.use(express.static("../front/dist"));
app.use(express.json());

// API
app.get("/api/whoami", WhoAmControler.get);
app.post("/api/chat", ChatControler.post);

// Écoute serveur
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
