import Twax from '..';
import { stub } from 'sinon';
import alchemy from '../src/alchemy';
import corpus from '../src/corpus';


describe('taxonomize', function() {
  beforeEach(function () {
    const mockTweets = [ {text: 'foo'}, {text: 'bar'}, {text: 'baz'}, ];  
    const mockTaxonomy = {taxonomy: [{label: 'foo'}, {label: 'bar'}]};
    stub(corpus, 'fetch').resolves(mockTweets);
    stub(alchemy, 'fetch').resolves(mockTaxonomy);
  });
  
  it('classifies a twitter handle by the taxonomies of its post', function () {
    const taxonomyLabels = [ "foo", "bar" ];
    const taxOfWhom = Twax.taxonomize("quavmo");
    Twax.taxonomize('quavmo').then(console.log)
    return expect(taxOfWhom).to.eventually.eql(taxonomyLabels);
  });
});