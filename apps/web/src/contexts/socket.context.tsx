import { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { SOCKET_EVENTS } from "~/keys";
import { socket } from "~/utils/socket";

const SocketContext = createContext({});

interface ISocketContext {
  socket: Socket;
  isConnected: boolean;
}

function SocketProvider({ children }: { children: React.ReactNode }) {
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

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}

function useSocket(): ISocketContext {
  const context = useContext(SocketContext) as ISocketContext;
  if (context === undefined)
    throw new Error("SocketContext was used outside the SocketProvider");
  return context;
}

export { SocketProvider, useSocket };
