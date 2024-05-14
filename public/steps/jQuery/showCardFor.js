
function showCardFor(c){
jQuery.noConflict();
(function ($) {

    MathJax.Hub.Queue(["Typeset",MathJax.Hub, "cardBody",function(){
               // $("span").off("mouseover");
             //   $bandModal=true;
             //   leaveMouse();
                var i=0;
                var sideBoxL=$divCardBody[c].children().next();

                while(i<10){
                    sideBoxL=$(sideBoxL).children();
                    i+=1;
                }

                sideBoxL=$(sideBoxL).next().next().children();
                var position = $(sideBoxL).offset();
                var positionCard=$divCard[c].offset();
                if(position){
                       var leftSideL=position.left-positionCard.left-1;
                       var topSideL=position.top-positionCard.top;
                       if($plusCarry){
                            var divPlus=$("<div>").css("color","green").css("font-size","22px").html("+");
                            $(divPlus).css("position","absolute").css("left",leftSideL-3)
                            $(divPlus).css("top",topSideL/3.96 );
                            $divCardBody[c].append($(divPlus));
                       }
                       var divFor=$("<div>").css("color","black").css("font-size","22px").html("`xx`");
                       $(divFor).css("position","absolute").css("left",leftSideL-15)
                       $(divFor).css("top",(topSideL-47) );
                       $(divFor).prop('id','divFor');
                       $divCardBody[c].append($(divFor));
                       MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divFor", function () {}]);
                }

                showModalCard(c);

                }]);

 })(jQuery);
}
