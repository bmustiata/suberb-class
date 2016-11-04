# superb-class
A superb way of doing JS classes.

## About
Superb Class is a simple API that allows creating JS classes with ease,
designed for ES3/5 usage.

It's heavily tested, simple to use, and validates your
classes against simple programming errors.

## Install

In order to install it you can just do:

```sh
npm install superb-class
```

## Usage

In its simplest form you can just:
```javascript
var createClass = require('superb-class').createClass;

var Dialog = createClass("Dialog", {
    _title : null,

    constructor : function(title) {
        this._title = title;
    },

    show : function() {
        console.log('Dialog.show(): ', this._title);
    }
});

var dialog = new Dialog('Dialog Title');

dialog.show();
```

The created class propagates the arguments to the constructor function
as you might expect. The `this` variable is the variable that will be
returned and has already the instance updated to have the base class,
mixins, and current prototypical items already written.


A more advanced usage is:


```javascript
var createClass = require('superb-class').createClass;

// ==========================================================================
// Dialog Class
// ==========================================================================
var Dialog = createClass({
    _title : null, // declaring members adds them to checking

    constructor : function(title) {
        this._title = title;
    },

    show : function() {
        console.log('Dialog.show(): ', this._title);
    }
});

// ==========================================================================
// ModalDialog Class
// ==========================================================================
var ModalDialog = createClass(Dialog, {
    _modal : false,

    constructor : function(modal, title) {
        this._super.constructor.call(this, title);
        this._modal = false;
    },

    show : function() {
        console.log('ModalDialog.show(): ', this._modal, this._title);
        this._super.show.apply(this, arguments);
    }
}, { // static functions
    create : function(title) {
        console.log('Static factory create()');
        return new ModalDialog(true, title);
    }
});


// ==========================================================================
// Usage
// ==========================================================================
var dialog = ModalDialog.create('dialog_title');
// equivalent to: new ModalDialog(true, 'dialog_title');

console.log('Is dialog instanceof ModalDialog: ', dialog instanceof ModalDialog);
console.log('Is dialog instanceof Dialog: ', dialog instanceof Dialog);

dialog.show();
```

This will output:

```text
Static factory create()
Is dialog instanceof ModalDialog:  true
Is dialog instanceof Dialog:  true
ModalDialog.show():  false dialog_title
Dialog.show():  dialog_title
```

## Full API

Straight from the sources:

```javascript
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
function createClass() { /* ... */ }
```

## Superb

### Class name

If the class name is given as the first argument, the class name is used in
the function creation, so the stack trace will look like you would expect.

For example:

```javascript
var Dialog = createClass("Dialog", {
    show : function() {
        // in the stack trace here is Dialog.show()
    }
});
```

If no class name is provided, the `__anonymous__` name will be used.

The class name is available on the instances as the `__name` attribute.

### \_super Access

The \_super private member is available on the this instance that points to
the prototype of the parent class. Thus calls to the base implementation
of a specific method becomes easier, without holding manual references to
the base implementation, or navigating the prototype chain.

```javascript
this._super.show.apply(this, arguments);
```

### Private Members

Private members are prefied with \_.

Private members can not be overwritten by mixins, nor by extending classes.
In case this is attempted createClass will throw an error. This is especially
good in large APIs where it becomes impossible to check if a private member
with a given name is already defined.


Due to the prototypical nature of JavaScript
private members are available in extending classes. Even if they are available,
it's strongly discouraged to access them from derived classes.

```javascript
var createClass = require('superb-class').createClass;

var Base = createClass({
    _show : function() {
        console.log('Base.show()');
    }
});

var Extend = createClass(Base, {
    // Fails with:
    // Error: Private member _show is already defined.
    _show : function() {
        console.log('Extend.show()');
    }
});
```

### Protected Members

Protected members are prefixed with $.


Protected members can be overwritten by extending classes, but not by mixins.
The reason is this: most likely having abstract classes does make sense to be implemented
in the extending class, but the implementation being present in a mixin is most likely
a bug.


Note that mixins can still add both private _and_ protected members to the instance,
they just can't override anything from the base class, or clash with
current prototype items.

## Change Log

* 2016-11-04 0.3.2 Make the class names available on `this.__name`.
* 2015-05-11 0.3.1 Export the class names.
* 2015-05-06 0.3.0 Mocha client tests. IE8 support.
* 2015-05-04 0.2.4 Client support via bower.
* 2015-03-09 0.2.3 Stable implementation of createClass.

