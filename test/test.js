import { taxonomize } from '..';
import Twit from 'twit';
import { stub } from 'sinon';

describe('taxonomize', function() {
  afterEach(function(){
    // Twit.prototype.get.restore();
  });
  
  beforeEach(function () {
    const mockTweets = [ {text: 'foo'}, {text: 'bar'}, {text: 'baz'}, ];  
    // stub(Twit.prototype, 'get').yields(mockTweets);
  });
  
  it('classifies a twitter handle by the taxonomies of its post', function () {
    return expect(taxonomize("chowchowkelly")).to.eventually.eql([
      "/hobbies and interests/reading",
      "/shopping/resources/coupons",
      "/art and entertainment/music/singing"
    ]);
  });
});