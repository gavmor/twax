import { corpuses, corpus, milieu } from '../src/twitter';
import { stub } from 'sinon';
import Twit from 'twit';

describe("twitter", function () {
  describe('milieu', function () {
    beforeEach(function () {
      const response = {
        users: [
          {id:1, screen_name: 'luchisimog'},
          {id:2, screen_name: 'mrmicrowaveoven'},
          {id:3, screen_name: 'errantspark'}
        ]
      };
      stub(Twit.prototype, 'get').yields(null, response, null);
    });
    
    afterEach(() => Twit.prototype.get.restore())
    
    it('returns friends of a user', function () {
      return expect(milieu({screen_name: 'mrmicrowaveoven'})).to.eventually
        .deep.equal(['luchisimog', 'mrmicrowaveoven', 'errantspark']);
    })
  })
  
  describe('corpus', function () {
    beforeEach(function () {
      const timeline = [{text: 'foo'}, {text: 'bar'}, {text: 'baz'}];
      stub(Twit.prototype, 'get').yields(null, timeline, null);
    });
    
    afterEach(() => Twit.prototype.get.restore())
    
    it('turns a user into  blob of text', function () {
      return expect(corpus({screen_name: 'quavmo'}))
        .to.eventually.deep.equal("foo bar baz");
    });
  });
  
  describe('corpuses', function () {
    beforeEach(function () {
      const timeline = [{text: 'foo'}, {text: 'bar'}, {text: 'baz'}];
      stub(Twit.prototype, 'get').yields(null, timeline, null);
    });
    
    afterEach(() => Twit.prototype.get.restore())
    
    it('turns a list of users into blobs of text keyed by users', function () {
      return expect(corpuses(['quavmo', 'KimKierkegaard']))
        .to.eventually.deep.equal([
          {quavmo: 'foo bar baz'},
          {KimKierkegaard: 'foo bar baz'}
        ]);
    });
  });
});