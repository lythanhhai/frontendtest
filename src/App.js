// import logo from './logo.svg';
import "./App.css";
import Container from "./Component/Container";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import store from "./Store/store";

const passStore = createStore(store);
function App() {
  return (
    <div className="App">
      <Provider store={passStore}>
        <Container />
      </Provider>
    </div>
  );
}

export default App;

{
  /* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */
}
