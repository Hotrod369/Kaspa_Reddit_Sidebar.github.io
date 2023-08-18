import React from "react";
import Demo from "../../src/Demo";

const App = () => {
  return typeof window !== 'undefined' ? (
    <Demo />
  ) : null;
}

export default App;