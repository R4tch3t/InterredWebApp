import { cleanR, scanNumbers, tofrac } from '../clean/clean';
import { StepLatex } from '../clean/stepLatex';
import { StepsFrac } from '../clean/stepsFrac';
import strToLang, { WrongExpresion } from '../lang';
import { dividestr } from '../mathString/divideStr';
import { DoubleStr, isNumber, lnStr, ShaveStr } from '../mathString/mathString';
import { Context } from '../process/context';
import { Pstrltx } from './evaluate';

export const EvalLn=(auxStr: string, sm: string, context: Context)=>{
    auxStr = auxStr.split(")").join("")
    auxStr = auxStr.split("(").join("")

    if (auxStr.includes("/")) {
        auxStr = auxStr.slice(1, auxStr.length - 1)
        let strArr = auxStr.split("/")
        let n1 = strArr[0]
        let n2 = strArr[1]
        let aux1S = auxStr

        auxStr = dividestr(n1, n2, 8)
        context.strDevelopment = context.strDevelopment.split(aux1S).join(auxStr)
    }
    context.strDevelopment = context.strDevelopment.split(sm+auxStr).join(sm + "(" + auxStr + ")")
    context.str2 = sm+"(" + auxStr + ")"
    auxStr = DoubleStr(auxStr)
    
    if (isNumber(auxStr)) {
        context.StepsC += 1
        auxStr = auxStr.split('pi').join(Math.PI.toString())
        auxStr = auxStr.split("I n f i n i t y").join("Infinity")
        if (context.MoreDVal !== 1 && context.toDecimalVal === 1) {
            context.res = ShaveStr(lnStr(auxStr), 16)
            context.res = context.res.split("e+").join("e")
        } else {
            context.res = lnStr(auxStr)
        }

        context.res = cleanR(context.res)
        auxStr = auxStr.split("Infinity").join("I n f i n i t y")

        context.str1 = strToLang("Paso") + context.StepsC + ": quad"
        context.strDevelopment = context.strDevelopment.split(sm + auxStr).join(sm+"(" + auxStr + ")")
        context.strDevelopment = context.strDevelopment.split("--").join("+")
        context.strDevelopment = context.strDevelopment.split("-+").join("-")

        StepLatex(context.str1, context.strDevelopment, context.str2, context.str2, context.res, false, true, context)

        context.str1 = "-> "
        context.str2 = sm+"(" + auxStr + ")"
        if (context.toDecimalVal === 1) {
            context.str1 = context.str1 + context.str2 + " = " + context.res.split("+").join("")
        } else {
            if (context.str2.includes(".")) {
                context.str2 = scanNumbers(sm+"(" + auxStr + ")", false)
                context.str2 = context.str2.split(sm).join(sm+"(") + ")"
                context.str2 = context.str2 + StepsFrac(context.str2)
            }
            context.str1 = context.str1 + context.str2 + " = " + tofrac(DoubleStr(context.res.split("+").join("")))
        }
        context.str1 = context.str1.split("pi").join(Math.PI.toString())
        Pstrltx(context.str1, context)

    } else {
        context.res = WrongExpresion()
    }

    context.strltx += "</div>"
    context.strltx += "</div>"
}