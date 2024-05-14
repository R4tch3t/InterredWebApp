import { Pstrltx } from "../evaluate/evaluate";
import strToLang from "../lang";
import { Context } from "../process/context";
import { StepLatex } from "./stepLatex";

export const cleanstrDF = (s: string, context: Context) => {
    let previusUnichar = 0
    let changePolarid=false
    let str=s.split(',')
    let c = 0;
    const l = s.match(/[A-Z]/gi)
    let match:any = []
    while(c<str.length){
        if(str[c]==="^"){
            let nc = str[c+2]
            match.push("^,"+str[c+1]+","+str[c+2]);
            c+=2
        }
        c++;
    }

    while(match.length>0){
        const c = match.pop();
        const cs = c.split(",")
        const r = cs[2]+cs[0]+cs[1]
        s=s.split(c).join(r);        
    }
    s=devIfPow(s.split(','),l![0],context)
    return s.split(",")
}

const devIfPow = (s:string[],auxChar:string, context: Context) => {
    let c = 0
    let powBlock:any = []
    while(c<s.length){
        if(s[c].startsWith('+^')||s[c].startsWith('-^')){
            let powFactor:any = s.shift()
            const auxPowBlock:any = []
            let resAux = ''
            let c2 = 0
            while(s.length>0&&s[s.length-1].includes(auxChar)){
                auxPowBlock.unshift(s.pop()!)                
            }
            if(s.length>0){
                if(!s[s.length-1].includes(auxChar)){
                    auxPowBlock.unshift(s.pop()!)
                }
            }
            powFactor=powFactor?.replace('^','').replace('^','')
            auxPowBlock.unshift(powFactor![0])
            powFactor=powFactor?.replace('-','').replace('+','')
            powFactor=parseInt(powFactor)
            while(c2<powFactor){                
                
                powBlock=auxPowBlock.concat(powBlock)
                //powBlock.unshift(auxPowBlock)
                if((powBlock.length%2)===0){
                    powBlock.unshift('*')                    
                }
                //powFactor--
                c2++
            }
            //powBlock.unshift('*')
            s=powBlock.concat(s)

            resAux=auxPowBlock.shift()
            while(auxPowBlock.length>0){                
                resAux=auxPowBlock.pop()+resAux
                resAux+=auxPowBlock.pop()
            }
            const blockAux='('+resAux+")"
            resAux=blockAux
            c2=1
            while(c2<powFactor){
                resAux+="*"+blockAux    
                c2++
            }
            context.StepsC += 1;
            context.str1 = strToLang("Paso") + context.StepsC.toString() + ": quad"
            context.str2 = context.strDevelopment
            context.res = context.strDevelopment.split("-").join("+");
            context.res = resAux
            StepLatex(context.str1, context.strDevelopment, context.str2, context.str3, context.res, context.change, true, context)
            context.str1 = "-> "
            context.str2 = "[ " + context.str2 + " ]"
            context.str1 = context.str1 + context.str2 + " = " + context.res
            Pstrltx(context.str1, context)
            context.strltx += "</div>"
            context.strltx += "</div>"

        }
        c++
    }


    return s.join(',')
}

export const removeStrokesDevs = (res: string | string[], auxStr: string, aux1Str: string, char1Str0: string, context: Context) => {
    if(char1Str0){
        const split1Str = aux1Str.split(char1Str0).join("");
        context.strDevelopment=context.strDevelopment.split(split1Str+'('+char1Str0+')').join("("+split1Str+char1Str0+")");
    }
    let strDev = context.strDevelopment
    const splitPow = strDev.split("^(")
    const aStroke = "("+auxStr+")";
    const a1Stroke = "("+aux1Str+")";
    
    while(splitPow.length){
        let splitV = splitPow.pop()!
        splitV=splitV.split(")/")[0]
        if(strDev.includes("^("+splitV+")/")){
            context.strDevelopment=context.strDevelopment.split("^("+splitV+")").join("^"+splitV+"")       
            if(res.includes(aStroke)&&!context.strDevelopment.includes(aStroke)){
                context.strDevelopment=context.strDevelopment.split(auxStr).join(aStroke)
            }
            if(res.includes(a1Stroke)&&!context.strDevelopment.includes(a1Stroke)){
                context.strDevelopment=context.strDevelopment.split(aux1Str).join(a1Stroke)
            }
        }
    }
   
}

export const cleanMinStrokes = (aux1Str: string, auxStr: string,res: string,context: Context) => {
    if(aux1Str.includes('-')){
        let aux1S = aux1Str.split('(').join("").split(')').join("").split('-').join("");
        let auxS = auxStr.split('(').join("").split(')').join("");
        res=res.split("(-"+aux1S+")/("+auxS+")").join("("+aux1S+")/("+auxS+")");
        context.strDevelopment=context.strDevelopment.split('+(-'+aux1S+')/('+auxS+')').join("-("+aux1S+")/("+auxS+")")
        context.strDevelopment=context.strDevelopment.split('+((-'+aux1S+')/('+auxS+'))').join("-("+aux1S+")/("+auxS+")")
    }
    return res
}