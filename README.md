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

### Index
- Toolkit
- Module
- Injector


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
name | String | The module name.
requires (optional) | Array of String | List of dependent modules. The list is used to resolve services injected into services defined in the module.


##### `injector(modules)`
Create an injector that resolve services in the specified modules list.

###### Parameters
Param | Type | Details
--- | --- | ---
modules | Array of String | List of module names.


##### `start()`
Framework bootstrap method.




## Module
Modules are objects that contains services. They are intended for application modularization and encapsulation. Module methods returns the current module so you can use fluent interface.

#### Methods:
- `run(service_configuration)`
- `value(name, value)`
- `factory(name, service_configuration)`
- `service(name, service_configuration)`
- `controller(name, service_configuration)`

##### `run(service_configuration)`
Register work to be executed when module is initialized. This occur after all application modules has been loaded.

##### `value(name, value)`
todo

##### `factory(name, service_configuration)`
todo

##### `service(name, service_configuration)`
todo

##### `controller(name, service_configuration)`
todo

#### Example:

```javascript
var my_module = toolkit.module('my module', ['required module 1', 'required module 2']);
```


Default modules:
- System
- Kony

### System Module
todo

### Kony Module
todo



# Known Issues
- run() method of the module is not called when module is defined after the bootstrap occur
