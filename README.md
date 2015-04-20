# KonyFramework

A Javascript framework for Kony development.

Main features:
- Module Pattern
- Dependency Injection
- Javascript Promises
- Data Binding
- MVVM Pattern


## Documentation

The Framework use some terms/patterns:

Term | Notes
--- | ---
Module | Objects that contains services.
Service |
Service configuration |
Requires |
Service Dependencies |
Dependency Injection |


## Toolkit
Toolkit is a singleton object containing the core services.

#### Methods

- `module(name, requires)`
- `injector(modules)`
- `start()`

##### `module(name, [requires])`
Create or get a module. If only the name is supplied it search for a module with that name and returns it.

###### Parameters

Param | Type | Details
--- | --- | ---
name | String | Module name
requires (optional) | Array of String | Names list of dependent modules. 

##### injector(modules)

##### start()

## Modules

Modules are objects that contains services. They are intended for application modularization and to handle service dependencies. Module methods returns the current module so you can use fluent interface.

#### Define a module:

```javascript
var my_module = toolkit.module('my module', ['required module 1', 'required module 2']);
```

#### Module API:

Methods:
- run(service_configuration)
- value(name, value)
- factory(name, service_configuration)
- service(name, service_configuration)
- controller(name, service_configuration)

##### run(service_configuration)
Register work to be executed when module is initialized. This occur after all application modules has been loaded.



Default modules:
- System
- Kony

### System Module
todo

### Kony Module
todo



# Known Issues
- run() method of the module is not called when module is defined after the bootstrap occur
