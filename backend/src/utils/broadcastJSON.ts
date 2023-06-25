import WebSocket from "ws";
import { IncomingMessage } from "http";

function broadcastJSON(
  wss: WebSocket.Server<typeof WebSocket, typeof IncomingMessage>,
  jsonData: any
) {
  const jsonStr = JSON.stringify(jsonData);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(jsonStr);
    }
  });
}

export default broadcastJSON;
