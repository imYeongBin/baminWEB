(function(angular,mz){
   debugger;
   var cfg = mz.lib.bundle(['']);
   
   var bc ={
      retrieve : ''   
   };

   mz.init(cfg,bc);

   mz.config([
      {
         path: '/list',
         name: 'main',
         tpl: 'main'
      }      

   ], '/list');



   mz.controller('main',function(co,$scope){
	   debugger;
	   var bc = co.get('bc');
	   var layerPop = co.get('layerPop');
	   var location = co.get('location');
	   var $rootScope = co.get('$rootScope');
	   var routeParams = co.get('routeParams');
	   var utill = co.get('utill');
	   
	   
	   init();
	   
	   function init(){
		   debugger;
		   var a = 1 ;
		   $scope.a = a;
		   
		   console.log("aaa");
		   
	   }
   
   });



});


