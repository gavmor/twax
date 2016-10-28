import Twax from '../src';

xdescribe('live ammo', function () {
  let twax;
  
  beforeEach(function () {
    twax = new Twax();
  });
  
  it('works', function () {
    return expect(twax.taxonomizeFriends({
      screen_name: 'quavmo'
    })).to.eventually.deep.equal({
      "/science/social science/linguistics/translation": [
        "mrmicrowaveoven"
      ],
      "/technology and computing/internet technology/social network": [
        "mrmicrowaveoven"
      ],
      "/travel/tourist destinations/national parks": [
        "mrmicrowaveoven"
      ]
    })
  })
})