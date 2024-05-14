import { cleanRSTR, isNumber, lengthCount, LessThan } from "./mathString"
import { plusstr } from "./plusStr"

export const minusstr = (numberA: string, numberB: string) => {    
    let bandminus = false
    let Result=""
    let count=0
    let carry=0
    
    if (numberA === numberB) {
        return "0"
    }
    if (numberA.includes("-")&&numberB.includes("-")) {
        return plusstr(numberB.split('-').join(""), numberA)
    }
    
    if (numberA.includes("-")) {
        return "-"+plusstr(numberA.split('-').join(""), numberB)
    }
    
    if (numberB.includes("-")) {
        return plusstr(numberA, numberB.split('-').join(""))
    }
    
    if (numberA === "oo" || numberA === "Infinity") {
        return "oo"
    }

    if (numberB === "oo" || numberB === "Infinity") {

        return "-oo"
    }

    if (LessThan(numberA, numberB)) {
        bandminus=true
    }
    
    if (LessThan(numberB, numberA)) {
        let aux=numberA
        numberA=numberB
        numberB=aux
    }
    
    if (!numberA.includes(".")) {
        numberA+=".0"
    }
    
    if (!numberB.includes(".")) {
        numberB+=".0"
    }
    let countA=numberA.split(".")[1].length
    let countB=numberB.split(".")[1].length
    let dif = 0
    let i=0
    
    if (countA < countB) {
        dif = countB-countA
        while (i<dif) {
            numberA+="0"
            i+=1
        }
    }else{
        dif = countA-countB
        while (i<dif) {
            numberB+="0"
            i+=1
        }
    }
    
    countA=numberA.split(".")[0].length
    countB=numberB.split(".")[0].length
    dif = 0
    i=0
    
    if (countA < countB) {
        dif = countB-countA
        while (i<dif) {
            numberA="0"+numberA
            i+=1
        }
    }else{
        dif = countA-countB
        while (i<dif) {
            numberB="0"+numberB
            i+=1
        }
    }
    let countDot=lengthCount(numberA)
    numberA=numberA.split('.').join("")
    numberB=numberB.split('.').join("")
    var StackA=numberA.split('')
    var StackB=numberB.split('')
    StackB=StackB.reverse()
    StackA=StackA.reverse()
    
    
    while (count < StackA.length) {
        if (0 < StackB.length) /*&& String(StackA[count]) != "." && String(StackB.first!) != "."*/ {
        let a = isNumber(StackA[count]) ? parseInt(StackA[count]) : 0
        let b = isNumber(StackB[0]) ? parseInt(StackB.shift()!) : 0
        b+=carry
        if (b < a) {
            b+=10
            let rest = b-a
            carry = -1
            Result=rest.toString()+Result
        }else{
            let rest = b-a
            Result=rest.toString()+Result
            carry=0
        }
            
        }else{
            Result=(parseInt(StackB[0])+carry).toString()+Result
            carry=0
        }

        count+=1
    }
    
    while (StackB.length>0) {
        Result=(StackB.shift()!).toString()+Result
    }
    
    var arr = Result.split('')
    arr.splice(countDot, 0, ".")

    Result = arr.join('')
    
    if (bandminus) {
        Result="-"+Result
    }

    return cleanRSTR(Result)
}