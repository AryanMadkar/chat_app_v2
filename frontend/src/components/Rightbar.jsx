import React from "react";

const Rightbar = () => {
  return (
    <div className="w-full h-full flex flex-col rounded-xl border-green-700 p-2 justify-between items-center">
      <div className="w-full h-[75vh] overflow-auto  flex items-center flex-col justify-center">
        <div className="chat chat-start w-full">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">12:45</time>
          </div>
          <div className="chat-bubble">You were the Chosen One!</div>
        </div>
        <div className="chat chat-end w-full">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            Anakin
            <time className="text-xs opacity-50">12:46</time>
          </div>
          <div className="chat-bubble">I hate you!</div>
        </div>
      </div>

      <div className="h-[10vh] w-full  flex flex-row items-center justify-around">
        <div className="w-full flex items-center justify-center ">
          <div className="chat-input w-full">
            <input
              type="text"
              placeholder="Type a message..."
              className="input input-bordered w-full"
            />
          </div>
          <div className="chat-send m-2 btn bg-blue-700 outline-none border-none font-semibold text-white">
            <button className="button button-primary">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
