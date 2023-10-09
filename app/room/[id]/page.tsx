"use client";
import { useEffect, useRef } from "react";
import { useDraw } from "@/hooks";
import DrawingTools from "@/components/DrawingTools";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setStrokeColor, setStrokeWidth, clearBoard } = useDraw(canvasRef);
  console.log("effect");

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="flex gap-5">
        <DrawingTools
          clearBoard={clearBoard}
          setStrokeColor={setStrokeColor}
          setStrokeWidth={setStrokeWidth}
        />
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
