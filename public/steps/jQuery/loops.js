
function setGradient(){
    $stopR0+=25;
    $stopR1-=25;
    $stopStr0=$stopR0.toString(16).toUpperCase();
    $stopStr1=$stopR1.toString(16).toUpperCase();
    if($stopStr0.length>3){
        $stopStr0="00"+$stopStr0;
    }
    if($stopStr1.length>3){
        $stopStr1="00"+$stopStr1;
    }
    $stopStr0="#"+$stopStr0;
    $stopStr1="#"+$stopStr1;
    $linearRect = $canvas.gradient('linear', function(stop) {
                                   stop.at(0, $stopStr0)
                                   stop.at(1, $stopStr1)
    });
    $rectBody.fill($linearRect);
    $rect.fill($linearRect);
}

function loop1(){
    jQuery.noConflict();
    (function ($) {

        $rect.animate(800, '<>').during(function(pos, morph, eased){
        $p = $path.pointAt((eased * $length)/2);
        $rect.center($p.x, $p.y);

    }).after(function(situation) {
             //$("#divSVG").animate({opacity: 0}, "slow", function () {
                                  //setGradient();
                                 // $("#divSVG").animate({opacity: 1}, "slow", function () {

                                                       loop2();
                                                      // });

                                  //});

    });

 })(jQuery);
}

function loop2(){
jQuery.noConflict();
(function ($) {
    //setGradient();
    $rect.animate(800, '<>').during(function(pos, morph, eased){
        $eased1 = ($eased0 + eased);
        $p = $path.pointAt(($eased1 * $length)/2);
        $rect.center($p.x, $p.y);

    }).after(function(situation) {
            // $("#divSVG").animate({opacity: 0}, "slow", function () {
                                 // setGradient();
                                //  $("#divSVG").animate({opacity: 1}, "slow", function () {

                                                       loop3();
                                                      // });

                                 // });
     });

})(jQuery);
}

function loop3(){
jQuery.noConflict();
(function ($) {
 //setGradient();
    $rect.animate(800, '<>').during(function(pos, morph, eased){
         $eased1 = ($eased0 - eased)/2;
         $p = $path2.pointAt($eased1 * $length2);
         $rect.center($p.x, $p.y);

    }).after(function(situation) {
             //$("#divSVG").animate({opacity: 0}, "slow", function () {
                                //  setGradient();
                                //  $("#divSVG").animate({opacity: 1}, "slow", function () {

                                                       loop4();
                                                 //      });

                                  //});
    });
})(jQuery);
}

function loop4(){
jQuery.noConflict();
(function ($) {
 //setGradient();
    $rect.animate(1600, '<>').during(function(pos, morph, eased){
         $eased1 = ($eased0 - eased);
         if($eased1 >= 1/2){
         $p = $path2.pointAt($eased1 * $length2);
         $rect.center($p.x, $p.y);
         }

    }).after(function(situation){
             //$("#divSVG").animate({opacity: 0}, "slow", function () {
                                  //setGradient();
                                  //$("#divSVG").animate({opacity: 1}, "slow", function () {

                                                       loop1();
                                            //           });

                                 // });
    });
 })(jQuery);
}

