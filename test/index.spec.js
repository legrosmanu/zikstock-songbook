var assert = require('assert');
const appLauncher = require('../src/index');

describe('Definition of the app', function() {
  describe('We have an Express app', function() {
    it('should have an app field in the index module', function() {
      assert(appLauncher.app);
    });
  });
});
