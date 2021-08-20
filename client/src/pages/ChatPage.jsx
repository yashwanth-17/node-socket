import { useRef, useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context";
import { SocketContext } from "../socket";

export default function ChatPage() {
  const { user, removeUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.emit("user", user.username);
    }
  }, [socket, user?.username]);

  useEffect(() => {
    if (socket) {
      socket.on("user", (data) => {
        setUsers(data);
      });
      return () => {
        socket.off("user");
      };
    }
  });

  useEffect(() => {
    if (socket) {
      socket.on("message", (obj) => {
        setMessages([...messages, obj]);
      });
      return () => {
        socket.off("message");
      };
    }
  });

  function leaveRoom() {
    socket.disconnect();
    removeUser();
  }

  function sendMessage() {
    const obj = { ...user, message: inputRef.current.value };
    socket.emit("message", obj);
    inputRef.current.value = "";
  }

  if (!user) return <Redirect exact to="/join" />;
  return (
    <div className="chat-page">
      <div className="chat-box">
        <div className="chat-header">
          <p>Socket-Demo</p>
          <button onClick={leaveRoom}>leave room</button>
        </div>
        <div className="chat-container">
          <div className="left-box">
            <small>User name</small>
            <p className="highlight">{user.username}</p>
            <small>Room name</small>
            <p className="highlight">{user.room}</p>
            <small>Users {`(${users.length})`}</small>
            <div className="users">
              {users.map((_) => (
                <p key={_.id} className="user">
                  {_.username}
                </p>
              ))}
            </div>
          </div>
          {/* messages */}
          <div className="right-box">
            <ul ref={scrollRef} className="messages">
              {messages.map((_, i) => (
                <Message
                  key={i}
                  username={_.username}
                  message={_.message}
                  time={_.time}
                />
              ))}
            </ul>
            <div className="input-box">
              <input
                ref={inputRef}
                className="input"
                placeholder="type a message..."
              />
              <button className="send-btn" onClick={sendMessage}>
                send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Message({ username, message, time }) {
  return (
    <li className="message">
      <small>
        {username} {time}
      </small>
      <p>{message}</p>
    </li>
  );
}
