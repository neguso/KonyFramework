function preappinit()
{

}

function postappinit()
{
	// framework startup
	toolkit.start();
	
	// set start page
	var home = null;
	toolkit.injector(['system', 'kony']).execute(['$state', '$location', function($state, $location) {
		home = $state.states[$location.startup()].form;
	}]);
	return home;
}