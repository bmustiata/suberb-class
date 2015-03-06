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
            classDefinition.parseName.bind(classDefinition),
            classDefinition.parseBaseClass.bind(classDefinition),
            classDefinition.parseInstanceMembers.bind(classDefinition),
            classDefinition.parseStaticMembers.bind(classDefinition),
            failParsingArgument.bind(this, argumentArray)
        ],
//            classDefinition.parseMixins.bind(classDefinition),
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

exports.parseClassDefinition = parseClassDefinition;

