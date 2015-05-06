describe('class-mixins-test.js', function() {
    describe('Multiple mixins should contribute properties', function() {
        it('should allow multiple mixes, and base classes', function() {
            var Mix1 = createClass({
                mix1: "mix1"
            });

            var Mix2 = createClass({
                mix2: "mix2",
                overrideMix2: "mix2"
            });

            var Base = createClass({
                base: "base"
            });

            var Extend = createClass(Base, [Mix1, Mix2], {
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

        it('should not allow overwritting protected members in mixins', function() {
            assert.throws(function() {
                var Mix1 = createClass({
                    $protectedMember : 3
                });

                var Base = createClass({
                    $protectedMember : 4
                });

                var Extend = createClass(Base, [Mix1]);
            }, 'Protected member $protectedMember can not be overwritten by mixins.');
        });
    });
});
