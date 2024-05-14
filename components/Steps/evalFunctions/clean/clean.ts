import { Evaluate } from '../evaluate/evaluate';
import { dividestr } from '../mathString/divideStr';
import { forstr } from '../mathString/forStr';
import { isNumber, DoubleStr, addZeros, MCDStr, absstr, BiggerThan, isFrac } from '../mathString/mathString';
import { plusstr } from '../mathString/plusStr';
import { Context } from '../process/context';
import { cleanstrD } from './cleanstrD';
//
//  Clean.swift
//  Calculus Lite
//
//  Created by Victor Manuel Santamaria on 09/11/16.
//  Copyright © 2016 Victor Manuel Santamaria. All rights reserved.
//    
    
    export const prepareStrDevelopment=(str:string, rstr:string, context: Context)=>{

        str = str.toLowerCase()
        context.strDevelopment = context.strDevelopment.toLowerCase()
        context.strDevelopment = context.strDevelopment.split(str).join(rstr)
    }

    export const Pref=(op: string)=>{
        let prf=99
        
        if (op==="^"||op==="√"||op==="c"||op==="t"||op==="s"||op==="ln"||op==='log'||op==="log10"||op==="log2"){
            prf=5
        }
        
        if (op==="*"||op==="·"||op==="/"||op==="%"||op==="⋅"||op==="×"){
            prf=4
        }
        
        if (op === "+" || op === "-" || op === '–') {
            prf=3
        }
        
        if (op===")"){
            prf=2
        }
        
        if (op==="("){
            prf=1
        }
        return prf
    }

   export const PrefF = (op: string) => {
        let prf = 99
        if (op === "+" || op === "-") {
            prf = 3
        }

        if (op === "*" || op === "·" || op === "/" || op === "%" || op === "⋅" || op === "×") {
            prf = 4
        }

        if (op === "^" || op === "√" || op === "c" || op === "t" || op === "s" || op === "ln" || op === 'log' || op === "log10" || op === "log2") {
            prf = 5
        }

        if (op === ")") {
            prf = 2
        }

        if (op === "(") {
            prf = 1
        }
        return prf
    }
    
    export const replacestrs=(str: string)=>{
        let rstr = str.split('c').join('C O S');
        rstr = rstr.split('s').join('S E N');
        if (!rstr.includes("I n f")){
            rstr = rstr.split('t').join('T A N')
        }
        return rstr
    }
    
    export const scanNumbers=(s: string, par: any)=>{
        let Fun=""
        let numbers=""
        let PreuniChar = 0
        let PreChar = ''
        let band=false
        let Str=s
        let codes=Str.split('')
        
        while (codes.length>0) {
            let char = codes.shift()!
            let uniChar = char.charCodeAt(0)

            if ((uniChar > 47 && uniChar < 58 ) || uniChar === 46) {
               
                numbers+=char
                
            }else{
              
                if (uniChar === 47 || uniChar === 247) {
                    band=true
                }
                
                if (uniChar === 40) {
                    band=false
                    if (PreuniChar === 45) {
                        numbers = numbers.split('-').join('');
                        Fun+="-"
                    }
                }
                
                if (isNumber(numbers)) {
                    
                    if (band && !par){

                            let tof = tofrac(DoubleStr(numbers))
                            if(tof.includes('-')){
                                tof = "+(" +tof + ")"+char
                                Fun+=tof
                                Fun=Fun.split("+(+").join("+(")
                                Fun=Fun.split("+((+").join("+((")
                            }else{
                                tof = "(" +tof + ")"+char
                                Fun+=tof
                            }                           
                        
                    }else{
                        if (band) {
                                let tof = tofrac(DoubleStr(numbers))
                                if(tof.includes('-')){
                                    tof = "+(" +tof + ")"+char
                                    Fun+=tof
                                    Fun=Fun.split("+(+").join("+(")
                                    Fun=Fun.split("+((+").join("+((")
                                }else{
                                    tof = "(" +tof + ")"+char
                                    Fun+=tof
                                }                               
                            
                        }else{                            
                            const tof = tofrac(DoubleStr(numbers))+char;
                            Fun+=tof                        
                        }
                    }
                    
                    numbers=""
                    if (uniChar !== 47 && uniChar !== 247) {
                        band=false
                    }

                }else if (uniChar === 45) {
                    let nextChar = codes[0]?codes[0]:''
                    let nextUniChar = nextChar.charCodeAt(0)

                    if (((PreuniChar > 38 && PreuniChar<46 || PreuniChar===47||PreuniChar===183||PreuniChar===0||PreuniChar===247) && PreuniChar !== 44 && par)||(((nextUniChar > 64 && nextUniChar < 91)||(nextUniChar > 96 && nextUniChar < 123)))) {
                   
                        Fun+=char
                        
                    }else{
                        numbers+=char
                    }
                    
                }else{
                    
                    Fun+=char
                    
                }
               
            }
            PreuniChar=uniChar;
            PreChar=char;
            
        }
        
        if ((PreuniChar === 45 && Fun === "") || numbers === "-") {
                   Fun+=PreChar
        }
        
        if (isNumber(numbers)) {
            
            if (band && !par) {
                    let tof = tofrac(DoubleStr(numbers))
                    if(tof.includes('-')){
                        tof = "+(" +tof + ")"
                        Fun+=tof
                        Fun=Fun.split("+(+").join("+(")
                        Fun=Fun.split("+((+").join("+((")
                    }else{
                        tof = "(" +tof + ")"
                        Fun+=tof
                    }                    
            }else{
                if (band) {
                    let tof = tofrac(DoubleStr(numbers))
                    if(tof.includes('-')){
                        tof = "+(" +tof + ")"
                        Fun+=tof
                        Fun=Fun.split("+(+").join("+(")
                        Fun=Fun.split("+((+").join("+((")
                    }else{
                        tof = "(" +tof + ")"
                        Fun+=tof
                    }
                   
                }else{
                    Fun+=tofrac(DoubleStr(numbers))
                }
            }
            
        }
        return Fun
    }
    
    export const isInt = (str: any) => {       
        return (!str.includes(".") && isNumber(str))
    }
    
    // Decimal a Fraccion ... 
    export const tofrac=(D: any) => {
    let str=D
    let arrStr=str.split(".")
   
        if (arrStr.length>1) {
            let a=arrStr[1]
            let Count=a.length
            let b="2"
           
            a=arrStr[1]
            b=addZeros(Count)
            let MCD = MCDStr(a, b) // MCD para simplificar la "fraccion"
            a=dividestr(a, MCD, Count)
            
                b=dividestr(b,MCD,Count)
            
                if (arrStr[0] !== "0") {
                    a = plusstr(absstr(a), absstr(forstr(arrStr[0], b)))
                }
                
                if (arrStr[0].includes("-")) {
                    a="-"+a
                }
                
                str=a

                if (BiggerThan(b, "1")) {
                    str=str+"/"+b
                }
            
        }
        
       return  str           
    }
    
    export const cleanR = (str: string) => {
        let aux="", rstr=".0"

        let arrStr=str
        var str = ""
        
        let i=0, j=0, k=0
        while (i<arrStr.length) {
            k=i
            aux=""
            if((i+2)<=arrStr.length){
                while (j<2) {
                    
                    aux+=arrStr[k]
                    
                    j+=1
                    k+=1
                }
            }
            
            if(aux===rstr){
                
                if (i+2>=arrStr.length) {
                    
                    break
                }
                str+=arrStr[i]
            }
            else{
                str+=arrStr[i]
            }
            j=0;
            i+=1;
        }
        str = str.split("Infinity").join("I n f i n i t y") 
        return str
    }
    
    export const esPrimo = (i: number) => {
        let a = 1
        let n = 0
        
        while(a < i+1){
            if (i%a === 0){
                n+=1
            }
            a+=1
        }
        
        if (n !== 2) {
            return false
        }
        
        return true
    }

    export const DepurarR = (str: any, context: Context) => {
        
        let s=str        
        let STR:any=[]
        let OP:any=[]
        
        s=s.split(' ').join("")
        s=s.split(')(').join(")*(")
        s=s.toLowerCase()
        s=s.split("cos").join("c")
        s=s.split("sen").join("s")
        s = s.split("tan").join("t")
        
        var str=s.split('')
        s=""
        var previusUnichar = 0
        while (str.length>0) {
            var char = str.shift()
            var uniChar = char.charCodeAt(0)
            var nextUnichar = 0
            if (str.length>0) {
                nextUnichar=str[0].charCodeAt(0)
            }
            if ((uniChar > 47 && uniChar < 58) || uniChar === 46 || uniChar === 120703 || uniChar === 960) { //Si es numero
                
                if (previusUnichar === 41 || (previusUnichar === 120703 || previusUnichar === 960)) {
                    s+=",*,"
                }

                if (uniChar === 120703 || uniChar === 960) {
                    s+="pi"
                }else{
                        s+=char
                }

                if (nextUnichar === 120703 || nextUnichar === 960) {
                    s+=",*,"
                }

                if (nextUnichar === 40) {
                    s+=",*"
                }
                
            }
            
            if (((uniChar > 36 && uniChar<46) || uniChar===47 || uniChar===94 || uniChar===215 || uniChar===183 || uniChar===8730 || uniChar===8901 ||  (uniChar>94 && uniChar<123)) && uniChar !== 44) {//Si es simbolo
                //a,+,-b
                if (uniChar === 45 && ((nextUnichar > 47 && nextUnichar < 58) || (nextUnichar > 96 && nextUnichar < 123) || nextUnichar === 46 || nextUnichar === 120703 || nextUnichar === 960) && ((previusUnichar > 47 && previusUnichar < 58) || (previusUnichar > 96 && previusUnichar < 123) || previusUnichar === 41 || previusUnichar === 46 || previusUnichar === 120703 || previusUnichar === 960)) { //Si a - b= a + -b                   
                    if (context.toDecimalVal===0){
                        s+=",+,"+char
                    }else{
                        s+=","+char+","
                    }
                }
                else if (uniChar === 45 && (((nextUnichar > 47 && nextUnichar < 58) || (nextUnichar > 96 && nextUnichar < 123) || nextUnichar === 46) && !(((previusUnichar > 47 && previusUnichar < 58) || (previusUnichar > 96 && previusUnichar < 123) || previusUnichar === 41) || previusUnichar === 46))) { //Si a -[.-+*()..]b
                    s+=","+char //a,-,b
                }else if (previusUnichar !== 44 && uniChar === 45 && nextUnichar === 40) {
                    var aux = ""
                    //+-*/()-(0-9[aA-zZ])
                    if ((previusUnichar > 47 && previusUnichar<58 || previusUnichar===46) || previusUnichar === 41) {
                        s+=",+,"
                    }
                    char = str.shift()
                    uniChar = char.charCodeAt(0)
                    OP.push(char)

                    if (str.length>0) {
                        nextUnichar = str[0].charCodeAt(0)
                    }
                    
                    while (OP.length>0 && str.length>0) {
                        previusUnichar=uniChar
                        char = str.shift()
                        uniChar = char.charCodeAt(0)
                        if (str.length>0) {
                            nextUnichar = str[0].charCodeAt(0)
                        }
                        
                        if (uniChar === 40) {
                            OP.push(char)
                            //"("
                            aux+=char
                     
                        }
                        else if (uniChar === 41) {
                            OP.shift()
                     //")"
                            if (OP.length>0) {
                                aux+=char
                            }
                            }else{
                                aux+=char 
                            }
                        
                    }
                    //let s32 = []
                    
                    
                    
                    aux=Evaluate(aux,context)
                    context.strDevelopment=context.strDevelopment.split("("+aux+")").join(aux)
                    let sqrtC = 0
                    //let sqrtN = 43
                    if (str.length > 0) {
                        sqrtC = str[0].charCodeAt(0)                        
                    }
                    
                    if (isFrac(aux) || context.toDecimalVal===1) {
                        if (!aux.includes("-")) {
                            
                            s+="-"+aux
                            context.strDevelopment=context.strDevelopment.split("-"+aux).join("+ -"+aux)
                            if (sqrtC === 8730){
                                context.strDevelopment=context.strDevelopment.split("+ +").join("+")
                            }
                        }else{
                            s += aux.split('-').join("")
                            s=cleanR(s)
                        }
                        
                    }
                
                } else if (uniChar>94 && uniChar<123) {
                    if ((nextUnichar > 47 && nextUnichar < 58) || nextUnichar===46) {
                        s+=char+","
                    }else{
                        s+=char
                    }
                } else if (uniChar === 8730 && previusUnichar!==41 && !(previusUnichar > 47 && previusUnichar < 58)) {
                    s += "2," + char + ","
                } else {
                    s+=","+char+","
                }
                
            }
            
            previusUnichar=uniChar

            
        }
        
        context.strDevelopment=context.strDevelopment.split("*--").join("*")
        context.strDevelopment=context.strDevelopment.split("log10*").join("log_10")
       context.strDevelopment=context.strDevelopment.split("log2*").join("log_2")
       context.strDevelopment=context.strDevelopment.split("/--").join("/")

        

        s="(,"+s+",)"
        s=s.split(",,").join(",")
        s=s.split("-+").join("-")
        s=s.split(",--").join(",")
        s=s.split("(--").join("(")
        s=s.split("log,10,*").join("log10")
        s=s.split("log,2,*").join("log2")

        STR=s.split(",")
        return STR.reverse()
    }

    export const DepurarI=(str: string, context: Context)=>{
        let s=str;
        let STR:any=[];
        s = s.split(' ').join('');
        s = s.split(')(').join(')*(');
        s=s.toLowerCase();
        s = s.split('cos').join('c');
        s = s.split('sen').join('s');
        s = s.split('tan').join('t');

        context.strDevelopment=""
        s=cleanstrD(s,context)
        context.strDevelopment=context.strDevelopment.split("log10*").join("log_10")
        context.strDevelopment=context.strDevelopment.split("log2*").join("log_2")
        s="(,"+s+",)"
        s=s.replace(/,,/g,',')
        
        s=s.replace(/\-\+/g,'-')
        //
        s = s.split("log,10,*").join("log10")
        s = s.split("log,2,*").join("log2")

        STR=s.split(",")
        
        return STR.reverse()
    }
    
 
