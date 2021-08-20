import { useContext } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { AuthContext } from "./context";
import JoinPage from "./pages/JoinPage";
import ChatContextPage from "./pages/ChatContextPage";

export default function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ChatContextPage} />
        <Route exact path="/join" component={JoinPage} />
        <Redirect exact to={user ? "/" : "/join"} />
      </Switch>
    </Router>
  );
}
