import Twax, { inverseMap } from '../src';
import { stub } from 'sinon';
// import alchemy from '../src/alchemy';
// import twitter from '../src/twitter';

describe('new Twax()', function functionName() {
  let twax, corpus, corpuses, taxonomies, milieu, taxonomy;
  
  beforeEach(function () {
    const mockMilieu = [ 'luchisimog', 'mrmicrowaveoven' ];
    const mockCorpus = 'foo bar baz';  
    
    corpus = stub().resolves(mockCorpus);
    corpuses = stub().resolves([{quavmo: mockCorpus}]);
    milieu = stub().resolves(mockMilieu);
    taxonomy = stub().resolves([ "dragons", "unicorns" ]);
    taxonomies = stub().resolves([
      { luchisimog: 'dragons' },
      { luchisimog: 'dragons' },
      { mrmicrowaveoven: 'dragons' },
      { luchisimog: 'unicorns' },
      { mrmicrowaveoven: 'unicorns' },
    ]);
    
    const constructionParams = {
      corpus, corpuses, taxonomies, milieu, taxonomy
    };
    
    twax = new Twax(constructionParams);
  });
  
  describe('taxonomizeFriends()', function () {
    it('fetches and groups friends by shared taxonomies', function () {
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
      });
    });
  });
});