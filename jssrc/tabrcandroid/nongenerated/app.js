toolkit.module('app', ['kony']).run(['$state', '$location', function($state, $location) {
    $state.register('home', formHome, 'HomeController');
    $state.register('edit', formInfo, 'InfoController');
    $state.register('about', formAbout, 'AboutController');
    $location.startup('home');
}]).controller('HomeController', ['$scope', '$location', '$http', function($scope, $location, $http) {
    $scope.message = 'hello world';
    $scope.on('init', function(eventobject) {
        $scope.form.labelMessage.text = $scope.message;
        $scope.on($scope.form.buttonGet, 'onClick', function() {
            var url = 'http://api.remix.bestbuy.com/v1/categories(id=cat00000)?format=json&apiKey=9cvgm7dxmx86nea533tkz7ed';
            $http.get(url).then(function(response) { // response ::= { head, content }
                // ok
                alert('OK: ' + JSON.stringify(response));
            }).fail(function(error) { // error ::= { code, message }
                // error
                alert('ERROR: ' + JSON.stringify(error));
            }).fin(function() {
                // finally
            });
        });
        $scope.on($scope.form.buttonCancel, 'onClick', function() {
            $http.cancel();
        });
        $scope.on($scope.form.buttonKonyGet, 'onClick', function() {
            // url -> http://<address>:<port>/middleware/MWServlet
            $http.kony(appConfig.url, 'BestBuyOne', 'getCategories', {
                category_id: 'cat00000'
            }).then(function(response) { // response ::= { head, content }
                // ok
                alert('OK: ' + JSON.stringify(response));
            }).fail(function(error) { // error ::= { code, message }
                // error
                alert('ERROR: ' + JSON.stringify(error));
            }).fin(function() {
                // finally
            });
        });
        $scope.on($scope.form.buttonKonyCancel, 'onClick', function() {
            $http.cancel();
        });
    });
    $scope.on($scope.form.buttonEdit1, 'onClick', function() {
        $location.go('edit', {
            label: 'value one:',
            text: 'default value one'
        });
    });
    $scope.on($scope.form.buttonEdit2, 'onClick', function() {
        $location.go('edit', {
            label: 'value two:',
            text: 'default value two'
        });
    });
}]).controller('InfoController', ['$scope', '$location', function($scope, $location) {
    $scope.on('init', function() {});
    $scope.on('preShow', function() {
        $scope.form.labelValue.text = $location.current.parameters.label;
        $scope.form.textValue.text = $location.current.parameters.text;
    });
    $scope.on($scope.form.buttonSaveClose, 'onClick', function() {
        $location.back();
    });
}]).controller('AboutController', ['$scope', function($scope) {}]);