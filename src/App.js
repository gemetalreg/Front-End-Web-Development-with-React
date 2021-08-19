import "./App.css";
import Main from "./components/MainComponent";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";
import { BrowserRouter as Router } from "react-router-dom";

const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
      <Router>
        {" "}
        <div className="App">
          <Main />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
