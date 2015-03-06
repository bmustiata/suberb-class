var assert = require('assert'),
    createClass = require('../lib/superb-class.js').createClass,
    expect = require("chai").expect;

describe('class-inheritance-test.js', function() {
    describe('calling create', function() {
        it('should make a function', function() {
            var MyClass = createClass();

            assert.equal("function", typeof MyClass);
        });

        it('should create objects with types that respect instanceof', function() {
            var BaseClass = function(){};
            var MyClass = createClass(BaseClass);

            var obj = new MyClass();

            assert.equal(true, obj instanceof MyClass);
            assert.equal(true, obj instanceof BaseClass);
        });

        it('should have the constructor called with parameters.', function() {
            var called = false;

            var MyClass = createClass({
                constructor : function(a) {
                    called = a;
                }
            });

            new MyClass("called");

            assert.equal("called", called);
        });

        it('should export _super for easy prototype access.', function() {
            var Base = createClass({
                hello : function() {
                    return "Hello";
                }
            });

            var Extend = createClass(Base, {
                hello : function() {
                    return this._super.hello.apply(this, arguments) + " World";
                }
            });

            var e = new Extend();

            assert.equal("Hello World", e.hello());
        });
    });
});
