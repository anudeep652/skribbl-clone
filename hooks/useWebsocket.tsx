import { useUser } from "@clerk/nextjs";
import { use, useEffect, useState } from "react";
import useRoom from "./useRoom";

export default function useWebsocket(roomId: string) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { user } = useUser();
  const { roomData, setRoom } = useRoom();

  useEffect(() => {
    console.log(user?.id);
    setSocket(
      new WebSocket(`ws://localhost:8000/join-room/${roomId}?user=${user?.id}`),
    );

    (async () => {
      const resp = await fetch(`http://localhost:8000/${roomId}`);
      const data = await resp.json();
      console.log(data);
      setRoom({
        isActive: true,
        isPublic: false,
        roomId: roomId,
        users: data.users,
        canvasImg: "",
        currentUserId: data?.users[0].userId,
      });
    })();
  }, []);
  const sendCanvasData = (data: string) => {
    socket?.send(data);
  };

  return {
    socket,
    sendCanvasData,
  };
}
