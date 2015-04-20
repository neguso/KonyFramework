# KonyFramework

A Javascript framework for Kony development.

Features:
- module pattern
- dependency injection
- promise support using RSVP
- data binding support
- MVVM pattern


## Documentation

The Framework use some terms/patterns:

- Module
- Service
- Service configuration
- Requires
- Service Dependencies
- Dependency Injection

> sd asdf asdf asdf asd

## Toolkit
Toolkit is a singleton object containing the core services.

## Modules

Modules are objects that contains services. They are intended for application modularization and to handle service dependencies. Module methods returns the current module so you can use fluent interface.

#### Define a module:

```
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
