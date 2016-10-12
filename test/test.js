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
      alchemy_api_key: '5e774ac8ece1b7e33432a3f50f62296097797dbe',
      twitter_consumer_key: 'awpr8Mbm1ImuOmo76OOkjii2G',
      twitter_consumer_secret: '1tSOxG1OjbXVEJ5RJmEC8ZZ1BLh2ej9N7ABPaANzYAm8hNACp4',
      twitter_access_token: '151389621-4fWLEHP5BWy8fP6D7WVVPvU6I6USSYn7fD63KzBq',
      twitter_access_token_secret: 'r2FTsZpBus1a1atTTGVZt9e6K97fbh8QQ7iabJTZMnev0'
    });
    const taxonomyLabels = [ "foo", "bar" ];
    const taxOfWhom = twax.taxonomize("quavmo");
    return expect(taxOfWhom).to.eventually.eql(taxonomyLabels);
  });
});