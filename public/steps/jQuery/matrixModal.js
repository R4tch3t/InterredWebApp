
function closeCard(c){
(function ($) {
try{
    $divCard[c].animate({opacity: 0}, "slow", function () {
        //$divCard[c].remove();
        //$(this).css("opacity","0");
        removeElement(c);
        resizeW();
        //  $mouseUpB=false;
        $overModal[c]=false;
    });
}catch(e){
    console.log(e)
}
})(jQuery);
}

function showModalCard(c){
    (function ($) {
        try{
            $divCard[c].animate({opacity: 1}, "fast", function () {
                      /*if($divCardBody.html()===""){
                             $(this).css("opacity","0");
                             if($bandModal){
                                $("div").off("mouseenter mouseup");
                                overMouse();
                                closeCard();
                                $bandModal=false;
                             }
                      }else{*/
                      fadeInCard(c);
                      $divCard[c].mousemove()
                      $(this).css("opacity","1");
                      resizeB();
                         //    }
            });
        }catch(e){
            console.log(e)
        }
     })(jQuery);
}

function leaveMouse(){
(function ($) {
    try{
    $("div").on("mouseenter mouseup", function(e){
                if($(this).attr("id")!=="divCard"&&$(this).attr("id")!=="cardBody"
                           &&$(this).attr("id")!=="divTop"){
                        if($bandModal){
                        $("div").off("mouseenter mouseup");
                        overMouse();
                        //$arrowUp.animate({opacity: 0}, "fast", function () {
                                        // $(this).css("opacity","0");
                        closeCard();
                        $bandModal=false;
                                         //});
                                }
                        }
                        });
    }catch(e){
        console.log(e)
    }                              
  })(jQuery);
}

function overMouse(c){
(function ($) {
try{    
/*$("span").on("mouseover", function(e){
    //var offsetTop = $(this).offset().top+($(e).width()*1.5);
    // var offsetLeft = $(this).offset().left+$(e).width();
    //if(/*!$bandModal&&!$overModal[c]){

        evalMatrix(this);
    //}

    });*/

    $("span").on("mouseup", function(e){        
    //if(!$mouseUpB[c]){
        //  $mouseUpB[c]=true;
        $("div").off("mouseup mouseenter");
    //    $("span").off("mouseup");
        var espan = this;
        // $arrowUp.animate({opacity: 0}, "fast", function () {
            // $(this).css("opacity","0");
        //$divCard.animate({opacity: 0}, "fast", function () {
            //  $divCardBody.html("");
            //   $(this).css("opacity","0");
            evalMatrix(espan);
        // });
        //});
    //}
    });
}catch(e){
    console.log(e)
}
})(jQuery);
}

function fadeInCard(c){
(function ($) {
try{
 //if(!$banDivTop){
    //$banDivTop=true;
    closeFCard(c);
    $divCard[c].on("mousemove",function(){
            //$divCard.off("mousemove");
        if(!$banDivTop[c]){
            $banDivTop[c]=true;
            $divTop[c].animate({opacity: 0.56}, "slow", function () {
                timeout(c);
            });
        }else{
            $bCloseCard[c]=false;
            timeout(c);
        }
    });
    //$divCard[c].mousemove()
 //}
}catch(e){
    console.log(e)
}
})(jQuery);
}

function timeout(c){
(function ($) {
 try{   
 if($bandTimeOut[c]){
    $bandTimeOut[c]=false;
    setTimeout(function(){
        $bandTimeOut[c]=true;
        if($bCloseCard[c]&&$bCloseCard2[c]){
            $divTop[c].animate({opacity: 0}, "slow", function () {
                $banDivTop[c]=false;
                $bClose[c].off("mousemove");
                $bClose[c].off("mouseup");
                fadeInCard(c);
            });
            }else{
               $bCloseCard[c]=true;
               timeout(c);
            }
    }, 1500);
 }
 }catch(e){
     console.log(e)
 }
})(jQuery);
}

function closeFCard(c){
(function ($) {
    try{
  $bClose[c].on("mousemove",function(){
    $bCloseCard2[c]=false;
  });

$bClose[c].on("mouseleave",function(){
    $bCloseCard2[c]=true;
    $bClose[c].off("mouseleave");
    timeout(c);
});
$bClose[c].on("mouseup",function(){
    closeCard(c);
    $bClose[c].off("mouseup");
});
}catch(e){
    console.log(e)
}
})(jQuery);
}

function setModalArr(){
 (function ($) {
    $divCard[$divCard.length] = $("<div>")
    .css("position","absolute").css("opacity","0").css("top","0px")
    .css("z-index","999")
    .addClass("card").attr("id","divCard"+$divCard.length);
    $divCardBody[$divCardBody.length] = $("<div>")
    .addClass("card-body").attr("id","cardBody"+$divCard.length);
    $divTop[$divTop.length]=$("<div>")
    .attr("id","divTop").height(23)
    .width("100%").css("background-color","black")
    .css("opacity","0").css("position","absolute").css("border-radius","0.25rem");
    $bClose[$bClose.length]=$("<button>")
    .attr("type","button").attr("class","btn btn-outline-dark")
    .width("15px").height("15px").css("font-size","10px").css("position","absolute")
    .css("left","5px").css("top","4px").css("text-align","top").css("padding","0 0 0 0");
    $pClose[$pClose.length]=$("<p>")
    .css("position","absolute").css("top","-10px").css("left","3px").html("x");
    $bClose[$bClose.length-1].append($pClose[$pClose.length-1]);
    $divTop[$divTop.length-1].append($bClose[$bClose.length-1]);
    $divCard[$divCard.length-1].append($divTop[$divTop.length-1]);
    $divCard[$divCard.length-1].append($divCardBody[$divCardBody.length-1]);
    $("body").append($divCard[$divCard.length-1]);
    $banDivTop[$banDivTop.length] = false;
    $bandTimeOut[$bandTimeOut.length]=true;
    $bCloseCard[$bCloseCard.length]=true;
    $bCloseCard2[$bCloseCard2.length]=true;
    $mouseUpB[$mouseUpB.length]=false;
    $overModal[$overModal.length]=false;
  })(jQuery);
}

function searchElements(offsetTop, offsetLeft){
    var c=$divCard.length-1;
    while(c>-1){
        if($divCard[c].css("top").startsWith(offsetTop)
           &&$divCard[c].css("left").startsWith(offsetLeft)){
            removeElement(c);
        }
        c-=1;
    }
}

function removeElement(c){
        $divCard[c].remove();
        $divCard.splice(c,1); $divCardBody.splice(c,1);
        $divTop.splice(c,1); $bClose.splice(c,1);
        $pClose.splice(c,1); $banDivTop.splice(c,1);
        $bandTimeOut.splice(c,1); $bCloseCard.splice(c,1);
        $bCloseCard.splice(c,1); $bCloseCard2.splice(c,1);
        $mouseUpB.splice(c,1); $overModal.splice(c,1);


}
function resetModals(){
    $divCard = [];
    $divCardBody = [];
    $divTop = [];
    $bClose = [];
    $pClose = [];
    $banDivTop = [];
    $bandTimeOut = [];
    $bCloseCard = [];
    $bCloseCard2 = [];
    $mouseUpB = [], $overModal = [];
    setModalArr();
}

function inits(){    
 if(document.readyState === "interactive") {
     setTimeout(inits, 1); 
 }else{
    
    //polyfill contains
   /* if(!('contains' in String.prototype)){
            String.prototype.contains = function(str, startIndex) {
                return -1 !== String.prototype.indexOf.call(this, str, startIndex);
            };
    }
    if(!('contains' in Array.prototype)){
            Array.prototype.contains = function(str, startIndex) {
                return -1 !== String.prototype.indexOf.call(this, str, startIndex);
            };
    }

    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function (stringBuscada, posicion) {
            posicion = posicion || 0;
            return this.indexOf(stringBuscada, posicion) === posicion;
        };
    }
    if (!Array.prototype.startsWith) {
        Array.prototype.startsWith = function (stringBuscada, posicion) {
            posicion = posicion || 0;
            return this.indexOf(stringBuscada, posicion) === posicion;
        };
    }

    if (!String.prototype.includes) {
        String.prototype.includes = function (search, start) {
            'use strict';
            if (typeof start !== 'number') {
                start = 0;
            }

            if (start + search.length > this.length) {
                return false;
            } else {
                return this.indexOf(search, start) !== -1;
            }
        };
        Array.prototype.includes = function (search, start) {
            'use strict';
            if (typeof start !== 'number') {
                start = 0;
            }

            if (start + search.length > this.length) {
                return false;
            } else {
                return this.indexOf(search, start) !== -1;
            }
        };
    }*/
    
    $bodySVG=null;
    $('body').animate({opacity:1},'slow',function(){
        setBackgroundSVG();
    });
    
    resetModals();
/*$arrowUp = $("<div>").css("position","absolute").css("width","0").css("height","0").css("border-left","14px solid transparent").css("border-right","14px solid transparent").css("border-bottom","14px solid green")
    .css("opacity","0").attr("id","arrowUp");*/

    $bandModal = [false];

    MathJax.Hub.Register.StartupHook("End", function () {
        getFullyDim();        
        overMouse(0);
    });
    
}
}

function renderJax(){
    MathJax.Hub.Queue(["Typeset",MathJax.Hub, "steps-area",function(){
        //ending Rerendered
        //overMouse(0);
    $bodySVG=null;
    $('body').animate({opacity:1},'fast',function(){
        setBackgroundSVG();
        getFullyDim();     
        //countColors = colorCircles.length-1;
        //reFillBG()     
    });
    
    //resetModals();
    //$bandModal = [false];
        
        overMouse(0);
    }]);
} 

//reading js...
(function ($) {
     $(document).ready(function() {         
        inits()
    });
 })(jQuery);
