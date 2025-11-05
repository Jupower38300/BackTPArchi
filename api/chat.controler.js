import { ChatSocket } from "../chat/chat.socket.js";

// Contrôleur Chat
export class ChatControler {
  static post(req, res) {
    console.log(req.body);
    ChatSocket.INSTANCE.send(req.body.message);
    res.status(200).send();
  }
}
