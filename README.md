# KonyFramework

A Javascript framework for Kony development.

Main features:
- Module Pattern
- Dependency Injection
- Javascript Promises
- Data Binding
- MVVM Pattern

<br>

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
- Toolkit object
- Module object
- Injector object

<br>
## Toolkit Object
Toolkit is a singleton object containing the core services.

#### Methods
- `module(name, requires)`
- `injector(modules)`
- `start()`

<br>
##### `module(name, [requires])`
Create or get a module. If only the name is supplied it search for a module with that name and returns it.

###### Parameters

Param | Type | Details
--- | --- | ---
name | String | The module name.
requires (optional) | Array of String | List of dependent modules. The list is used to resolve services injected into services defined in the module.

<br>
##### `injector(modules)`
Create an injector that resolve services in the specified modules list.

###### Parameters
Param | Type | Details
--- | --- | ---
modules | Array of String | List of module names.

<br>
##### `start()`
Framework bootstrap method.


<br>
## Module Object
Modules are objects that contains services. They are intended for application modularization and encapsulation. Module methods returns the current module so you can use fluent interface.

#### Methods:
- `run(service_configuration)`
- `value(name, value)`
- `factory(name, service_configuration)`
- `service(name, service_configuration)`
- `controller(name, service_configuration)`

<br>
##### `run(service_configuration)`
Register work to be executed when module is initialized. This occur after all application modules has been loaded.

<br>
##### `value(name, value)`
todo

###### Parameters
Param | Type | Details
--- | --- | ---
name | String | Service name.
value | object | Service value.

<br>
##### `factory(name, service_configuration)`
todo

<br>
##### `service(name, service_configuration)`
todo

<br>
##### `controller(name, service_configuration)`
todo

<br>
#### Example:

```javascript
var my_module = toolkit.module('my module', ['required module 1', 'required module 2']);
```

## Injector Object
todo

#### Methods:
- `method1()` 

##### `method1()`
todo


Default modules:
- System
- Kony

### System Module
todo

### Kony Module
todo



# Known Issues
- run() method of the module is not called when module is defined after the bootstrap occur
