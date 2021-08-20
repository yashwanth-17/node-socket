import { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context";

export default function JoinPage() {
  const { user, storeUser } = useContext(AuthContext);
  const [state, setState] = useState({ username: "", room: "C++" });
  if (user) return <Redirect to="/" />;
  function joinRoom() {
    storeUser(state);
  }
  return (
    <div>
      <p>join page</p>
      <input
        placeholder="username"
        value={state.username}
        onChange={(e) => setState({ ...state, username: e.target.value })}
      />
      <select
        title="rooms"
        value={state.room}
        onChange={(e) => setState({ ...state, room: e.target.value })}
      >
        {["C++", "Java", "PHP", "JavaScript", "Python"].map((_) => (
          <option key={_} value={_}>
            {_}
          </option>
        ))}
      </select>
      <button onClick={joinRoom}>join room</button>
    </div>
  );
}
