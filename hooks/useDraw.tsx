import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export default function useDraw(
  canvasRef: MutableRefObject<HTMLCanvasElement | undefined>
): [
  setStrokeColor: Dispatch<SetStateAction<string>>,
  setStrokeWidth: Dispatch<SetStateAction<number>>
] {
  const [shouldDraw, setShouldDraw] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [strokeColor, setStrokeColor] = useState("black");

  const ctx = canvasRef.current?.getContext("2d");

  const canvasOffsetX = canvasRef.current?.offsetLeft || 0;
  const canvasOffsetY = canvasRef.current?.offsetTop || 0;

  const handleMouseDown = (e: MouseEvent) => {
    setShouldDraw(true);
    console.log(shouldDraw);
    console.log(e.clientX, e.clientY);
    if (!ctx) return;
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
    canvasRef.current?.addEventListener("mousedown", handleMouseDown);

    canvasRef.current?.addEventListener("mouseup", handleMouseUp);
    canvasRef.current?.addEventListener("mousemove", draw);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvasRef.current?.removeEventListener("mousedown", handleMouseDown);
      canvasRef.current?.removeEventListener("mouseup", handleMouseUp);

      canvasRef.current?.removeEventListener("mousemove", draw);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [shouldDraw]);
  return [setStrokeColor, setStrokeWidth];
}
