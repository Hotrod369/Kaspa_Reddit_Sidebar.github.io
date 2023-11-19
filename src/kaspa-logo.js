import React from 'react';
import './App.css';
function MyComponent() {
    const myFunction = [
        {
            url: "https://kaspa.org/",
            alt: "Kaspa",
            src: "/assets/images/Kaspa-LDSP-Outline.png"
        },
    ];
    return (React.createElement("div", null,
        React.createElement("div", { className: "kaspa-logo" }),
        myFunction.map((logo, index) => (React.createElement("a", { key: index, href: logo.url, className: "icon-link", target: "_blank", rel: "noopener noreferrer" },
            React.createElement("img", { src: logo.src, alt: logo.alt, className: "icon-image logo-icon" }))))));
}
export default MyComponent;
//# sourceMappingURL=kaspa-logo.js.map