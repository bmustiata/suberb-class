var assert = require('assert'),
    createClass = require('../lib/superb-class.js').createClass,
    expect = require("chai").expect;

describe('class-static-test.js', function() {
    describe('creating static blocks', function() {
        it('should have them available', function() {
            var callResult = false;
                MyClass = createClass({}, {
                    staticFunction : function(result) {
                        callResult = result;
                    }
                });

            MyClass.staticFunction("called");

            assert.equal("called", callResult);
        });

        it('should not inherit them', function() {
            var Base = createClass({}, {
                staticFunction : function() {
                }
            });

            var MyClass = createClass(Base, {}, {
                otherStatic : function() {
                }
            });

            assert.equal("undefined", typeof MyClass.staticFunction);
            assert.equal("function", typeof MyClass.otherStatic);
        });
    });
});
