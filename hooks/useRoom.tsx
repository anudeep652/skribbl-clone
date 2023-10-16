import { RoomsContext } from "@/context/roomsContext";
import { useContext } from "react";

export default function useRoom() {
  const { roomData, setRoom } = useContext(RoomsContext);
  return { roomData, setRoom };
}
