import React from "react";
import { useTheme } from "../context/Context";

const Leftbar = () => {
  const { chatsdata, setChatsdata } = useTheme();

  return (
    <div className="h-full w-[40vw] py-2 px-3 flex items-center justify-center gap-2 flex-col">
      <div className="flex w-full flex-row  items-center justify-between">
        <h1 className="font-semibold text-2xl">My Chats</h1>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn bg-blue-700 text-white"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Group chats
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg capitalize">create group</h3>
            <input
              type="text"
              placeholder="Create a new group"
              className="input input-bordered my-2 w-full max-w-xs"
            />
            <input
              type="text"
              placeholder="Get members"
              className="input input-bordered my-2 w-full max-w-xs"
            />

            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
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
