import { milieu, corpus, corpuses } from './twitter';
import { analyzeAll, taxonomy } from './alchemy';
import { 
  flatten, map, pluck, curry, merge, reduce, toPairs 
} from 'ramda';

import { all } from 'bluebird';

export default class Twax { 
  constructor(injections) {
    Object.assign(this, {
      milieu,
      corpuses,
      analyzeAll,
      corpus,
      taxonomy
    }, injections);
  };
  
  taxonomize = (opts) => 
    this.corpus(opts).then(text => this.taxonomy({text}));
  
    
  taxonomizeFriends = opts => {
    return this.milieu(opts)
        .then(this.corpuses)
        .then(this.analyzeAll)
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
    [tax]: [...(memo[tax] || []), handle]
  });
}