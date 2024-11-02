import React from "react";
import { useTheme } from "../context/Context";

const Leftbar = () => {
  const { chatsdata, setChatsdata } = useTheme();

  return (
    <div className="h-full w-[40vw] py-2 px-3 flex items-center justify-center gap-2 flex-col">
      <div className="flex w-full flex-row  items-center justify-between">
        <h1 className="font-semibold text-2xl">My Chats</h1>
        <button className="bg-blue-500 text-white py-1 px-2 rounded-md font-semibold">
          New Group Chat
        </button>
      </div>
      <div className="h-[70vh] w-full flex flex-col flex-wrap overflow-auto">
        {chatsdata?.map((items, key) => {
          return (
            <div
              key={key}
              className="flex w-[90%] ml-4 mt-3 flex-row items-center justify-start gap-2 border my-1 up  px-2 py-1 rounded"
            >
              <div className="flex items-center gap-2">
                <img
                  src="https://avatar.iran.liara.run/public/boy"
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="flex items-center gap-2">
                <p>{items.chatName}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Leftbar;
