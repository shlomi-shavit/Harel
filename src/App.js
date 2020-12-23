import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";

// Component
import Routes from './component/routing/routes';

const App = () => {
  return (
    <Router>

      <Routes />

    </Router>
  );
};

export default App;
