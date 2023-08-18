import React from 'react';

const RedditEmbed: React.FC = () => {
  return (
    <>
      <blockquote className="reddit-embed-bq" data-embed-locale="en-EN" data-embed-theme="dark" data-embed-height="502">
        Posts from the <a href="https://www.reddit.com/r/kaspa/">kaspa</a> community on Reddit 
      </blockquote>
      <script async src="https://embed.reddit.com/widgets.js"></script>
    </>
  );
};

export default RedditEmbed;
