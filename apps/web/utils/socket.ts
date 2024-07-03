import { io, Socket } from "socket.io-client";

const socketUrl = "http://localhost:4000" as string;

export const socket: Socket = io(socketUrl);
