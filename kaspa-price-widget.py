import praw
import os
import requests
import time

# Authenticate with Reddit using credentials from GitHub secrets
reddit = praw.Reddit(
    client_id=os.environ['REDDIT_CLIENT_ID'],
    client_secret=os.environ['REDDIT_CLIENT_SECRET'],
    user_agent=os.environ['REDDIT_USER_AGENT'],
    username=os.environ['REDDIT_USERNAME'],
    password=os.environ['REDDIT_PASSWORD'],
)

# Use the URL of your hosted HTML file
url = "https://hotrod369.github.io/kaspa-price-widget.html"

def main():
    # Get the subreddit object
    subreddit = reddit.subreddit('kaspa')

    # Remove any existing Kaspa widget from the sidebar
    for widget in subreddit.widgets.sidebar:
        if widget.shortName == 'Kaspa Price Updater':
            widget.mod.remove()
            break

    while True:
        # Download the HTML content from the URL
        response = requests.get(url)
        html_code = response.text

        # Create a new subreddit widget with custom content
        widget = subreddit.widgets.mod.create(
            "Custom Widget Title",
            kind="custom",
            shortName="Kaspa Price Updater",
            jsonDict={"html": html_code},
        )

        # Update the subreddit widget to apply the changes
        widget.mod.update()

        # Wait for 5 minutes before updating again
        time.sleep(5 * 60)


if __name__ == '__main__':
    main()

