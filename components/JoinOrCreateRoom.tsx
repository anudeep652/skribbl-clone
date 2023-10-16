"use client";
import useRooms from "@/hooks/useRoom";
import { currentUser, useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function JoinOrCreateRoom() {
  const [roomId, setRoomId] = useState<string>(uuidv4());
  const { user } = useUser();
  const { setRoom, roomData } = useRooms();

  // const handleNewRoom = () => {
  //   roomsData.rooms.push({
  //     users: [{ name: user?.fullName || "" }],
  //     isActive: true,
  //     roomId: roomId,
  //     isPublic: false,
  //   });
  //   setRoom(roomsData);
  //   // setRoom((prev) => ({
  //   //   rooms: [
  //   //     ...prev.rooms,
  //   //     {
  //   //       users: [{ name: user?.fullName || "" }],
  //   //       isActive: true,
  //   //       roomId: roomId,
  //   //     },
  //   //   ],
  //   // }));
  //   console.log(roomsData);
  // };

  // const handleJoinRoom = () => {
  //   roomsData.rooms.forEach((room) => {
  //     if (room.roomId === roomId) {
  //       room.users.push({ name: user?.fullName || "" });
  //     }
  //   });
  //   setRoom(roomsData);
  //   console.log(roomsData);
  // };

  return (
    <div className="flex flex-col h-full p-7 gap-5">
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="name" className="text-white self-start">
          Name:
        </label>
        <input
          readOnly
          type="text"
          className="rounded-md py-1  outline-none px-2 text-gray-600 cursor-not-allowed"
          value={user?.fullName + ""}
        />
      </div>
      <div className="join flex flex-col gap-2">
        <label htmlFor="join" className="text-white">
          Room id:
        </label>
        <input
          type="text"
          className="py-1 rounded-md outline-none px-2"
          onChange={(e) => setRoomId(e.target.value)}
        />
      </div>
      <Link
        className="text-white text-center bg-blue-600 p-2 rounded-lg"
        href={`/room/${roomId}`}
      >
        Join Room
      </Link>
      <h2 className="text-center text-white">OR</h2>
      <Link
        className="text-white hover:opacity-0.5 text-center"
        href={`/room/${roomId}`}
      >
        Create Room
      </Link>
    </div>
  );
}
