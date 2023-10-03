"use client";
import { useRef } from "react";
import { useDraw } from "@/hooks";
import DrawingTools from "@/components/DrawingTools";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>();
  const [setStrokeColor, setStrokeWidth] = useDraw(canvasRef);

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="flex gap-5">
        <DrawingTools
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
