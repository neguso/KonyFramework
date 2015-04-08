var toolkit = (function()
{

	function getValueServiceProvider(value)
	{
		return { instance: null, get: function() { return value; } };
	}

	function getFactoryServiceProvider(config, injector)
	{
		if(typeof config === 'function')
		{
			return { instance: null, get: function() { return config(); } };
		}
		else if(Array.isArray(config))
		{
			var len = config.length;
			if(len === 1)
			{
				return { instance: null, get: function() { return config[0](); } };
			}
			else if(len > 1)
			{
				return {
					instance: null,
					get: function() {
						var dependencies = config.slice(0, len - 1).map(function(currentValue) { return injector.resolve(currentValue); });
						return config[len - 1].apply(null, dependencies.map(function(serviceProvider) { return injector.instance(serviceProvider); }));
					}
				};
			}
		}

		throw new Error('Invalid arguments.');
	}

	function getServiceServiceProvider(config, injector)
	{
		if(typeof config === 'function')
		{
			return {
				get: function() {
					var o = {};
					config.apply(o);
					return o;
				}
			};
		}
		else if(Array.isArray(config))
		{
			var len = config.length;
			if(len === 1)
			{
				return {
					get: function() {
						var o = {};
						config[0].apply(o);
						return o;
					}
				};
			}
			else if(len > 1)
			{
				return {
					get: function()
					{
						var dependencies = config.slice(0, len - 1).map(function(currentValue) { return injector.resolve(currentValue); });
						var o = {};
						config[len - 1].apply(o, dependencies.map(function(serviceProvider) { return injector.instance(serviceProvider); }));
						return o;
					}
				};
			}
		}

		throw new Error('Invalid arguments.');
	}

	function getServiceProvider(config, injector)
	{
		if(typeof config === 'function')
		{
			return { get: function() { return config(); } };
		}
		else if(Array.isArray(config))
		{
			var len = config.length;
			if(len === 1)
			{
				return { get: function() { return config[0](); } };
			}
			else if(len > 1)
			{
				return {
					get: function()
					{
						var dependencies = config.slice(0, len - 1).map(function(currentValue) { return injector.resolve(currentValue); });
						return config[len - 1].apply(null, dependencies.map(function(serviceProvider) { return injector.instance(serviceProvider); }));
					}
				};
			}
		}

		throw new Error('Invalid arguments.');
	}


	var modules = {};

	var _toolkit = {

		/* Register a module. */
		module: function(moduleName, requires)
		{
			if(arguments.length === 1)
			{
				if(modules.hasOwnProperty(moduleName))
					return modules[moduleName];
				throw new Error('Module "' + moduleName + '" not found.');
			}
			else if(arguments.length === 2)
			{
				var services = {};
				var run = [];

				var _module = {

					/* Register work to be executed after all modules has been loaded. */
					run: function(serviceConfig)
					{
						run.push(serviceConfig);
						return _module;
					},

					value: function(name, value)
					{
						services[name] = getValueServiceProvider(value);
						return _module;
					},

					factory: function(name, serviceConfig)
					{
						services[name] = getFactoryServiceProvider(serviceConfig, _toolkit.injector(requires.concat([moduleName])));
						return _module;
					},

					service: function(name, serviceConfig)
					{
						services[name] = getServiceServiceProvider(serviceConfig, _toolkit.injector(requires.concat([moduleName])));
						return _module;
					},

					controller: function(name, serviceConfig)
					{
						services[name] = getServiceProvider(serviceConfig, _toolkit.injector(requires.concat([moduleName])));
						return _module;
					},


					_resolve: function(name)
					{
						if(services.hasOwnProperty(name))
							return services[name];
						return null;
					},

					_run: function()
					{
						run.forEach(function(serviceConfig) { getServiceProvider(serviceConfig, _toolkit.injector(requires.concat([moduleName]))).get(); });
					}
				};

				return modules[moduleName] = _module;
			}
			else
				throw new Error('Invalid arguments.');
		},

		/* Creates an injector object used to resolve services from a list of modules. */
		injector: function(modules)
		{
			var _injector = {

				/* Resolve a service provider. */
				resolve: function(service)
				{
					var found = [];
					for(var i = 0; i < modules.length; i++)
					{
						var serviceProvider = _toolkit.module(modules[i])._resolve(service);
						if(serviceProvider != null)
							found.push(serviceProvider);
					}
					if(found.length === 0)
					{
						throw new Error('Cannot resolve service "' + service + '".');
					}
					else if(found.length === 1)
					{
						return found[0];
					}
					throw new Error('Multiple instances of service "' + service + '" found.');
				},

				/* Instantiate a service. */
				instance: function(serviceProvider)
				{
					if(serviceProvider.hasOwnProperty('instance'))
					{
						// single instance
						if(serviceProvider.instance === null)
							serviceProvider.instance = serviceProvider.get();
						return serviceProvider.instance;
					}
					else {
						// multiple instances
						return serviceProvider.get();
					}
				},

				/* Execute function with injected dependencies. */
				execute: function(serviceConfig)
				{
					return getServiceProvider(serviceConfig, _toolkit.injector(modules)).get();
				}

			};
			return _injector;
		},

		/* Run all modules. Call this method after all modules has been registered. */
		start: function()
		{
			_toolkit._modules().forEach(function(module) { _toolkit.module(module)._run(); });
		},


		_modules: function()
		{
			var ary = [];
			for(var prop in modules)
				if(modules.hasOwnProperty(prop))
					ary.push(prop);
			return ary;
		}
	};

	return _toolkit;
})();


toolkit.module('system', [])
	.run([function() {

	}])
	.value('version', { major: 1, minor: 0 })
	.factory('$injector', [function()
	{
		return {

			/* Get service instance. */
			get: function(service, modules)
			{
				if(arguments.length === 1)
				{
					var requires = toolkit._modules();
					return toolkit.injector(requires).instance(toolkit.injector(requires).resolve(service));
				}
				else if(arguments.length === 2)
				{
					return toolkit.injector(modules).instance(toolkit.injector(modules).resolve(service));
				}

				throw new Error('Invalid arguments.');
			}
		};
	}]);
