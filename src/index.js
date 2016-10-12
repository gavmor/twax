import { pluck } from 'ramda';
import alchemy from './alchemy';
import corpus from './corpus';

const pluckLabels = response => pluck('label')(response.taxonomy);

const taxonomize = handle => corpus.fetch(handle)
  .then(text => alchemy.fetch({text}))
  .then(pluckLabels);

const Twax = { taxonomize, alchemy, corpus };
export default Twax;