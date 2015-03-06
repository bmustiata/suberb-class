var assert = require('assert'),
    createClass = require('../lib/superb-class.js').createClass,
    expect = require("chai").expect;

describe('class-mixins-test.js', function() {
    describe('Multiple mixins should contribute properties', function() {
        it('should allow multiple mixes, and base classes', function() {
            var mix1 = createClass({
                mix1: "mix1"
            });

            var mix2 = createClass({
                mix2: "mix2",
                overrideMix2: "mix2"
            });

            var Base = createClass({
                base: "base"
            });

            var Extend = createClass(Base, {
                extend: "extend",
                overrideMix2: "overrideMix2"
            });

            var e = new Extend();

            assert.equal("mix1", e.mix1);
            assert.equal("mix2", e.mix2);
            assert.equal("base", e.base);
            assert.equal("extend", e.extend);
            assert.equal("overrideMix2", e.overrideMix2);
        });
    });
});
