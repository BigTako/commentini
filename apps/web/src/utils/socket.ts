import { io, Socket } from "socket.io-client";

const socketUrl = process.env.SERVER_URL as string;

export const socket: Socket = io(socketUrl, {
  auth: {
    token: "sdfsdsdfsdfdsf",
  },
});
