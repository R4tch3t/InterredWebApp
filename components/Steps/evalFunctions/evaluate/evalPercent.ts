import { Context } from '../process/context';
import { cleanR, scanNumbers, tofrac } from '../clean/clean';
import { StepLatex } from '../clean/stepLatex';
import { StepsFrac } from '../clean/stepsFrac';
import strToLang, { WrongExpresion } from '../lang';
import { DoubleStr, isFrac, isNumber, LessThan, residuo } from '../mathString/mathString';
import { Pstrltx } from './evaluate';
export const EvalPercent = (auxStr: string, aux1Str: string,context: Context) => {
    let band = true
    auxStr = auxStr.split("+").join("")
    aux1Str = aux1Str.split("+").join("")
    if (isNumber(auxStr) && isNumber(aux1Str)) {
        context.str2 = aux1Str + "%" + auxStr
        context.strDevelopment = context.strDevelopment.split("(" + aux1Str + ")").join(aux1Str)
        context.strDevelopment = context.strDevelopment.split("(" + auxStr + ")").join(auxStr)

        auxStr = DoubleStr(auxStr)
        aux1Str = DoubleStr(aux1Str)
        auxStr = auxStr.split("pi").join(Math.PI.toString())
        aux1Str = aux1Str.split("pi").join(Math.PI.toString())
        if (context.toDecimalVal === 1) {
            if (context.MoreDVal !== 1) {
                if (aux1Str.includes("e")) {
                    context.strDevelopment = context.strDevelopment.split(aux1Str).join("(" + aux1Str + ")")
                    aux1Str = "(" + aux1Str + ")"
                    context.str2 = aux1Str + "%" + auxStr
                }
                if (auxStr.includes("e")) {
                    context.strDevelopment = context.strDevelopment.split(auxStr).join("(" + auxStr + ")")
                    auxStr = "(" + auxStr + ")"
                    context.str2 = aux1Str + "%" + auxStr

                }
                var auxStrD = auxStr
                auxStrD = auxStrD.split('(').join("")
                var aux1StrD = aux1Str
                aux1StrD = aux1StrD.split('(').join("")
                auxStrD = auxStrD.split(')').join("")
                aux1StrD = aux1StrD.split(')').join("")

                let aux = (isNumber(auxStr) ? Number(auxStr) : 1)
                let aux1 = (isNumber(aux1Str) ? Number(aux1Str) : 0)
                context.res = (aux1 % aux).toString()
                context.res = context.res.split('e+').join("e")
            } else {
                context.res = residuo(aux1Str, auxStr)
            }


            if (aux1Str.startsWith("-") && LessThan(auxStr, "0.0")) {
                context.res = "+" + context.res
            }

            context.res = cleanR(context.res)
            context.strDevelopment = context.strDevelopment.split('--').join("+")

        }

        band = context.str2.includes(".") || context.toDecimalVal === 1

        if (band) {
            context.StepsC += 1
        }

        context.str1 = strToLang("Paso") + context.StepsC + ": quad"
        context.strDevelopment = context.strDevelopment.split('-+').join("-")

        StepLatex(context.str1, context.strDevelopment, context.str2, context.str2, context.res, false, band, context)
        context.res = context.res.split('+').join("")
        context.str1 = "-> "

        if (context.toDecimalVal === 1) {
            context.str2 = "[ " + context.str2 + " ]"
            context.str1 = context.str1 + context.str2 + " = " + context.res
        } else {

            if (context.str2.includes(".")) {
                context.str2 = aux1Str + "÷" + auxStr

                context.str2 = scanNumbers(context.str2, false)

                context.str2 = "[" + context.str2 + "]=" + StepsFrac(context.str2)
            }

            context.str1 = context.str1 + context.str2 + " = " + tofrac(DoubleStr(context.res))


        }
        context.str1 = context.str1.split('pi').join(Math.PI.toString())

        if (band) {
            Pstrltx(context.str1, context)
        }

    } else if (isFrac(auxStr) && isFrac(aux1Str)) {
        aux1Str = aux1Str.split('(').join("")
        auxStr = auxStr.split('(').join("")
        aux1Str = aux1Str.split(')').join("")
        auxStr = auxStr.split(')').join("")

    } else {
        context.res = WrongExpresion()
    }

    context.strltx += "</div>"
    context.strltx += "</div>"
}