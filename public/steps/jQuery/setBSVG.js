function setBackgroundSVG(){
 jQuery.noConflict();
 (function ($) {
    var Wwidth=$("#steps-area").prop("scrollWidth");
    var Wheight=$("#steps-area").prop("scrollHeight");
    var Wwindow = $("#steps-area").width(); 
    var Hwindow = $("#steps-area").height(); 
    Wwidth=parseInt(Wwidth)//+333;
    if(Wwidth>Wwindow){
        Wwidth += 333     
    }else{
        Wwidth = Wwindow;
    }

    if(Wheight<Hwindow){
        Wheight = Hwindow;
    }

    try{
        if(!$bodySVG){
            $originWidth=Wwidth;
            $originHeight=Wheight;
            $bodySVG = SVG('bodySVG').size(Wwidth,Wheight).viewbox(0,0,Wwidth,Wheight);
            $rectBody = $bodySVG.rect(Wwidth,Wheight);
            fillBG();
        }
    }catch(e){
    
    }


 })(jQuery);
}

colorCircles = ['#007bff','#ff0000','#00ff5a','#009329']
countColors = colorCircles.length-1
isRefilling = false 
function reFillBG(){
        if(isRefilling){
            return false
        }else{
            isRefilling = true
            setTimeout(function(){
                $("#divSVG").animate({opacity: 0}, "fast", function () {
                    
                    try{                        
                        if($bodySVG){
                            countColors--;
                            if(countColors<0){
                                countColors = colorCircles.length-1
                            }
                            $pattern = $bodySVG.pattern(40, 40, function(add) {
                                add.circle(40).fill('#fff');
                                add.circle(20).fill(colorCircles[countColors]);    
                                add.circle(10).move(5,5).fill('#fff');
                            });
                            $rectBody.fill($pattern);
                        }
                    }catch(e){
                        console.log(e)
                    }
                    $("#divSVG").animate({opacity: 1}, "slow", function () {
                        isRefilling = false;
                        reFillBG();
                    });
                });
                
            },3000)
        }    
}

function fillBG(){
    jQuery.noConflict();
    (function ($) {
    $stopR0=16517;
    $stopR1=3328;
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

    $linearRect = $bodySVG.gradient('linear', function(stop) {
                                    stop.at(0, $stopStr0);
                                    stop.at(1, $stopStr1);
    });
    $pattern = $bodySVG.pattern(40, 40, function(add) {
                            //add.rect(40,40).fill('#fff');
                            add.circle(40).fill('#fff');
                            // add.rect(20,20).fill('#34ce57')
                                //add.rect(20,20).fill('#007bff');
                            add.circle(20).fill(colorCircles[colorCircles.length-1]);    
                            //   add.rect(20,20).fill('#ff0')
                            //add.rect(10,10).move(5,5).fill('#fff');
                            add.circle(10).move(5,5).fill('#fff');
    });
    $rectBody.fill($pattern);
    
    //$("#divSVG").animate({opacity: 0}, "fast", function () {

            //$rectBody.fill($pattern);
            //$("#divSVG").css("-webkit-filter", 'blur(8px)').css("-moz-filter", "blur(8px)").css("-o-filter", "blur(8px)").css("-ms-filter", "blur(8px)").css("filter", "blur(8px)");
            // $('p').css('color','yellow');
            
            var device = navigator.userAgent;
            var agentID = device.match(/Android\s+([\d\.]+)/);
            var opacidad=1;
            if(agentID&&agentID.length>1){
                agentID = agentID[1];
                if(parseFloat(agentID)<5){
                    opacidad=0.2;
                }
            }
            $("#divSVG").animate({opacity: opacidad}, "slow", function () {
                                    //     print($('body'));
            });
    //});
})(jQuery);
}

function resizeB(){
    jQuery.noConflict();
    (function ($) {

        const width = $('#steps-area').width()
        const height = $('#steps-area').height()

        $bodySVG.size("100%","100%").viewbox(0,0,width,height);
        $rectBody.size("100%","100%");

    })(jQuery);
}

function getFullyDim(){
    jQuery.noConflict();
    (function ($) {
        /*$originWidth=0.0
        var lastW = 0.0;
        $('.math').each(function(){
            lastW = this.style.width
            lastW = parseFloat(lastW.replace('em',''))
            if(lastW>$originWidth){
                $originWidth=lastW
            }
        });
        $originWidth=parseInt($originWidth*16)+15;
        $originHeight = $('body').height()+15;
        var windowW = $("body").width()//-333;//$("body").prop("scrollWidth");
        if(windowW>$originWidth){
            $originWidth=windowW;
        }*/
        $originWidth=$("#steps-area").prop("scrollWidth");
        var HWindow = $("#steps-area").height();
        var HBody = $("#steps-area").prop("scrollHeight");
        if(HWindow>HBody){
            $originHeight = $("#steps-area").prop("scrollHeight");
        }else{
            $originHeight = $("#steps-area").prop("scrollHeight");
        }
        
       // $("#steps-area").width($originWidth);
        resizeW();
    })(jQuery);
}

function resizeW(){
    jQuery.noConflict();
    (function ($) {
        //var spans = document.getElementsByTagName('span');
        var spans = $('span[class="MathJax"]')
        let maxWidth = 0
        
        if(spans){
            let i = 0;
            
            while(i<spans.length){
                
                if(spans[i].offsetWidth>maxWidth){
                    maxWidth=spans[i].offsetWidth
                }
                
                i++
            }
        }
        const width = $('#steps-area').width()
        const height = $('#steps-area').height()
        
        if(width>maxWidth){
            maxWidth=width+10
        }else{
            maxWidth+=30
        }
        $(".divSteps").width(maxWidth)

        try{
            if(!$bodySVG){
                $bodySVG = SVG('bodySVG').size(maxWidth,'100%').viewbox(0,0,maxWidth,height);
                $rectBody = $bodySVG.rect(maxWidth,'100%');
                fillBG();
            }else{
                $bodySVG.size(maxWidth,'100%').viewbox(0,0,maxWidth,height);
                $rectBody.size(maxWidth,'100%');
            }
        }catch(e){
            
        }

     })(jQuery);
}
