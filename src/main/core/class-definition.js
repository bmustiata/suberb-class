// ==========================================================================
// ClassDefinition
// ==========================================================================

/**
 * ClassDefinition - A class description to be created.
 * @return {void}
 */
function ClassDefinition() {
    this.name = null; // the class name.
    this.superClass = Object.prototype;
    this.mixins = [];
    this.instanceProperties = {};
    this.staticProperties = {};
}

/**
 * parseName - Attempts at storing the string name of the class.
 * @param {string|any} name
 * @return {boolean}
 */
ClassDefinition.prototype.parseName = function(name) {
    if (typeof name != "string") {
        return false;
    }

    this.name = name;

    return true;
}

/**
 * parseBaseClass - Attempts at storing the base class.
 * @param {function|any} baseClass
 * @return {boolean}
 */
ClassDefinition.prototype.parseBaseClass = function(baseClass) {
    if (typeof baseClass != "function") {
        return false;
    }

    this.superClass = baseClass;

    return true;
}

/**
 * parseMixins - Attempts at storing the array of mixins.
 * @param {Array<object>|any} mixins
 * @return {boolean}
 */
ClassDefinition.prototype.parseMixins = function(mixins) {
    if ((typeof mixins != 'object') || (typeof mixins.length != 'number')) {
        return false;
    }

    this.mixins = mixins;

    return true;
}

/**
 * parseInstanceMembers - Attempts at storing the instance members.
 * @param {object|any} instanceProperties
 * @return {boolean}
 */
ClassDefinition.prototype.parseInstanceMembers = function(instanceProperties) {
    if (typeof instanceProperties != "object") {
        return false;
    }

    this.instanceProperties = instanceProperties;

    return true;
}

/**
 * parseInstanceMembers - Attempts at storing the instance members.
 * @param {object|any} staticProperties
 * @return {boolean}
 */
ClassDefinition.prototype.parseStaticMembers = function(staticProperties) {
    if (typeof staticProperties != "object") {
        return false;
    }

    this.staticProperties = staticProperties;

    return true;
}

/**
 * failParsingArgument - Throws an error.
 * @param {} argumentValue
 * @return {void}
 */
function failParsingArgument(args, index) {
    throw new Error('Failed parsing arguments ' + args + ' at index ' + index);
}

/**
 * parseClassDefinition - Parses the class definition from the arguments.
 * @param {Array<any>} argumentArray
 * @return {ClassDefinition}
 */
function parseClassDefinition(argumentArray) {
    var classDefinition = new ClassDefinition(),
        stageFunctions = [
            bind(classDefinition.parseName, classDefinition),
            bind(classDefinition.parseBaseClass, classDefinition),
            bind(classDefinition.parseMixins, classDefinition),
            bind(classDefinition.parseInstanceMembers, classDefinition),
            bind(classDefinition.parseStaticMembers, classDefinition),
            bind(failParsingArgument, this, argumentArray)
        ],
        currentStage = 0,
        i;

    for (i = 0; i < argumentArray.length; i++) {
        var currentArgument = argumentArray[i];

        while(! stageFunctions[currentStage++](currentArgument));
    }

    if (i != argumentArray.length) {
        failParsingArgument(argumentArray, i);
    }

    return classDefinition;
}

/**
 * bind - Binds the function with the given arguments.
 * @param {} fn
 * @return {Function}
 */
function bind(fn, that) {
    var prevArguments = [];

    for (var i = 2; i < arguments.length; i++) {
        prevArguments.push(arguments[i]);
    }

    return function() {
        var currentArguments = prevArguments.splice(0);

        for (var i = 0; i < arguments.length; i++) {
            currentArguments.push(arguments[i]);
        }

        return fn.apply(that, currentArguments);
    }
}

