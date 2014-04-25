(function(){
    /**********event bind *********/
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

    $("expButtonBox").onclick = function(){
        if(canScroll){
            canScroll = false;
            pageNow = 1;
            scrollNum = 3;
            nextPage(1,80,"acc",function(){
                    commonCallback();
                });
        };
    };

    $("groupToLeft").onclick = function(){
        if(canScroll && pageNow !== 2){
            canScroll = false;
            pageNow--;
            scrollNum = 3*pageNow;
            leftPage(pageNow,100,"acc",function(){
                   commonCallback();
            });
        }
    };

    $("groupToRight").onclick = function(){
        if(canScroll && pageNow !== 9){
            canScroll = false;
            pageNow++;
            scrollNum = 3*pageNow;
            rightPage(pageNow,100,"acc",function(){
                   commonCallback();
            });
        }
    };

    document.getElementsByClassName("groupBrowseDot")[0].onclick = function(){
        pageAutoMove(2);
    };
    document.getElementsByClassName("groupBrowseDot")[1].onclick = function(){
        pageAutoMove(3);
    };
    document.getElementsByClassName("groupBrowseDot")[2].onclick = function(){
        pageAutoMove(4);
    };
    document.getElementsByClassName("groupBrowseDot")[3].onclick = function(){
        pageAutoMove(5);
    };
    document.getElementsByClassName("groupBrowseDot")[4].onclick = function(){
        pageAutoMove(6);
    };
    document.getElementsByClassName("groupBrowseDot")[5].onclick = function(){
        pageAutoMove(7);
    };
    document.getElementsByClassName("groupBrowseDot")[6].onclick = function(){
        pageAutoMove(8);
    };
    document.getElementsByClassName("groupBrowseDot")[7].onclick = function(){
        pageAutoMove(9);
    };


    /**************scroll function***************/
    function indexScroll(scrollDir){
    	var newScrollNum = scrollNum + scrollDir;
    	if(newScrollNum >= 0 && newScrollNum <= 27){
    		scrollNum = newScrollNum;
    		if(!(newScrollNum%3)){
    			if((scrollNum/3) !== pageNow){
    				pageNow = scrollNum/3;
    				pageMove(scrollNum/3,scrollDir,1,"acc",function(){});
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

    function pageAutoMove(moveToPageNum){
        if(moveToPageNum < pageNow){
            if((pageNow - moveToPageNum) == 1){
                pageNow--;
                scrollNum = 3*pageNow;
                pageMove(pageNow,-1,0.5,"acc",function(){});
            }
            else{
                PAMForward();
            }
        }
        else if(moveToPageNum > pageNow){
            if((moveToPageNum - pageNow) == 1){
                pageNow++;
                scrollNum = 3*pageNow;
                pageMove(pageNow,1,0.5,"acc",function(){});
            }
            else{
                PAMNext();
            }
        };

        function PAMForward(){
            if(moveToPageNum < pageNow){
                pageNow--;
                scrollNum = 3*pageNow;
                pageMove(pageNow,-1,0.5,"con",function(){
                    PAMForward();
                });
            };
        };

        function PAMNext(){
            if(moveToPageNum > pageNow){
                pageNow++;
                scrollNum = 3*pageNow;
                pageMove(pageNow,1,0.5,"con",function(){
                    PAMNext();
                });
            };
        };
    };

    function pageMove(pageNum,scrollDir,speed,moveType,callback){
    	if(scrollDir == 1){
    		switch(pageNum){
    			case 1:nextPage(pageNum,80*speed,moveType,function(){
                            commonCallback();
                            callback.call(this);
                        });
                        break;
    			case 2:nextPage(pageNum,80*speed,moveType,function(){
                            document.getElementsByClassName("groupBrowseDot")[0].style.width = "11px";
                            document.getElementsByClassName("groupBrowseDot")[0].style.height = "11px";
                            groupBrowseBoxShow(30*speed,moveType)
                            callback.call(this);
                        });
    					break;
    			case 3:rightPage(pageNum,100*speed,moveType,function(){
                            commonCallback();
                            callback.call(this);
                        });
                        break;
    			case 4:
    			case 5:
    			case 6:
    			case 7:
    			case 8:rightPage(pageNum,100*speed,moveType,function(){
                            commonCallback();
                            callback.call(this);
                        });
                        break;
    			case 9:rightPage(pageNum,100*speed,moveType,function(){
                            commonCallback();
                            callback.call(this);
                        });
    					break;
    		};
    	}
    	else if(scrollDir == -1){
    		switch(pageNum){
    			case 0:forwardPage(pageNum,80*speed,moveType,function(){
                            commonCallback();
                            callback.call(this);
                        });
                        break;
    			case 1:groupBrowseBoxHide(20*speed,moveType,function(){
                            forwardPage(pageNum,80*speed,moveType,function(){
                                commonCallback();
                                callback.call(this);
                            });
                        });
    					break;
    			case 2:leftPage(pageNum,100*speed,moveType,function(){
                            commonCallback();
                            callback.call(this);
                        });
                        break;
    			case 3:
    			case 4:
    			case 5:
    			case 6:
    			case 7:
    			case 8:leftPage(pageNum,100*speed,moveType, function(){
                            commonCallback();
                            callback.call(this);
                        });
    					break;
    			case 9:forwardPage(pageNum,80*speed,moveType,function(){
                            commonCallback();
                            callback.call(this);
                        });
    					break;
    		};
    	};
    };

    function forwardPage(pageNum,T,moveType,callback){
    	var countTime = 1;
        var moveDistance;
        const a1 = 500/(T*T);
        const a2 = 1000/(3*T*T);
        const t1 = 0.4*T;//加速时间
        const t2 = 0.6*T;//减速时间
        const v  = 200/T;
        const conV = 100.0/T;

		var forwardObj = pageObj[pageNum + 1];
		var nextObj    = pageObj[pageNum];
		//nextObj.style.display = "inline-block";
        var moveTime = setInterval(function(){
            if(moveType == "acc"){
                if(countTime <= t1){
                    moveDistance = (0.5*a1*countTime*countTime);
                }
                else{
                    moveDistance = (40+v*(countTime-t1)-0.5*a2*(countTime-t1)*(countTime-t1));
                };
            }
            else if(moveType == "con"){
                moveDistance = countTime*conV;
            };

            forwardObj.style.top =  moveDistance + "%";
            nextObj.style.top =  (moveDistance - 100) + "%";
            if(countTime < T){
                ++countTime;
            }
            else{
            	forwardObj.style.top = "100%";
            	nextObj.style.top =  "0%";
            	//forwardObj.style.display = "none";
            	callback.call(this);
                clearInterval(moveTime);
            }
        },8);
    };
    function nextPage(pageNum,T,moveType,callback){
    	var countTime = 1;
        var moveDistance;
        const a1 = 500/(T*T);
        const a2 = 1000/(3*T*T);
        const t1 = 0.4*T;//加速时间
        const t2 = 0.6*T;//减速时间
        const v  = 200/T;
        const conV = 100.0/T;

		var forwardObj = pageObj[pageNum - 1];
		var nextObj    = pageObj[pageNum];
		//nextObj.style.display = "inline-block";
        var moveTime = setInterval(function(){
            if(moveType == "acc"){
                if(countTime <= t1){
                    moveDistance = (0.5*a1*countTime*countTime);
                }
                else{
                    moveDistance = (40+v*(countTime-t1)-0.5*a2*(countTime-t1)*(countTime-t1));
                };
            }
            else if(moveType == "con"){
                moveDistance = countTime*conV;
            };

            forwardObj.style.top =  (0 - moveDistance) + "%";
            nextObj.style.top =  (100 - moveDistance ) + "%";
            if(countTime < T){
                ++countTime;
            }
            else{
            	forwardObj.style.top = "-100%";
            	nextObj.style.top =  "0%";
            	//forwardObj.style.display = "none";
            	callback.call(this);
                clearInterval(moveTime);
            }
        },8);
    };
    function leftPage(pageNum,T,moveType,callback){
    	var countTime = 1;
        var moveDistance;
        const a1 = 500/(T*T);
        const a2 = 1000/(3*T*T);
        const t1 = 0.4*T;//加速时间
        const t2 = 0.6*T;//减速时间
        const v  = 200/T;
        const conV = 100.0/T;

		var forwardObj = pageObj[pageNum + 1];
		var nextObj    = pageObj[pageNum];
		//nextObj.style.display = "inline-block";
		nextObj.style.top = "0px";
        var moveTime = setInterval(function(){
            if(moveType == "acc"){
                if(countTime <= t1){
                    moveDistance = (0.5*a1*countTime*countTime);
                }
                else{
                    moveDistance = (40+v*(countTime-t1)-0.5*a2*(countTime-t1)*(countTime-t1));
                };
            }
            else if(moveType == "con"){
                moveDistance = countTime*conV;
            };

            forwardObj.style.left =  moveDistance + "%";
            nextObj.style.left =  (moveDistance - 100) + "%";
            if(countTime < T){
                ++countTime;
            }
            else{
                document.getElementsByClassName("groupBrowseDot")[pageNum-2].style.width = "11px";
                document.getElementsByClassName("groupBrowseDot")[pageNum-2].style.height = "11px";
                document.getElementsByClassName("groupBrowseDot")[pageNum-1].style.width = "7px";
                document.getElementsByClassName("groupBrowseDot")[pageNum-1].style.height = "7px";
            	forwardObj.style.left = "100%";
            	forwardObj.style.top = "100%";
            	nextObj.style.left =  "0%";
            	//forwardObj.style.display = "none";
            	callback.call(this);
                clearInterval(moveTime);
            }
        },8);
    };
    function rightPage(pageNum,T,moveType,callback){
    	var countTime = 1;
        var moveDistance;
        const a1 = 500/(T*T);
        const a2 = 1000/(3*T*T);
        const t1 = 0.4*T;//加速时间
        const t2 = 0.6*T;//减速时间
        const v  = 200/T;
        const conV = 100.0/T;

		var forwardObj = pageObj[pageNum - 1];
		var nextObj    = pageObj[pageNum];
		//nextObj.style.display = "inline-block";
		nextObj.style.top = "0px";
        var moveTime = setInterval(function(){
            if(moveType == "acc"){
                if(countTime <= t1){
                    moveDistance = (0.5*a1*countTime*countTime);
                }
                else{
                    moveDistance = (40+v*(countTime-t1)-0.5*a2*(countTime-t1)*(countTime-t1));
                };
            }
            else if(moveType == "con"){
                moveDistance = countTime*conV;
            };

            forwardObj.style.left =  (0 - moveDistance) + "%";
            nextObj.style.left =  (100 - moveDistance) + "%";
            if(countTime < T){
                ++countTime;
            }
            else{
                document.getElementsByClassName("groupBrowseDot")[pageNum-2].style.width = "11px";
                document.getElementsByClassName("groupBrowseDot")[pageNum-2].style.height = "11px";
                document.getElementsByClassName("groupBrowseDot")[pageNum-3].style.width = "7px";
                document.getElementsByClassName("groupBrowseDot")[pageNum-3].style.height = "7px";
            	forwardObj.style.left = "-100%";
            	forwardObj.style.top = "-100%";
            	nextObj.style.left =  "0%";
            	//forwardObj.style.display = "none";
            	callback.call(this);
                clearInterval(moveTime);
            }
        },8);
    };

    /**********each callback function*****/
    function commonCallback(){
        canScroll = true;
    };

    function groupBrowseBoxShow(T,moveType){
        var countTime = 1;
        var moveDistance;

        if(moveType == "acc"){
            const a1 = 500/(T*T);
            const a2 = 1000/(3*T*T);
            const t1 = 0.4*T;//加速时间
            const t2 = 0.6*T;//减速时间
            const v  = 200/T;
            const length = 94;
            var moveTime = setInterval(function(){
                if(countTime <= t1){
                    moveDistance = (0.5*a1*countTime*countTime)*length/100.0;
                }
                else{
                    moveDistance = (40+v*(countTime-t1)-0.5*a2*(countTime-t1)*(countTime-t1))*length/100.0;
                };
                groupBrowseBox.style.bottom = (-34 + moveDistance) + "px";
                if(countTime < T){
                    ++countTime;
                }
                else{
                    groupBrowseBox.style.bottom = "60px";
                    canScroll = true;
                    clearInterval(moveTime);
                }
            },8);
        }
        else if(moveType == "con"){
            const conV = 94.0/T;
            var moveTime = setInterval(function(){
                moveDistance = conV*countTime;
                groupBrowseBox.style.bottom = (-34 + moveDistance) + "px";
                if(countTime < T){
                    ++countTime;
                }
                else{
                    groupBrowseBox.style.bottom = "60px";
                    canScroll = true;
                    clearInterval(moveTime);
                }
            },8);
        };
    };
    function groupBrowseBoxHide(T,moveType,callback){
        var countTime = 1;
        var moveDistance;

        if(moveType == "acc"){
            const a1 = 500/(T*T);
            const a2 = 1000/(3*T*T);
            const t1 = 0.4*T;//加速时间
            const t2 = 0.6*T;//减速时间
            const v  = 200/T;
            const length = 94;
            var moveTime = setInterval(function(){
                if(countTime <= t1){
                    moveDistance = (0.5*a1*countTime*countTime)*length/100.0;
                }
                else{
                    moveDistance = (40+v*(countTime-t1)-0.5*a2*(countTime-t1)*(countTime-t1))*length/100.0;
                };
                groupBrowseBox.style.bottom = (60 - moveDistance) + "px";
                if(countTime < T){
                    ++countTime;
                }
                else{
                    groupBrowseBox.style.bottom = "-34px";
                    callback.call(this);
                    clearInterval(moveTime);
                }
            },8);
        }
        else if(moveType == "con"){
            const conV = 94.0/T;
            var moveTime = setInterval(function(){
                moveDistance = conV*countTime;
                groupBrowseBox.style.bottom = (60 - moveDistance) + "px";
                if(countTime < T){
                    ++countTime;
                }
                else{
                    groupBrowseBox.style.bottom = "-34px";
                    callback.call(this);
                    clearInterval(moveTime);
                }
            },8);
        };

    };

})();