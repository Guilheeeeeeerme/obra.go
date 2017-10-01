var angular = require('angular');

module.exports = function(module){
	
	module.controller('MainController', MainController);

	MainController.$inject = ['$scope', 'QuestService', '$geolocation', '$timeout'];

	function MainController($scope, QuestService, $geolocation, $timeout) {

		var vm = this;

		vm.actionButtonOpenInventario = actionButtonOpenInventario;
		vm.actionButtonOpenFriends = actionButtonOpenFriends;
		vm.actionButtonOpenQuests = actionButtonOpenQuests;
		vm.actionButtonPartiu = actionButtonPartiu;

		vm.picture;

		$scope.setSize = setSize;

		var custom_style = {
            image: {
                icon: {
                    anchor: [0.5, 1],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'fraction',
                    opacity: 0.90,
                    src: 'images/map-marker.png'
                }
            }
        };

	    $scope.defaults = {
            view: {
                maxZoom: 20,
                minZoom: 15
            }
        }

        $geolocation.getCurrentPosition().then(hasNewLocation);



		loadQuests();
		setSize();
		$(window).resize($scope.setSize);

		$scope.isOnQuest = false;

		function hasNewLocation(position){

			if(!$scope.isOnQuest){

				$scope.center= null;

				$scope.center = {
			        lat: position.coords.latitude,
			        lon: position.coords.longitude,
			        zoom: 15
			    }

			}

		    $scope.you = {
		        lat: position.coords.latitude,
		        lon: position.coords.longitude,
                label: {
                    message: 'Você',
                    show: true,
                    showOnMouseOver: true
                },
                style: custom_style
            }

	        $timeout(function(){
		        $geolocation.getCurrentPosition().then(hasNewLocation);
	        }, 5000);

		}


		$('.ol-marker *').click(actionButtonEstagio)

		function actionButtonEstagio(){
			console.log(arguments);
		}

		function loadQuests(){
			QuestService.getQuests().then(onQuestsReady);
		}

		function onQuestsReady (response){
			$scope.dados = {
				quests: response.data
			}

			$scope.center= null;
		}

		function actionButtonPartiu(quest){
			$('#questModal').modal('hide');
			$scope.runningQuest = quest;

			$scope.center = {
		        lat: quest.estagios[0].latitude,
		        lon: quest.estagios[0].longitude,
		        zoom: 15
		    }

			$scope.isOnQuest = true;

		}

		function actionButtonOpenInventario(){
			$('#inventarioModal').modal('show');
		}

		function actionButtonOpenFriends(){
			$('#friendsModal').modal('show');
		}

		function actionButtonOpenQuests(){
			$('#questModal').modal('show');
		}

		function setSize(){
			$scope.size = null;

			$scope.size = {
				height: $(window).height(),
				width: $(window).width()
			}
		}

		
	}


}



















        var app = angular.module("demoapp", ["openlayers-directive"]);
        app.controller("DemoController", [ '$scope', function($scope) {

            
            
            angular.extend($scope, {
                center: {
                    lat: 42.9515,
                    lon: -8.6619,
                    zoom: 9
                },
                santiago: {
                    lat: 42.880596200000010000,
                    lon: -8.544641200000001000,
                    label: {
                        message: 'Santiago de Compostela',
                        show: true,
                        showOnMouseOver: true
                    },
                    style: custom_style
                },
                zas: {
                    lat: 43.099490,
                    lon:  -8.915453,
                }
            });
        } ]);

