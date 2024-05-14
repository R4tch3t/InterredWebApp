function createLoading(){
    jQuery.noConflict();
    (function ($) {
     var Wwidth=$("#steps-area").width();
     var Wheight=$("#steps-area").height();
     
     $canvas = SVG('drawing').size('400px', '400px').viewbox(0,0,640,660)
     , $path = $canvas.path("M319.05 294.4C319.05 330.61 250.07 360 165.12 360C80.16 360 11.19 330.61 11.19 294.4C11.19 258.2 80.16 228.81 165.12 228.81C250.07 228.81 319.05 258.2 319.05 294.4Z")
     , $path2 = $canvas.path("M626.9 294.4C626.9 330.61 557.93 360 472.98 360C388.02 360 319.05 330.61 319.05 294.4C319.05 258.2 388.02 228.81 472.98 228.81C557.93 228.81 626.9 258.2 626.9 294.4Z")
     , $rect = $canvas.circle(32)
     , $length = $path.length()
     , $length2 = $path2.length()
     , $bodySVG = SVG('bodySVG').size(Wwidth, Wheight).viewbox(0,0,Wwidth,Wheight)
     , $rectBody = $bodySVG.rect(Wwidth,Wheight);
     //$stopR0=4153;
     //$stopR1=15692;
     $stopR0=3328;
     $stopR1=16517;
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

     $linearRectBody = $canvas.gradient('linear', function(stop) {
                                    stop.at(0, '#000')
                                    stop.at(1, '#34ce57')
                                    });

     $linearPath = $canvas.gradient('linear', function(stop) {
                                       stop.at(0, '#0c5460')
                                       stop.at(1, '#3e8f3e')
                                       });

     $linearPath2 = $canvas.gradient('linear', function(stop) {
                                        stop.at(0, '#3e8f3e')
                                        stop.at(1, '#0c5460')
                                        });

     $("#divSVG").animate({opacity: 1}, "slow", function () {
                          $("#divSVG").css("filter","blur(16px)");
     });

     $rectBody.fill($linearRectBody);
     $rect.fill($linearRect);
     $rect.center(320,296);
     $path.fill('none').stroke({width:16, color: $linearPath });
     $path2.fill('none').stroke({width:16, color: $linearPath2 });

 })(jQuery);
}

function createText(text){
jQuery.noConflict();
(function ($) {

 $textSVG = $canvas.text(function(add) {
            add.tspan(text).dy(128).dx(128).font({ size: 64, family: 'Verdana' });
 });
    $textSVG.fill($linearRect);

 })(jQuery);

}
