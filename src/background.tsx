import React from 'react';
import './styles.css'; // Import your CSS file
import '../assets/images/background.png'

function BackgroundImage() {
  return (
    <div style={{ backgroundImage: `url(${'../assets/images/background.png'})` }}>
      Hello World
    </div>
  );
}

export default BackgroundImage;
