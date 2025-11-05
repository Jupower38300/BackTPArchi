import axios from "axios";
import { clients } from "../index.js";

export class ChatController {
  static async post(req, res) {
    const message = req.body.message;
    console.log("[Service X] Message reçu :", message);

    // Envoi du message par WebHook vers chaque client enregistré
    for (const ip of clients) {
      await axios.post(`http://${ip}:4000/webhook`, { message });
    }

    res.status(200).send();
  }
}
