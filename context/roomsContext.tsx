"use client";
import { TRoom } from "@/types";
import { Dispatch, SetStateAction, createContext, useState } from "react";

const room: TRoom = {
  users: [{ userId: "" }],
  isActive: false,
  roomId: "",
  isPublic: true,
  canvasImg: "",
  currentUserId: "",
};

export const RoomsContext = createContext<{
  roomData: TRoom;
  setRoom: Dispatch<SetStateAction<TRoom>>;
}>({
  roomData: room,
  setRoom: () => {},
});

export default function RoomContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currRoom, setCurrRoom] = useState<TRoom>(room);

  return (
    <RoomsContext.Provider value={{ roomData: currRoom, setRoom: setCurrRoom }}>
      {children}
    </RoomsContext.Provider>
  );
}
