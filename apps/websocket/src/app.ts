import { WebSocketServer } from "ws";
import http from "http";
import { createClient, RedisClientType } from "redis";
import { ZeusManager } from "./zeusManager";

const server = http.createServer((request, response) => {
  console.log(`${new Date()} Received request for ${request.url}`);
  response.end("Hi there");
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ZeusManager.getInstance().logData();
  ws.on("error", console.error);

  ws.on("message", async (raw) => {
    const { type, data } = JSON.parse(raw.toString()) || {};
    if (type === "join-notifications-user") {
      ZeusManager.getInstance().joinGymNotificationsUser(
        data.gymIds,
        data.userId,
        ws
      );
    } else if (type === "join-notifications-admin") {
      ZeusManager.getInstance().joinGymNotificationsAdmin(
        data.gymIds,
        data.ownerId,
        ws
      );
    } else if (type === "mark-attendance") {
      ZeusManager.getInstance().markUserAttendance(
        data.gymId,
        data.userId,
        data.gymName,
        data.userName
      );
    } else if (type === "membership-purchased") {
      console.log("here1")
      ZeusManager.getInstance().joinGymMembership(
        data.gymId,
        data.userId,
        data.gymName,
        data.userName
      );
    } else {
      console.log(type, data);
    }
  });
  ws.on("close", () => {
    ZeusManager.getInstance().disconnect(ws);
  });
});

async function startApp() {
  try {
    // await ZeusManager.getInstance().initRedisClient();
    console.log("Redis initialized via ZeusManager");

    // Start the WebSocket server
    server.listen(8080, () => {
      console.log(`${new Date()} Server is listening on port 8080`);
    });
  } catch (error) {
    console.error("Failed to initialize Redis:", error);
    process.exit(1); // Exit if Redis connection fails
  }
}
startApp();
