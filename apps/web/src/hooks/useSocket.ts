import { useEffect, useState } from "react";
import { SOCKET_EVENTS } from "@keys";
import { Socket } from "socket.io-client";
import { socket } from "@utils/socket";

export function useSocket(): { socket: Socket; isConnected: boolean } {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    function onConnect() {
      console.log("You are connected");
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log("You are disconnected");
      setIsConnected(false);
    }

    socket.on(SOCKET_EVENTS.CONNECT, onConnect);
    socket.on(SOCKET_EVENTS.DISCONNECT, onDisconnect);

    return () => {
      socket.off(SOCKET_EVENTS.CONNECT, onConnect);
      socket.off(SOCKET_EVENTS.DISCONNECT, onDisconnect);
    };
  }, [isConnected]);
  return { socket, isConnected };
}
