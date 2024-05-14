
function showCardDiv(c){
jQuery.noConflict();
(function ($) {
    MathJax.Hub.Queue(["Typeset",MathJax.Hub, "cardBody",function(){
              //  $("span").off("mouseover");
                //$bandModal=true;
             //   leaveMouse();
                var i=0;
                var sideBoxL=$divCardBody[c].children().next();
                var divSide=$("<div>").css("border-style","solid").css("border-width","0px 0px 0px 1.3px").css("width","0px").css("height","30px");
                var divMinus=$("<div>").css("color","red").css("font-size","24px").html("-");

                while(i<8){
                    sideBoxL=$(sideBoxL).children();
                    i+=1;
                }

                sideBoxL=$(sideBoxL).next().children().children().next().next().children();
                var position = $(sideBoxL).offset();
                var positionCard=$divCard[c].offset();
                if(position){
                       var leftSideL=position.left-positionCard.left-1;
                       var topSideL=position.top-positionCard.top;
                       $(divSide).css("position","absolute").css("left",leftSideL).css("top",topSideL);
                   $(divMinus).css("position","absolute").css("left",leftSideL-2).css("top",topSideL+($divCardBody[c].height()/2.75));
                       $divCardBody[c].append($(divSide));
                       $divCardBody[c].append($(divMinus));
                }

                showModalCard(c);

                }]);
 })(jQuery);
}
