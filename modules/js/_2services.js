toolkit.module('kony', ['system'])
	.run([function()
	{

	}])
	.factory('$state', ['$injector', function($injector)
	{
		var _state = {

			states: {},

			register: function(stateName, form, controllerName)
			{
				if(_state.states.hasOwnProperty(stateName))
					throw new Error('Duplicate state "' + stateName + '".');

				// store state
				_state.states[stateName] = { name: stateName, form: form, controller: controllerName };

				// register $scope service for the controller injection
				toolkit.module('kony').service('$scope', function()
				{
					function attachEvent(widget, event, callback)
					{
						if(typeof widget[event] === 'undefined' || widget[event] === null)
							widget[event] = callback;
						else
						{
							var old = widget[event];
							widget[event] = function() { old.apply(null, arguments); callback.apply(null, arguments); };
						}
					}
					
					this.form = form;

					// parameters ::= (event, callback) | (widget, event, callback)
					this.on = function()
					{
						if(arguments.length < 2 || arguments.length > 3)
							throw new Error('Invalid arguments.');

						var widget, event, callback;
						if(arguments.length === 2)
						{
							widget = this.form;
							event = arguments[0];
							callback = arguments[1];
						}
						else if(arguments.length === 3)
						{
							widget = arguments[0];
							event = arguments[1];
							callback = arguments[2];
						}

						// hack for the 'init' event
						if(event === 'init')
							this.form[event] = callback;
						else
							attachEvent(widget, event, callback);
					};
				});

				// call controller, the above defined $scope will be injected
				$injector.get(controllerName);

				return _state.states[stateName];
			}
		};

		return _state;
	}])
	.factory('$location', ['$state', function($state)
	{
		function push(state, params)
		{
			var s = { state: state, parameters: params };
			_location.history.push(s);
			return s;
		}

		function pop()
		{
			return _location.history.pop();
		}

		var _location = {

			history: [],

			current: null,

			/* Set/get the start state. */
			startup: function(state)
			{
				if(arguments.length === 0)
				{
					if(_location.history.length > 0)
						return _location.history[0].state;
					else
						return null;
				}
				else if(arguments.length === 1)
				{
					push(state);
				}
				else
					throw new Error('Invalid arguments.');
			},

			/* Navigate to specified state. */
			go: function(state, params)
			{
				_location.current = push(state, params);
				$state.states[_location.current.state].form.show();
			},

			/* Navigate back to previous state if any. */
			back: function()
			{
				if(_location.history.length < 2)
					return;
				pop();
				_location.current = _location.history[_location.history.length - 1];
				$state.states[_location.current.state].form.show();
			},

			/* Replace current state. */
			replace: function(state, params)
			{
				pop();
				_location.go(state, params);
			}

		};
		return _location;
	}])
	.service('$http', [function() {

		var _timeout = 30;
		var connections = [];


		/* Get/set the service call timeout in seconds. */
		this.timeout = function(t) {
			if(arguments.length === 0)
				return _timeout;
			else if(arguments.length === 1)
				_timeout = t;
			else
				throw new Error('Invalid arguments.');
		};

		/* Cancel last service call. */
		this.cancel = function() {
			if(connections.length > 0)
				kony.net.cancel(connections.pop());
		};

		/* Invoke a REST service asynchronously. Returns a promise. */
		this.get = function(url)
		{
			var deferred = RSVP.defer();
			var conn = kony.net.invokeServiceAsync(
				url,
				{
					httpconfig: { timeout: _timeout, method: 'get' }
				},
				function(status, results) {
					if(status === 100)
				    {
				    	// network call initiated successfully
				    }
				    else if(status === 200)
				    {
				    	// network is in progress, start receiving the result
				    }
				    else if(status === 300)
				    {
				    	// network call canceled
						deferred.reject({ code: -1000, message: 'Request cancelled.' });
				    }
				    else if(status === 400)
				    {
				    	try
				    	{
					    	if(results.httpresponse.responsecode === 200)
					    	{
					    		// success
								var httpresponse = results.httpresponse;
								delete results.httpresponse;
								deferred.resolve({ head: httpresponse, content: results });
					    	}
					    	else
					    	{
					    		// error
								deferred.reject({ code: results.httpresponse.responsecode, message: results.errmsg });
					    	}
					    }
					    finally
					    {
					    	// remove connection handle
							var i = connections.indexOf(conn);
							if(i > -1)
								connections.splice(i, 1);
					    }
				    }
				});

			// save connection handle
			connections.push(conn);

			return deferred.promise;
		};

		/* Invoke a Kony middleware service. Returns a promise. */
		this.kony = function(url, app, service, params)
		{
			var inputParamTable = {
				appID: app,
				serviceID: service,
				channel: 'rc',
				httpconfig: { timeout: _timeout }
			};
			// copy params to input table
			for(var key in params)
				if(params.hasOwnProperty(key))
					inputParamTable[key] = params[key];

			var deferred = RSVP.defer();
			var conn = kony.net.invokeServiceAsync(
				url,
				inputParamTable,
				function(status, results) {
					if(status === 100)
				    {
				    	// network call initiated successfully
				    }
				    else if(status === 200)
				    {
				    	// network is in progress, start receiving the result
				    }
				    else if(status === 300)
				    {
				    	// network call canceled
						deferred.reject({ code: -1000, message: 'Request cancelled.' });
				    }
				    else if(status === 400)
				    {
				    	try
				    	{
					    	if(results.opstatus === 0)
					    	{
					    		// success
								var httpresponse = results.httpresponse;
								delete results.opstatus;
								delete results.httpStatusCode;
								delete results.httpresponse;
								deferred.resolve({ head: httpresponse, content: results });
					    	}
					    	else
					    	{
					    		// error
								deferred.reject({ code: results.opstatus, message: results.errmsg });
					    	}
					    }
					    finally
					    {
					    	// remove connection handle
							var i = connections.indexOf(conn);
							if(i > -1)
								connections.splice(i, 1);
					    }
				    }
				});

			// save connection handle
			connections.push(conn);

			return deferred.promise;
		};
		
	}]);