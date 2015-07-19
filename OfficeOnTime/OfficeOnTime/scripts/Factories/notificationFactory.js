'use strict';
ootApp.factory('Notification', function ($rootScope) {
    return {
        alert: function (message, completeCallback, title, buttonLabel) {
            if(navigator.notification !== undefined){
				navigator.notification.alert(message,
					function(){
					    $rootScope.$apply(completeCallback());
					},title,buttonLabel);
			} else {
				alert(message);
				completeCallback();
			}            
        }
    };
});