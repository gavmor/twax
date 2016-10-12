import { pluck, curry } from 'ramda';
import alchemy from './alchemy';
import corpus from './corpus';

const pluckLabels = response => pluck('label')(response.taxonomy);

export default class Twax { 
  constructor(){
    // curry(corpus.fetch, {});
    // curry(alchemy.fetch, {});
  }
  
  taxonomize(handle)  {
    return corpus.fetch(handle)
      .then(text => alchemy.fetch({text}))
      .then(pluckLabels);
    }
}