import JoinOrCreateRoom from "@/components/JoinOrCreateRoom";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main
      className="h-full flex flex-col items-center"
      style={{
        background: "url(https://skribbl.io/img/background.png)",
      }}
    >
      <div className="user-profile ml-auto m-5">
        <UserButton afterSignOutUrl="/" />
      </div>
      <div className="flex  items-center flex-col h-full w-[80%] gap-10 py-20">
        <div className="top  flex justify-between ">
          <img src="https://skribbl.io/img/logo.gif" />
        </div>
        <div
          style={{
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
          className="md:w-[20%]  rounded-xl  bg-[#123595]"
        >
          <JoinOrCreateRoom />
        </div>
      </div>
    </main>
  );
}
