import { corpuses, corpus, milieu } from '../src/twitter';
import { stub } from 'sinon';
import Twit from 'twit';

describe("twitter", function () {
  beforeEach(function () {
    const timeline = [{text: 'foo'}, {text: 'bar'}, {text: 'baz'}];
    stub(Twit.prototype, 'get').yields(null, timeline, null);
  });
  
  afterEach(() => Twit.prototype.get.restore())
  
  describe('milieu', function () {
    it('returns friends of a user', function () {
      return expect(milieu('quavmo')).to.eventually
        .deep.equal(['quavmo', 'luchisimog', 'mrmicrowaveoven']);
    })
  })
  describe('corpus', function () {
    it('turns a user into  blob of text', function () {
      return expect(corpus({screen_name: 'quavmo'}))
        .to.eventually.deep.equal("foo bar baz");
    });
  });
  
  describe('corpuses', function () {
    it('turns a list of users into blobs of text keyed by users', function () {
      return expect(corpuses(['quavmo', 'KimKierkegaard']))
        .to.eventually.deep.equal([
          {quavmo: 'foo bar baz'},
          {KimKierkegaard: 'foo bar baz'}
        ]);
    });
  });
});