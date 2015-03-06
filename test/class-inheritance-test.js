var assert = require('assert'),
    Class = require('../lib/superb-class.js').Class;

describe('Class', function() {
    describe('calling create', function() {
        it('should make a function', function() {
            var MyClass = Class();

            assert.equal("function", typeof MyClass);
        });
    });
});
