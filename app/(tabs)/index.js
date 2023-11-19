import React from "react";
import Demo from "../../src/Demo";
const App = () => {
    return typeof window !== 'undefined' ? (React.createElement(Demo, null)) : null;
};
export default App;
//# sourceMappingURL=index.js.map