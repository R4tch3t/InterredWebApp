import { Context } from '../process/context';
import { cleanR, scanNumbers, tofrac } from '../clean/clean';
import { StepLatex } from '../clean/stepLatex';
import { StepsFrac } from '../clean/stepsFrac';
import strToLang from '../lang';
import { EvaluateFrac } from '../mathString/evaluateFrac';
import { BiggerThan, DoubleStr, isFrac, isNumber } from '../mathString/mathString';
import { plusstr } from '../mathString/plusStr';
import { Pstrltx } from './evaluate';
import { nDigits } from './expresion';
export const EvalSum = (auxStr: string, aux1Str: string,context: Context) => {
    let aux2Str = ""
    if (isNumber(auxStr) && isNumber(aux1Str)) {
        context.strDevelopment = context.strDevelopment.split("(" + aux1Str + ")").join(aux1Str)
        context.strDevelopment = context.strDevelopment.split("(" + auxStr + ")").join(auxStr)
        auxStr = auxStr.split("(").join("")
        aux1Str = aux1Str.split("(").join("")
        auxStr = auxStr.split(")").join("")
        aux1Str = aux1Str.split(")").join("")
        context.strDevelopment = context.strDevelopment.split("(" + aux1Str + ")").join(aux1Str)
        context.strDevelopment = context.strDevelopment.split("(" + auxStr + ")").join(auxStr)

        context.strDevelopment = context.strDevelopment.split("log_10" + auxStr).join("log_10(" + auxStr +")")
        context.strDevelopment = context.strDevelopment.split("log_10" + aux1Str).join("log_10(" + aux1Str + ")")
        context.strDevelopment = context.strDevelopment.split("log_2" + auxStr).join("log_2(" + auxStr +")")
        context.strDevelopment = context.strDevelopment.split("log_2" + aux1Str).join("log_2(" + aux1Str + ")")

        context.str2 = aux1Str + "+" + auxStr

        auxStr = DoubleStr(auxStr)
        aux1Str = DoubleStr(aux1Str)
        context.StepsC += 1
        auxStr = auxStr.split("pi").join(Math.PI.toString())
        aux1Str = aux1Str.split("pi").join(Math.PI.toString())
        auxStr = auxStr.split("I n f i n i t y").join("Infinity")
        aux1Str = aux1Str.split("I n f i n i t y").join("Infinity")
        if (context.MoreDVal !== 1 && context.toDecimalVal === 1) {
            let aux = (isNumber(auxStr) ? Number(auxStr) : 0.0)
            let aux1 = (isNumber(aux1Str) ? Number(aux1Str) : 0.0)
            let nD = nDigits(auxStr, aux1Str)

            context.res = (Math.round((aux + aux1) * nD) / nD).toString()
            context.res = context.res.split("e+").join('e')
        } else {
            context.res = plusstr(auxStr, aux1Str)
        }
        
        context.res = cleanR(context.res)
        
        auxStr = auxStr.split("Infinity").join("I n f i n i t y")
        aux1Str = aux1Str.split("Infinity").join("I n f i n i t y")

        if ((aux1Str.startsWith("-") && (BiggerThan(auxStr, "0.0") || auxStr === "0.0")) && (auxStr !== "oo" && aux1Str !== "oo")) {
            
            aux2Str = auxStr
            auxStr = aux1Str
            aux1Str = aux2Str
            aux1Str = aux1Str.split("+").join('')
            context.str3 = aux1Str + auxStr
            context.strDevelopment = context.strDevelopment.split("--").join('+')
            context.strDevelopment = context.strDevelopment.split("+-").join('+ -')
            context.strDevelopment = context.strDevelopment.split("-+").join('-')
            context.change = true

        } else {
            context.change = false
            aux1Str = aux1Str.split("+").join('')
        }
        if (context.BBS) {
                if(auxStr.startsWith("-")){// or 
                    context.str2 = context.str2.split("+-").join('-')
                    context.str3 = context.str3.split("+-").join('-')
                    context.strDevelopment = context.strDevelopment.split("+ -").join("-")
                }else{
                    context.str2 = context.str2.split("+-").join('+ -')
                    context.str3 = context.str3.split("+-").join('+ -')
                }
           
        }else{
            context.str2 = context.str2.split("+-").join('-')
            context.str3 = context.str3.split("+-").join('-')
        }
        context.str1 = strToLang("Paso") + context.StepsC.toString() + ": quad"
        context.strDevelopment = context.strDevelopment.split("--").join('+')
        context.strDevelopment = context.strDevelopment.split("+-").join('+ -')
        context.strDevelopment = context.strDevelopment.split("-+").join('-')

        context.str2 = context.str2.split("++").join("+")
        context.str3 = context.str3.split("++").join('+')
        context.str2 = context.str2.split("+ +").join("+")
        context.str3 = context.str3.split("+ +").join('+')
        StepLatex(context.str1, context.strDevelopment, context.str2, context.str3, context.res, context.change, true, context)
        context.str1 = "-> "
        if (context.change) {
            if (context.toDecimalVal === 1) {
                context.str2 = "[ " + context.str3 + " ]"
            } else {
                if (context.str3.includes(".")) {
                    context.str3 = scanNumbers(context.str3, false)
                    context.str3 = "[" + context.str3 + "]=" + StepsFrac(context.str3)
                    context.str2 = context.str3
                }else{
                    context.str2 = "[" + context.str3 + "]"
                }
                
            }
        } else {
            if (context.toDecimalVal === 1) {
                context.str2 = "[ " + context.str2 + " ]"
            } else {

                if (context.str2.includes(".")) {
                    context.str2 = scanNumbers(context.str2, false)
                    context.str2 = "[" + context.str2 + "]=" + StepsFrac(context.str2)
                    context.str2 = " " + context.str2 + " "
                }else{
                    context.str2 = "[" + context.str2 + "]"
                }

                

            }
        }
        
        if (context.toDecimalVal === 1) {
            context.str1 = context.str1 + context.str2 + " = " + context.res.split("+").join("")
        } else {
            context.str1 = context.str1 + context.str2 + " = " + scanNumbers(context.res.split("+").join(""), false)
        }
        context.str1 = context.str1.split("pi").join(Math.PI.toString());
        Pstrltx(context.str1,context)

    } else if (isFrac(auxStr) && isFrac(aux1Str)) {
        auxStr = auxStr.split("(").join('');
        aux1Str = aux1Str.split("(").join('');
        auxStr = auxStr.split(")").join('');
        aux1Str = aux1Str.split(")").join('');
        
        context.str2 = aux1Str + "+" + auxStr
        context.StepsC += 1
        context.strDevelopment = context.strDevelopment.split("(" + auxStr + ")").join(auxStr);
        context.strDevelopment = context.strDevelopment.split("(" + aux1Str + ")").join(aux1Str);
        if (auxStr.includes(".")) {
            auxStr = tofrac(auxStr)
        }

        if (aux1Str.includes(".")) {
            aux1Str = tofrac(aux1Str)
        }
        context.res = EvaluateFrac((aux1Str + "+" + auxStr).split("+-").join("-"))

        context.str2 = context.str2.split("+-").join("-")
        context.str1 = strToLang("Paso") + context.StepsC.toString() + ": quad"
        StepLatex(context.str1, context.strDevelopment, context.str2, context.str3, context.res, false, true, context)
        context.str2 = aux1Str + "+" + auxStr
        context.str2 = context.str2.split("+-").join("-")
        context.str1 = "-> [" + context.str2 + "]=" + StepsFrac(context.str2) + "=" + context.res

        Pstrltx(context.str1,context)

    } else {
        context.res = strToLang("WrongEx")
    }
    context.strltx += "</div>"
    context.strltx += "</div>"
}