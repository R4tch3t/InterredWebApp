import { Context } from '../process/context';
import { cleanR, scanNumbers, tofrac } from '../clean/clean';
import { StepLatex } from '../clean/stepLatex';
import { StepsFrac } from '../clean/stepsFrac';
import strToLang, { WrongExpresion } from '../lang';
import { dividestr } from '../mathString/divideStr';
import { DoubleStr, isNumber, ShaveStr, tanStr } from '../mathString/mathString';
import { Pstrltx } from './evaluate';
export const EvalTan = (auxStr: string, context: Context) => {
    auxStr = auxStr.split("(").join("")
    auxStr = auxStr.split(")").join("")

    if (auxStr.includes("/")) {
        auxStr = auxStr.slice(1, auxStr.length - 1)
        let strArr = auxStr.split("/")
        let n1 = strArr[0]
        let n2 = strArr[1]
        let aux1S = auxStr

        auxStr = dividestr(n1, n2, 8)
        context.strDevelopment = context.strDevelopment.split(aux1S).join(auxStr)
    }

    context.strDevelopment = context.strDevelopment.split("t" + auxStr).join("t(" + auxStr + ")")
    context.str2 = "t(" + auxStr + ")"
    auxStr = DoubleStr(auxStr)
    if (isNumber(auxStr)) {
        context.StepsC += 1
        auxStr = auxStr.split('pi').join(Math.PI.toString())
        if (context.MoreDVal !== 1 && context.toDecimalVal === 1) {
            context.res = ShaveStr((tanStr(auxStr, context.DegRad)), 16)
            context.res = context.res.split('e+').join("e")
        } else {
            context.res = tanStr(auxStr, context.DegRad)
        }

        context.res = cleanR(context.res)
        context.str2 = context.str2.split('t+').join("t")
        context.str1 = strToLang("Paso") + context.StepsC + ": quad"
        context.strDevelopment = context.strDevelopment.split("t" + auxStr).join("t("+auxStr+")")
        context.strDevelopment = context.strDevelopment.split("--").join("+")
        context.strDevelopment = context.strDevelopment.split("-+").join("-")
        StepLatex(context.str1, context.strDevelopment, context.str2, context.str2, context.res, false, true, context)

        context.str1 = "-> "
        context.str2 = "T A N(" + auxStr + ")"
        if (context.toDecimalVal === 1) {
            context.str1 = context.str1 + context.str2 + " = " + context.res.split("+").join("")
        } else {
            if (context.str2.includes(".")) {
                context.str2 = scanNumbers("t" + auxStr, false)
                context.str2 = context.str2.split("t").join("T A N(") + ")"
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