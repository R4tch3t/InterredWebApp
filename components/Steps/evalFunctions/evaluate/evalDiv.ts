import { cleanR, scanNumbers, tofrac } from '../clean/clean';
import { StepLatex } from '../clean/stepLatex';
import { StepsFrac } from '../clean/stepsFrac';
import strToLang, { WrongExpresion } from '../lang';
import { dividestr } from '../mathString/divideStr';
import { EvaluateFrac } from '../mathString/evaluateFrac';
import { DoubleStr, isFrac, isNumber, LessThan } from '../mathString/mathString';
import { Context } from '../process/context';
import { Pstrltx } from './evaluate';

export const EvalDiv = (auxStr: string, aux1Str: string, context: Context) => {
     let band = true
     auxStr = auxStr.split("+").join("")
     aux1Str = aux1Str.split("+").join("")
     if (isNumber(auxStr) && isNumber(aux1Str)) {

        context.str2 = aux1Str + "/" + auxStr
        context.strDevelopment = context.strDevelopment.split("(" + aux1Str + ")").join(aux1Str)
        context.strDevelopment = context.strDevelopment.split("(" + auxStr + ")").join(auxStr)
    
        context.strDevelopment = context.strDevelopment.split("log_10" + auxStr).join("log_10(" + auxStr + ")")
        context.strDevelopment = context.strDevelopment.split("log_10" + aux1Str).join("log_10(" + aux1Str + ")")
        context.strDevelopment = context.strDevelopment.split("log_2" + auxStr).join("log_2(" + auxStr + ")")
        context.strDevelopment = context.strDevelopment.split("log_2" + aux1Str).join("log_2(" + aux1Str + ")")

        auxStr = DoubleStr(auxStr)
        aux1Str = DoubleStr(aux1Str)
        auxStr = auxStr.split("pi").join(Math.PI.toString())
        aux1Str = aux1Str.split("pi").join(Math.PI.toString())
        auxStr = auxStr.split("I n f i n i t y").join("Infinity")
        aux1Str = aux1Str.split("I n f i n i t y").join("Infinity")

         if (context.toDecimalVal === 1) {
             if (context.MoreDVal !== 1) {
                 if (aux1Str.includes("e")) {
                    context.strDevelopment = context.strDevelopment.split(aux1Str).join("(" + aux1Str + ")")
                     aux1Str = "(" + aux1Str + ")"
                     context.str2 = aux1Str + "/" + auxStr
                 }
                 if (auxStr.includes("e")) {
                    context.strDevelopment = context.strDevelopment.split(auxStr).join("(" + auxStr + ")")
                     auxStr = "(" + auxStr + ")"
                     context.str2 = aux1Str + "/" + auxStr
                 }
                 let auxStrD = auxStr
                 auxStrD = auxStrD.split('(').join("")
                 let aux1StrD = aux1Str
                 aux1StrD = aux1StrD.split('(').join("")
                 auxStrD = auxStrD.split(')').join("")
                 aux1StrD = aux1StrD.split(')').join("")

                 let aux = (isNumber(auxStrD) ? Number(auxStrD) : 0.0)
                 let aux1 = (isNumber(aux1StrD) ? Number(aux1StrD) : 0.0)

                 context.res = (aux1 / aux).toString()
                 if (context.res.length > 16) {
                     let nD = Math.pow(10.0, 14.0)
                     context.res = (Math.round((aux1 / aux) * nD) / nD).toString()
                 }
                 context.res = context.res.split('e+').join("e")
             } else {
                context.res = dividestr(aux1Str, auxStr, 128)
             }
             if (aux1Str.startsWith("-") && LessThan(auxStr, "0.0")) {
                context.res = "+" + context.res
             }

             context.res = cleanR(context.res)
             context.strDevelopment = context.strDevelopment.split('--').join("+")

         } else {
             if (aux1Str.includes(".") || auxStr.includes(".")) {
                 aux1Str = "(" + tofrac(aux1Str) + ")"
                 auxStr = "(" + tofrac(auxStr) + ")"
                 context.res = EvaluateFrac(aux1Str + "÷" + auxStr)
             } else {
                context.res = "(" + aux1Str + "/" + auxStr + ")"
             }

         }

         auxStr = auxStr.split("Infinity").join("I n f i n i t y")
         aux1Str = aux1Str.split("Infinity").join("I n f i n i t y")

         band = context.str2.includes(".") || context.toDecimalVal === 1

         if (band) {
            context.StepsC += 1
         }

         context.str1 = strToLang("Paso") + context.StepsC + ": quad"

         context.strDevelopment = context.strDevelopment.split('-+').join("-")
         if (auxStr.includes('I n f') || aux1Str.includes('I n f')) {
             if (auxStr.includes('-')) {
                context.str2=context.str2.split("-I n f i n i t y").join("(-I n f i n i t y)")
             }else{
                context.str2=context.str2.split("I n f i n i t y").join("(I n f i n i t y)")
             }
             context.strDevelopment = context.strDevelopment.split(aux1Str + "/" + auxStr).join(context.str2)
         }

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
             context.str2 = context.str2.split('÷').join("/")

             context.str1 = context.str1 + context.str2 + " = " + tofrac(DoubleStr(context.res))


         }
         context.str1 = context.str1.split('pi').join(Math.PI.toString())

         if (band) {
            // strltx += "<p style='text-align:center; width: " + wMobil + "px' >`" + str1 + "`</p>"
            Pstrltx(context.str1, context)
         }
     } else if (isFrac(auxStr) && isFrac(aux1Str)) {
         aux1Str = aux1Str.split('(').join("")
         auxStr = auxStr.split('(').join("")
         aux1Str = aux1Str.split(')').join("")
         auxStr = auxStr.split(')').join("")

         context.str2 = aux1Str + "/" + auxStr
         context.StepsC += 1
         context.strDevelopment = context.strDevelopment.split("(" + auxStr + ")").join(auxStr)
         context.strDevelopment = context.strDevelopment.split("(" + aux1Str + ")").join(aux1Str)
         if (auxStr.includes(".")) {
             auxStr = tofrac(auxStr)
         }
         if (aux1Str.includes(".")) {
             aux1Str = tofrac(aux1Str)
         }

         context.res = EvaluateFrac(aux1Str + "÷" + auxStr)

         context.str1 = strToLang("Paso") + context.StepsC + ": quad"
         StepLatex(context.str1, context.strDevelopment, context.str2, context.str3, context.res, false, true, context)
         context.str2 = aux1Str + "÷" + auxStr
         context.str1 = "-> [(" + aux1Str + ")/(" + auxStr + ")]=" + StepsFrac(context.str2) + "=" + context.res

         Pstrltx(context.str1, context)

     } else {
        context.res = WrongExpresion()
     }

     context.strltx += "</div>"
     context.strltx += "</div>"
}