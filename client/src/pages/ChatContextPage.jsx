import React from "react";
import { SocketContextProvider } from "../socket";
import ChatPage from "./ChatPage";

export default function ChatContextPage() {
  return (
    <SocketContextProvider>
      <ChatPage />
    </SocketContextProvider>
  );
}
