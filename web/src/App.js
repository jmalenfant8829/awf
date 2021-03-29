import { Route, Switch } from "react-router";
import "./App.scss";
import Button from "./components/Button/Button";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
