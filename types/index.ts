export * from "./board";
export type TRoom = {
  roomId: string;
  users: { userId: string }[];
  isActive: boolean;
  isPublic: boolean;
  canvasImg: string;
  currentUserId: string;
};
