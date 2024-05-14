import { Context } from '../process/context';
import { SumExpFactor } from '../clean/cleanFactor';
import { StepLatex } from '../clean/stepLatex';
import strToLang from '../lang';
import { MCDStr } from '../mathString/mathString';
import { Pstrltx } from './evaluate';
import { FactorByParts } from './factorByParts';
export const factorPow = (STR: any, S: any, OP: any, context:Context) => {
     STR.pop();
     context.auxStr = !S[S.length - 1] ? "+" : S.pop();
     context.aux1Str = !S[S.length - 1] ? "+" : S.pop();
     context.auxChar = context.auxStr.match(/[A-Z]/gi);
     context.aux1Char = context.aux1Str.match(/[A-Z]/gi);

     if (OP.length) {
         let c = 0;
         STR.push("*");
         const arrBy = OP.pop();
         while (c < context.auxStr) {
             OP.push(arrBy);
             c++;
         }
         
     }else
     if (context.aux1Char) {
        let auxNumb = parseInt(context.auxStr);
        let match1Str = context.aux1Str.match(/[-+*/]/gi);
        let c = 0;
        let c2 = 0;
        let poliArr: any = [];
        let poli2: any = [];
        let xs: any = []
        let x = 0;
        let bandF = true;
        let bandG = false;
        let bandN = false;
        let xStr = "";
        let prevFactor = "";
        let charNumber: any = ' ';
        let minusFactor = '';
        let minPow = 1;
        let lastPow = 0;
        let aux1SStr = [context.aux1Str];

        //console.log('sumExpFBF ',STR+"", 'strltx ',context.strltx)
        //factoring Ruffini poly's
        STR = SumExpFactor(STR, context.auxStr, aux1SStr, context.aux1Char, context)
        //console.log('sumExpFAF ',STR, 'strltx ',context.strltx)
        context.aux1Str = aux1SStr[0]
        let mcdAux = context.aux1Str.split(context.aux1Char).join('');
        bandN = mcdAux.includes("-")
        //console.log('context.aux1Str ',context.aux1Str,' mcdAux ',mcdAux,' bandN ',bandN)
        //minus factoring -(f(x)) 
        if (bandN && context.FCT) {
            const minusArr: any = [] //.concat(STR)
            c = 0
            while (c < STR.length) {
                charNumber = STR[c] + ""
                //console.log(' charNC ',charNumber)
                if (charNumber.includes("-")) {
                    charNumber = charNumber.split("-").join("+")
                } else if (charNumber.includes("+")) {
                    //bandN = !charNumber.includes("+")
                    bandN = false
                    break;
                }
                minusArr.push(charNumber)
                c++
            }
            //console.log('bandN: ',bandN)
            if (bandN) {
                context.aux1Str = context.aux1Str.split("-").join('');
                minusFactor = "-"
                STR = [].concat(minusArr)
                context.StepsC += 1;
                context.str1 = strToLang("Paso") + context.StepsC.toString() + ": quad"
                context.str2 = context.strDevelopment
                context.res = context.strDevelopment.split("-").join("+");
                context.res = "-(" + context.res + ")"
                StepLatex(context.str1, context.strDevelopment, context.str2, context.str3, context.res, context.change, true, context)
                context.str1 = "-> "
                context.str2 = "[ " + context.str2 + " ]"
                context.str1 = context.str1 + context.str2 + " = " + context.res
                Pstrltx(context.str1, context)
                context.strltx += "</div>"
                context.strltx += "</div>"
            }
            c = 0
        }

            //maximo factor comun
            if (mcdAux === "" || mcdAux === "-" || !context.FCT) {
                mcdAux = 1;
            } else if (STR.length > 1) {
                c=0
                mcdAux = parseInt(mcdAux);
                if(mcdAux<0){
                    mcdAux*=-1
                }
                
                while(c<STR.length){
                    let scanChar = STR[c].toString()
                    if (scanChar.includes(context.aux1Char) || ((parseInt(scanChar) < 0 || parseInt(scanChar) > 0)&&c<2)) {
                        let strB = scanChar.split(context.aux1Char).join("")
                        if (strB === "" || strB === "-") {
                            strB = "1"
                        }
                        mcdAux = parseInt(MCDStr(mcdAux + "", strB));
                    } else if (scanChar.includes("^")) {
                        scanChar = STR[c+2].toString()
                        if (scanChar.includes(context.aux1Char)) {

                            charNumber = scanChar.split(context.aux1Char).join("")
                            if (charNumber === "" || charNumber === "-") {
                                charNumber = "1"
                            }
                            mcdAux = parseInt(MCDStr(mcdAux + "", charNumber));

                        } else {
                            mcdAux = 1
                        }
                    }
                    c++
                }
                c=0
            }

            charNumber = ' ';
            //factoring x's
            while (c < STR.length && (charNumber !== "" && charNumber !== "^")) {
                charNumber = parseInt(charNumber);
                if (charNumber >= 0 || charNumber < 0) {
                    break;
                }
                charNumber = STR[c].split(context.aux1Char).join('');
                if (STR[c] === ("" + context.aux1Char)) {
                    poliArr.push("1");
                } else if (STR[c].includes("" + context.aux1Char)) {

                    if ((parseInt(charNumber) % mcdAux) > 0) {
                        poliArr.push(charNumber);
                        bandF = false;
                    } else {
                        poliArr.push((parseInt(charNumber) / mcdAux) + "");
                    }
                    charNumber = "";
                } else if (STR[c] !== "^") {
                    if (parseInt(STR[c])){
                        poliArr.push(parseInt(STR[c])/mcdAux);
                    }else{
                        poliArr.push(STR[c]);
                    }
                }
                c++
            }

            const bandPureX = (charNumber === "" || charNumber === "^") && context.FCT
            //no contains constant, pure x's
            if (bandPureX) {

                prevFactor = minusFactor + context.aux1Char
                //get minPow
                if (charNumber === "^") {
                    minPow = parseInt(STR[c]);

                    prevFactor = minusFactor + context.aux1Char + "^" + minPow;
                    c++;
                    charNumber = STR[c].split(context.aux1Char).join('');

                    if (charNumber === "") {
                        poliArr.push("1");
                    } else {
                        if (parseInt(charNumber) % mcdAux > 0) {
                            poliArr.push(charNumber);
                            bandF = false;
                        } else {
                            poliArr.push((parseInt(charNumber) / mcdAux) + "");
                        }
                        //bandF = parseInt()
                    }
                    c++;
                    charNumber = "";
                }
            }else{
                minPow=0
            }
                context.auxStr -= minPow;
                context.res = ""
                //console.log(' poliarrs1 '+poliArr,'STR ',STR+"")
                
                while (c < STR.length) {
                    if (charNumber === "^") {
                        const difPow = parseInt(STR[c]) - minPow
                        if (difPow > 1) {
                            poliArr.push(difPow);
                        } else {
                            poliArr.pop();
                        }
                    } else {
                        if ((STR[c] + "").includes(context.aux1Char)) {
                            charNumber = STR[c].split(context.aux1Char).join('');
                            if (charNumber === "") {
                                charNumber = "1"
                            }
                            //console.log('charNumber ',charNumber)
                            if ((parseInt(charNumber) % mcdAux > 0)) {
                                //let iPoli = 0;
                                for (let i = 0; i < poliArr.length; i++) {
                                    const nPoli = parseInt(poliArr[i])
                                    if (nPoli > 0 || nPoli < 1) {
                                        poliArr[i] = (nPoli * mcdAux) + ""
                                    }
                                    //iPoli++;
                                }
                                mcdAux = 1
                                poliArr.push(charNumber);
                                bandF = false;
                            } else {
                                if ((parseInt(charNumber) / mcdAux) > 1) {
                                    if ((parseInt(STR[c - 1]) - minPow) > 0) {
                                        poliArr.push((parseInt(charNumber) / mcdAux) + context.aux1Char + "");
                                    } else {
                                        poliArr.push((parseInt(charNumber) / mcdAux) + "" + (minPow===0?context.aux1Char:""));
                                    }
                                } else {                                    
                                    if (context.auxStr === 0) {
                                        poliArr.push("1");
                                    } else if(charNumber==="0") {
                                        poliArr.push(charNumber+context.aux1Char);
                                    }else{
                                        poliArr.push(context.aux1Char + "");
                                    }
                                }
                            }
                        } else {
                            poliArr.push(STR[c]);
                        }

                        //                                       
                    }

                    charNumber = STR[c] //.split(aux1Char).join('');
                    c++
                }

                //console.log('resFactorCX0: ',context.res,' poliarrs0 '+poliArr)
                c = 0;
                charNumber = "";
                while (c < poliArr.length) {
                    if (charNumber === "-") {
                        if (poliArr[c] === "^") {
                            context.res = "-" + poliArr[c + 2] + poliArr[c] + poliArr[c + 1] + context.res;
                        } else {
                            context.res = "-" + poliArr[c] + context.res;
                        }
                    } else if (charNumber === "+") {
                        if (poliArr[c] === "^") {
                            context.res = "+" + poliArr[c + 2] + poliArr[c] + poliArr[c + 1] + context.res;
                        } else {
                            context.res = "+" + poliArr[c] + context.res;
                        }
                    }
                    charNumber = poliArr[c];
                    c++;
                }
                //console.log('resFactorCX0.5: ',context.res,' context.aux1Str ',context.aux1Str)
                //console.log('context.auxStr ',context.auxStr,' bandF ',bandF,' mcdAux ',mcdAux)
                if (context.auxStr > 1) {
                    if (bandF) {
                        if (mcdAux === 1) {
                            if (bandPureX) {
                                prevFactor = minusFactor + context.aux1Char;
                            }
                            context.aux1Str = context.aux1Str.split(context.aux1Char).join("");
                        } else {
                            prevFactor = minusFactor + mcdAux;
                            if (bandPureX) {
                                prevFactor += "" + context.aux1Char;
                            }
                            //console.log('context.aux1Str?? ',context.aux1Str,' context.aux1Char ',context.aux1Char)
                            context.aux1Str = context.aux1Str.split(context.aux1Char).join("");
                            context.aux1Str = (parseInt(context.aux1Str) / parseInt(mcdAux)) + "";
                            //console.log('context.aux1Str?2? ',context.aux1Str)
                        }

                        if (minPow > 1) {
                            prevFactor += "^" + minPow;
                        }
                        if (context.aux1Str === "1" || context.aux1Str === "-1") {
                            context.aux1Str=context.aux1Str.split('1').join('')
                        }
                            context.res = prevFactor + "(" + context.aux1Str + context.aux1Char + "^" + context.auxStr + context.res + ")";
                    } else {
                        context.res = prevFactor + "(" + context.aux1Str + "^" + context.auxStr + context.res + ")";
                    }

                } else {

                    if (bandF) {
                        prevFactor = minusFactor + (mcdAux === 1 ? "" : mcdAux) + "" + context.aux1Char;
                        if (minPow > 1) {
                            prevFactor += "^" + minPow;
                        }
                    }
                    //console.log('resFactorCX0: ',context.res)
                    //console.log('context.auxStr ',context.auxStr)
                    if (context.auxStr === 0) {
                        //let resAux1 = parseInt(aux1Str.split(aux1Char).join(""))/mcdAux
                        let resAux1 = context.aux1Str.split(context.aux1Char).join("")
                        if (resAux1 === "") {
                            resAux1 = "1"
                        }
                        resAux1 = parseInt(resAux1) / mcdAux
                        context.res = prevFactor + "(" + resAux1 + context.res + ")";
                    } else {
                        charNumber = context.aux1Str.split(context.aux1Char).join("")
                        if ((parseInt(charNumber) / mcdAux) === 1) {
                            context.res = prevFactor + "(" + context.aux1Char + context.res + ")";
                        } else {
                            context.res = prevFactor + "(" + context.aux1Str + context.res + ")";
                        }
                    }
                    
                }
                
                //console.log('resFactorCX: ',context.res)
                context.StepsC += 1;
                context.str1 = strToLang("Paso") + context.StepsC.toString() + ": quad"
                context.str2 = context.strDevelopment

                StepLatex(context.str1, context.strDevelopment, context.str2, context.str3, context.res, context.change, true, context)
                context.str1 = "-> "
                context.str2 = "[ " + context.str2 + " ]"
                context.str1 = context.str1 + context.str2 + " = " + context.res
                Pstrltx(context.str1, context)
                context.strltx += "</div>"
                context.strltx += "</div>"
                
                STR = poliArr.splice(0, poliArr.length);            

            if (prevFactor === "") {
                prevFactor = minusFactor + ""
            }

            poliArr = [];
            c = 2;
            charNumber = ''
            bandF = true;
            bandG = false;
            let divFactor: any = [];
            context.aux1Str = context.aux1Str.split(context.aux1Char).join('');
            lastPow = parseInt(context.auxStr) - 1;
            //console.log('context.aux1Str ',context.aux1Str)
            if (context.aux1Str === "") {
                poliArr.push(1);
                poli2.push(1);
                c2 = 1;
                divFactor.push(1);
            } else if (context.aux1Str === "-") {
                poliArr.push(-1);
                poli2.push(-1);
                c2 = -1;
                divFactor.push(-1);
            } else {
                bandG = true;
                const divFAux = parseInt(context.aux1Str) < 0 ? parseInt(context.aux1Str) * -1 : parseInt(context.aux1Str)
                //console.log('divFAux ',divFAux,' divFAux % 2 ',divFAux % 2,' %3 ',divFAux % 3)
                if ((divFAux % 2) === 0) {
                    const parseAux = divFAux;
                    divFactor.push(1);
                    if (parseAux === 2) {
                        divFactor.push(2);
                    }
                    while (c < parseAux) {                        
                        if ((parseAux % c) === 0) {
                            divFactor.push(c);
                        }
                        c++;
                    }
                } else if ((divFAux % 2) > 0 || (divFAux % 2) < 0) {
                    divFactor.push(1);
                    c=3
                    while (c < divFAux) {                        
                        if ((c % 3) === 0) {
                            divFactor.push(c);
                        }
                        c++;
                    }
                    divFactor.push(divFAux);
                }
                c2 = 1 / divFactor[0];
                poliArr.push(parseInt(context.aux1Str));
                poli2.push(parseInt(context.aux1Str));
            }
            c = STR.length - 1;
            let firstPow = lastPow+1;
            //console.log(' fp0 ')
            //console.log('poliArr ',poliArr)
            //console.log('poli2 ',poli2)
            while (c >= 0) {
                charNumber = (STR[c] + "").split(context.aux1Char).join('');
                if (charNumber === "") {
                    poliArr.push(1);
                    poli2.push(1);
                } else if (charNumber !== "+" && charNumber !== "-" && charNumber !== "^") {   
                    if(c===1){
                        
                        while(poliArr.length<firstPow){
                            poliArr.push(0)
                            poli2.push(0)
                            
                        }
                    }                 
                    poliArr.push(parseInt(charNumber));
                    poli2.push(parseInt(charNumber));
                } else if (charNumber === "^") {
                    const nextPow = parseInt(poliArr.pop());
                    poli2.pop();
                    if ((lastPow + 1) === nextPow) {
                        const a = parseInt(poliArr.pop());
                        const b = parseInt(poliArr.pop());
                        poli2.pop();
                        poli2.pop();
                        const suma = a + b
                        poliArr.push(suma)                        
                        poli2.push(suma)
                        context.StepsC += 1;
                        context.str1 = strToLang("Paso") + context.StepsC.toString() + ": quad"
                        context.str2 = "" + a + context.aux1Char + "^" + nextPow + "+" + b + context.aux1Char + "^" + nextPow
                        context.res = "" + suma + context.aux1Char + "^" + nextPow;
                        StepLatex(context.str1, context.strDevelopment, context.str2, context.str3, context.res, context.change, true, context)
                        context.str1 = "-> "
                        context.str2 = "[ " + context.str2 + " ]"
                        context.str1 = context.str1 + context.str2 + " = " + context.res
                        Pstrltx(context.str1, context)
                        context.strltx += "</div>"
                        context.strltx += "</div>"

                    }
                    if(lastPow > nextPow){
                        const auxPow = poliArr?.pop()!
                        poli2.pop()
                        while (lastPow > nextPow) {
                            poliArr.push(0)
                            poli2.push(0)
                            lastPow--;
                        }
                        poliArr.push(auxPow)
                        poli2.push(auxPow)
                    }/*else if(lastPow === nextPow){
                        while(lastPow>1){
                            poliArr.push(0)
                            poli2.push(0)
                            lastPow--
                        }
                    }*/
                    lastPow = nextPow - 1;
                } else if (charNumber === "-") {
                    let i = poliArr.length - 1
                    if (poliArr[i] > 0) {
                        poliArr[i] = poliArr[i] * -1;
                        if(poli2.length<poliArr.length){
                            i--
                        }
                        poli2[i] = poli2[i] * -1;
                        
                    } else {
                        if (poliArr[i - 1] > 0) {
                            poliArr[i - 1] = poliArr[i - 1] * -1;
                            poli2[i - 1] = poli2[i - 1] * -1;
                        }
                    }
                }
                //lastNumber = charNumber
                //prevNumber=   
                c -= 1;
            }
            //console.log(' fp1 ')
            //console.log('poliArr ',poliArr)
            //console.log('poli2 ',poli2)
            if ((poliArr.length - 1) < parseInt(context.auxStr) && (lastPow + 1) === parseInt(context.auxStr)) {
                const poliArrAux: any = [];
                poliArrAux.push(poliArr[0]);
                while (lastPow > 0) {
                    poliArrAux.push(0);
                    lastPow--;
                }
                if (poliArr.length>1){
                    poliArrAux.push(poliArr[poliArr.length - 1]);
                }else{
                    poliArrAux.push(0);
                }
                poliArr = [].concat(poliArrAux);
                poli2 = [].concat(poliArr);
                
            }
            let countB = 0;
            let countC = 0;
            let divisor = 1;
            //let bandXZero = poli2[poli2.length-2]===0;
            let bandXZero = poli2.join(',').split(',0,').length>2
            //console.log('poli2.join(,) ', poli2.join(','))
            //console.log('divFactor ',divFactor)            
            bandF = divFactor.length > 0 && lastPow < 2;
            while (bandF && context.ruffini) {
                c = 1;
                let poliAux = [poliArr[0]]
                while (c < poli2.length) {
                    let a = poli2[c];
                    if(a===0 && (c<poli2.length-1) && bandXZero){
                        a = poli2[c+1]
                        const passZero = c2 * poliAux[c - 1] + a 
                        poliAux.push(0)
                        poliAux.push(passZero);
                        c++;
                    }else{
                        poliAux.push(c2 * poliAux[c - 1] + a);
                    }
                    c++;
                }
                //console.log('poliAux: ',poliAux,' c2: ',c2, 'divisor ',divisor,' divFactor[countC] ',divFactor[countC])
                if ( /*(poliAux[poliAux.length - 1] > 0 || poliAux[poliAux.length - 1] < 0)*/
                    poliAux[poliAux.length - 1] !== 0 && poliAux.length > 1) {
                    if (c2 < 0) {
                        c2 *= -1;
                        const poliL = poli2[poli2.length - 1] < 0 ? (poli2[poli2.length - 1] * -1) : poli2[poli2.length - 1];
                        if (c2 <= poliL) {

                            if (bandG) {
                                if (countC < divFactor.length - 1) {
                                    countC++;
                                } else {
                                    countC = 0;
                                    const lastConst = (poliArr[poliArr.length - 1] < 0) ? poliArr[poliArr.length - 1] * -1 : poliArr[poliArr.length - 1]
                                    if (lastConst > divisor) {
                                        divisor++;
                                    } else {
                                        countB++;
                                    }
                                }
                                c2 = divisor / divFactor[countC];
                            } else {
                                c2++;
                            }

                        } else {
                            c2 = 1;
                            countB++;
                        }

                    } else {
                        c2 *= -1;
                            bandF = countB < 3;
                        if(!bandF){
                            if (poliAux.length === 2 && poliAux[poliAux.length - 1] !== 0) {
                                poliAux = poliAux.splice(1, 1);
                                poli2 = poliAux
                                bandF = true;
                            }else if (poliAux.length>2){
                                //console.log('bandF fañse ',xStr,' poli2 ',poli2)
                                
                                if(xStr!==""){
                                    //context.res=""
                                    let c = poli2.length-1
                                    context.res=poli2[c]
                                    c--
                                    while(c>=0){
                                        const toX = poli2[c]+"x^"+((poli2.length-1)-c)                                        
                                        context.res=toX+"+"+context.res
                                        c--
                                    }
                                    context.res=context.res.split('+-').join('-')
                                    context.res=context.res.split('1x').join('x')
                                    context.res=context.res.split('1y').join('y')
                                    context.res=context.res.split('1z').join('z')
                                    context.res=context.res.split('^1+').join('+')
                                    context.res=context.res.split('^1-').join('-')
                                    context.res="("+context.res+")"+xStr
                                }
                            }
                        } 
                    }
                } else {
                    let lastXstr = context.res
                    xs.push(c2 * -1);
                    countB = 0;
                    context.StepsC += 1;
                    context.str1 = strToLang("Paso") + context.StepsC.toString() + ": quad"
                    context.str2 = context.strDevelopment
                    //poliAux = poliAux.reverse()
                    if (poliAux.length > 2) {
                        context.res = "(";
                        let cAux = 0;
                        //let pw = poliAux.length - 2;
                        x = xs[xs.length - 1];
                        let xCountPow = 0
                        firstPow = poli2.length - 1
                        while(poliAux[poliAux.length-1]! === 0){
                            poliAux.pop();
                            xCountPow++
                        }
                        let pw = poliAux.length - 2;
                        if(!bandXZero){
                            pw++
                        }
                        //poliAux.push(0)
                        if((poliAux.length>3)||((xs.length===1 && (poliAux.length===3)) || poliAux.length===2)){
                            if((xs.length===1 && poliAux.length===3)){
                            //    pw=firstPow - 2
                                pw = poliAux.length - 1
                            }
                            while (cAux < (poliAux.length - 1)) {
                                if (poliAux[cAux] === 1) {
                                    if (cAux>0){
                                        context.res += "+"+(context.aux1Char + (pw > 1 ? "^" + pw : ""));
                                    }else{
                                        context.res += (context.aux1Char + (pw > 1 ? "^" + pw : ""));
                                    }
                                } else if (poliAux[cAux] === -1) {
                                    context.res += ("-" + context.aux1Char + (pw > 1 ? "^" + pw : ""));
                                } else if (poliAux[cAux] > 1) {
                                    if (bandG) {
                                        const absX = x < 0 ? x * -1 : x
                                        const poliMul = ((divisor % divFactor[countC]) === 1) ? ((poliAux[cAux] * x)/divisor) : (poliAux[cAux]/divFactor[countC])                                         
                                        poliAux[cAux] = poliMul
                                        context.res += (((poliMul > -1 && cAux > 0) ? "+" : "") + (poliMul) + (context.aux1Char + (pw > 1 ? "^" + pw : "")));
                                    } else {
                                        context.res += ((cAux > 0 ? "+" : "") + (poliAux[cAux]) + (context.aux1Char + (pw > 1 ? "^" + pw : "")));
                                    }
                                } else if (poliAux[cAux] < -1) {
                                    if (bandG) {
                                        const absX = x < 0 ? x * -1 : x
                                        const poliMul = ((divisor % divFactor[countC]) === 1) ? ((poliAux[cAux] * x)/divisor) : (poliAux[cAux]/divFactor[countC]) 
                                        poliAux[cAux] = poliMul
                                        context.res += (((poliMul > -1 && cAux > 0) ? "+" : "") + poliMul + (context.aux1Char + (pw > 1 ? "^" + pw : "")));
                                    } else {
                                        context.res += ((poliAux[cAux]) + (context.aux1Char + (pw > 1 ? "^" + pw : "")));
                                    }
                                }

                                cAux++;
                                pw--;
                            }
                        }
                        
                        context.res = context.res.split("+1x").join("+x");
                        context.res = context.res.split("+1y").join("+y");
                        context.res = context.res.split("+1z").join("+z");
                        //console.log('res0 ',context.res)
                        if (bandG) {
                            const absX = x<0?x*-1:x
                            const poliMul = ((divisor % divFactor[countC]) === 1) ? ((poliAux[cAux] * x)/divisor) : (poliAux[cAux]/divFactor[countC])
                            poliAux[cAux] = poliMul
                            context.res += (poliMul < 0 ? (poliMul) : "+" + (poliMul)) + ")"
                        } else {
                            const firstXstr = context.res + (poliAux[cAux] < 0 ? (poliAux[cAux]) : "+" + (poliAux[cAux])) + ")"
                            if(context.res !== '('){
                                context.res = firstXstr // (poliAux[cAux] < 0 ? (poliAux[cAux]) : "+" + (poliAux[cAux])) + ")"
                            }else{
                                /*if(xs.length===2){
                                    context.res+=(poliAux[cAux]/divFactor[countC])+context.aux1Char+"+"+xs[xs.length-1]+")"
                                }else{*/

                                    context.res=''
                                //}
                            }
                        }
                        //console.log('res0.5 ',context.res,' bandG ',bandG)
                        poliArr = poliAux.slice(0, poliAux.length-1);
                        
                        if (bandG) {

                            let poliDiv = divisor / divFactor[countC]
                            //console.log('poliDiv ',poliDiv,' x ',x)
                            if (poliDiv === 1 || poliDiv === -1) {
                                if(x<0){
                                    if(poliDiv>0){
                                        poliDiv*=-1
                                    }
                                }
                                context.res = xStr + "(" + context.aux1Char + (x < 0 ? poliDiv + ")" : '+' + poliDiv + ")") + context.res;
                                xStr += "(" + context.aux1Char + (x < 0 ? poliDiv + ")" : '+' + poliDiv + ")");
                            } else {
                                let a = divFactor[countC]
                                let b = divisor
                                if (divisor % divFactor[countC]===0){
                                    a = divFactor[countC] < 0 ? divFactor[countC] * -1 : divFactor[countC]
                                    b = b / a
                                    a = a / a
                                }
                                context.res += xStr + "(" + (x < 0 ? "-" : "") + (a > 1 || a < -1?a:"") + context.aux1Char + (b < 0 ? b + ")" : '+' + b + ")"); //+ context.res;
                                xStr += "(" + (x < 0 ? "-" : "") + (a > 1 || a < -1 ? a : "") + context.aux1Char + (b < 0 ? b + ")" : '+' + b + ")");
                            }

                        } else {
                            
                            if(xs.length===1 && poliAux.length===3){
                              //  diffPow=1
                                xCountPow = 2
                            }
                            let diffPow = firstPow-xCountPow
                            context.res += xStr; 
                            //console.log('diffPow: ',diffPow,' xCountPow ',xCountPow,' firstPow ',firstPow)
                            if(diffPow>0){
                                xCountPow=diffPow<2?0:1
                                if((diffPow+(poliAux.length-1))>firstPow){
                                    diffPow = xCountPow
                                }
                                context.res += "(" + context.aux1Char + ((xCountPow>0&&diffPow>1) ? `^${diffPow}`:'')  
                                context.res += (x < 0 ? x + ")" : '+' + x + ")"); //+ context.res;
                                xStr += "(" + context.aux1Char +  ((xCountPow>0&&diffPow>1) ? `^${diffPow}`:'')
                                xStr += (x < 0 ? x + ")" : '+' + x + ")");
                            }
                            
                        }
                        if (prevFactor !== "") {
                            //console.log('prevFactor ',prevFactor)
                            context.res = prevFactor + "(" + context.res + ")";
                        }
                        //console.log('res1 ',context.res)
                        //poliAux.push(0)
                        if (poliAux.length === 3) {
                            STR = [];
                        }
                        poliAux.push(null)
                    } else {
                        let xPows = 1;
                        let c3 = 0;
                        let prevC:any = "";
                        xs = xs.sort();
                        //while(context.res.includes(S[S.length - 1]!)){
                        //context.res+=lastXstr
                        while (c3 < xs.length) {
                            if (xs[c3] === prevC) {
                                xPows++;
                            }
                            
                            if (xs[c3] !== prevC || c3 === (xs.length - 1)) {
                                if (xPows > 1) {
                                    const auxX = xs[c3 - 1];
                                    let fPow = "";
                                    let sPow = "";
                                    let c4 = 0;
                                    if (bandG) {
                                        sPow = "(" + ((divisor === divFactor[countC] ? "" : divFactor[countC])) + context.aux1Char + (auxX < 0 ? divisor : "+" + divisor) + ")";
                                    } else {
                                        sPow = "(" + context.aux1Char + (auxX < 0 ? auxX : "+" + auxX) + ")";
                                    }
                                    if ((prevC * -1) === poli2[1]) {
                                        xPows--;
                                    }
                                    while (c4 < xPows) {
                                        fPow += sPow
                                        c4++;
                                    }
                                    const resSplit = context.res.split(sPow);

                                    if (resSplit.length > 2) {
                                        context.res = resSplit.join("");
                                        xPows = resSplit.length - 1
                                        context.res = sPow + "^" + (xPows) + context.res;
                                        if (prevFactor !== "") {
                                            context.res = context.res.split(sPow + "^" + xPows + prevFactor + "(").join(prevFactor + "(" + sPow + "^" + xPows);
                                        }
                                    }
                                    xPows = 1;
                                }
                            }
                            prevC = xs[c3];
                            c3++;
                        }
                        bandF = false 
                    }

                    
                    if((xs.length!==2 && poliAux.length!==1)){
                        StepLatex(context.str1, context.strDevelopment, context.str2, context.str3, context.res, context.change, true, context)
                        context.str1 = "-> "
                        context.str2 = "[ " + context.str2 + " ]"
                        context.str1 = context.str1 + context.str2 + " = " + context.res
                        Pstrltx(context.str1, context)
                        context.strltx += "</div>"
                        context.strltx += "</div>"
                    }else if((xs.length === 2 && poliAux.length === 2)){                        
                        S.push(lastXstr);
                    }else if(xs.length === 3 && poliAux.length === 1){
                        context.res = S.pop()
                    }

                    if (poliArr[poliArr.length - 1] === c2) {
                        if (poliAux.length === 1 /*&& poliAux[0]===0*/ ) {
                            bandF = false;
                        } else {
                            c2 *= -1;
                        }
                    } else {
                        c2 = c2 < 0 ? c2 * -1 : c2
                        if (bandG) {
                            if (countC < divFactor.length - 1) {
                                countC++;
                            } else {
                                countC = 0;
                                if (poliArr[poliArr.length - 1] < divisor) {
                                    divisor++;
                                }
                            }
                            c2 = divisor / divFactor[countC];
                        } else {
                            if (c2 < poliAux[poliAux.length - 2]) {
                                c2++;
                            } else if (c2 > poliAux[poliAux.length - 2]) {
                                c2 = poliAux[poliAux.length - 2];
                            }
                        }

                    }
                    poli2 = poliAux.splice(0, poliAux.length - 1);
                    

                }

            }
            //console.log('SFinish: ',S,' xStr ',xStr)
            const bandByParts = (context.FBP&&(!xStr))
            //console.log('bandByParts ',bandByParts)
            if(bandByParts){
                FactorByParts(poli2,context,prevFactor)               
            }
            
            S.push(context.res);
            
            //console.log('SFinish?: ',S)
     }
}