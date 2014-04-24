(function(){
	window.$ = function(id){
	    return document.getElementById(id);
	};

	window.getCss = function(obj){
		if(typeof(obj) === "string"){
	    	return window.getComputedStyle(document.getElementById(obj),false);
		}
		else if(typeof(obj) === "object"){
			return window.getComputedStyle(obj,false);
		}
	};
})();