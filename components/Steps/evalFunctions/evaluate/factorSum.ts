import { Context } from '../process/context';
import { StepLatex } from '../clean/stepLatex';
import strToLang from '../lang';
import { dividestr } from '../mathString/divideStr';
import { EvaluateFrac } from '../mathString/evaluateFrac';
import { BiggerThan, isNumber, LessThan, MCDStr } from '../mathString/mathString';
import { minusstr } from '../mathString/minusStr';
import { plusstr } from '../mathString/plusStr';
import { Pstrltx } from './evaluate';

export const factorSum = (STR: any, S:any, OP: any, context: Context) => {
    let auxStr = S[S.length - 1] === undefined ? "+" : S.pop();
    let aux1Str = S[S.length - 1] === undefined ? "+" : S.pop();
    let auxChar = auxStr.match(/[A-Z]/gi);
    let aux1Char = aux1Str.match(/[A-Z]/gi);
    let auxStrPow = auxStr + ""
    let aux1StrPow = aux1Str + ""
    let aux1CharPow = aux1Char
    let auxCharPow = auxChar
    let strSplit = aux1StrPow.split(aux1CharPow).join("")
    let sign = STR.pop();
    
    if (strSplit === "") {
        strSplit = "1"
    } else if (strSplit === "-") {
        strSplit = "-1"
    }

    context.str2 = aux1Str + sign + auxStr;
    if(aux1Str.includes('^')){
        S.push(context.str2);
        return;
    }
    if (auxStr.includes(auxChar) && !aux1Str.includes(aux1Char)) {
        const auxTemp = aux1Str;
        context.strDevelopment = context.strDevelopment.split(context.str2);
        context.str2 = auxStr + sign + aux1Str;
        aux1Str = auxStr;
        auxStr = auxTemp;
        context.strDevelopment = context.strDevelopment.join(context.str2);
    }

    if (aux1Str.includes(aux1Char) && auxStr.includes(aux1Char)) {
        auxStr = auxStr.split(aux1Char).join('');
        aux1Str = aux1Str.split(aux1Char).join('');
        if (auxStr === "" || auxStr === "-") {
            auxStr += '1';
        }
        if (aux1Str === "" || aux1Str === "-") {
            aux1Str += '1';
        }
        if (sign==="-"){
            if(aux1Str.includes("/")||auxStr.includes("/")){
                context.res = EvaluateFrac(aux1Str+"-"+auxStr)
                context.res += aux1Char;
                context.res = context.res.split("-1/1" + aux1Char).join("-" + aux1Char);
                context.res = context.res.split("1/1" + aux1Char).join("" + aux1Char);
            }else{
                context.res = minusstr(aux1Str, auxStr);
                context.res += aux1Char;
                context.res = context.res.split("-1" + aux1Char).join("-" + aux1Char);
                context.res = context.res.split("1" + aux1Char).join("" + aux1Char);
            }
        }else{
            if(aux1Str.includes("/")||auxStr.includes("/")){
                context.res = EvaluateFrac(aux1Str+"+"+auxStr)
                context.res += aux1Char;
                context.res = context.res.split("-1/1" + aux1Char).join("-" + aux1Char);
                context.res = context.res.split("1/1" + aux1Char).join("" + aux1Char);
            }else{
                context.res = plusstr(auxStr, aux1Str);
                context.res += aux1Char;
                context.res = context.res.split("-1" + aux1Char).join("-" + aux1Char);
                context.res = context.res.split("1" + aux1Char).join("" + aux1Char);
            }
        }
        
        context.StepsC += 1
        context.str1 = strToLang("Paso") + context.StepsC.toString() + ": quad"
        StepLatex(context.str1, context.strDevelopment, context.str2, context.str3, context.res, context.change, true, context)
        context.str1 = "-> "
        context.str2 = "[ " + context.str2 + " ]" // + "(color(red)(" + aux1Str + "/" + mcd + ")x+color(red)(" + auxStr + "/" + mcd + "))"
        context.str1 = context.str1 + context.str2 + " = " + context.res
        Pstrltx(context.str1,context)
        context.strltx += "</div>"
        context.strltx += "</div>"
        S.push(context.res)
    } else if (aux1Str.includes(aux1Char)) {
        let nextSign = STR[STR.length - 2]
        if ((nextSign === '+' || nextSign === '-') && !auxStr.includes(auxChar)) {
            let nextStr = STR[1] === undefined ? nextSign : STR.pop()
            if (!nextStr.includes(aux1Char)) {
                context.str2 = (sign === "-" ? sign : "") + auxStr + nextSign + nextStr;
                if (nextSign === "-") {
                    context.res = minusstr((sign === "-" ? sign:"")+auxStr, nextStr);
                } else {
                    context.res = plusstr((sign === "-" ? sign : "") + auxStr, nextStr);
                }
                context.StepsC += 1
                context.str1 = strToLang("Paso") + context.StepsC.toString() + ": quad"
                nextSign = ""
                if (context.res > -1){
                    if(STR[STR.length-1]==="-"){
                        STR[STR.length - 1] = "+"
                    }
                    nextSign = "+"
                }else{
                    STR[STR.length - 1] = "-"
                }
                StepLatex(context.str1, context.strDevelopment, context.str2, context.str3, nextSign+""+context.res, context.change, true,context)
                context.str1 = "-> "
                context.str2 = "[ " + context.str2 + " ]" // + "(color(red)(" + aux1Str + "/" + mcd + ")x+color(red)(" + auxStr + "/" + mcd + "))"
                context.str1 = context.str1 + context.str2 + " = " + context.res
                Pstrltx(context.str1,context)
                context.strltx += "</div>"
                context.strltx += "</div>"
                S.push(aux1Str)
                S.push(context.res.split("-").join(""))               

            } else {
                context.strDevelopment = context.strDevelopment.split(context.str2 + sign + nextStr);
                context.str2 = aux1Str + sign + nextStr
                context.strDevelopment = context.strDevelopment.join(context.str2 + sign + auxStr);
                aux1Str = aux1Str.split(aux1Char).join('');
                nextStr = nextStr.split(aux1Char).join('');
                if (nextStr === "" || nextStr === "-") {
                    nextStr += '1';
                }
                if (aux1Str === "" || aux1Str === "-") {
                    aux1Str += '1';
                }
                if (sign === "-") {
                    context.res = minusstr(aux1Str, nextStr);
                } else {
                    context.res = plusstr(aux1Str, nextStr);
                }
                context.res += aux1Char;
                context.StepsC += 1;
                context.str1 = strToLang("Paso") + context.StepsC.toString() + ": quad";
                StepLatex(context.str1, context.strDevelopment, context.str2, context.str3, context.res, context.change, true,context);
                context.str1 = "-> "
                context.str2 = "[ " + context.str2 + " ]" // + "(color(red)(" + aux1Str + "/" + mcd + ")x+color(red)(" + auxStr + "/" + mcd + "))"
                context.str1 = context.str1 + context.str2 + " = " + context.res
                Pstrltx(context.str1,context)
                context.strltx += "</div>"
                context.strltx += "</div>"
                S.push(context.res)
                S.push(auxStr)
                
            }
        } else {
                let powN = 1; 
                if(aux1Str.includes("^")){
                    aux1Char=aux1Char+"^";
                    const sPow = aux1Str.split(aux1Char);
                    powN=parseInt(sPow[1]);
                    aux1Char+=powN;
                    aux1Str = sPow[0];
                    strSplit=sPow[0];
                }else{
                    aux1Str = aux1Str.split(aux1Char).join("");
                }
                
                if (aux1Str === "" || aux1Str==="-") {
                    aux1Str += '1';
                }
                if (auxChar) {
                    auxStr = auxStr.split(auxChar).join("");
                } else {
                    auxChar = "";
                }
                if (isNumber(auxStr) && isNumber(aux1Str)) {
                    const mcd = MCDStr(auxStr, aux1Str);
                    let aux = dividestr(auxStr, mcd, 128);
                    let aux1 = dividestr(aux1Str, mcd, 128);
                    context.res = (mcd > 1 || mcd < -1) ? mcd : ""
                    context.res += "(" + aux1 + aux1Char + sign + aux + auxChar + ")";
                    
                    context.res = context.res.split('1' + aux1Char).join(aux1Char);
                    context.str2=context.str2.split("+-").join("-");
                    if (auxChar !== "") {
                        context.res = context.res.split('1' + auxChar).join(auxChar);
                    }
                    context.res = context.res.split("--").join("+");
                    
                    context.StepsC += 1
                    context.str1 = strToLang("Paso") + context.StepsC.toString() + ": quad"
                    StepLatex(context.str1, context.strDevelopment, context.str2, context.str3, context.res, context.change, true, context)
                    context.str1 = "-> "
                    
                    if (BiggerThan(mcd, "1")||LessThan(mcd, "-1")){
                        context.str2 = "[ " + context.str2 + " ]=" + mcd + "(color(red)(" + aux1Str + "/" + mcd + ")" + aux1Char + sign + "color(red)(" + auxStr + "/" + mcd + ")" + auxChar + ")"
                    } else {
                        context.str2 = "[ " + context.str2 + " ]"

                        context.res = aux1Char !== "" && aux1 === '1' ? aux1Char : aux1 + aux1Char;
                        context.res += sign + (auxChar !== "" && aux === '1' ? auxChar : aux + auxChar);

                    }
                    context.res=context.res.split("+-").join("-");
                    context.str1 = context.str1 + context.str2 + " = " + context.res
                    Pstrltx(context.str1,context)
                    context.strltx += "</div>"
                    context.strltx += "</div>"

                    S.push(context.res)

                    if (!auxStrPow.includes(auxCharPow) && !isNumber(STR[STR.length-1])) { 
                        if (sign === "-") {
                            auxStrPow = "-" + auxStrPow
                        }
                        OP.push([["" + auxStrPow,"",0],[strSplit,aux1CharPow,powN]])
                    } else if (isNumber(STR[STR.length-1])){
                        if (sign === "-") {
                            auxStrPow = "-" + auxStrPow
                        }
                        OP.push([["" + auxStrPow,"",0],[strSplit,aux1CharPow,powN]])
                    } 
                }//else if(((isNumber(auxStr) && aux1Str.includes("/")))||((isNumber(aux1Str) && auxStr.includes("/")))){
                else if (auxStr.includes("/")||aux1Str.includes("/")){
                   // powN = 1;
                    if(aux1Char){
                        aux1Str = aux1Str + aux1Char
                    }
                    context.res = aux1Str + sign + auxStr
                    OP.push([[auxStrPow,"",0],[strSplit,aux1CharPow,powN]]);    
                    S.push(context.res);
                }

        }
        
    }else if (!auxChar && !aux1Char){
        //context.res = aux1Str + sign + auxStr
        if(sign==="-"){
            auxStrPow = minusstr(aux1Str,auxStr);            
        }else{
            auxStrPow = plusstr(aux1Str,auxStr);            
        }
        context.res = auxStrPow
        context.StepsC += 1
        context.str1 = strToLang("Paso") + context.StepsC.toString() + ": quad"
        StepLatex(context.str1, context.strDevelopment, context.str2, context.str3, context.res, context.change, true, context)
        context.str1 = "-> "
                    
        /*if (BiggerThan(mcd, "1")||LessThan(mcd, "-1")){
            context.str2 = "[ " + context.str2 + " ]=" + mcd + "(color(red)(" + aux1Str + "/" + mcd + ")" + aux1Char + sign + "color(red)(" + auxStr + "/" + mcd + ")" + auxChar + ")"
        } else {*/
            context.str2 = "[ " + context.str2 + " ]"

            //context.res = aux1Char !== "" && aux1Str === '1' ? aux1Char : aux1Str + aux1Char;
            //context.res += sign + (auxChar !== "" && auxStr === '1' ? auxChar : auxStr + auxChar);

        //}

        //context.res=context.res.split("+-").join("-");
                

        context.str1 = context.str1 + context.str2 + " = " + auxStrPow
        Pstrltx(context.str1,context)
        context.strltx += "</div>"
        context.strltx += "</div>"
        if(OP?.length! === 1){
            //if(OP[0][2]===0){
                OP.pop();
           // }
        }
        OP.push([[auxStrPow,"",0]]);    
        S.push(context.res);
    }
}