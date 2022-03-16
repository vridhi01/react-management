import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
/**
 * Home Page of the Application
 * @return {JSX.Element}
 */
const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={() => setCount(count + 1)}>Count</button>
        <div>count</div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
