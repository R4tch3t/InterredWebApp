import { Context } from '../process/context';
import { cleanR, scanNumbers, tofrac } from '../clean/clean';
import { StepLatex } from '../clean/stepLatex';
import { StepsFrac } from '../clean/stepsFrac';
import strToLang from '../lang';
import { EvaluateFrac } from '../mathString/evaluateFrac';
import { DoubleStr, isFrac, isNumber, moreDStr, sqrtStr } from '../mathString/mathString';
import { Pstrltx } from './evaluate';
export const EvalSqrt = (auxStr: string, aux1Str: string, replace: any, context: Context) => {
    auxStr = auxStr.split("(").join("")
    aux1Str = aux1Str.split("(").join("")
    auxStr = auxStr.split(")").join("")
    aux1Str = aux1Str.split(")").join("")
    

    if ((isNumber(auxStr) && isNumber(aux1Str)) || (auxStr === "" || aux1Str === "")) {
                
        if (aux1Str.startsWith("-")&&replace){
            context.strDevelopment = context.strDevelopment.split(aux1Str).join("+"+aux1Str)
            context.strDevelopment = context.strDevelopment.split("+ +").join('+')
            context.strDevelopment = context.strDevelopment.split("++").join("+")
            context.strDevelopment = context.strDevelopment.split("×+").join("×")
            context.strDevelopment = context.strDevelopment.split("*+").join("*")
            context.strDevelopment = context.strDevelopment.split("/+").join("/")
        }
        

        context.str2 = aux1Str + "√" + auxStr;
        context.strDevelopment = context.strDevelopment.split("(" + aux1Str + ")").join(aux1Str)
        context.strDevelopment = context.strDevelopment.split("(" + auxStr + ")").join(auxStr)

        if (!context.strDevelopment.includes("√" + auxStr)) {
            aux1Str = auxStr
            auxStr = ""
            context.str2 = aux1Str + "√" + auxStr
        } else {
            auxStr = DoubleStr(auxStr)
        }
        context.StepsC += 1
        auxStr = auxStr.split("pi").join(Math.PI.toString())
        aux1Str = aux1Str.split("pi").join(Math.PI.toString())

        if (context.MoreDVal !== 1 && context.toDecimalVal === 1) {
            context.res = sqrtStr(auxStr, aux1Str)
            context.res = context.res.split("e+").join("e")
        } else {
            context.res = sqrtStr(auxStr, aux1Str)
            context.res = moreDStr(context.res)
        }

        context.res = cleanR(context.res)

        context.str1 = strToLang("Paso") + context.StepsC + ": quad"

        StepLatex(context.str1, context.strDevelopment, context.str2, context.str3, context.res, context.change, true,context)

        context.str2 = "root(" + aux1Str + ")(" + auxStr + ")"

        context.strltx = context.strltx.split(aux1Str + "√" + auxStr).join(context.str2)

        context.str1 = "-> "
        if (context.change) {
            if (context.toDecimalVal === 1) {
                context.str2 = "[ " + context.str3 + " ]"
            } else {
                if (context.str3.includes(".")) {
                    context.str3 = scanNumbers(context.str3, false)
                    context.str3 = "[" + context.str3 + "]=" + StepsFrac(context.str3)
                }
                context.str2 = context.str3
            }

        } else {
            if (context.toDecimalVal === 1) {
                context.str2 = "[ " + context.str2 + " ]"
            } else {
                if (context.str2.includes(".")) {
                    context.str2 = scanNumbers(context.str2, false)
                    context.str2 = "[" + context.str2 + "]=" + StepsFrac(context.str2)
                }
                context.str2 = " " + context.str2 + " "
            }
        }
        if (context.toDecimalVal === 1) {
            context.str1 = context.str1 + context.str2 + " = " + context.res
        } else {
            context.str1 = context.str1 + context.str2 + " = " + scanNumbers(context.res, false)
        }
        context.str1 = context.str1.split(' + -').join(" - ")
        context.str1 = context.str1.split('pi').join(Math.PI.toString())

        Pstrltx(context.str1,context)


    } else if (isFrac(auxStr) && isFrac(aux1Str)) {
        aux1Str = aux1Str.split('(').join("")
        auxStr = auxStr.split('(').join("")
        aux1Str = aux1Str.split(')').join("")
        auxStr = auxStr.split(')').join("")
        context.str2 = aux1Str + "+" + auxStr
        context.StepsC += 1
        context.strDevelopment = context.strDevelopment.split("(" + auxStr + ")").join(auxStr)
        context.strDevelopment = context.strDevelopment.split("(" + aux1Str + ")", aux1Str)
        if (auxStr.includes(".")) {
            auxStr = tofrac(auxStr)
        }

        if (aux1Str.includes(".")) {
            aux1Str = tofrac(aux1Str)
        }
        context.res = EvaluateFrac((aux1Str + "+" + auxStr).split("+-").join("-"))
        context.str2 = context.str2.split("+-").join("-")
        context.str1 = strToLang("Paso") + context.StepsC + ": quad"
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