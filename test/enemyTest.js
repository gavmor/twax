import {
  writeFileSync
} from 'fs';
import Twax from '../src';

xdescribe('connecting to the live APIs', function() {
  let twax;

  beforeEach(function() {
    twax = new Twax();
  });

  it('works', function() {
    this.timeout(50000);
    
    const promisedTaxonomy = twax.taxonomizeFriends({ screen_name: 'quavmo' })
      .then(obj => { 
        writeFileSync('groupTaxes.json', JSON.stringify(obj)) 
        return obj;
      });
      
    return expect(promisedTaxonomy).to.eventually.deep.equal({
      "art and entertainment": [
        "alexandseed",
        "andersoncooper",
        "_JulieAndrews",
        "kathygriffin",
      ],
      "law, govt and politics": [
        "alexandseed"
      ],
      "pets": [
        "alexandseed"
      ],
      "science": [
        "andersoncooper"
      ],
      "society": [
        "kathygriffin"
      ],
      "sports": [
        "kathygriffin"
      ],
      "travel": [
        "andersoncooper"
      ]
    })
  })
})