import Twax from '../src';
import { stub } from 'sinon';
import alchemy from '../src/alchemy';
import corpus from '../src/corpus';


describe('taxonomize()', function() {
  beforeEach(function () {
    const mockTweets = [ {text: 'foo'}, {text: 'bar'}, {text: 'baz'}, ];  
    const mockTaxonomy = {taxonomy: [{label: 'foo'}, {label: 'bar'}]};
    stub(corpus, 'fetch').resolves(mockTweets);
    stub(alchemy, 'fetch').resolves(mockTaxonomy);
  });
  
  it('classifies a twitter handle by the taxonomies of its post', function () {
    const twax = new Twax({
      alchemy_api_key: process.env.ALCHEMY_API_KEY,
      twitter_consumer_key: process.env.TWITTER_CONSUMER_KEY,
      twitter_consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      twitter_access_token: process.env.TWITTER_ACCESS_TOKEN,
      twitter_access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET'
    });
    const taxonomyLabels = [ "foo", "bar" ];
    const taxOfWhom = twax.taxonomize("quavmo");
    return expect(taxOfWhom).to.eventually.eql(taxonomyLabels);
  });
});