import praw
import os
import time

# Load the Reddit credentials from environment variables
reddit_client_id = os.environ.get('REDDIT_CLIENT_ID')
reddit_client_secret = os.environ.get('REDDIT_CLIENT_SECRET')
reddit_username = os.environ.get('REDDIT_USERNAME')
reddit_password = os.environ.get('REDDIT_PASSWORD')

# Initialize the Reddit API client using the credentials
reddit = praw.Reddit(
    client_id=reddit_client_id,
    client_secret=reddit_client_secret,
    username=reddit_username,
    password=reddit_password,
    user_agent='Kaspa_Updater'
)

def main():
    # Get the subreddit object
    subreddit = reddit.subreddit('Kaspa')

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
