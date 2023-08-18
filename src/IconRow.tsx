import React from 'react';

function IconRow() {
  const icons = [
    {
      url: 'https://discord.gg/kS3SK5F36R',
      alt: 'Discord',
      src: '/assets/icons/icons8-discord-bubble-48.png',
    },
    {
      url: 'https://www.facebook.com/KaspaCurrency',
      alt: 'Facebook',
      src: '/assets/icons/icons8-facebook-48.png',
    },
    {
      url: 'https://github.com/kaspanet',
      alt: 'GitHub',
      src: '/assets/icons/icons8-github-48.png',
    },
    {
      url: 'https://www.instagram.com/kaspa_currency/',
      alt: 'Instagram',
      src: '/assets/icons/icons8-instagram-48.png',
    },
    {
      url: 'https://www.linkedin.com/company/kaspa-currency/',
      alt: 'Linkedin',
      src: '/assets/icons/icons8-linkedin-48.png',
    },
    {
      url: 'https://medium.com/kaspa-currency',
      alt: 'Medium',
      src: '/assets/icons/icons8-medium-monogram-48.png',
    },
    {
      url: 'https://www.reddit.com/r/Kaspa/',
      alt: 'Reddit',
      src: '/assets/icons/icons8-reddit.-48.png',
    },
    {
      url: 'https://t.me/Kaspaenglish',
      alt: 'Telegram',
      src: '/assets/icons/icons8-telegram-48.png',
    },
    {
      url: 'https://twitter.com/KaspaCurrency',
      alt: 'Twitter',
      src: '/assets/icons/icons8-twitter-squared-48.png',
    },
    {
      url: 'https://www.youtube.com/channel/UCsnbLKm_lpCUj63_HPW17og',
      alt: 'YouTube',
      src: '/assets/icons/icons8-youtube-48.png',
    },  
    // Add more icons with their URLs and alt text
  ];

  return (
    <div className="icon-row">
      {icons.map((icon, index) => (
        <a key={index} href={icon.url} className="icon-link" target="_blank" rel="noopener noreferrer">
          <img src={icon.src} alt={icon.alt} className="icon-image row-icon" />
        </a>
      ))}
    </div>
  );
}

export default IconRow;
