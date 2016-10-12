import { AlchemyLanguageV1 as Alchemy } from 'watson-developer-cloud';
import { Promise as Blue }  from 'bluebird';

const alchemy = new Alchemy({ api_key: process.env.ALCHEMY_API_KEY });
export const fetch = Blue.promisify(alchemy.taxonomy, {context: alchemy});

export default { fetch };