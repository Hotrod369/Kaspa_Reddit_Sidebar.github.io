import praw
import os
import requests

# Authenticate with Reddit using credentials from GitHub secrets
reddit = praw.Reddit(
    client_id=os.environ['REDDIT_CLIENT_ID'],
    client_secret=os.environ['REDDIT_CLIENT_SECRET'],
    user_agent=os.environ['REDDIT_USER_AGENT'],
    username=os.environ['REDDIT_USERNAME'],
    password=os.environ['REDDIT_PASSWORD'],
)

# Download the HTML file from GitHub
url = "https://github.com/Hotrod369/Hotrod369.github.io/blob/First/kaspa-price-widget.html"
response = requests.get(url)
html_code = response.text

# Create a new subreddit widget with custom content
widget = reddit.subreddit("kaspa").widgets.mod.create(
    "Custom Widget Title",
    kind="custom",
    shortName="Kaspa Price Updater",
    jsonDict={"html": html_code},
)

# Update the subreddit widget to apply the changes
widget.mod.update()
