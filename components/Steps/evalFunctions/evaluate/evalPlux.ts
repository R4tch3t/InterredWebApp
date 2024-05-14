import { Context } from '../process/context';
import { cleanR, scanNumbers, tofrac } from '../clean/clean';
import { StepLatex } from '../clean/stepLatex';
import { StepsFrac } from '../clean/stepsFrac';
import strToLang, { WrongExpresion } from '../lang';
import { EvaluateFrac } from '../mathString/evaluateFrac';
import { forstr } from '../mathString/forStr';
import { DoubleStr, isFrac, isNumber, LessThan } from '../mathString/mathString';
import { Pstrltx } from './evaluate';
import { place } from './expresion';
export const EvalPlux = (auxStr: string, aux1Str: string, sm: any, context: Context) => {
    auxStr = auxStr.split("(").join("")
    aux1Str = aux1Str.split("(").join("")
    auxStr = auxStr.split(")").join("")
    aux1Str = aux1Str.split(")").join("")
    if (isNumber(auxStr) && isNumber(aux1Str)) {
        context.StepsC += 1
        context.str2 = aux1Str + sm + auxStr
        context.strDevelopment = context.strDevelopment.split("(" + aux1Str + ")").join(aux1Str)
        context.strDevelopment = context.strDevelopment.split("(" + auxStr + ")").join(auxStr)

        context.strDevelopment = context.strDevelopment.split("log_10" + auxStr).join("log_10(" + auxStr + ")")
        context.strDevelopment = context.strDevelopment.split("log_10" + aux1Str).join("log_10(" + aux1Str + ")")
        context.strDevelopment = context.strDevelopment.split("log_2" + auxStr).join("log_2(" + auxStr + ")")
        context.strDevelopment = context.strDevelopment.split("log_2" + aux1Str).join("log_2(" + aux1Str + ")")
        context.strDevelopment = context.strDevelopment.split("Infinity").join("I n f i n i t y")

        auxStr = DoubleStr(auxStr)
        aux1Str = DoubleStr(aux1Str)
        auxStr = auxStr.split("pi").join(Math.PI.toString())
        aux1Str = aux1Str.split("pi").join(Math.PI.toString())
        
        auxStr = auxStr.split("I n f i n i t y").join("Infinity")
        aux1Str = aux1Str.split("I n f i n i t y").join("Infinity")

        if (context.MoreDVal !== 1 && context.toDecimalVal === 1) {
            let aux = (isNumber(auxStr) ? Number(auxStr) : 0.0)
            let aux1 = (isNumber(aux1Str) ? Number(aux1Str) : 0.0)
            let nD = place(auxStr, aux1Str)
            context.res = (Math.round(aux * aux1 * nD) / nD).toString()
            context.res = context.res.split("+").join("")

        } else {
            context.res = forstr(auxStr, aux1Str)
        }

        context.res = cleanR(context.res)
        auxStr = auxStr.split("Infinity").join("I n f i n i t y")
        aux1Str = aux1Str.split("Infinity").join("I n f i n i t y")
         
        context.str2 = context.str2.split(`${sm}+`).join(sm)
        context.str1 = strToLang("Paso") + context.StepsC.toString() + ": quad"

        context.strDevelopment = context.strDevelopment.split("--").join("+")
        context.strDevelopment = context.strDevelopment.split("-+").join("-")

        if (LessThan(aux1Str, "0.0") && LessThan(auxStr, "0.0")) {
            StepLatex(context.str1, context.strDevelopment, context.str2, context.str2, "+" + context.res, false, true,context)
        } else {
            StepLatex(context.str1, context.strDevelopment, context.str2, context.str2, context.res, false, true,context)
        }
        
        context.str1 = "-> "
        if (context.toDecimalVal === 1) {
            context.str2 = "[ " + aux1Str + ` ${sm} ` + auxStr + " ]"
            context.str1 = context.str1 + context.str2 + " = " + context.res.split("+").join("")
        } else {
            if (context.str2.includes(".")) {
                context.str2 = scanNumbers(aux1Str + sm + auxStr, false)
                context.str2 = "[" + context.str2 + "]=" + StepsFrac(context.str2)
            }else{
                context.str2 = "[" + context.str2 + "]"
            }
            context.str1 = context.str1 + context.str2 + " = " + DoubleStr(tofrac(context.res.split("+").join("")))
        }
        context.str1 = context.str1.split("pi").join(Math.PI.toString())
        Pstrltx(context.str1, context)

    } else if (isFrac(auxStr) && isFrac(aux1Str)) {
        aux1Str = aux1Str.split("(").join("")
        auxStr = auxStr.split("(").join("")
        aux1Str = aux1Str.split(")").join("")
        auxStr = auxStr.split(")").join("")
        context.str2 = aux1Str + sm + auxStr
        context.StepsC += 1

        context.strDevelopment = context.strDevelopment.split("(" + auxStr + ")").join(auxStr)
        context.strDevelopment = context.strDevelopment.split("(" + aux1Str + ")").join(aux1Str)

        if (auxStr.includes(".")) {
            auxStr = tofrac(auxStr)
        }

        if (aux1Str.includes(".")) {
            aux1Str = tofrac(aux1Str)
        }

        context.res = EvaluateFrac((aux1Str + sm + auxStr))

        context.str1 = strToLang("Paso") + context.StepsC + ": quad"
        StepLatex(context.str1, context.strDevelopment, context.str2, context.str3, context.res, false, true, context)
        context.str2 = aux1Str + sm + auxStr
        context.str1 = "-> [" + context.str2 + "]=" + StepsFrac(context.str2) + "=" + context.res

        Pstrltx(context.str1, context)
    } else {
        context.res = WrongExpresion()
    }

    context.strltx += "</div>"
    context.strltx += "</div>"
}