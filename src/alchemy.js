import { map, flatten, toPairs, pluck } from 'ramda';
import { AlchemyLanguageV1 as Alchemy } from 'watson-developer-cloud';
import { promisify, all }  from 'bluebird';

const initAlchemy = () => new Alchemy({ api_key: process.env.ALCHEMY_API_KEY });

const pluckLabels = response => pluck('label')(response.taxonomy);

export function taxonomy(corpus) {
  const alchemy = initAlchemy();
  const taxonomyAsync = promisify(alchemy.taxonomy, {context: alchemy});
  return taxonomyAsync(corpus).then(pluckLabels);
}

export const analyzeAll = corpuses => {
  return all(map(analyzeCorpuses, corpuses))
}

const analyzeCorpuses = corpus => {  
  const [ handle, text ] = flatten(toPairs(corpus));
  const taxonomyByHandle = taxonomy => ({ [handle]: taxonomy })
  
  return taxonomy({text}).then(map(taxonomyByHandle))
};

export default { taxonomy, analyzeAll };