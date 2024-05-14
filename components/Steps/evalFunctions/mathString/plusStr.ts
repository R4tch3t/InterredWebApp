import { cleanRSTR, isNumber, lengthCount } from "./mathString"
import { minusstr } from "./minusStr"

export const plusstr = (numberA:string, numberB:string) => {    
        if (numberA.includes("-") && !numberB.includes("-")){
            return minusstr(numberB, numberA.split('-').join(""))
        }
        if (numberB.includes("-") && !numberA.includes("-")) {
            return minusstr(numberA, numberB.split('-').join(""))
        }
        let bandminus = (numberB.includes("-") && numberA.includes("-"))
        
        numberA=numberA.split('-').join("")
        numberB=numberB.split('-').join("")

        if (numberA === "oo" || numberB === "oo" || numberA === "Infinity" || numberB === "Infinity") {
            return "oo"
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
        
        let StackA=numberA.split('').reverse()
        let StackB=numberB.split('').reverse()
        let Result=""
        let count=0
        let carry=0
        
        while (count < StackA.length) {
            if (0 < StackB.length) {
                let a = isNumber(StackA[count]) ? parseInt(StackA[count]) : 0
                let b = (isNumber(StackB[0]) ? parseInt(StackB.shift()!) : 0) + carry

                let sum = a+b
                if (sum>9) {
                    sum-=10
                    carry = 1
                    Result=sum.toString()+Result
                    StackA.push("0")
                    StackB.push("0")
                    countDot+=1
                }else{
                    Result=sum.toString()+Result
                    carry=0
                }
                
            }else{
                Result=(parseInt(StackB[0])+carry).toString()+Result
                carry=0
            }
            
            count+=1
        }
        
        let arr = Result.split('')
        arr.splice(countDot, 0, ".")
        Result = arr.join('')

        if (bandminus) {
            Result="-"+Result
        }
        return cleanRSTR(Result)
    }