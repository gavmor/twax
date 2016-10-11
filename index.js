import { pluck } from 'ramda';
import { fetch as fetchAlchemy } from './src/alchemy';
import { fetch as fetchCorpus} from './src/corpus';

const pluckLabels = response => pluck('label')(response.taxonomy);

const taxonomize = handle => fetchCorpus(handle)
  .then(text => fetchAlchemy({text}))
  .then(pluckLabels);

export { taxonomize };