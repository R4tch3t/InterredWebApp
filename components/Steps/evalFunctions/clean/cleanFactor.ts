import { Pstrltx } from '../evaluate/evaluate';
import strToLang from '../lang';
import { Context } from '../process/context';
import { StepLatex } from './stepLatex';

export const genStepsSumFactor = (STRR: any, factorStack:any, lastMCD:number, aux1Char:string, lastPow:number, maxPow:number, context: Context) => {
    if (factorStack.length < 2) {
        return
    }
    context.StepsC += 1;
    context.str1 = strToLang("Paso") + context.StepsC.toString() + ": quad"
  
    let baseFactor = (lastMCD > 1 ? lastMCD : "") + "" + aux1Char
    let factorSTR = ""
    let str2Aux = aux1Char
    if (lastPow > 1) {
        baseFactor += "^" + lastPow
        str2Aux += "^" + lastPow
    }
    const sign = factorStack[factorStack.length - 1][1]
    let sumFactor = sign==="*"?1:0
    context.str2 = ""
    while (factorStack.length > 1) {
        const f = factorStack.pop()
        const fbyMCD = f[0] * lastMCD
        if (f[1] === "-") {
            sumFactor -= f[0]
        } else if (f[1] === "+") {
            sumFactor += f[0]
        }else{
            sumFactor *= f[0]
        }
        factorSTR = "" + f[1] + f[0] + factorSTR
        context.str2 = "" + f[1] + ((fbyMCD > 1 || fbyMCD < -1) ? fbyMCD : ((aux1Char === "") ? fbyMCD : "")) + (f[0]<0?"-":"") + str2Aux + context.str2
    }
    const f = factorStack.pop()
    const fbyMCD = f * lastMCD
    factorSTR = "(" + f + factorSTR + ")"
    if (aux1Char === "") {
        context.str2 = "" + fbyMCD + str2Aux + context.str2
    } else {
        context.str2 = (fbyMCD > 1 || fbyMCD < -1 ? fbyMCD : fbyMCD === -1 ? "-" : "") + str2Aux + context.str2
    }
    if (sign==="*"){
        sumFactor *= f
    }else{
        sumFactor += f
    }
    context.res = (fbyMCD < 0 /*&&lastPow===1*/ ? "+" : "") + baseFactor + factorSTR;
    StepLatex(context.str1, context.strDevelopment, context.str2, context.str3, context.res, context.change, true, context)
    context.str1 = "-> "
    context.str2 = "[ " + context.str2 + " ]"
    context.str1 = context.str1 + context.str2 + " = " + context.res
    Pstrltx(context.str1, context)
    context.strltx += "</div>"
    context.strltx += "</div>"

    context.StepsC += 1;
    context.str1 = strToLang("Paso") + context.StepsC.toString() + ": quad"

    context.str2 = "" + factorSTR

    context.res = "(" + sumFactor + ")";
    StepLatex(context.str1, context.strDevelopment, context.str2, context.str3, context.res, context.change, true, context)
    context.str1 = "-> "
    context.str2 = "[ " + context.str2 + " ]"
    context.str1 = context.str1 + context.str2 + " = " + context.res
    Pstrltx(context.str1,context)
    context.strltx += "</div>"
    context.strltx += "</div>"

    context.StepsC += 1;
    context.str1 = strToLang("Paso") + context.StepsC.toString() + ": quad"

    context.str2 = baseFactor + "" + context.res
    const mulFactor = (sumFactor * lastMCD)
    const appendRes = ((mulFactor > 1 || mulFactor < -1 || mulFactor === 0) ? mulFactor : (mulFactor === -1) ? (aux1Char === "" ? mulFactor : "-") : (aux1Char === "" ? mulFactor : "")) + aux1Char + ""
    context.res = "" + appendRes
    if (lastPow > 1) {
        context.res += "^" + lastPow;
    }

    if (lastPow === maxPow) {
        STRR.push(appendRes /*.split("-").join("")*/ )
    } else {
        STRR.push(appendRes.split("-").join(""))
    }

    if (lastPow > 1) {
        STRR.push(lastPow + "")
        STRR.push("^")
    } //else{
    STRR.push(mulFactor < 0 ? "-" : "+")

    StepLatex(context.str1, context.strDevelopment, context.str2, context.str3, context.res, context.change, true, context)
    context.str1 = "-> "
    context.str2 = "[ " + context.str2 + " ]"
    context.str1 = context.str1 + context.str2 + " = " + context.res
    Pstrltx(context.str1,context)
    context.strltx += "</div>"
    context.strltx += "</div>"
}

export const SumExpFactor = (STR: any, auxStr: string, aux1SStr: any, aux1Char: string, context: Context) => {
    var STR = STR
    let bandEnd = false
    let STRR: any = []
    let OPR: any = []
    let lastPow = parseInt(auxStr)
    const maxPow = parseInt(auxStr)
    let aux1Str = aux1SStr[0]
    let lastB: any = aux1Str.split(aux1Char).join("")
    if (lastB === "") {
        lastB = 1
    } else if (lastB === "-") {
        lastB = -1
    } else {
        lastB = parseInt(lastB)
    }
    let lastMCD = lastB < 0 ? lastB * -1 : lastB
    const factorStack: any = []
    
    if (STR[STR.length - 3] === "^" && STR[STR.length - 2] === auxStr) {
        if (lastB % lastMCD > 0) {
            factorStack.push(lastB)
        } else {
            factorStack.push(lastB / lastMCD)
        }
    }
    //console.log('SumExpFactor ',STR)
    while (STR.length) {
        switch (STR[STR.length - 1]) {
            case "-":
            case "+":
                let sign = STR.pop()
                let a:any = OPR.length > 0 ? OPR.pop() : null
                let b:any = OPR.length > 0 ? OPR.pop() : null
                if (STR.length === 0 && bandEnd) {
                    //if (context.FCT) {
                        genStepsSumFactor(STRR, factorStack, lastMCD, aux1Char, lastPow, maxPow, context)
                    //}

                } else if (STR.length === 0 && !bandEnd) {

                }
                bandEnd = false
                if (a !== null) {
                    let auxA: any = (a + "")
                    if (!factorStack.length && STR.length) {
                        if (STR[STR.length - 1].includes(aux1Char)) {
                            auxA = auxA.split(aux1Char).join("")
                            if (auxA === "") {
                                auxA = "1"
                            }
                            if (sign === "-") {
                                auxA = "-" + auxA
                            }
                            auxA = parseInt(auxA)
                            lastB = auxA
                            lastMCD = lastB
                            if (lastMCD < 0) {
                                lastMCD = lastMCD * -1
                            }
                            lastPow = 1
                            factorStack.push(lastB / lastMCD)

                        } else {
                            
                            if (auxA.includes(aux1Char)) {
                                if (STR.length > 1) {

                                    if (STR.length === 2) {

                                    }
                                    if (!factorStack.length) {
                                        STRR.push(auxA)
                                        STRR.push(sign)
                                    }
                                }
                            } else {
                                if (sign === "-") {
                                    auxA = parseInt(auxA) * -1
                                } else {
                                    auxA = parseInt(auxA)
                                }
                                lastB = auxA
                                lastMCD = lastB
                                if (lastMCD < 0) {
                                    lastMCD = lastMCD * -1
                                }
                                lastPow = 1
                                factorStack.push(lastB / lastMCD)
                                
                            }

                        }
                    } else {
                        
                        if (auxA.includes(aux1Char)) {
                            auxA = auxA.split(aux1Char).join("")
                            if (auxA === "") {
                                auxA = "1"
                            }
                            auxA = parseInt(auxA)
                            if (factorStack.length) {
                                if (auxA % lastMCD > 0) {
                                    factorStack[0] = (factorStack[0] * lastMCD)
                                    for (let i = 1; i < factorStack.length; i++) {
                                        factorStack[i] = [(factorStack[i][0] * lastMCD), factorStack[i][1]]
                                    }
                                    lastMCD = 1
                                    factorStack.push([auxA, sign])
                                } else {
                                    factorStack.push([(auxA / lastMCD), sign])
                                }
                            }
                            if (STR.length > 1) {
                                const nextNum = STR[STR.length - 1]
                                
                                if (!nextNum.includes(aux1Char)) {
                                    genStepsSumFactor(STRR, factorStack, lastMCD, aux1Char, lastPow, maxPow, context)

                                    if (STR.length === 2) {
                                        STRR.push(STR.pop())
                                        STRR.push(STR.pop())
                                    }
                                }
                            } else if (STR.length === 0) {
                                if (factorStack.length > 1) {
                                    genStepsSumFactor(STRR, factorStack, lastMCD, aux1Char, lastPow, maxPow, context)
                                } else {
                                    while (factorStack.length>0) {
                                        factorStack.pop()
                                    }
                                    STRR.push(a + "")
                                    STRR.push(sign)
                                }
                            }
                        } else {
                            auxA = parseInt(auxA)
                            if (!factorStack.length) {
                                lastMCD = auxA < 0 ? auxA * -1 : auxA
                            }
                            if (auxA % lastMCD > 0) {
                                factorStack[0] = (factorStack[0] * lastMCD)
                                for (let i = 1; i < factorStack.length; i++) {
                                    factorStack[i] = [(factorStack[i][0] * lastMCD), factorStack[i][1]]
                                }
                                lastMCD = 1
                                factorStack.push([auxA, sign])
                            } else {
                                factorStack.push([(auxA / lastMCD), sign])
                            }
                            if (STR.length === 0) {
                                //if (context.FCT) {
                                    genStepsSumFactor(STRR, factorStack, lastMCD, "", lastPow, maxPow, context)
                                    if (factorStack.length === 1) {
                                        const f = factorStack.pop()
                                        STRR.push((f[0] * lastMCD) + "")
                                        STRR.push(f[1])

                                    }
                                //}
                            }
                        }
                        if (STR.length === 0) {
                            //if (context.FCT) {
                                genStepsSumFactor(STRR, factorStack, lastMCD, aux1Char, lastPow, maxPow, context)
                            //}
                        }
                    }
                    //console.log('FactorStacks++: ',factorStack)
                }
                
                break;
            case "*":
                sign = STR.pop()
                a = OPR.length > 0 ? OPR.pop() : null
                b = OPR.length > 0 ? OPR.pop() : null                
                
                if (a !== null && b !== null) {
                    let auxA:any = (a + "")
                    let auxB:any = (b + "")
                    lastB = auxB.split(aux1Char).join("")
                    if (lastB === "") {
                        lastB = 1
                    } else if (lastB === "-") {
                        lastB = -1
                    } else {
                        lastB = parseInt(lastB)
                    }
                    lastMCD = lastB < 0 ? lastB * -1 : lastB
                    auxA = auxA.split(aux1Char).join("");
                    if (auxA === "") {
                        auxA = 1
                    } else if (auxA === "-") {
                        auxA = -1
                    } else {
                        auxA = parseInt(auxA)
                    }
                    if (!factorStack.length && STR.length) {
                        if (auxA % lastMCD > 0) {
                            factorStack.push(lastB)
                            factorStack.push([auxA,sign])
                            lastMCD=1
                        }else{
                            factorStack.push(lastB / lastMCD)
                            factorStack.push([auxA / lastMCD, sign])
                        }
                        lastPow=1
                        
                    } else if (factorStack.length){

                    }
                }else if(a!==null&&b===null){
                    let auxA = (a + "")
                    lastB = auxA.split(aux1Char).join("")
                    if (lastB === "") {
                        lastB = 1
                    } else if (lastB === "-") {
                        lastB = -1
                    } else {
                        lastB = parseInt(lastB)
                    }
                    if (lastB % lastMCD > 0) {
                        factorStack.push([lastB, sign])
                        lastMCD = 1
                    } else {
                        factorStack.push([lastB / lastMCD, sign])
                    }
                }else{
                    if(STR[STR.length-3]!=="^"){
                        genStepsSumFactor(STRR, factorStack, lastMCD, aux1Char, lastPow, maxPow, context)
                        lastPow-=1
                    }
                }
                if (STR[STR.length - 1] === "+" || STR[STR.length - 1] === "-") {
                    let auxA = a + ""
                    let auxB = b + ""
                    if (auxA.includes(aux1Char) || auxB.includes(aux1Char)) {
                        genStepsSumFactor(STRR, factorStack, lastMCD, aux1Char, lastPow, maxPow,context)
                    }else{
                        lastPow=0
                        genStepsSumFactor(STRR, factorStack, lastMCD, "", lastPow, maxPow,context)
                    }
                }
                break;
            case "^":
                STR.pop()
                a = parseInt(OPR.pop())
                b = (OPR.length?OPR.pop():'1').split(aux1Char).join("")
                if (b === "") {
                    b = "1"
                }
                if (b === "-") {
                    b = "-1"
                }
                b = parseInt(b)
                //console.log('a ',a,' b ',b,' lastPow: ',lastPow,' context.FCT ',context.FCT)
                //console.log('factorStack ',factorStack)
                if (lastPow === null) {
                    lastPow = a
                } else if (lastPow !== a) {
                    /*if (!context.FCT) {
                        STRR.push(lastB)
                        lastB += b
                    } else {*/
                        if (factorStack.length) {
                            genStepsSumFactor(STRR, factorStack, lastMCD, aux1Char, lastPow, maxPow,context)
                        }
                        
                        lastPow = a
                        lastB = b
                        if (STR[STR.length - 1] === "-") {
                            lastB = lastB * -1
                        }
                        lastMCD = lastB < 0 ? lastB * -1 : lastB
                        factorStack.push(lastB / lastMCD)
                        
                        if(STR.length-4 > 0){
                            if(STR[STR.length-4]==="^"){
                                const subPow = (lastPow - 1) + "";
                                if ((STR[STR.length - 3] + "") === (subPow)) {
                                    factorStack.pop()
                                    STRR.push(b+""+aux1Char)
                                    STRR.push(lastPow)
                                    STRR.push(`^`)
                                    STRR.push(STR[STR.length - 1])
                                }
                            }
                        }else{
                            b=aux1Char+b
                            b=b.split('1'+aux1Char).join(aux1Char)
                            //console.log('STR.length-4.0 ',STRR)
                            STRR.push(b)
                            STRR.push(a)
                            STRR.push('^')
                            while(STR.length){
                                STRR.push(STR.pop())
                            }
                            //console.log('STR.length-4 ',STRR)
                        }

                    //}
                } else {
                    /*if (!context.FCT) {
                        context.StepsC += 1;
                        context.str1 = strToLang("Paso") + context.StepsC.toString() + ": quad"
                        const sign = STR[STR.length - 1]
                        context.str2 = lastB + "" + aux1Char + "^" + lastPow + sign + b + "" + aux1Char + "^" + lastPow
                        if (sign === "+") {
                            lastB += b
                        } else if (sign === "-") {
                            lastB -= b
                        }else{
                            lastB *= b
                        }

                        context.res = lastB + "" + aux1Char + "^" + lastPow;
                        
                        StepLatex(context.str1, context.strDevelopment, context.str2, context.str3, context.res, context.change, true, context)
                        context.str1 = "-> "
                        context.str2 = "[ " + context.str2 + " ]"
                        context.str1 = context.str1 + context.str2 + " = " + context.res
                        Pstrltx(context.str1,context)
                        context.strltx += "</div>"
                        context.strltx += "</div>"
                    } else {*/
                        const sign = STR[STR.length - 1]
                        if (b % lastMCD > 0) {
                            factorStack[0] = (factorStack[0] * lastMCD)
                            for (let i = 1; i < factorStack.length; i++) {
                                factorStack[i] = [(factorStack[i][0] * lastMCD), factorStack[i][1]]
                            }
                            lastMCD = 1
                            factorStack.push([b, sign])
                        } else {
                            factorStack.push([(b / lastMCD), sign])
                        }
                   // }
                }
                bandEnd = true
                if (STR[STR.length - 3] === "+" || STR[STR.length - 3] === "-" || STR[STR.length - 3] === "*") {
                    /*if (!context.FCT) {
                        STRR.push(lastB + aux1Char)
                        STRR.push(lastPow + "")
                        STRR.push("^")
                    } else {*/
                        if (factorStack.length === 1) {
                            STRR.push(b + "" + aux1Char)
                            STRR.push(a + "")
                            STRR.push("^")
                            if (STR[STR.length - 1] === "+" || STR[STR.length - 1] === "-" || STR[STR.length - 1] === "*") {
                                STRR.push(STR[STR.length - 1])
                            }
                            factorStack.pop()
                        } else {
                            genStepsSumFactor(STRR, factorStack, lastMCD, aux1Char, lastPow, maxPow, context)
                        }
                    //}
                }
                break;
            default:
                OPR.push(STR.pop())
        }
    }
  
    if (STRR[2] === "^" && (STRR[1] + "") === (maxPow + "")) {
        aux1SStr[0] = STRR.shift() + ""
        STRR.shift()
        STRR.shift()
    }
    return STRR.reverse()
}