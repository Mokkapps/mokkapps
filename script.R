library(tweetrmd)
library(rtweet)

lasttweet_token <- function() {
  create_token(
    "github-readme",
    consumer_key = Sys.getenv("TWITTER_API_KEY"),
    consumer_secret = Sys.getenv("TWITTER_API_SECRET_KEY")
    set_renv = FALSE
  )
}

handle <- "mokkapps"
recent_tweets <- get_timeline(handle, n = 1, token = lasttweet_token())

tmpimg <- "tweet.png"
tweet_screenshot(
  tweet_url(handle, recent_tweets$status_id),
  scale = 5, 
  maxwidth = 600,
  theme = "light",
  file = tmpimg
)
