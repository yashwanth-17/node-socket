import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);
const AUTH_KEY = "SOCKET.IO-CLIENT_AUTH_KEY";

export function AuthContextProvider(props) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const AUTH_KEY_DATA = JSON.parse(localStorage.getItem(AUTH_KEY));
    if (AUTH_KEY_DATA) {
      setUser(AUTH_KEY_DATA);
    }
  }, []);
  function storeUser(obj) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(obj));
    setUser(obj);
  }
  function removeUser() {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  }
  return (
    <AuthContext.Provider value={{ user, storeUser, removeUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}
