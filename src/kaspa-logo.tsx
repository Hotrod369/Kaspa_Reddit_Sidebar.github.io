import React from 'react';
import './App.css'

function MyComponent() {
  const myFunction = [
    {
      url: "https://kaspa.org/",
      alt: "Kaspa",
      src: "/assets/images/Kaspa-LDSP-Outline.png"

    },
  ];

  return (
    <div>
      <div className="kaspa-logo"></div>
      {myFunction.map((logo, index) => (
        <a key={index} href={logo.url} className="icon-link" target="_blank" rel="noopener noreferrer">
          <img src={logo.src} alt={logo.alt} className="icon-image logo-icon" />
        </a>
      ))}
    </div>
  );
}

export default MyComponent;
