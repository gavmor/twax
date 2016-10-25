import Twax from '../src';
import { stub } from 'sinon';
import alchemy from '../src/alchemy';
import corpus from '../src/corpus';


describe('taxonomize()', function() {
  let twax;
  
  beforeEach(function () {
    const mockTweets = [ {text: 'foo'}, {text: 'bar'}, {text: 'baz'}, ];  
    const mockTaxonomy = {taxonomy: [{label: 'foo'}, {label: 'bar'}]};
    
    stub(corpus, 'fetch').resolves(mockTweets);
    stub(alchemy, 'fetch').resolves(mockTaxonomy);
    
    twax = new Twax();
  });
  
  afterEach(function () {
    corpus.fetch.restore();
    alchemy.fetch.restore();
  })
  
  it('classifies a twitter handle by the taxonomies of its post', function () {
    const taxonomyLabels = [ "foo", "bar" ];
    const taxOfWhom = twax.taxonomize({screen_name: "quavmo"});
    return expect(taxOfWhom).to.eventually.eql(taxonomyLabels);
  });
  
  it('classifies a twitter user_id by the taxonomies of its post', function () {
    const taxonomyLabels = [ "foo", "bar" ];
    const taxOfWhom = twax.taxonomize({user_id: 151389621});
    return expect(taxOfWhom).to.eventually.eql(taxonomyLabels);
  });
});