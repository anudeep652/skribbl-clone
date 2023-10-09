import { useEffect, useState } from "react";

export default function useWebsocket() {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    setSocket(new WebSocket("ws://localhost:8000/join-room/123"));
  }, []);
  const sendCanvasData = (data: string) => {
    socket?.send(data);
  };

  return {
    socket,
    sendCanvasData,
  };
}
