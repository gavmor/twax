import { taxonomize } from '..';
import { stub } from 'sinon';
import alchemy from '../src/alchemy';
import corpus from '../src/corpus';


describe('taxonomize', function() {
  afterEach(function(){
    // Twit.prototype.get.restore();
  });
  
  beforeEach(function () {
    const mockTweets = [ {text: 'foo'}, {text: 'bar'}, {text: 'baz'}, ];  
    // stub(corpus.fetch).resolves(mockTweets);
  });
  
  it('classifies a twitter handle by the taxonomies of its post', function () {
    return expect(taxonomize("chowchowkelly")).to.eventually.eql([
      "/hobbies and interests/reading",
      "/shopping/resources/coupons",
      "/art and entertainment/music/singing"
    ]);
  });
});