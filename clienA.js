import express from "express";
import { Server } from "socket.io";
import http from "http";
import axios from "axios";
import os from "os";

function getIP() {
  const nets = os.networkInterfaces();
  for (const iface of Object.values(nets)) {
    for (const conf of iface) {
      if (conf.family === "IPv4" && !conf.internal) {
        return conf.address;
      }
    }
  }
}

const MY_IP = getIP();
const SERVICE_X = "172.20.10.4"; // <-- MET TON IP ICI

// Déclare le client auprès du Service X
axios.post(`http://${SERVICE_X}:3000/register`, { ip: MY_IP });

const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.post("/webhook", (req, res) => {
  io.emit("message", req.body.message); // Push vers UI
  res.sendStatus(200);
});

server.listen(4000, () => console.log("Client A prêt :", MY_IP));
