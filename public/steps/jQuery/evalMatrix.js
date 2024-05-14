function evalMatrix(e){
jQuery.noConflict();
 (function ($) {
 try{    
  $sign = "";
  $a = "", labelPrev=$(e).prev();
  $b = "", labelNext=$(e).next();
   if($(labelPrev).attr("class") === "mn" && $(labelNext).attr("class") === "mn") {
        $sign = $(e).html();
        $a = $(labelPrev).html();
        $b = $(labelNext).html();
        if($sign==='−'&&$(e).prev().prev().html()==='−'){
            $sign="+"
        }else if($sign==='+'&&$(e).prev().prev().html()==='−'){
            $sign='−'
        }
        $(e).css("cursor","pointer");
        evaluateProcess(e);
   }else{
        labelPrev=$(e).prev().prev().children();
        labelNext=$(e).prev().children();
        if($(labelPrev).attr("class") === "mn" && $(labelNext).attr("class") === "mn") {
            $sign = "/";
            $a = $(labelPrev).html();
            $b = $(labelNext).html();
            
            $(e).css("cursor","pointer");
            evaluateProcess(e);
        }else if($(e).attr("class")==="mo") //sign +-*
        {
            if($(e).children().html()==="("){
                return false;
            }
            labelPrev=$(e).prev().children().children().children().next().next();
            labelNext=$(e).next().children().children().children();
            if($(labelPrev).attr("class")==="mn"){
                $sign = $(e).html();
                $a=$(labelPrev).html();
                $b=$(e).next().html();
                $(e).css("cursor","pointer");
                if ($(e).prev().children().children().children().next().html() === '−' && $sign === '+') {
                    $sign = '−'
                }else if ($(e).prev().children().children().children().next().html() === '−' && $sign === '−') {
                    $sign = '+'
                } 
                //herechange
                evaluateProcess(e);
            }else if($(labelNext).attr("class")==="mn")
            {
                $sign = $(e).html();
                labelPrev=$(e).prev();
                if($(labelPrev).attr("class")==="mn"){
                    $a=$(labelPrev).html();
                    $b=$(labelNext).html();
                    $(e).css("cursor","pointer");
                    evaluateProcess(e);
                }else{

                    labelPrev=$(e).parent().parent().parent().prev();
                    if($(labelPrev).attr("class")==="mn"){
                        $a=$(labelPrev).html();
                        $b=$(labelNext).html();
                        $(e).css("cursor","pointer");
                        evaluateProcess(e);
                    }
                }


            }else
            {
                labelPrev=$(e).prev().children().children().children().children().children().next().children();
                labelNext=$(e).next().children().children().children().children().children().children();
                if($(labelPrev).attr("class")==="mn"){

                    $sign = $(e).html();
                    $a=$(labelPrev).html();
                    $b=$(e).next().html();
                    $(e).css("cursor","pointer");
                    evaluateProcess(e);

                }else if($(labelNext).attr("class")==="mn"){

                    $sign = $(e).html();
                    $a=$(e).prev().html();
                    $b=$(labelNext).html();
                    $(e).css("cursor","pointer");
                    evaluateProcess(e);

            }else{
                labelPrev=$(e).parent().parent().parent().prev().attr("class")==="mn"?$(e).parent().parent().parent().prev():$(e).prev().children().children().children().last();
                if($(labelPrev).attr("class")==="mn"){
                    $sign=$(e).html();
                    $a=$(labelPrev).html();
                    $b=$(e).next().html();
                    $(e).css("cursor","pointer");
                    evaluateProcess(e);
                }
            }
            }
        }
        else if($(e).attr("class")==="mn"){

            labelPrev=$(e).prev().prev().children().children().children().next().next();
            labelNext=$(e).next().next().children().children().children();
            if($(e).next().attr("class")==="mo"&&$(e).next().html()!=='='&&$(e).next().html()!==')'&&$(e).next().html()!==']'){
                if($(e).next().children().html()==="]"){
                      $sign = $(e).prev().html();
                      if($(e).prev().prev().attr('class')==='mfrac'){
                        $a = $(e).prev().prev().children().children().next().children().html()
                      }else{
                        $a = $(e).prev().prev().html();
                      }
                      $b = $(e).html();
                      $(e).css("cursor","pointer");
                      e = $(e).prev();
                      evaluateProcess(e);
                }else if($(labelNext).attr("class")==="mn")
                {

                    $sign = $(e).next().html();
                    $a=$(e).html();
                    $b=$(labelNext).html();
                    $(e).css("cursor","pointer");
                    e=$(e).next();
                    evaluateProcess(e);

                }else{
                    labelNext=$(e).next().next().children().children()
                    .children().children().children().children();
                    
                    if($(labelNext).attr("class")==="mn"){

                        $sign = $(e).next().html();
                        $a=$(e).html();
                        $b=$(labelNext).html();
                        $(e).css("cursor","pointer");
                        e=$(e).next();
                        evaluateProcess(e);

                    }else{
                        $sign = $(e).next().html();
                        labelNext=$(e).next().next();
                        if($(labelNext).attr("class")==="mn"){
                            $a=$(e).html();
                            $b=$(labelNext).html();
                            $(e).css("cursor","pointer");
                            if ($(e).prev().html()==='−'&&$sign==='−'){
                                $sign="+"
                            } else if ($(e).prev().html() === '−' && $sign === "+") {
                                $sign = '−'
                            }
                            e=$(e).next();
                            evaluateProcess(e);
                        }
                    }
                }
            }else if($(labelPrev).attr("class")==="mn")
            {
                $sign = $(e).prev().html();
                $a=$(labelPrev).html();
                $b=$(e).html();
                $(e).css("cursor","pointer");
                if ($(e).prev().prev().children().children().children().next().html() === '−' && $sign === '−') {
                    $sign = "+"
                } else if ($(e).prev().prev().children().children().children().next().html() === '−' && $sign === '+') {
                    $sign = "−"
                }
                e=$(e).prev();
                evaluateProcess(e);
            }else if($(e).prev().attr("class")==="mo")
            {
                labelPrev=$(e).prev().prev().children().children()
                .children().children().children().next().children();
                
                if($(labelPrev).attr("class")==="mn"){
                    $sign = $(e).prev().html();
                    $a=$(labelPrev).html();
                    $b=$(e).html();
                    $(e).css("cursor","pointer");
                    e=$(e).prev();
                    evaluateProcess(e);
                }else{
                    $sign = $(e).prev().html();
                    labelPrev = $(e).prev().prev().attr("class") === "mn" ? $(e).prev().prev() : $(e).prev().prev().children().children().children().last();
                    if($(labelPrev).attr("class")==="mn"){
                        $a=$(labelPrev).html();
                        $b=$(e).html();
                        $(e).css("cursor","pointer");
                        e=$(e).prev();
                        if ($(labelPrev).prev().html()==='−'&&$sign==='−'){
                            $sign="+"
                        } else if ($(labelPrev).prev().html() === '−' && $sign === "+") {
                            $sign = '−'
                        }
                        evaluateProcess(e);
                    }//else{
                      // labelPrev=$(labelPrev).children().children().children().last().attr("class") 
                    //}
                }
            }else
            { //divide
                labelPrev=$(e).parent().prev().children();
                if($(labelPrev).attr("class")==="mn"){
                    $sign="/";
                    $a=$(labelPrev).html();
                    $b=$(e).html();
                    $(e).css("cursor","pointer");
                    e=$(e).parent().next();
                    evaluateProcess(e);
                }else{
                    labelNext=$(e).parent().next().children();

                    if($(labelNext).attr("class")==="mn"){
                        $sign="/";
                        $a=$(e).html();
                        $b=$(labelNext).html();
                        $(e).css("cursor","pointer");
                        e=$(e).parent().next().next();
                        evaluateProcess(e);
                    }else{
                        //(a)/(b)
                        labelPrev = $(e).parent().parent().prev().children().children();
                        if ($(labelPrev).attr("class") === "mn") {
                            $sign = "/";
                            $a = $(labelPrev).html();
                            $b = $(e).html();
                            $(e).css("cursor", "pointer");
                            e = $(e).parent().parent().next();
                            evaluateProcess(e);
                        } else {
                            
                            labelNext = $(e).parent().parent().next().children().children();
                            if ($(labelNext).attr("class") === "mn") {
                                $sign = "/";
                                $a = $(e).html();
                                $b = $(labelNext).html();
                                $(e).css("cursor", "pointer");
                                e = $(e).parent().parent().next().next();
                                evaluateProcess(e);
                            } else {

                                labelNext=$(e).next().children().children().children()
                                .next().children().children().children();
                                $a=$(e).html();
                                if($(labelNext).attr("class")==="mn"){
                                    $(e).css("cursor","pointer");
                                    e=$(e).next().children().children().children();
                                    $sign=$(e).html();
                                    $b=$(labelNext).html();
                                    evaluateProcess(e);
                                }else{
                                    $(e).css("cursor","pointer");
                                    e=$(e).next().children().children().children();
                                    $sign=$(e).html();
                                    if($(e).next().attr("class")==="mn"){
                                        $b=$(e).next().html();
                                        evaluateProcess(e);
                                    }
                                }

                        }
                    }
                }

                }

            }

        } //number

  }
}catch(e){
    console.log(e)
}
  })(jQuery);
}

function evaluateProcess(e){
jQuery.noConflict();
(function ($) {
try{
    var arrA = null;
    var arrB = null;
    var carryArr = [];
    var R = [];
    var auxArrA = [];
    var auxArrB = [];
    var countD = 0;
    var braketL="";
    var braketR="";
    var strLtx="";
    var offsetTop = 0;
    var offsetLeft = 0;

    if($sign==="+"||$sign==="−"){
        $overModal[$overModal.length-1]=true;
        offsetTop = $(e).offset().top+($(e).width()*1.5);
        offsetLeft = $(e).offset().left+$(e).width();
        searchElements(parseInt(offsetTop), parseInt(offsetLeft));
        $divCard[$divCard.length-1].css("top",offsetTop+"px");
        $divCard[$divCard.length-1].css("left",offsetLeft+"px");
       // $arrowUp.css("top",(offsetTop-13)+"px");
       // $arrowUp.css("left",(offsetLeft-2)+"px");
        var signLabel = "color(green)(-)";
        var colorMin = "green"
        if($sign==="−"&&parseFloat($a)<parseFloat($b)){
            signLabel = "color(red)(-)";
            colorMin = "red"
            var Aaux=$a;
            $a=$b;
            $b=Aaux;
        }

        arrA = $a.split("").reverse();
        arrB = $b.split("").reverse();

        if($a.includes(".")||$b.includes(".")){
            arrA = $a.split(".");
            arrB = $b.split(".");

            if(arrA.length>1){
                auxArrA=arrA[1].split("");
            }
            if(arrB.length>1){
                auxArrB=arrB[1].split("");
            }

            while(auxArrA.length<auxArrB.length){
                auxArrA[auxArrA.length]="color(red)(0)";
            }
            while(auxArrB.length<auxArrA.length){
                auxArrB[auxArrB.length]="color(red)(0)";
            }
            countD=auxArrA.length;
            arrA = arrA[0].split("").reverse();
            arrB = arrB[0].split("").reverse();
            auxArrA=auxArrA.reverse();
            auxArrB=auxArrB.reverse();

        }

        while(arrA.length<arrB.length){
            arrA[arrA.length]="color(red)(0)";
        }

        while(arrB.length<arrA.length){
            arrB[arrB.length]="color(red)(0)";
        }
            arrA=auxArrA.concat(arrA);
            arrB=auxArrB.concat(arrB);


            if($sign==="+"){
                var sum = 0, carry=0;
                carryArr[carryArr.length]="quad";
                while(R.length<arrA.length){
                    sum=carry;
                    if(arrA[R.length]==="color(red)(0)"){
                        if(arrB[R.length]!=="color(red)(0)"){
                            sum+=parseInt(arrB[R.length]);
                        }
                    }else if(arrB[R.length]==="color(red)(0)"){
                        if(arrA[R.length]!=="color(red)(0)"){
                            sum+=parseInt(arrA[R.length]);
                        }
                    }else{
                        sum+=parseInt(arrA[R.length])+parseInt(arrB[R.length]);
                    }
                    if(sum>9){
                        sum-=10;
                        R[R.length]="color(green)("+sum+")";
                        carry=1;

                        if(R.length===arrA.length){
                            R[R.length]="color(green)(1)";
                            carryArr[carryArr.length]="quad";
                            arrA[arrA.length]="quad";
                            arrB[arrB.length]="color(red)(1)";
                        }else{
                            carryArr[carryArr.length]="color(red)(1)";
                        }

                    }else{
                        if(carryArr.length<arrA.length){
                            carryArr[carryArr.length]="quad";
                        }
                        carry=0;
                        R[R.length]="color(green)("+sum+")";
                    }
                }
                if(countD>0){
                    carryArr.splice(countD, 0, "quad");
                    arrA.splice(countD, 0, ".");
                    arrB.splice(countD, 0, ".");
                    R.splice(countD, 0, ".");
                }
                carryArr=carryArr.reverse();
                arrA=arrA.reverse();
                arrB=arrB.reverse();
                R=R.reverse();
                if(R.length>1){
                    braketL="(";
                    braketR=")";
                }

                if(carryArr.includes("color(red)(1)")){
                    strLtx="`(color(green)(+){:("+carryArr;
                    strLtx+="),("+arrA+"),("+arrB;
                    strLtx+="):})/(quadquad{:"+braketL+R+braketR+":})`";
                    $divCardBody[$divCardBody.length-1].html(strLtx);
                }else{
                    strLtx="`(color(green)(+){:("+arrA;
                    strLtx+="),("+arrB+"):})/(quadquad{:";
                    strLtx+=braketL+R+braketR+":})`"
                    $divCardBody[$divCardBody.length-1].html(strLtx);
              }
            }

            if($sign==="−"){

                var res = 0, carry = 0;
                carryArr[carryArr.length]="quad";
                while(R.length<arrA.length){
                    res=carry;
                    if(arrA[R.length]!=="color(red)(0)"){
                        res+=parseInt(arrA[R.length]);
                    }
                    if(arrB[R.length]!=="color(red)(0)"){
                        res-=parseInt(arrB[R.length]);
                    }

                    if(res<0){
                        carry=-1;
                        arrA[R.length]="color(red)(1)"+arrA[R.length];
                        arrB[R.length]="quad"+arrB[R.length];
                        res+=10;
                        R[R.length]="quadcolor("+colorMin+")"+res;
                        carryArr[carryArr.length-1]="quad"+carryArr[carryArr.length-1];
                        carryArr[carryArr.length]="color(red)(1)";


                    }else{
                        carry=0;
                        R[R.length]="color("+colorMin+")"+res;
                        if(carryArr.length<arrA.length){
                            carryArr[carryArr.length]="quad";
                        }
                    }
                }

    if(countD>0){
        carryArr.splice(countD, 0, "quad");
        arrA.splice(countD, 0, ".");
        arrB.splice(countD, 0, ".");
        R.splice(countD, 0, ".");
    }

    carryArr=carryArr.reverse();
    arrA=arrA.reverse();
    arrB=arrB.reverse();
    R=R.reverse();
    if(R.length>1){
        braketL="(";
        braketR=")";
    }
    if(carryArr.includes("color(red)(1)")){
        strLtx="`("+signLabel+"{:("+carryArr+"),("+arrA;
        strLtx+="),("+arrB+"):})/(quadquad{:";
        strLtx+=braketL+R+braketR+":})`";
        $divCardBody[$divCardBody.length-1].html(strLtx);
    }else{
        strLtx="`("+signLabel+"{:("+arrA+"),("+arrB;
        strLtx+="):})/(quadquad{:"+braketL+R+braketR+":})`";
        $divCardBody[$divCardBody.length-1].html(strLtx);
    }

 }
 showCard($divCard.length-1);
 setModalArr();
}

    if($sign==="⋅"||$sign==="·"||$sign==="×"){
           // $("body").append($divCard);
            $overModal[$overModal.length-1]=true;
            if($sign==="×"){
                offsetTop = $(e).offset().top+($(e).width()*1.50);
            }else{
                offsetTop = $(e).offset().top+($(e).width()*3.75);
            }
            offsetLeft = $(e).offset().left+$(e).width();
            searchElements(parseInt(offsetTop), parseInt(offsetLeft));
            $divCard[$divCard.length-1].css("top",offsetTop+"px");
            $divCard[$divCard.length-1].css("left",offsetLeft+"px");
            arrA = $a.split("").reverse();
            arrB = $b.split("");
            var stackCarry=[], stackProcess=[], stackAuxA=$a.split("."), stackAuxB=$b.split(".");
            var c = 0, c2 = 0, cQuad=0, carry=0, For=0;
            var countDL=0, countDR=0;

            if(stackAuxA.length>1){
                arrA=stackAuxA[1].split("").reverse();
                arrA=arrA.concat(stackAuxA[0].split("").reverse());
                countDL=stackAuxA[1].length;
            }
            if(stackAuxB.length>1){
                arrB=stackAuxB[0].split("");
                arrB=arrB.concat(stackAuxB[1].split(""));
                countDR=stackAuxB[1].length;
            }

            //processMult
                while(c<arrB.length){
                    c2=0;
                    stackProcess[stackProcess.length]=[];
                    stackCarry[stackCarry.length]=[];
                    stackCarry[stackCarry.length-1][0]="quad"
                    while(c2<arrA.length){
                    For=(parseInt(arrB[c])*parseInt(arrA[c2]))+carry;
                    if(For>9&&c2<(arrA.length-1)){
                        carry=parseInt(For.toString()[0]);
                        stackProcess[c][stackProcess[c].length]=For.toString()[1];
                    stackCarry[stackCarry.length-1][stackCarry[stackCarry.length-1].length]="color(red)("+carry+")";

                    }else{
                        carry=0;
                        if(stackCarry[stackCarry.length-1].length<arrA.length){
                        stackCarry[stackCarry.length-1][stackCarry[stackCarry.length-1].length]="color(red)(0)";
                        }
                        if(For>9){
                            stackProcess[c][stackProcess[c].length]=For.toString()[1];
                            stackProcess[c][stackProcess[c].length]=For.toString()[0];

                        }else{
                            stackProcess[c][stackProcess[c].length]=""+For;
                        }
                    }
                    c2+=1;
                    }
                    c+=1;
                }

            //zeros complement arrA
            while(arrA.length<arrB.length){
                arrA[arrA.length]="quad"; c=0;
                while(stackCarry.length>c){
                    while(stackCarry[c].length<arrB.length){
                        stackCarry[c][stackCarry[c].length]="quad";
                    }
                    c+=1;
                }
            }

            arrA=arrA.reverse();

            if(arrB.length<arrA.length){
                arrB=arrB.reverse();
                while(arrB.length<arrA.length){
                    arrB[arrB.length]="quad";
                }
                arrB=arrB.reverse();
            }

            if(countDL>0){
                c=arrA.length-countDL;
                arrA.splice(c,0,"."), c2=0;
                while(stackCarry.length>c2){
                    c=countDL;
                    stackCarry[c2].splice(c,0,"quad");
                    c2+=1;
                }
            }

            if(countDR>0){
                c=arrB.length-countDR;
                arrB.splice(c,0,".");
            }

            if(countDL===0&&countDR>0){
                arrA.splice(countDL,0,"quad");
                c2=0;
                while(stackCarry.length>c2){
                    c=countDL;
                    stackCarry[c2].splice(stackCarry[c2].length,0,"quad");
                    c2+=1;
                }
            }

            if(countDR===0&&countDL>0){

                arrB.splice(countDR,0,"quad");

            }


            // add quads separate
            c2=1;
            while(c2<stackProcess.length){
                cQuad=stackProcess[c2].length-stackProcess[c2-1].length;
                if(cQuad<0){
                    c=stackProcess[c2].length;
                    while(c<(stackProcess[c2-1].length+1)){
                    stackProcess[c2][stackProcess[c2].length]="quad";
                    c+=1;
                    }

                }else if(cQuad===0){
                    stackProcess[c2][stackProcess[c2].length]="quad";
                }

                stackProcess[c2]=stackProcess[c2].reverse();
                c2+=1;
            }

            //first and last reverse()
            stackProcess[0]=stackProcess[0].reverse();

            //stackCarry reverse()
            c=0;
            while(c<stackCarry.length){
                stackCarry[c]=stackCarry[c].reverse();
                c+=1;
            }

            //reQuads
            cQuad=stackProcess[stackProcess.length-1].length; c=0;
            while(c<stackProcess.length-1){
                c2=stackProcess[c].length;
                while(c2<cQuad){
                    stackProcess[c][stackProcess[c].length]="quad";
                    c2+=1;
                }
                c+=1;
            }

            //plusProcess
            c=stackProcess[stackProcess.length-1].length-1;
            carry=0;
            carryArr[carryArr.length]="quad";
            while(c>-1){
                c2=stackProcess.length-1;
                For=carry;
                while(c2>-1){
                    if(stackProcess[c2][c]!=="quad"){
                        For+=parseInt(stackProcess[c2][c]);
                    }
                    c2-=1;
                }
                if(For>9) {
                    carry=parseInt(For.toString()[0]);
                    For=For.toString()[1];
                    R[R.length]="color(green)("+For+")";
                    if(R.length===stackProcess[0].length){
                        R[R.length]="color(green)("+carry+")";
                        carryArr[carryArr.length]="quad";
                        stackProcess[stackProcess.length-1].splice(0,0,"color(red)("+carry+")");
                        cQuad=0;
                        while(cQuad<(stackProcess.length-1)){
                            stackProcess[cQuad].splice(0,0,"quad");
                            cQuad+=1;
                        }
                    }else{
                        carryArr[carryArr.length]="color(red)("+carry+")";
                    }

                }else{
                    carry=0;
                    R[R.length]="color(green)("+For+")";
                    if(carryArr.length<stackProcess[0].length){
                        carryArr[carryArr.length]="quad";
                    }
                }
                c-=1;
            }
            R=R.reverse();
           carryArr=carryArr.reverse();

        if($b.length===1&&$a.length===1&&R.length>1){
            arrA.splice(0,0,"quad");
            arrB.splice(0,0,"quad");
            c=0;
            while(stackCarry.length>c){
                stackCarry[c].splice(0,0,"quad");
                c+=1;
            }
        }
            //addQuads to arrA, arrB and stackCarry...
            cQuad=stackProcess[0].length; c=0;
            while(arrA.length<cQuad){
                arrA[arrA.length]="quad";
            }
            while(arrB.length<cQuad){
                arrB[arrB.length]="quad";
            }


            while(stackCarry.length>c){
                while(stackCarry[c].length<cQuad){
                    stackCarry[c][stackCarry[c].length]="quad";
                }
                c+=1;
            }
            countD=countDL+countDR;
            if(countD>0){
                carryArr.splice(carryArr.length-countD,0,"quad");
                c=0;
                while(stackProcess.length>c){
                    stackProcess[c].splice(stackProcess[c].length-countD,0,".");
                    c+=1;
                }
                R.splice(R.length-countD,0,".");
            }

//strLtx prepare
strLtx="`(quad{:";

//stackCarry to str
c=stackCarry.length-1;
$plusCarry=false;
if(stackCarry.includes("1")||stackCarry.includes("2")||stackCarry.includes("3")||stackCarry.includes("4")||stackCarry.includes("5")||stackCarry.includes("6")||stackCarry.includes("7")
   ||stackCarry.includes("8")||stackCarry.includes("9")){
  $plusCarry=true;
  var strLtx="`(quad{:";
  while(c>-1){
    strLtx+="("+stackCarry[c]+"),";
    c-=1;
  }
}

//plus numbers to str;
  strLtx+="("+arrA+"),("+arrB+"):})/";

  if($b.length===1){
      if(R.length===1){
        strLtx+="(quad{:"+R+":})`";
      }else{
        strLtx+="(quad{:("+R+"):})`";
      }
  }else
  {
    strLtx+="((color(green)(+){:";
//carryArr to str
    if(carryArr.includes("color")){
        strLtx+="("+carryArr+")";
        c=0;
    }else{
        c=1;
        strLtx+="("+stackProcess[0]+")";
    }
//stackProcess to str
    while(c<stackProcess.length){
        strLtx+=",("+stackProcess[c]+")";
        c+=1;
    }
    strLtx+=":})/(quad{:("+R+"):}))`";
  }

  $divCardBody[$divCardBody.length-1].html(strLtx);
  showCardFor($divCard.length-1);
  setModalArr();
}
    if($sign==="/"){
        $overModal[$overModal.length-1]=true;
        offsetTop = $(e).offset().top+($(e).height()*1.50);
        offsetLeft = $(e).offset().left;
        searchElements(parseInt(offsetTop), parseInt(offsetLeft));
        $divCard[$divCard.length-1].css("top",offsetTop+"px");
        $divCard[$divCard.length-1].css("left",offsetLeft+"px");
      
        if($a==='0'||$b==='0'){
            if($a==='0'){
                //strLtx="`N o t quad a quad N u m b e r`"
                strLtx="`0`"
            }
            if($b==='0'){
                strLtx="`I n f i n i t y`"
            }
        }else{
            var stackAux=[], stackProcess=[], stackZ=[];
            var c=0, residuos=-1, digits=8,
            mult=0, sum=0, bandDot=false, aDiv=0, bDiv=0;
            if($a.includes(".")){
                stackAux=$a.split(".");
                countD = -stackAux[1].length
                if(stackAux[0]===""){
                    stackAux[0]="0";
                }
                $a=stackAux[0]+""+stackAux[1];
                bandDot=true;
            }

            if($b.includes(".")){
                stackAux=$b.split(".");
                countD+=stackAux[1].length
                if(stackAux[0]===""){
                    stackAux[0]="0";
                }
                $b=stackAux[0]+""+stackAux[1];
                bandDot=true;
            }

            arrA = $a.split("");
            bDiv=parseInt($b);
            stackAux=[];
            if(arrA.length>0){
                if(bDiv>aDiv){
                    aDiv=parseInt(aDiv+""+arrA.shift());
                    countD+=1;
                    stackAux[stackAux.length]="";
                }
                while(bDiv>aDiv && arrA.length>0){
                    aDiv=parseInt(aDiv+""+arrA.shift());
                    stackAux[stackAux.length]="";
                }
                if(arrA.length===0){
                    if(bDiv>aDiv){
                        bandDot=true;
                        while(bDiv>aDiv){
                            aDiv=parseInt(aDiv+"0");
                            stackZ[stackZ.length]="color(red)(0)";
                            stackAux[stackAux.length]="";
                            countD-=1;
                        }
                    }
                }
            }

            //divProcess
            while(residuos !== 0 && digits > 0){
                while(aDiv>=bDiv&&aDiv!==0){
                    aDiv-=bDiv;
                    sum+=bDiv;
                    mult+=1;
                }
                R[R.length]="color(green)("+mult+")";
                stackProcess[c]=[];
                sum=(sum+"").split("");
                while(sum.length>0){
                    stackProcess[c][stackProcess[c].length]="color(red)("+sum.shift()+")";
                }
                if(c===0){
                    while(stackProcess[c].length<stackAux.length){
                        stackProcess[c].splice(0,0,"quad");
                    }
                }else{
                    while(stackProcess[c].length<stackProcess[c-1].length){
                        stackProcess[c].splice(0,0,"quad");
                    }
                }
                c+=1;
                stackProcess[c]=[];
                residuos=(aDiv+"").split("");
                while(residuos.length>0){
                    stackProcess[c][stackProcess[c].length]=residuos.shift();
                }

                while(stackProcess[c].length<(stackProcess[c-1].length) ){
                    stackProcess[c].splice(0,0,"quad");
                }

                if(arrA.length>0){
                    if(bDiv>aDiv){
                        aDiv=parseInt(aDiv+""+arrA[0]);
                        stackProcess[c][stackProcess[c].length]=arrA.shift();
                        countD+=1;
                    }
                    while(bDiv>aDiv && arrA.length>0){
                        aDiv=parseInt(aDiv+""+arrA[0]);
                        stackProcess[c][stackProcess[c].length]="color(red)("+arrA.shift()+")";
                        R[R.length]="color(red)(0)";
                        countD+=1;
                    }
                    if(bDiv>aDiv && arrA.length===0){
                        if(aDiv===0){
                            //R[R.length]="color(green)(0)";
                            aDiv=-1;
                        }else{
                            bandDot=true;
                            while(bDiv>aDiv){
                                aDiv=parseInt(aDiv+"0");
                                R[R.length]="color(red)(0)";
                                stackProcess[c][stackProcess[c].length]="color(red)(0)";
                            }
                        }
                    }
                }

                mult=0;
                digits-=1;
                residuos=aDiv;
                aDiv=aDiv===-1?0:aDiv;
                sum=0;
                if(arrA.length===0 && digits>0){
                    if(aDiv !== 0 && bDiv>aDiv){
                        aDiv=parseInt(aDiv+"0");
                        stackProcess[c][stackProcess[c].length]="color(blue)(0)";
                        bandDot=true;
                        while(bDiv>aDiv){
                            aDiv=parseInt(aDiv+"0");
                            stackProcess[c][stackProcess[c].length]="color(red)(0)";
                            R[R.length]="color(red)(0)";
                        }
                    }
                }
                c+=1;

            }

            //stacks fix length
            arrA = $a.split("").concat(stackZ);
            /*while(parseInt($a)<parseInt($b)){
                arrA[arrA.length]="color(red)(0)";
                $a+="0";
            }*/
            arrB=[];
            arrB[0]=[];
            arrB[1]=$b.split("");

            while(arrB[0].length<arrB[1].length){
            arrB[0][arrB[0].length]="quad";
            }
            if(bandDot){
                if(countD>0){
                    if(R.length>countD){
                        R.splice(countD,0,"color(red)(.)");
                    }else{
                        countD-=1;
                        while(countD>0){
                            R[R.length]="color(red)(0)";
                            countD-=1;
                        }
                    }
                }else{
                    countD-=1;
                    while(countD<0){
                        R.splice(0,0,"color(red)(0)");
                        countD+=1;
                    }
                    R.splice(1,0,"color(red)(.)");
                }
            }

            c=stackProcess.length-1;
            sum=stackProcess[c].length;
            c-=1;
            while(c>-1){
                while(stackProcess[c].length<sum){
                    stackProcess[c][stackProcess[c].length]="quad";
                }
                c-=1;
            }
            while(arrA.length<sum){
                arrA[arrA.length]="quad";
            }
            while(R.length<arrA.length){
                R[R.length]="quad";
            }

            //stacks to str
            strLtx="`{:("+arrB[0]+"),("+arrB[1]+"):}"
            if(R.length===1){
                strLtx+="{:"+R+":}/";
            }else{
                strLtx+="{:("+R+"):}/";
            }
            strLtx+="({:("+arrA+")";
            c=0;
            while(c<stackProcess.length){
                strLtx+=",("+stackProcess[c]+")";
                c+=1;
            }
            strLtx+=":})`"
        }

        $divCardBody[$divCardBody.length-1].html(strLtx);
        showCardDiv($divCard.length-1);
        setModalArr();
    }
}catch(e){
    resetModals()
    console.log(e)
}
 })(jQuery);
}

function showCard(c){
jQuery.noConflict();
(function ($) {
    MathJax.Hub.Queue(["Typeset",MathJax.Hub, "cardBody",function(){
      //  $("span").off("mouseover");
        $bandModal=true;
       // leaveMouse();
                       /*$arrowUp.animate({opacity: 1}, "slow", function () {
                        $(this).css("opacity","1");
                        });*/
        showModalCard(c);
      //  overMouse(c);

    }]);
 })(jQuery);
}
