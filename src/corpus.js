import { curry, pluck, join } from 'ramda';
import { Promise as Blue }  from 'bluebird';
import Twit from 'twit';


const initTwit = () => new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

export function fetch (opts) {
  const t = initTwit();
  const twitterOpts = { ...opts, count: 100, since_id: 1 };
  const curriedGet = curry(t.get)('statuses/user_timeline', twitterOpts)
  const fetchTweets = Blue.promisify(curriedGet, {context: t});
  const spaceJoin = join(' ');
  const amassText = (tweets) => spaceJoin(pluck('text')(tweets));
  
  return fetchTweets().then(amassText);
}

export function milieu (opts) {
  
}

export default { fetch, milieu }