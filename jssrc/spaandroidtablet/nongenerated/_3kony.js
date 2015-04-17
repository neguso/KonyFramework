function preappinit() {}

function postappinit() {
    // framework startup
    toolkit.start();
    // set start page
    var home = null;
    toolkit.injector(['system', 'kony']).execute(['$state', '$location', function($state, $location) {
        home = $state.states[$location.startup()].form;
    }]);
    return home;
}

function Event() {
    // constructor
    this.handlers = [];
}
Event.prototype.handlers = null;
Event.prototype.attach = function(handler) {
    this.handlers.push(handler);
};
Event.prototype.fire = function(args) {
    this.handlers.forEach(function(handler) {
        handler.call(null, args);
    });
};
var BindingModeEnum = {
    ONEWAY: 'oneway',
    TWOWAY: 'twoway'
}

function Binding(source, sourcePath, target, targetPath, options) {
    var sourceChanged = true;
    var targetChanged = true;
    this.source = source;
    this.sourcePath = sourcePath;
    this.target = target;
    this.targetPath = targetPath;
    this.options = options; // { mode: BindingModeEnum, auto: false|true }
    this.converter = {
        convert: function(v) {
            return v;
        },
        convertBack: function(v) {
            return v;
        }
    };
    this.perform = function() {
        if (this.options.mode === BindingModeEnum.ONEWAY) {
            if (sourceChanged) {
                try {
                    target[targetPath] = this.converter.convert(source[sourcePath]);
                } finally {
                    sourceChanged = false;
                }
            }
        } else if (this.options.mode === BindingModeEnum.TWOWAY) {
            if (sourceChanged) {
                try {
                    if (this.targetListener !== null) this.targetListener.suspend();
                    target[targetPath] = this.converter.convert(source[sourcePath]);
                } finally {
                    sourceChanged = targetChanged = false;
                    if (this.targetListener !== null) this.targetListener.resume();
                }
            } else if (targetChanged) try {
                if (this.sourceListener !== null) this.sourceListener.suspend();
                source[sourcePath] = this.converter.convertBack(target[targetPath]);
            } finally {
                sourceChanged = targetChanged = false;
                if (this.sourceListener !== null) this.sourceListener.resume();
            }
        } else throw new Error('Invalid binding mode.');
    };
    var self = this;
    this.sourceChange = function() { //alert('sourceChange');
        sourceChanged = true;
        if (self.options.auto) self.perform();
    };
    this.targetChange = function() { //alert('targetChange');
        targetChanged = true;
        if (self.options.auto) self.perform();
    };
    this.sourceListener = null;
    this.targetListener = null;
}
Binding.Create = function(source, sourcePath, target, targetPath, options) {
    function isWidget(o) {
        if (typeof o === 'undefined' || o === null) return false;
        return o.constructor === kony.ui.Label || o.constructor === kony.ui.TextBox2;
    }

    function isModel(o) {
        if (typeof o === 'undefined' || o === null) return false;
        return typeof o.PropertyChanged !== 'undefined';
    }
    var binding = new Binding(source, sourcePath, target, targetPath, options);
    // configure source listener
    if (isWidget(source)) {
        if (source.constructor === kony.ui.Label) binding.sourceListener = new WidgetListener(binding.sourceChange, source, []);
        else if (source.constructor === kony.ui.TextBox2) binding.sourceListener = new TextBoxListener(binding.sourceChange, source);
        //...
    } else if (isModel(source)) {
        binding.sourceListener = new ObjectListener(binding.sourceChange, source, [sourcePath]);
    }
    // configure target listener
    if (isWidget(target)) {
        if (target.constructor === kony.ui.Label) binding.targetListener = new WidgetListener(binding.targetChange, target, []);
        else if (target.constructor === kony.ui.TextBox2) binding.targetListener = new TextBoxListener(binding.targetChange, target);
        //...
    } else if (isModel(target)) {
        binding.targetListener = new ObjectListener(binding.targetChange, target, [targetPath]);
    }
    if (binding.options.auto) binding.perform();
    return binding;
}
/* Abstract listener. */
function Listener(func) {
    // callback argument ::= { propertyName: 'TextValue', newValue: value, oldValue: old }
    this.callback = func;
    this.suspended = false;
}
Listener.prototype.callback = null;
Listener.prototype.suspended = null;
Listener.prototype.suspend = function() {
    this.suspended = true;
};
Listener.prototype.resume = function() {
    this.suspended = false;
};
/* Listen for changes in object properties. Objects has to implement INotifyPropertyChanged interface. */
function ObjectListener(func, model, properties) {
    // call base constructor
    Listener.call(this, func);
    // constructor
    if (typeof model.PropertyChanged === 'undefined') throw new Error('Model doesn\'t implement INotifyPropertyChanged interface.');
    var self = this;
    if (properties.length > 0) model.PropertyChanged.attach(function(eventArgs) {
        if (!self.suspended && properties.indexOf(eventArgs.propertyName) != -1) self.callback(eventArgs);
    });
}
// inheritance
ObjectListener.prototype = Object.create(Listener.prototype);
ObjectListener.prototype.constructor = ObjectListener;
/* Base listener for widgets. */
function WidgetListener(func, widget, events) {
    // call base constructor
    Listener.call(this, func);
    // constructor
    this.widget = widget;
    var self = this;
    events.forEach(function(event) {
        self.attachEvent(self.widget, event, function() {
            if (!self.suspended) self.handleEvent.apply(self, [event].concat(arguments));
        });
    });
}
// inheritance
WidgetListener.prototype = Object.create(Listener.prototype);
WidgetListener.prototype.constructor = WidgetListener;
WidgetListener.prototype.widget = null;
WidgetListener.prototype.attachEvent = function(widget, event, callback) {
    if (typeof widget[event] === 'undefined' || widget[event] === null) widget[event] = callback;
    else {
        var old = widget[event];
        widget[event] = function() {
            old.apply(null, arguments);
            callback.apply(null, arguments);
        };
    }
};
WidgetListener.prototype.handleEvent = function() {};
/* TextBox listener. */
function TextBoxListener(func, textbox) {
    // call base constructor
    WidgetListener.call(this, func, textbox, ['onTextChange']);
    // constructor
}
// inheritance
TextBoxListener.prototype = Object.create(WidgetListener.prototype);
TextBoxListener.prototype.constructor = TextBoxListener;
TextBoxListener.prototype.handleEvent = function(event) {
    if (event === 'onTextChange') this.callback({
        propertyName: 'text',
        newValue: this.widget.text,
        oldValue: null
    });
};

function BindingManager() {
    this.bindings = [];
    this.register = function(binding) {
        this.bindings.push(binding);
    };
    this.perform = function() {
        this.bindings.forEach(function(binding) {
            binding.perform();
        });
    };
}

function FormBindingManager() {}