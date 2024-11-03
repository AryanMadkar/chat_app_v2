import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [chatsdata, setChatsdata] = useState(null);
  const [clickeduser, setClickeduser] = useState();
  const [selectedchat, setSelectedchat] = useState();
  const [chats, setChats] = useState();
  const [userinfo, setUserinfo] = useState(() =>
    JSON.parse(localStorage.getItem("userinfo"))
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (chatsdata) {
      console.log("Updated chatsdata:", chatsdata);
    }
  }, [chatsdata]);

  const accesschat = async (userid) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userinfo?.token}`,
        },
      };
      const result = await axios.get(
        "http://localhost:5000/chatapp/accesschat",
        { userid },
        config
      );
      setSelectedchat(result.data);

      console.log("Chats data:", result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userinfo");
    setUserinfo(null);
    navigate("/login");
  };

  return (
    <ThemeContext.Provider
      value={{
        chatsdata,
        setChatsdata,
        setUserinfo,
        userinfo,
        handleLogout,
        accesschat,
        clickeduser,
        setClickeduser,
        selectedchat,
        setSelectedchat,
        chats,
        setChats,
        accesschat,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);
