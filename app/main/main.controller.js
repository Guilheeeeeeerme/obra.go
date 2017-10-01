var angular = require('angular');

module.exports = function(module){
	
	module.controller('MainController', MainController);

	MainController.$inject = ['$scope', 'QuestService', '$geolocation'];

	function MainController($scope, QuestService, $geolocation) {

		var vm = this;

		vm.actionButtonOpenInventario = actionButtonOpenInventario;
		vm.actionButtonOpenFriends = actionButtonOpenFriends;
		vm.actionButtonOpenQuests = actionButtonOpenQuests;
		vm.actionButtonPartiu = actionButtonPartiu;

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

        $geolocation.getCurrentPosition({
            timeout: 60000
        }).then(function(position) {
        	$scope.myPosition = position;
        	console.log(position);
        });

		loadQuests();
		setSize();
		$(window).resize($scope.setSize);

		angular.extend($scope, {
		    
		    center: {
		        lat: -22.4123324,
		        lon: -45.4517559,
		        zoom: 15
		    },

		    you: {
		        lat: -22.4123324,
		        lon: -45.4517559,
                label: {
                    message: 'Você',
                    show: true,
                    showOnMouseOver: true
                },
                style: custom_style
            },

		    defaults: {
                view: {
                    maxZoom: 20,
                    minZoom: 15
                }
            }

		});

		$('.ol-marker').click(actionButtonEstagio)

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
		}

		function actionButtonPartiu(quest){
			$('#questModal').modal('hide');
			$scope.runningQuest = quest;
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

