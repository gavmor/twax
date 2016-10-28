import { writeFileSync } from 'fs';
import { prop, curry, pluck, join, map } from 'ramda';
import Promise, { promisify, all } from 'bluebird';
import Twit from 'twit';

const initTwit = () => new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

export function corpus (opts) {
  const t = initTwit();
  const twitterOpts = { ...opts, count: 100, since_id: 1 };
  const curriedGet = curry(t.get)('statuses/user_timeline', twitterOpts)
  const fetchTweets = promisify(curriedGet, {context: t});
  const spaceJoin = join(' ');
  const amassText = (tweets) => spaceJoin(pluck('text')(tweets));
  
  return fetchTweets().then(amassText);
}

export function milieu (opts) {
  const t = initTwit();
  const curriedGet = curry(t.get)('friends/list', {...opts, count: 200, statuses: false})
  const fetchFriends = promisify(curriedGet, {context: t});
  return fetchFriends().then(prop('users')).then(pluck('screen_name'));
}

export const corpuses = users => all(map(corpusByScreenName, users))

const corpusByScreenName = handle => {
  const format = doc => ({[handle]: doc})
  return corpus({screen_name: handle}).then(format)
}

export default { corpus, milieu, corpuses }