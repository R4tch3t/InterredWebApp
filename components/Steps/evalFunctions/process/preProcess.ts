import { Context } from "./context";
import { cleanstrD } from "../clean/cleanstrD";
import { DevPow } from "../clean/devPow";
import { StepsFactor } from "../clean/stepsFactor";
import strToLang from "../lang";
import { Evaluate } from "../evaluate/evaluate";
import { DoubleStr, isNumber } from "../mathString/mathString";
import { tofrac } from "../clean/clean";

export const removeSteps = (context:Context) => {
    context.strltx = "";
    context.StepsC = 0
}

export const Preprocess = (s:string, context:Context) => {                
            context.strOrigin = s.split(' ').join("")
            context.strDevelopment = ""            
            context.strOrigin = context.strOrigin.toLowerCase().split('cos').join("c")            
            context.strOrigin = context.strOrigin.split('sen').join("s")            
            context.strOrigin = context.strOrigin.split('tan').join("t")           
            cleanstrD(context.strOrigin,context)            
            context.strDevelopment = context.strDevelopment.split(')(').join(")*(")
            removeSteps(context)            
            var ev = ''
            
            if (s.match(/[X-Z]/gi)){
                s=DevPow(s, context);
                context.strOrigin = s.split(' ').join("");
                context.strDevelopment = ""
                context.strOrigin = context.strOrigin.toLowerCase().split('cos').join("c")
                context.strOrigin = context.strOrigin.split('sen').join("s")
                context.strOrigin = context.strOrigin.split('tan').join("t")
                cleanstrD(context.strOrigin, context)
                context.strDevelopment = context.strDevelopment.split(')(').join(")*(")                
                            
                const a = s.match(/[X-Z]/gi)!
                let bandEv = true;
                let lastE = a[0];
                a.map((e)=>{
                    if(lastE!==e){
                        bandEv = false;
                    }
                    lastE=e;
                });
                context.strDevelopment = context.strDevelopment.split(a[0]+'(').join(a[0]+"*(")
                s = s.split(a[0]+'(').join(a[0]+"*(")

                if(bandEv){
                    
                    ev = StepsFactor(s, context);
                }else{
                    ev=strToLang("WrongEx");                   
                }
            }else{
                ev = Evaluate(s, context)
            }

            if (context.toDecimalVal !== 1) {
                if (isNumber(ev)) {
                    ev = tofrac(DoubleStr(ev))

                }
            }

            if(!s){
                ev='Write quad an quad e x pression'
            }
            
            context.strltx += (context.StepsC>0?"<br><br>":"") + "<p style='text-align:center; font-size: 32px' >`color(green)(RR = " + ev + ")`</p>"
            //createHtmlatex(setHtml, context)
           
}

