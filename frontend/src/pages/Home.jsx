import React, { useEffect } from "react";
import Leftbar from "../components/Leftbar";
import Rightbar from "../components/Rightbar";

const Home = () => {
  return (
    <div className="p-2 h-[87.4vh]   w-full">
      <div className="h-full overflow-hidden rounded-xl w-full bg-black flex items-center justify-center gap-4 flex-row">
        <Leftbar />
        <Rightbar className=" h-full w-full" />
      </div>
    </div>
  );
};

export default Home;
