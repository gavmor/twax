import { flatten, map, pluck, curry, merge, reduce, toPairs } from 'ramda';
import { all } from 'bluebird';
import alchemy from './alchemy';
import twitter from './twitter';

const pluckLabels = response => pluck('label')(response.taxonomy);

export default class Twax { 
  constructor(){
    // curry(corpus.fetch, {});
    // curry(alchemy.fetch, {});
  }
  
  taxonomize(opts) {
    return twitter.corpus(opts)
      .then(text => alchemy.fetch({text}))
      .then(pluckLabels);
  }
    
  taxonomizeFriends(opts) {
    return twitter.milieu(opts)
        .then(users => all(map(corpusByScreenName, users)))
        .then(corpuses => all(map(analyzeCorpuses, corpuses)))
        .then(flatten)
        .then(inverseMap);
  };
}

const inverseMerge = (memo, pair) => {
  const [handle, tax] = flatten(toPairs(pair));
  return merge(memo, {
    [tax]: [...(memo[tax] || []), handle]
  });
}

export function inverseMap (pairs) {  
  return reduce(inverseMerge, {}, pairs);
}

const analyzeCorpuses = (corpus) => {
  const [handle, text] = flatten(toPairs(corpus))
  const assignTaxonomyToHandle = taxonomy => ({ [handle]: taxonomy })
  return alchemy.fetch({text})
    .then(pluckLabels)
    .then(map(assignTaxonomyToHandle))
}

const corpusByScreenName = handle => {
  const format = doc => ({[handle]: doc})
  return twitter.corpus({screen_name: handle}).then(format)
}
  
  
