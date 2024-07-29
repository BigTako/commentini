import { io, Socket } from "socket.io-client";
import { STORAGE_KEYS } from "~/keys";

const socketUrl = process.env.SERVER_URL as string;

export const socket: Socket = io(socketUrl, {
  auth: {
    token: localStorage.getItem(STORAGE_KEYS.TOKEN),
  },
});
