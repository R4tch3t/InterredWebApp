import { dividestr } from "./divideStr"
import { forstr } from "./forStr"
import { absstr, BiggerThan, isNumber, LessThan, MCDStr } from "./mathString"
import { minusstr } from "./minusStr"
import { plusstr } from "./plusStr"

export const EvaluateFrac = (Str: string) => {
    let numbers = ""
    let numbersP: any = []
    let simbols: any = []
    let Result = ""
    let Precode = 0
    let codes=Str.split('')
    
    while (codes.length>0) {
        let char = codes.shift()!
        let uniChar = char.charCodeAt(0)
        
        //si es numero
        if ((uniChar > 47 && uniChar < 58 ) || uniChar === 46) {
            
            numbers+=char
            
        }else {
            if (isNumber(numbers)) {
                numbersP.push(numbers)
                if (uniChar !== 40 && uniChar !== 41){
                    simbols.push(char)
                }
                numbers=""
            }else if (uniChar === 45) {
                if ((Precode > 38 && Precode<46 || Precode===47||Precode===183||Precode===0||Precode===247) && Precode !== 44) {
                    simbols.push(char)
                }else{
                    
                    numbers+=char
                    
                }
                
            }else if (uniChar !== 40 && uniChar !== 41) {
                
                simbols.push(char)
                
            }
            
        }
        Precode=uniChar;
    }

    

    if (isNumber(numbers)) {
        
        numbersP.push(numbers)
        
    }
    

    if (numbersP.length === 3) {

        if (simbols[simbols.length-1] === "-" && simbols[1] !== "/") {
            if(simbols[0]==="-"){
                numbersP[0]=simbols.shift()+numbersP[0]
            }
        }
        
        if (simbols.length === 3) {
            
            if ((simbols[1] === "*" || simbols[1] === "÷" ) && simbols[2] === "-"){
                
                numbersP[2] = simbols.splice(2,1)+numbersP[2]
                
            }
        }
        
        if (simbols.length > 0) {
            if ((simbols[0] === "*" || simbols[0] === "÷" ) && simbols[1] === "-") {
                
                numbersP[2] = simbols.splice(1,1)+numbersP[2]
                
            }
        }

        if (simbols.length===4) {

            if (simbols[0] === "-" && simbols[2] === "-") {
                simbols.shift()
                simbols.splice(1, 1)
            }
            
        }

        if  (simbols[0] === "/") {
            if(simbols.length===3){
                if(simbols[1]==="-"&&(simbols[2]==="+"||simbols[2]==="-")){
                    numbersP[0]="-"+numbersP[0];
                    if(simbols[2]==="+"){
                        simbols[1]='+';
                    }
                }
            }
            if (simbols[1] !== "÷") {
                if (simbols[1] === "*") {
                    Result=forstr(numbersP[0],numbersP[2])+"/"+numbersP[1]
                }else if (simbols[1] === "-") {
                    Result=minusstr(numbersP[0],forstr(numbersP[2],numbersP[1]))+"/"+numbersP[1]                    
                }else{
                    Result=plusstr(numbersP[0],forstr(numbersP[2],numbersP[1]))+"/"+numbersP[1]
                }
                                
            }else if (BiggerThan(absstr(numbersP[2]), "0")) {

                let mcd = MCDStr(numbersP[0], numbersP[2])
                
                if (LessThan(mcd, "2")) {
                    Result=numbersP[0]+"/"+forstr(numbersP[1],numbersP[2])
                }else{
                    let mcd = MCDStr(numbersP[0], numbersP[2])
                    Result=dividestr(numbersP[0],mcd,128)
                    Result+="/"+forstr(numbersP[1],dividestr(numbersP[2],mcd,128))
                }
            }            
        }
        else if (simbols[0] === "+") {
            if(simbols[simbols.length-1]==="-"){
                Result=minusstr(forstr(numbersP[2],numbersP[0]),numbersP[1])+"/"+numbersP[2]
            }else{
                Result=plusstr(forstr(numbersP[2],numbersP[0]),numbersP[1])+"/"+numbersP[2]
            }
        }
        else if (simbols[0] === "-") {
            if (simbols.length === 3) {
                let b=forstr(numbersP[1],numbersP[2]);
                    if(numbersP[0].includes("-")){
                        if(simbols[0]==="-"){
                            Result=plusstr(numbersP[0],b)+"/"+numbersP[2]
                        }else{
                            Result=minusstr(numbersP[0],b)+"/"+numbersP[2]
                        }
                    }else{
                        numbersP[0]=simbols[0]+numbersP[0];
                        if(simbols[1]==="+"){
                            Result=plusstr(numbersP[0],b)+"/"+numbersP[2]
                        }else{
                            if(simbols[0]==="-"&&simbols[1]==="-"){
                                Result=minusstr(numbersP[0],b)+"/"+numbersP[2]
                            }else{
                                if(simbols[simbols.length-1]==="+"){
                                    Result=plusstr(numbersP[0],b)+"/"+numbersP[1]
                                } else if(simbols[simbols.length-1]==="-"&&simbols[0]==="-"){
                                    const nP0 = numbersP[0].split("-").join("").split("+").join("");
                                    const strCmp = ""+nP0+simbols[0]+numbersP[1]+simbols[1]+simbols[2]+numbersP[2]; 
                                    if(Str===strCmp){
                                        Result=plusstr(nP0,b)+"/"+numbersP[2]
                                    }else{
                                        Result=minusstr(numbersP[0],b)+"/"+numbersP[1]    
                                    }
                                }else{
                                    if(simbols[simbols.length-1]==='*'){
                                        Result=forstr(numbersP[0],numbersP[2])+"/"+numbersP[1];
                                    } else if(simbols[simbols.length-1]==='/'||simbols[simbols.length-1]==='÷'){
                                        Result=numbersP[0]+"/"+forstr(numbersP[1],numbersP[2]);
                                    }else{
                                        Result=minusstr(numbersP[0],b)+"/"+numbersP[1];
                                    }
                                }
                            }
                        }
                    }
                    
            }else{
                Result=minusstr(forstr(numbersP[2],numbersP[0]),numbersP[1])+"/"+numbersP[2]
            }

        }
        else if (simbols[0] === "÷") {
            let mcd = MCDStr(numbersP[1], numbersP[0])
            
            if (LessThan(mcd, "2")) {
                
                Result=forstr(numbersP[0],numbersP[2])+"/"+numbersP[1]
                
            }else{
                Result=forstr(dividestr(numbersP[0], mcd, 128),numbersP[2])
                Result+="/"+dividestr(numbersP[1], mcd,128)
            }
            
        }else if (simbols[0] === "*") {
            Result=forstr(numbersP[0], numbersP[1])+"/"+numbersP[2]
        }
        
    }
    else /*if (numbersP[0] !== "0")*/ {
        if (simbols.length > 2 && ( (simbols[2] === "*" || simbols[2] === "÷") && simbols[3] === "-")){
            
            numbersP[2] = simbols.splice(3,1)+numbersP[2]
            
        }
        if (simbols.length > 2) {
            if ((simbols[1] === "*" || simbols[1] === "÷") && simbols[2] === "-"){
                
                numbersP[2] = simbols.splice(2,1)+numbersP[2]
                
            }
        }
        if (simbols[0] === "-") {
            numbersP[0] = simbols.shift()+numbersP[0];
            if(numbersP[0]==='-0'){
                numbersP[0]='0'
            }
            if(simbols[1]==="-"&&(simbols[2]==="-"||simbols[2]==="+")){
                numbersP[0]=numbersP[0].split('-').join("");
            }
            if(simbols[2]==="+"){
                simbols[1]="+"
            }
        }else if (simbols[1]==="-"&&simbols[2]!=="/"){
            numbersP[0] = "-"+numbersP[0];
            if(simbols[2]==="+"){
                simbols[1]="+"
            }
        }
        if(simbols[simbols.length-1]==="-"){
            if(simbols[simbols.length-3]==="-"){
                simbols[simbols.length-3]="+"
            } else if(simbols[simbols.length-3]==="+"){
                simbols[simbols.length-3]="-"
            } 
            if(simbols[simbols.length-4]==="-"){
                simbols[simbols.length-4]="+"
            } else if(simbols[simbols.length-4]==="+"){
                simbols[simbols.length-4]="-"
            }
        }
        if (simbols.length > 1 && numbersP.length > 3) {
            if (simbols[1] === "+" || simbols[1] === "-"){
                
                if (numbersP[1] === numbersP[3]) {
                    if (simbols[1]==="-") {
                        if(simbols[2]==='-'){
                        }
                        let minustr=minusstr(numbersP[0], numbersP[2])
                        let mcd = MCDStr(minustr, numbersP[3])
                            Result=minustr+"/"+numbersP[3]
                            
                            if (BiggerThan(mcd, "1")) {
                                Result=dividestr(minustr,mcd,128)+"/"+dividestr(numbersP[3], mcd, 128)
                            }
                    
                    }
                    else if (simbols[1]==="+") {
                        let plustr=plusstr(numbersP[0], numbersP[2])
                        let mcd = MCDStr(plustr, numbersP[3])
                        Result=plustr+"/"+numbersP[3]
                        
                        if (BiggerThan(mcd, "1")) {
                            Result=dividestr(plustr,mcd,128)+"/"+dividestr(numbersP[3], mcd, 128)
                        }
                    }
                }else{
                    var a=forstr(numbersP[0], numbersP[3])
                    let b=forstr(numbersP[1], numbersP[2])
                    let c=forstr(numbersP[1], numbersP[3])
            
                    if (simbols[1] === "+") {
                        a=plusstr(a,b)
                        let mcd = MCDStr(a, c)
                        Result=a+"/"+c
                        if (BiggerThan(mcd, "1")) {
                            Result=dividestr(a,mcd,128)+"/"+dividestr(c, mcd, 128)
                        }
                        
                    }else{
                        a=minusstr(a, b)
                        let mcd = MCDStr(a, c)
                        Result=a+"/"+c
                        if (BiggerThan(mcd, "1")) {
                            Result=dividestr(a,mcd,128)+"/"+dividestr(c, mcd, 128)
                        }
                    }
                }
                
            }
            else if (simbols[1] === "*") {
                let a=forstr(numbersP[0], numbersP[2])
                let b=forstr(numbersP[1], numbersP[3])
                let mcd = MCDStr(a, b);
                Result=a+"/"+b
                if (BiggerThan(mcd, "1")) {
                    Result=dividestr(a,mcd,128)+"/"+dividestr(b,mcd,128)
                }
            }
            else if (simbols[1] === "÷") {
                let a=forstr(numbersP[0], numbersP[3])
                let b=forstr(numbersP[1], numbersP[2])
                let mcd = MCDStr(a, b)
                
                Result=a+"/"+b
                if (BiggerThan(mcd, "1")) {
                    
                    Result=dividestr(a,mcd,128)+"/"+dividestr(b,mcd,128)
                    
                }
            }
            
        }
        
    }
    return Result
}