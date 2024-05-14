import { BiggerThan, cleanRSTR } from "./mathString"
import { minusstr } from "./minusStr"
import { plusstr } from "./plusStr"

export const dividestr = (numberA:string, numberB:string, LimitDigits:number) => {
    //declare and mov method vars to local vars
    let divA = cleanRSTR(numberA)
    let divB = cleanRSTR(numberB) //a/b
    let bandminus = false
    let countDot = 0
    let Result = ""
    let bandDot = false

    if (divB === "1") {
        return numberA
    }

    bandminus = ((divA.includes("-") && !divB.includes("-")) || (!divA.includes("-") && divB.includes("-")))

    if (divB === "0") {
        return "oo"
    }

    if (divA === "0") {
        return "0"
    }  

    if (divA.includes(".")) {
        let partDecimal = divA.split(".")[1]
        countDot = -partDecimal.length
        bandDot = true
    }

    if (divB.includes(".")) {
        countDot += divB.split(".")[1].length
        bandDot = true
    }
    divA = divA.split('-').join("")
    divB = divB.split('-').join("")
    divA = divA.split('.').join("")
    divB = divB.split('.').join("")
    divA = cleanRSTR(divA)
    divB = cleanRSTR(divB)

    let StackA = divA.split('')
    let residuos = ""
    let mult = "0"

    //div process
    if (StackA.length > 0) {
        //a/b, divA empty, while b>a take first element to the array and put into divA
        divA = ""
        if (BiggerThan(divB, divA)) {
            divA += StackA.shift()
            countDot += 1
        }
        while (BiggerThan(divB, divA) && StackA.length>0) {
            divA += StackA.shift()
        }
        //if stack count == 0, complement with Zeros to div and result, countDot add 1
        if (StackA.length===0) {
            if (BiggerThan(divB, divA)) {
                bandDot = true
                while (BiggerThan(divB, divA)) {
                    divA += "0"
                    countDot -= 1
                }
            }
        }
    }

    //a/b, subtract a to b, a-b, who many a contains b redundant
    while (residuos !== "0" && LimitDigits > 0) {

        while (BiggerThan(divA, divB) || divA === divB) {
            divA = minusstr(divA, divB)
            mult = plusstr(mult, "1")
        }

        Result += mult
        if (StackA.length > 0) {
            if (BiggerThan(divB, divA)) {
                divA += StackA.shift()
                countDot += 1
            }
            while (BiggerThan(divB, divA) && StackA.length>0) {
                divA += StackA.shift()
                Result += "0"
                countDot += 1
            }
            divA = cleanRSTR(divA)
            if (BiggerThan(divB, divA) && StackA.length===0) {
                if (divA === "0") {
                    Result += "0"
                } else {
                    bandDot = true
                    while (BiggerThan(divB, divA)) {
                        divA += "0"
                        Result += "0"
                    }
                }
            }
        }

        mult = "0"
        LimitDigits -= 1
        divA = cleanRSTR(divA)
        residuos = divA

        if (StackA.length === 0) {
            if (divA !== "0" && BiggerThan(divB, divA)) {
                divA += "0"
                bandDot = true
                while (BiggerThan(divB, divA)) {
                    divA += "0"
                    Result += "0"
                }
            }
        }
    }
    //appending dot on the correct position
    if (bandDot) {
        if (countDot > 0) {
            StackA = Result.split('')
            if (StackA.length > countDot) {
               StackA.splice(countDot, 0, ".")
            } else {
                countDot -= 1
                while (countDot > 0) {
                    StackA.push("0")
                    countDot -= 1
                }
            }

            Result = StackA.join("")
        } else {
            StackA = Result.split('')
            countDot -= 1
            while (countDot < 0) {
                StackA.splice(0, 0, "0")
                StackA
                countDot += 1
            }
            StackA.splice(1, 0, ".")
            Result = StackA.join("")
        }
    }

    if (bandminus) {
        Result = "-" + Result
    }

    return cleanRSTR(Result)
}