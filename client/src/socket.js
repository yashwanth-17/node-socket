import io from "socket.io-client";
import { createContext, useEffect, useState } from "react";
// import { parse, stringify } from "flatted";

export const SocketContext = createContext(null);
// const SOCKET_KEY = "SOCKET.IO-CLIENT_SOCKET_KEY";

export function SocketContextProvider(props) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // if (localStorage.getItem(SOCKET_KEY)) {
    //   const SOCKET_KEY_DATA = parse(
    //     localStorage.getItem(SOCKET_KEY),
    //     (key, value) => {
    //       console.log("revive", key, value);
    //     }
    //   );
    //   setSocket(SOCKET_KEY_DATA);
    // } else {
    const new_socket = io("http://192.168.0.106:5000");
    setSocket(new_socket);
    // localStorage.setItem(SOCKET_KEY, stringify(new_socket));
    return () => {
      new_socket.disconnect();
      // localStorage.removeItem(SOCKET_KEY);
    };
    // }
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {props.children}
    </SocketContext.Provider>
  );
}
