import { AlchemyLanguageV1 as Alchemy } from 'watson-developer-cloud';
import { Promise as Blue }  from 'bluebird';

const initAlchemy = () => new Alchemy({ api_key: process.env.ALCHEMY_API_KEY });

export function fetch(corpus) {
  const alchemy = initAlchemy();
  const taxonomyAsync = Blue.promisify(alchemy.taxonomy, {context: alchemy});
  return taxonomyAsync(corpus);
}

export default { fetch };