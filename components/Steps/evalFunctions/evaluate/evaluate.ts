import { DepurarI, DepurarR, Pref } from '../clean/clean';
import strToLang from '../lang';
import { Context } from '../process/context';
import { EvalCos } from './evalCos';
import { EvalDiv } from './evalDiv';
import { EvalLn } from './evalLn';
import { EvalLog10 } from './evalLog10';
import { EvalLog2 } from './evalLog2';
import { EvalMinus } from './evalMinus';
import { EvalPercent } from './evalPercent';
import { EvalPlux } from './evalPlux';
import { EvalPow } from './evalPow';
import { EvalSen } from './evalSen';
import { EvalSqrt } from './evalSqrt';
import { EvalSum } from './evalSum';
import { EvalTan } from './evalTan';

export const Pstrltx = (s: string,context: Context) => {
    context.strltx += "<p class='pProcess' style='text-align:center;' >`" + s + "`</p>"
}

export const Evaluate=(str: any,context: Context)=>{
        //Entrada de datos
        let STR:any=[]
        let OP:any=[]
        let S:any=[]
        context.res = ""
        context.str1 = ""
        context.str2 = ""
        context.str3 = ""
        context.change = false
        
        try{
            context.res=strToLang("DigitEx")
            
            //Data clean
            if (context.BSC){
                STR=DepurarI(str, context)
            }
            else{
                STR=DepurarR(str, context)
            }
            
            
            while (STR.length>0) {
                switch (Pref(STR[STR.length-1])) {
                    case 1:
                        OP.push(STR.pop()!)
                    break
                        
                    case 2:
                        while (OP.length > 0 && OP[OP.length-1] !== "(") {
                            S.push(OP.pop()!)
                        }
                        
                        OP.pop()
                        
                        STR.pop()
                        break
                    case 3:
                    case 4:
                    case 5:
                        while (OP.length > 0 && Pref(OP[OP.length-1]) >= Pref(STR[STR.length-1])) {
                            S.push(OP.pop()!)
                        }
                        
                        OP.push(STR.pop()!)
                        break
                        
                    default:
                        S.push(STR.pop()!)
                } 
            }
            //STR.removeAll()
            STR.splice(0)
            while (S.length>0) {
                STR.push(S.pop()!)
            }
            S.splice(0)
            while (STR.length>0) {
                
                switch (STR[STR.length-1]) {
                case "+":
                    STR.pop()
                    
                    let auxStr = S[S.length-1] === undefined ? "+": S.pop()
                    let aux1Str = S[S.length-1] === undefined ? "+": S.pop()
                    EvalSum(auxStr!, aux1Str!, context)

                    S.push( context.res )
                    
                    break
                case "-":
                    STR.pop()
                    
                    auxStr = S[S.length-1] === undefined ? "-": S.pop()
                    aux1Str=S[S.length-1] === undefined ? "-": S.pop()
                    EvalMinus(auxStr, aux1Str, context)
                    
                    S.push( context.res )
                    
                    break
                case "·":
                case "⋅":
                case "×":
                case "*":
                    const sm = STR.pop()
                    
                    auxStr = S[S.length-1] === undefined ? sm: S.pop()
                    aux1Str=S[S.length-1] === undefined ? sm: S.pop()
                    EvalPlux(auxStr, aux1Str, sm, context)

                    S.push( context.res )
                    
                    break
                case "/":
                    STR.pop()

                    auxStr = S[S.length-1] === undefined ? "÷": S.pop()
                    aux1Str=S[S.length-1] === undefined ? "÷": S.pop()
                    EvalDiv(auxStr, aux1Str, context)
                    
                    S.push( context.res )

                    break
                case "√":
                    STR.pop()
                    auxStr = S[S.length-1] === undefined ? "": S.pop()
                    aux1Str=S[S.length-1] === undefined ? "": S.pop()
                    const replaceB = (S.length > 0 && STR.length > 0 && Pref(STR[0]) !== 99)
                    EvalSqrt(auxStr, aux1Str, replaceB, context)
                    
                    S.push( context.res )

                    break
                case "^":
                    STR.pop()
                    auxStr = S[S.length-1] === undefined ? "0":S.pop()
                    aux1Str=S[S.length-1] === undefined ? "0": S.pop()
                    EvalPow(auxStr, aux1Str, context)
                    
                    S.push( context.res )

                    break
                case 'log':
                case "ln":
                    const smL = STR.pop()

                    auxStr = S[S.length-1] === undefined ? "0": S.pop()
                    EvalLn(auxStr,smL, context)

                    S.push( context.res )

                    break
                case "log10":
                    STR.pop()

                    auxStr = S[S.length-1] === undefined ? "0": S.pop()
                    EvalLog10(auxStr, context)

                    S.push( context.res )

                    break
                case "log2":
                    STR.pop()
                    auxStr = S[S.length-1] === undefined ? "0": S.pop()
                    EvalLog2(auxStr, context)

                    S.push( context.res )

                    break
                case "c":
                    STR.pop()

                    auxStr = S[S.length-1] === undefined ? "c" : S.pop()
                    EvalCos(auxStr, context)

                    S.push( context.res )

                    break
                case "s":
                    STR.pop()

                    auxStr = S[S.length-1] === undefined ? "s" : S.pop()
                    EvalSen(auxStr, context)

                    S.push( context.res )

                    break
                case "t":
                    STR.pop()

                    auxStr = S[S.length-1] === undefined ? "t" : S.pop()
                    EvalTan(auxStr,context)

                    S.push( context.res )

                    break
                case "%":
                    STR.pop()

                    auxStr = S[S.length-1] === undefined ? "%": S.pop()
                    aux1Str=S[S.length-1] === undefined ? "%": S.pop()
                    EvalPercent(auxStr, aux1Str, context)

                    S.push( context.res )

                    break
                default:
                    S.push(STR.pop())
                //break
                }
            }
        }catch(e){
            console.log(e)
        }
        if(S[S.length-1]===undefined){
            S.push(strToLang("DigitEx"))
        }
            return S[S.length-1].split('pi').join(Math.PI.toString());
        
     }