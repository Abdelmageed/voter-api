const config = {
  PORT: process.env.PORT || 3000,
  TEST_PORT: 3008,
  DATA_URL: process.env.DATA_URL || "mongodb://localhost:27017/voter",
  TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY || "TZ1US4AaOuWfqqDqTPvjlHv6H ",
  TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET || "o8YdKabwt7rpChEAQO8FgnRLKAPwWVUIXCmLmMTtSoBUIw7jQL",
  TWITTER_CALLBACK_URL: process.env.TWITTER_CALLBACK_URL || "http://localhost:3000/auth/twitter/callback"
};

export default config;