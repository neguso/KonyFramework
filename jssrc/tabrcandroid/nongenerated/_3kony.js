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
// Abstract command to be used as a base class.
function Command() {}
Command.prototype.canExecute = function() {
    return true;
};
Command.prototype.execute = function() {};

function ButtonCommand(text, onclick) {
    // call base constructor
    Command.call(this);
    // constructor
    this._text = text;
    this._enabled = true;
    this.canExecute = function() {
        return this.enabled;
    };
    if (typeof onclick === 'function') this.execute = function() {
        onclick();
    };
}
// inheritance
ButtonCommand.prototype = Object.create(Command.prototype);
ButtonCommand.prototype.constructor = ButtonCommand;
Object.defineProperty(ButtonCommand.prototype, 'text', {
    get: function() {
        return this._text;
    },
    set: function(value) {
        var old = this._text;
        this._text = value;
        this.PropertyChanged.fire({
            propertyName: 'text',
            newValue: value,
            oldValue: old
        });
    },
    enumerable: true
});
Object.defineProperty(ButtonCommand.prototype, 'enabled', {
    get: function() {
        return this._enabled;
    },
    set: function(value) {
        var old = this._enabled;
        this._enabled = value;
        this.PropertyChanged.fire({
            propertyName: 'enabled',
            newValue: value,
            oldValue: old
        });
    },
    enumerable: true
});
var BindingModeEnum = {
    ONEWAY: 'oneway',
    TWOWAY: 'twoway'
}

function Binding(source, sourcePath, target, targetPath, options) {
    var sourceChanged = true;
    var targetChanged = true;
    var self = this;
    this.source = source;
    this.sourcePath = sourcePath;
    this.target = target;
    this.targetPath = targetPath;
    this.options = options; // { mode: BindingModeEnum, auto: false|true }
    // Converter object used to convert values when binding is performed.
    this.converter = {
        convert: function(v) {
            return v;
        },
        convertBack: function(v) {
            return v;
        }
    };

    function commit(left, leftPath, right, rightPath, convert) {
        if (left[leftPath] instanceof Command) {
            var command = left[leftPath];
            if (command.canExecute()) command.execute();
        } else left[leftPath] = convert(right[rightPath]);
    }

    function core_perform() {
        if (this.options.mode === BindingModeEnum.ONEWAY) {
            if (sourceChanged) {
                try {
                    commit(this.target, this.targetPath, this.source, this.sourcePath, this.converter.convert);
                } finally {
                    sourceChanged = false;
                }
            }
        } else if (this.options.mode === BindingModeEnum.TWOWAY) {
            if (sourceChanged) {
                try {
                    if (this.targetListener !== null) this.targetListener.suspend();
                    commit(this.target, this.targetPath, this.source, this.sourcePath, this.converter.convert);
                } finally {
                    sourceChanged = targetChanged = false;
                    if (this.targetListener !== null) this.targetListener.resume();
                }
            } else if (targetChanged) try {
                if (this.sourceListener !== null) this.sourceListener.suspend();
                commit(this.source, this.sourcePath, this.target, this.targetPath, this.converter.convertBack);
            } finally {
                sourceChanged = targetChanged = false;
                if (this.sourceListener !== null) this.sourceListener.resume();
            }
        } else throw new Error('Invalid binding mode.');
    };
    // Perform binding from source to target.
    this.perform = function() {
        sourceChanged = true;
        core_perform.apply(self);
    }
    // Internal, called by listener when change is detected in source.
    this.sourceChange = function(arg) {
        sourceChanged = true;
        if (self.options.auto) core_perform.apply(self);
    };
    // Internal, called by listener when change is detected in target.
    this.targetChange = function(arg) {
        targetChanged = true;
        if (self.options.auto) core_perform.apply(self);
    };
    this.sourceListener = null;
    this.targetListener = null;
}
Binding.Create = function(source, sourcePath, target, targetPath, options) {
    function isWidget(o) {
        if (typeof o === 'undefined' || o === null) return false;
        return o.constructor === kony.ui.Label || o.constructor === kony.ui.TextBox2 || o.constructor === kony.ui.Button;
    }

    function isModel(o) {
        if (typeof o === 'undefined' || o === null) return false;
        return typeof o.PropertyChanged !== 'undefined';
    }
    var o = {
        mode: BindingModeEnum.ONEWAY,
        auto: true
    };
    if (typeof options !== 'undefined') {
        if (typeof options.mode !== 'undefined') o.mode = options.mode;
        if (typeof options.auto !== 'undefined') o.auto = options.auto;
    }
    var binding = new Binding(source, sourcePath, target, targetPath, o);
    // configure source listener if necessary, othervise no listener is created
    if (isWidget(source)) {
        if (source.constructor === kony.ui.TextBox2) {
            if (sourcePath === 'text') binding.sourceListener = new TextBoxListener(binding.sourceChange, source);
        } else if (source.constructor === kony.ui.Button) {
            if (sourcePath === null) {
                binding.sourceListener = new ButtonListener(binding.sourceChange, source);
                // assume that button is binded to a command, add ['text'] properties binding
                Binding.Create(target[targetPath], 'text', source, 'text');
            }
        }
        //todo: add more widgets here
    } else if (isModel(source)) {
        binding.sourceListener = new ObjectListener(binding.sourceChange, source, [sourcePath]);
    }
    // configure target listener
    if (isWidget(target)) {
        if (target.constructor === kony.ui.TextBox2) {
            if (targetPath === 'text') binding.targetListener = new TextBoxListener(binding.targetChange, target);
        } else if (target.constructor === kony.ui.Button) {
            if (targetPath === null) binding.targetListener = new ButtonListener(binding.targetChange, target);
        }
        //todo: add more widgets here
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
/* Button listener. */
function ButtonListener(func, button) {
    // call base constructor
    WidgetListener.call(this, func, button, ['onClick']);
    // constructor
}
// inheritance
ButtonListener.prototype = Object.create(WidgetListener.prototype);
ButtonListener.prototype.constructor = ButtonListener;
ButtonListener.prototype.handleEvent = function(event) {
    if (event === 'onClick') this.callback({
        propertyName: 'click',
        newValue: null,
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