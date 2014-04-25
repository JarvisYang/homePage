(function(){

	var canScroll = true;
	var scrollNum = 0;
	var pageNow   = 0;
	var pageObj = [$("homePage"),
					$("introducePage"),
					$("androidPage"),
					$("iosPage"),
					$("webPage"),
					$("designPage"),
					$("esdPage"),
					$("algPage"),
					$("ITPage"),
					$("PMPage")];
	document.onmousewheel = function(event) {
        if(canScroll){
            canScroll = false;
            event = event || window.event;
            indexScroll(event.wheelDelta/-120);
        };
    };
    document.addEventListener("DOMMouseScroll", function(event) {
        if(canScroll){
            canScroll = false;
            indexScroll(event.detail/3);
        };
    });
    function indexScroll(scrollDir){
    	var newScrollNum = scrollNum + scrollDir;
    	if(newScrollNum >= 0 && newScrollNum <= 27){
    		scrollNum = newScrollNum;
    		if(!(newScrollNum%3)){
    			if((scrollNum/3) !== pageNow){
    				pageNow = scrollNum/3;
    				pageMove(scrollNum/3,scrollDir);
    			}
    			else{
    				canScroll = true;
    			};
    		}
    		else{
    			canScroll = true;
    		};
    	}
    	else{
    		canScroll = true;
    	};
    };

    function pageMove(pageNun,scrollDir){
    	if(scrollDir == 1){
    		switch(pageNun){
    			case 1:
    			case 2:nextPage(pageNun,100);
    					break;
    			case 3:
    			case 4:
    			case 5:
    			case 6:
    			case 7:
    			case 8:
    			case 9:rightPage(pageNun,100);
    					break;
    		};
    	}
    	else if(scrollDir == -1){
    		switch(pageNun){
    			case 0:
    			case 1:forwardPage(pageNun,100);
    					break;
    			case 2:
    			case 3:
    			case 4:
    			case 5:
    			case 6:
    			case 7:
    			case 8:leftPage(pageNun,100);
    					break;
    			case 9:forwardPage(pageNun,100);
    					break;
    		};
    	};
    };

    function forwardPage(pageNun,T){
    	var countTime = 1;
        var moveDistance;
        const a1 = 500/(T*T);
        const a2 = 1000/(3*T*T);
        const t1 = 0.4*T;//加速时间
        const t2 = 0.6*T;//减速时间
        const v  = 200/T;

		var forwardObj = pageObj[pageNun + 1];
		var nextObj    = pageObj[pageNun];
		nextObj.style.display = "inline-block";
        var moveTime = setInterval(function(){
            if(countTime <= t1){
                moveDistance = (0.5*a1*countTime*countTime);
            }
            else{
                moveDistance = (40+v*(countTime-t1)-0.5*a2*(countTime-t1)*(countTime-t1));
            };
            forwardObj.style.top =  moveDistance + "%";
            nextObj.style.top =  (moveDistance - 100) + "%";
            console.log(forwardObj.style.top,nextObj.style.top)
            if(countTime < T){
                ++countTime;
            }
            else{
            	forwardObj.style.top = "100%";
            	nextObj.style.top =  "0%";
            	forwardObj.style.display = "none";
            	canScroll = true;
                clearInterval(moveTime);
            }
        },8);
    };
    function nextPage(pageNun,T){
    	var countTime = 1;
        var moveDistance;
        const a1 = 500/(T*T);
        const a2 = 1000/(3*T*T);
        const t1 = 0.4*T;//加速时间
        const t2 = 0.6*T;//减速时间
        const v  = 200/T;

		var forwardObj = pageObj[pageNun - 1];
		var nextObj    = pageObj[pageNun];
		nextObj.style.display = "inline-block";
        var moveTime = setInterval(function(){
            if(countTime <= t1){
                moveDistance = (0.5*a1*countTime*countTime);
            }
            else{
                moveDistance = (40+v*(countTime-t1)-0.5*a2*(countTime-t1)*(countTime-t1));
            };
            forwardObj.style.top =  (0 - moveDistance) + "%";
            nextObj.style.top =  (100 - moveDistance ) + "%";
            console.log(getCss(forwardObj).top,getCss(nextObj).top)
            if(countTime < T){
                ++countTime;
            }
            else{
            	forwardObj.style.top = "-100%";
            	nextObj.style.top =  "0%";
            	forwardObj.style.display = "none";
            	canScroll = true;
                clearInterval(moveTime);
            }
        },8);
    };
    function leftPage(pageNun,T){
    	var countTime = 1;
        var moveDistance;
        const a1 = 500/(T*T);
        const a2 = 1000/(3*T*T);
        const t1 = 0.4*T;//加速时间
        const t2 = 0.6*T;//减速时间
        const v  = 200/T;

		var forwardObj = pageObj[pageNun + 1];
		var nextObj    = pageObj[pageNun];
		nextObj.style.display = "inline-block";
		nextObj.style.top = "0px";
        var moveTime = setInterval(function(){
            if(countTime <= t1){
                moveDistance = (0.5*a1*countTime*countTime);
            }
            else{
                moveDistance = (40+v*(countTime-t1)-0.5*a2*(countTime-t1)*(countTime-t1));
            };
            forwardObj.style.left =  moveDistance + "%";
            nextObj.style.left =  (moveDistance - 100) + "%";
            console.log(forwardObj.style.left,nextObj.style.left)
            if(countTime < T){
                ++countTime;
            }
            else{
            	forwardObj.style.left = "100%";
            	forwardObj.style.top = "100%";
            	nextObj.style.left =  "0%";
            	forwardObj.style.display = "none";
            	canScroll = true;
                clearInterval(moveTime);
            }
        },8);
    };
    function rightPage(pageNun,T){
    	var countTime = 1;
        var moveDistance;
        const a1 = 500/(T*T);
        const a2 = 1000/(3*T*T);
        const t1 = 0.4*T;//加速时间
        const t2 = 0.6*T;//减速时间
        const v  = 200/T;

		var forwardObj = pageObj[pageNun - 1];
		var nextObj    = pageObj[pageNun];
		nextObj.style.display = "inline-block";
		nextObj.style.top = "0px";
        var moveTime = setInterval(function(){
            if(countTime <= t1){
                moveDistance = (0.5*a1*countTime*countTime);
            }
            else{
                moveDistance = (40+v*(countTime-t1)-0.5*a2*(countTime-t1)*(countTime-t1));
            };
            forwardObj.style.left =  (0 - moveDistance) + "%";
            nextObj.style.left =  (100 - moveDistance) + "%";
            console.log(forwardObj.style.left,nextObj.style.left)
            if(countTime < T){
                ++countTime;
            }
            else{
            	forwardObj.style.left = "-100%";
            	forwardObj.style.top = "-100%";
            	nextObj.style.left =  "0%";
            	forwardObj.style.display = "none";
            	canScroll = true;
                clearInterval(moveTime);
            }
        },8);
    };

})();