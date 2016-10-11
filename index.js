import { AlchemyLanguageV1 as Alchemy } from 'watson-developer-cloud';
import Twit from 'twit';
import { Promise as Blue }  from 'bluebird';
import { curry, pluck, join } from 'ramda';
import alchemy from './src/alchemy';

const taxonomyAsync = Blue.promisify(alchemy.taxonomy, {context: alchemy});
const alchemy = new Alchemy({ api_key: process.env.ALCHEMY_API_KEY });

const t = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const fetchCorpus = (screen_name) => {
  const twitterOpts = {screen_name, count: 100, since_id: 1};
  const curriedGet = curry(t.get)('statuses/user_timeline', twitterOpts)
  const fetchTweets = Blue.promisify(curriedGet, {context: t});
  return fetchTweets().then((tweets) => join(' ')(pluck('text')(tweets)));  
}

const taxonomize = handle => fetchCorpus(handle).then(text => {
  return taxonomyAsync({text})
    .then(response => pluck('label')(response.taxonomy))
});

// const taxonomize = handle => console.log(handle)

export { taxonomize };