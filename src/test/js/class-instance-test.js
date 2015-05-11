describe('class-instance-test.js', function() {
    describe('calling create', function() {
        it('should export the properties', function() {
            var MyClass = createClass({
                x : 3
            });

            assert.equal(3, new MyClass().x);
        });

        it('should inherit the properties', function() {
            var Base = createClass({
                x : 0,
                y : 2
            });

            var Extend = createClass(Base, {
                x : 1,
                z : 3
            });

            var e = new Extend();

            assert.equal(1, e.x);
            assert.equal(2, e.y);
            assert.equal(3, e.z);
        });

        it('should not allow overwriting private properties.', function() {
            assert.throws(function() {
                var Base = createClass({
                    _x : null
                });

                var Extend = createClass(Base, {
                    _x : null
                });
            }, 'Private member _x is already defined');
        });

        it('should have the name exported correctly', function() {
            var CustomName = createClass("CustomName", {
                // nothing
            });

            assert.ok(/function CustomName/.test(CustomName.toString()));
        });
    });
});

