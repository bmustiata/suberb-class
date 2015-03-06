var parseClassDefinition = require("./class-definition.js").parseClassDefinition;

// ==========================================================================
// createClass
// ==========================================================================

/**
 * Create a class.
 * @param {string} name The string name of the class.
 * @param {function} superClass The superclass to inherit from. It will be
 *                          available as $super in the this instance, for
 *                          calls on the super class.
 * @param {Array<function>} mixins mixins definitions.
 * @param {Object} instanceProperties Instance properties that should be
 *          created. Properties that are prefixed with _ denode private
 *          properties, and creation of the class will fail if another
 *          property with the same name exists in the parent prototype.
 *          Properties prefixed with $ are protected properties.
 *          Shadowing is allowed only for public and protected members.
 *          The constructor() will be called if present with the arguments
 *          from the function itself.
 * @param {Object} staticProperties Static properties that will be defined
 *          on the returned class itself.
 * @type {function}
 */
function createClass() {
    var args,
        result,
        classDefinition,
        proto;

    args = Array.prototype.slice.apply(arguments);
    classDefinition = parseClassDefinition(args);

    result = function A() {
        if (this.constructor) {
            this.constructor.apply(this, arguments);
        }
    };

    var newPrototype = {};

    result.prototype = newPrototype;
    newPrototype.__proto__ = classDefinition.superClass.prototype;
    newPrototype._super = classDefinition.superClass.prototype;

    joinPrototype(classDefinition.instanceProperties, newPrototype);
    joinPrototype(classDefinition.staticProperties, result);

    return result;
}

/**
 * joinPrototype - Mixes the target prototype with the items from the
 *                 sourceObject.
 * @param {object} sourceObject
 * @param {object} targetPrototype
 * @return {void}
 */
function joinPrototype(sourceObject, targetPrototype) {
    for (var k in sourceObject) {
        if (/^_/.test(k) && (typeof targetPrototype[k] !== "undefined")) {
            throw new Error('Private member ' + k + ' is already defined.');
        }

        targetPrototype[k] = sourceObject[k];
    }
}

// ==========================================================================
// exports
// ==========================================================================
exports.createClass = createClass;

