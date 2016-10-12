import { pluck } from 'ramda';
import alchemy from './src/alchemy';
import corpus from './src/corpus';

const pluckLabels = response => pluck('label')(response.taxonomy);

const taxonomize = handle => corpus.fetch(handle)
  .then(text => alchemy.fetch({text}))
  .then(pluckLabels);

export { taxonomize };