// ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [chatsdata, setChatsdata] = useState(null);

  const fetchchats = async (signal) => {
    try {
      const result = await axios.get("http://localhost:5000/chatapp/api/data", {
        signal,
      });
      setChatsdata(result.data);
      console.log("Fetched data:", result.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Fetch cancelled:", error.message);
      } else {
        console.error("Error fetching chats:", error);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchchats(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  // Log data whenever it updates
  useEffect(() => {
    if (chatsdata) {
      console.log("Updated chatsdata:", chatsdata);
    }
  }, [chatsdata]);

  return (
    <ThemeContext.Provider value={{ chatsdata, setChatsdata }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);
