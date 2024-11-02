import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NAvbar from "./components/NAvbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-[100vh] w-full">
      <NAvbar />
      <div className="min-h-[85vh] w-full">
        {" "}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
