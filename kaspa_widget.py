import praw
import os
import time

REDDIT_USERNAME = os.environ['REDDIT_USERNAME']
REDDIT_PASSWORD = os.environ['REDDIT_PASSWORD']
CLIENT_ID = os.environ['CLIENT_ID']
CLIENT_SECRET = os.environ['CLIENT_SECRET']
USER_AGENT = ["Kaspa_Updater"]

def main():
    # Authenticate with Reddit
    reddit = praw.Reddit(
        username=REDDIT_USERNAME,
        password=REDDIT_PASSWORD,
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET,
        user_agent=USER_AGENT
    )

    # Get the subreddit object
    subreddit = reddit.subreddit('YOUR_SUBREDDIT_NAME')

    # Get the Kaspa widget HTML code
    with open('kaspa_widget.html', 'r') as f:
        kaspa_html = f.read()

    # Remove any existing Kaspa widget from the sidebar
    for widget in subreddit.widgets.sidebar:
        if widget.shortName == 'Kaspa Widget':
            widget.mod.remove()
            break

    # Add the Kaspa widget to the sidebar
    kaspa_widget = subreddit.widgets.mod.add_sidebar_widget(
        kind='subreddit',
        short_name='Kaspa Widget',
        css='/* ADD YOUR CSS CODE HERE */',
        text=kaspa_html
    )

    # Run indefinitely
    while True:
        # Update the Kaspa widget every 5 minutes
        time.sleep(5 * 60)

        # Get the updated Kaspa widget HTML code
        with open('kaspa_widget.html', 'r') as f:
            kaspa_html = f.read()

        # Update the Kaspa widget in the sidebar
        kaspa_widget.mod.update(text=kaspa_html)


if __name__ == '__main__':
    main()
