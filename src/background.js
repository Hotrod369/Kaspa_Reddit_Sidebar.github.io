import React from 'react';
import '../assets/images/background.png';
import './styles.css'; // Import your CSS file
function BackgroundImage() {
    return (React.createElement("div", { style: { backgroundImage: `url(${'../assets/images/background.png'})` } }, "Hello World"));
}
export default BackgroundImage;
//# sourceMappingURL=background.js.map