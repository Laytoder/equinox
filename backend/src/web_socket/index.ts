import WebSocket from "ws";

export default function createWebSocket(fundData: any) {
  const PORT = parseInt(process.env.PORT!, 10);

  const wss = new WebSocket.Server({ port: PORT });

  wss.on("listening", () => {
    console.log(`Socket open at ws://localhost:${PORT}`);
  });

  wss.on("error", (error) => {
    console.error("WebSocket error:", error);
  });

  wss.on("connection", (ws) => {
    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });

    // ws.on("close", () => {
    //   console.log("WebSocket connection closed");
    // });

    if (ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          messageType: "Fund Data",
          fundData: fundData,
        })
      );
    }
  });

  return wss;
}
