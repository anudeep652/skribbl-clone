import { MutableRefObject, useEffect, useState } from "react";
import { TSetBoardTools } from "@/types";
import { useUser } from "@clerk/nextjs";
import useRoom from "./useRoom";

export default function useDraw(
  canvasRef: MutableRefObject<HTMLCanvasElement | null>,
  sendCanvasData: (data: string) => void,
): TSetBoardTools {
  const [shouldDraw, setShouldDraw] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [strokeColor, setStrokeColor] = useState("black");
  const { user } = useUser();
  const { roomData } = useRoom();
  console.log(user?.id);
  console.log(roomData);

  const ctx = canvasRef.current?.getContext("2d");

  const canvasOffsetX = canvasRef.current?.offsetLeft || 0;
  const canvasOffsetY = canvasRef.current?.offsetTop || 0;

  const handleMouseDown = (e: MouseEvent) => {
    setShouldDraw(true);
  };

  const clearBoard = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const draw = (e: MouseEvent) => {
    if (!shouldDraw || !ctx) return;
    ctx.lineCap = "round";
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = strokeColor;
    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
    ctx.stroke();
  };

  const handleMouseUp = (e: MouseEvent) => {
    setShouldDraw(false);
    if (!ctx) return;
    ctx.stroke();
    ctx.beginPath();
  };

  useEffect(() => {
    console.log("inside");
    if (user?.id === roomData.currentUserId) {
      canvasRef.current?.addEventListener("mousedown", handleMouseDown);

      canvasRef.current?.addEventListener("mouseup", handleMouseUp);
      canvasRef.current?.addEventListener("mousemove", draw);
      window.addEventListener("mouseup", handleMouseUp);
      sendCanvasData(canvasRef.current?.toDataURL() || "");
    } else {
      const image = document.createElement("img");
      document.body.appendChild(image);
      image.setAttribute("alt", "script div");
      image.setAttribute("src", `data:image/png;base64,${roomData.canvasImg}`);

      ctx?.drawImage(image, 0, 0);
    }

    return () => {
      canvasRef.current?.removeEventListener("mousedown", handleMouseDown);
      canvasRef.current?.removeEventListener("mouseup", handleMouseUp);

      canvasRef.current?.removeEventListener("mousemove", draw);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [shouldDraw]);
  return { setStrokeColor, setStrokeWidth, clearBoard };
}
