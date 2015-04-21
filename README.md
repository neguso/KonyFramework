# KonyFramework

A Javascript framework, tools, patterns and templates for Kony application development.

**Main features:**
- Module Pattern
- Dependency Injection
- Javascript Promises
- Data Binding
- MVVM Pattern

<br>
## Documentation

Throughout the documentation some terms/patterns are used:

Term | Notes
:--- | :---
Module | An objects that encapsulate services.
Service | A javascript function usually but in general can be any object providing services to consumers. 
Service Configuration | The definition of a service consists in the service itself and a list of dependecies that will be injected into the service when service is instantiated.
Requires | A list of modules that a specified module depends on.
Service Dependencies | A list of services that a specified service depends on.
Dependency Injection | A design pattern that implements inversion of control for services. A service delegates to the framework the control flow of discovering and importing a service specified or *injected* by the caller.

### Documentation Index
- Toolkit object
- Module object
- Injector object

<br>
## Toolkit Object
Toolkit is a singleton object containing the core services.

#### Methods:
- `module(name, requires)`
- `injector(modules)`
- `start()`

<br>
##### `module(name, [requires])`
Create or get a module. If only the name is supplied it search for a module with that name and returns it.

###### Parameters

Param | Type | Details
--- | --- | ---
name | `String` | The module name.
requires (optional) | `Array of String` | List of dependent modules. The list is used to resolve services injected into services defined in the module.

<br>
##### `injector(modules)`
Create an injector that resolve services in the specified modules list.

###### Parameters
Param | Type | Details
--- | --- | ---
modules | `Array of String` | List of module names.

<br>
##### `start()`
Framework bootstrap method.


#### Sample code:
```javascript
// define a module 'users' that uses modules 'systems' and 'storage'
var users_module = toolkit.module('users', ['system', 'storage']);
```


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
Define a value into the module. A value is the simplest form of a service. The value can be any object.

###### Parameters
Param | Type | Details
--- | --- | ---
name | `String` | Service name.
value | `Object` | Service value.

```javascript
// define 'pi' in 'math' module 
toolkit.module('math', ['system'])
  .value('pi', 3.1415);
```

<br>
##### `factory(name, service_configuration)`
Define a service using a factory. A factory is a function that returns the service function.

```javascript
toolkit.module('math', ['system'])
  .value('pi', 3.1415)
  .factory('circle_area', ['pi', function(pi) {
    return function(radius)
    {
      return pi * radius * radius;
    }
  }]);
```


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
