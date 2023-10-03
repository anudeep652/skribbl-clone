import { TSetBoardTools } from "@/types";

export default function DrawingTools({
  setStrokeColor,
  setStrokeWidth,
  clearBoard,
}: TSetBoardTools) {
  return (
    <div className="tools flex flex-col gap-5">
      <div className="color flex gap-5 items-center">
        <label htmlFor="color" className="font-[Raleway]">
          Select Color :
        </label>
        <input type="color" onChange={(e) => setStrokeColor(e.target.value)} />
      </div>

      <div className="stroke-width flex gap-5 justify-center items-center">
        <label htmlFor="strokeWidth">Select Stroke Width : </label>
        <input
          defaultValue={5}
          className="border-2 border-black outline-none px-3 py-1 rounded-lg"
          type="number"
          onChange={(e) => setStrokeWidth(Number(e.target.value))}
        />
      </div>

      <div className="clear">
        <button
          className="bg-blue-600 text-white px-3 py-2 rounded-lg"
          onClick={clearBoard}
        >
          Clear Board
        </button>
      </div>
    </div>
  );
}
