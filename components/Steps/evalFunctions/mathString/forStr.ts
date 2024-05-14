import { cleanRSTR, isNumber, LessThan } from "./mathString"
import { plusstr } from "./plusStr"

export const forstr = (numberA: string, numberB: string) => {
    if(numberA==='0'||numberB==='0'){
        return '0'
    }
    let bandminus = false
    let banddecimal = numberA.includes(".") || numberB.includes(".")
    let countDot = 0
    let Result = ""
    let carry = 0

    if (numberA.includes("-") && !numberB.includes("-")) {
        bandminus = true
    }

    if (numberB.includes("-") && !numberA.includes("-")) {
        bandminus = true
    }

    if (numberA.includes(".")) {
        countDot += numberA.split(".")[1].length
    }

    if (numberB.includes(".")) {
        countDot += numberB.split(".")[1].length
    }
    numberA = numberA.split('-').join("")
    numberB = numberB.split('-').join("")

    if (numberA === "oo" || numberB === "oo") {
        return "oo"
    }

    if (LessThan(numberA, numberB)) {
        let aux = numberA
        numberA = numberB
        numberB = aux
    }
    numberA = numberA.split('.').join("")
    numberB = numberB.split('.').join("")

    let StackA = numberA.split('').reverse()
    let StackB = numberB.split('').reverse()
    let StackPlus: any = []
    let countA = 0
    let countB = 0
    
    for (var i in StackB) {
        let n1 = StackB[i]
        StackPlus.push("")
        for (var i2 in StackA) {
            let n2 = StackA[i2]
            let nI1 = (isNumber(n1) ? parseInt(n1) : 0)
            let nI2 = (isNumber(n2) ? parseInt(n2) : 0)
            let x = (nI1 * nI2 + carry).toString()
            
            if (countA < (StackA.length - 1) && x.length > 1) {

                carry = parseInt(x.split('')[0])

                StackPlus[StackPlus.length - 1] = (x.split('')[1]).toString() + StackPlus[StackPlus.length - 1]

            } else {
                StackPlus[StackPlus.length - 1] = x + StackPlus[StackPlus.length - 1]
                carry = 0
            }
            countA += 1
        }

        if (StackB.length > 1) {

            if (countB === 0) {
                let auxStack = StackPlus.shift().split('')
                Result = (auxStack.pop()).toString() + Result
                StackPlus.push(auxStack.join(''))
            } else {
                let auxStack = (cleanRSTR(plusstr(StackPlus.shift(), StackPlus.shift()))).split('')
                
                if (countB < (StackB.length - 1)) {
                    Result = (auxStack.pop()!).toString() + Result
                }

                StackPlus.push((auxStack).join(''))
            }
        }

        countA = 0
        countB += 1
    }
    
    if (StackPlus.length > 0) {
        Result = (StackPlus[0]).toString() + Result
    } else {
        Result = "00"
    }
    if (banddecimal) {
        let arr = Result.split('')
        countDot = arr.length - countDot
        if (countDot < 0) {
            countDot *= -1
            while (countDot > 0) {
                arr.splice(0, 0, "0")
                countDot -= 1
            }
            arr.splice(0, 0, ".")
        } else {
            arr.splice(countDot, 0, ".")
        }
        Result = arr.join('')
    }
    

    if (bandminus) {
        Result = "-" + Result
    }
    
    return cleanRSTR(Result)
}