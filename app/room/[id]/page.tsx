"use client";
import { use, useRef } from "react";
import { useDraw, useWebsocket } from "@/hooks";
import DrawingTools from "@/components/DrawingTools";
import { useParams } from "next/navigation";
import useRoom from "@/hooks/useRoom";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const params: { id: string } = useParams();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { socket, sendCanvasData } = useWebsocket(params.id);
  const { setStrokeColor, setStrokeWidth, clearBoard } = useDraw(
    canvasRef,
    sendCanvasData,
  );
  const { roomData, setRoom } = useRoom();
  const { user } = useUser();
  if (socket) {
    socket.onmessage = async (e) => {
      console.log(e.data);
      const resp = await fetch(`http://localhost:8000/${params.id}`);
      const data = await resp.json();
      console.log(data);
      setRoom({
        isActive: true,
        isPublic: false,
        roomId: params.id,
        users: data.users,
        canvasImg: e.data,
        currentUserId: data?.users[0].userId,
      });
    };
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="flex gap-5">
        {roomData.currentUserId === user?.id && (
          <DrawingTools
            clearBoard={clearBoard}
            setStrokeColor={setStrokeColor}
            setStrokeWidth={setStrokeWidth}
          />
        )}
        {roomData &&
          roomData?.users.map((user, i) => (
            <div key={i} className="flex flex-col">
              {user.userId}
            </div>
          ))}
        <div className="drawing-board">
          <canvas
            ref={canvasRef}
            width={800}
            height={800}
            className=" border-black border-2"
          ></canvas>
        </div>
      </div>
    </main>
  );
}
