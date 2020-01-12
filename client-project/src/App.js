import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import BodyWrapper from './Structure/BodyWrapper';

function App() {
  return (
    <div className="App">
      <Router>
        <BodyWrapper />
      </Router>
    </div>
  );
}

export default App;
