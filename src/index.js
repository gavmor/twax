import { milieu, corpus, corpuses } from './twitter';
import { taxonomies, taxonomy } from './alchemy';
import { 
  isEmpty, propSatisfies, reject,
  flatten, map, pluck, curry, merge, reduce, toPairs, uniq
} from 'ramda';

import { all } from 'bluebird';

export default class Twax { 
  constructor(injections) {
    Object.assign(this, {
      milieu,
      corpuses,
      taxonomies,
      corpus,
      taxonomy
    }, injections);
  };
  
  taxonomize = (opts) => 
    this.corpus(opts).then(text => this.taxonomy({text}));
  
    
  taxonomizeFriends = opts => {
    return this.milieu(opts)
        .then(this.corpuses)
        .then(this.taxonomies)
        .then(flatten)
        .then(inverseMap);
  }

}

export const inverseMap = (pairs) => {  
  return reduce(inverseMerge, {}, pairs);
}

const inverseMerge = (memo, pair) => {
  const [handle, tax] = flatten(toPairs(pair));
  return merge(memo, {
    [tax]: uniq([...(memo[tax] || []), handle])
  });
}