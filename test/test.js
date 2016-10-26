import Twax, { inverseMap } from '../src';
import { stub } from 'sinon';
import alchemy from '../src/alchemy';
import twitter from '../src/twitter';


describe('new Twax()', function functionName() {
  let twax;
  
  beforeEach(function () {
    const mockCorpus = [ 
      'foo bar baz'
    ];  
    const mockTaxonomy = { 
      taxonomy: [ { label: 'dragons' }, { label: 'unicorns' } ]
    };
    
    const mockMilieu = [
      'luchisimog', 'mrmicrowaveoven'
    ]
    
    stub(twitter, 'corpus').resolves(mockCorpus);
    stub(twitter, 'milieu').resolves(mockMilieu);
    stub(alchemy, 'fetch').resolves(mockTaxonomy);
    
    twax = new Twax();
  });
  
  afterEach(function () {
    twitter.corpus.restore();
    twitter.milieu.restore();
    alchemy.fetch.restore();
  });
  
  describe('taxonomizeFriends()', function () {
    it('works', function () {
      const friendsByTaxonomy = twax.taxonomizeFriends({
        screen_name: 'quavmo'
      });
      return expect(friendsByTaxonomy).to.eventually.deep.equal({
        dragons: ['luchisimog', "mrmicrowaveoven"],
        unicorns: ['luchisimog', "mrmicrowaveoven"]
      });
    });
  });
  
  describe('taxonomize()', function() {
    it('classifies a twitter handle by the taxonomies of its post', function () {
      const taxonomyLabels = [ "dragons", "unicorns" ];
      const taxOfWhom = twax.taxonomize({screen_name: "quavmo"});
      return expect(taxOfWhom).to.eventually.eql(taxonomyLabels);
    });
    
    it('classifies a twitter user_id by the taxonomies of its post', function () {
      const taxonomyLabels = [ "dragons", "unicorns" ];
      const taxOfWhom = twax.taxonomize({user_id: 151389621});
      return expect(taxOfWhom).to.eventually.eql(taxonomyLabels);
    });
  });
  
  describe('inverseMap()', function () {
    it('works', function () {
      const pairs = [ 
        { luchisimog: 'dragons' },
        { luchisimog: 'unicorns' },
        { mrmicrowaveoven: 'dragons' },
        { mrmicrowaveoven: 'unicorns' } 
      ];
      
      expect(inverseMap(pairs)).to.deep.equal({
        dragons: ['luchisimog', "mrmicrowaveoven"],
        unicorns: ['luchisimog', "mrmicrowaveoven"]
      })
    })
    
  })
});