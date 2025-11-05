import { Server } from "socket.io";

// Websocket ChatSocket
export class ChatSocket {
  static INSTANCE = new ChatSocket();
  static OUT = "message";
  static IN = "message";
  static CORS = { origin: "*" };

  io;

  // Configuration du serveur WebSocket
  setup(httpServer) {
    this.io = new Server(httpServer, { cors: ChatSocket.CORS });
    this.io.on("connection", (socket) => this.onConnected(socket));
  }

// Envoi d'un message à tous les clients connectés
  send(message) {
    console.log(">>>", message);
    this.io.emit(ChatSocket.OUT, message);
  }
// Gestion de la connexion d'un client
  onConnected(socket) {
    console.log(`Client ${socket.id} connecté`);
    socket.emit(ChatSocket.OUT, "Bienvenue !");

    socket.on(ChatSocket.IN, (message) => this.onMessage(socket, message));

    socket.on("disconnect", (reason) => {
      console.log(`Client ${socket.id} déconnecté (${reason})`);
    });
  }
// Gestion des messages reçus d'un client
  onMessage(socket, message) {
    console.log(`${socket.id} → ${message}`);
    socket.emit("echo", `Echo: ${message}`);
  }
}
