
import { isEqualAfter } from '../evaluate/expresion';
import { Context } from '../process/context';
import { replacestrs, scanNumbers } from './clean';

export const removeAt=(str:string, char_pos:number) => {
    const part1 = str.substring(0, char_pos);
    const part2 = str.substring(char_pos + 1, str.length);
    return (part1 + part2);
}

export const StepLatex=(str1: string, str2: string, rstr: string, rstr2: string, res: any, change: any, band: any, context: Context)=>{      
        let tofrac=""
        let  i=0, j=rstr.length, k=str2.length, l=0, straux=""
        let strArr=str2.split('');

        var OP: any=[];
        if (band) {
            context.strltx+="<div class='card divSteps' style='background: transparent' >"
            context.strltx+="<div class='card-body' style='background: transparent' >"
            context.strltx+="<p>`"+str1+"`"
        }

        context.strDevelopment=""        
        while (l<=k-j) {
            if ((strArr[l] === "-" && strArr[l+1] === "(" /*&& RM*/) || strArr[l] === "(" /*&& IM*/){
                OP.push("(")
            }


            if (strArr[l] === ")") {
                OP.pop()
            }

            straux=""
            i=0
            while (i<j) {
                straux += strArr[i+l]
                i+=1
            }

                       
            if (straux === rstr) {
                if (!isEqualAfter(strArr, l+j, j, k,rstr,OP))  {
                    rstr = rstr.split('inf').join('(inf)');
                    rstr2 = rstr2.split('inf').join('(inf)');
                    rstr = rstr.split('nan').join('(nan)');
                    rstr2 = rstr2.split('nan').join('(nan)');

                    if (rstr.includes("c") || rstr2.includes("c")) {
                        rstr = rstr.split('c').join('C O S');
                        rstr2 = rstr2.split('c').join('C O S');
                    }

                    if (rstr.includes("s") || rstr2.includes("s")) {
                        rstr = rstr.split('s').join('S E N');
                        rstr2 = rstr2.split('s').join('S E N');
                    }

                    if(rstr.includes("t") || rstr2.includes("t")){
                        if (!rstr.includes("I n f") && !rstr.includes("Inf")) {
                            rstr = rstr.split('t').join('T A N');
                        }
                        if (!rstr2.includes("I n f") && !rstr2.includes("Inf")) {
                            rstr2 = rstr2.split('t').join('T A N');
                        }
                    }
                    if (l>0) {

                        if (strArr[l-1]==="(") {
                            if (l<(k-j)) {
                                if (strArr[l+j]===")") {
                                    strArr.splice(l - 1,1)
                                }
                                else{
                                    i=0
                                    if (band) {
                                        context.strltx+="`"
                                    }
                                    tofrac=""
                                    while (i<l) {
                                        tofrac+=strArr[i]
                                        context.strDevelopment+=strArr[i]
                                        i+=1
                                    }

                                    context.strDevelopment+=res

                                    //Intercambio rstr
                                    tofrac=replacestrs(tofrac)
                                    
                                    if (change) {

                                        if (context.toDecimalVal === 1) {
                                            if (band) {
                                                context.strltx+=tofrac
                                                context.strltx+="color(red)("+rstr2+")"
                                            }

                                        }else{
                                            if (band) {
                                                context.strltx+=scanNumbers(tofrac,false)
                                                context.strltx+="color(red)("+scanNumbers(rstr2,false)+")"
                                            }
                                        }

                                    }else{
                                        if (context.toDecimalVal === 1) {
                                            if (band) {
                                                context.strltx+=tofrac
                                                context.strltx+="color(red)("+rstr+")"
                                            }
                                        }else{
                                            if (band) {
                                                context.strltx+=scanNumbers(tofrac,false)
                                                context.strltx+="color(red)("+scanNumbers(rstr,false)+")"
                                            }

                                        }

                                    }

                                    i+=j
                                    tofrac=""
                                    while (i<k) {
                                        tofrac+=strArr[i]
                                        context.strDevelopment+=strArr[i]
                                        i+=1
                                    }

                                    tofrac=replacestrs(tofrac)

                                    if (context.toDecimalVal === 1) {
                                        if (band) {
                                            context.strltx+=tofrac
                                        }
                                    }else{
                                        if (band) {
                                            context.strltx+=scanNumbers(tofrac,false)
                                        }
                                    }
                                    if (band) {
                                        context.strltx+="`</p>"
                                    }

                                }

                            } else
                            {

                                i=0
                                tofrac=""
                                if (band) {
                                    context.strltx+="`"
                                }
                                while (i<l) {
                                    tofrac+=strArr[i]
                                    context.strDevelopment+=strArr[i]
                                    i+=1
                                }

                                context.strDevelopment+=res
                                tofrac=replacestrs(tofrac)
                                
                                if (change) {
                                    if (context.toDecimalVal === 1) {
                                        if (band) {
                                            context.strltx+=tofrac
                                            context.strltx+="color(red)(("+rstr2+"))"
                                        }
                                    }else{
                                        if (band) {
                                            context.strltx+=scanNumbers(tofrac,false)
                                            context.strltx+="color(red)(("+scanNumbers(rstr2,true)+"))"
                                        }
                                    }
                                }else{
                                    if (context.toDecimalVal === 1) {
                                        if (band) {
                                            context.strltx+=tofrac
                                            context.strltx+="color(red)(("+rstr+"))"
                                        }
                                    }else{
                                        if (band) {
                                            context.strltx+=scanNumbers(tofrac,false)
                                            context.strltx+="color(red)(("+scanNumbers(rstr,true)+"))"
                                        }
                                    }
                                }

                                i=l+j
                                tofrac=""
                                while (i<k) {
                                    context.strDevelopment+=strArr[i]
                                    tofrac+=strArr[i]
                                    i+=1
                                }
                                tofrac=replacestrs(tofrac)
                                if (context.toDecimalVal === 1) {
                                    if (band) {
                                        context.strltx+=tofrac
                                    }
                                }else{
                                    if (band) {
                                        context.strltx+=scanNumbers(tofrac,false)
                                    }
                                }
                                if (band) {
                                    context.strltx+="`</p>"
                                }
                            }

                        }else{
                            i=0
                            tofrac=""
                            if (band) {
                                context.strltx+="`"
                            }
                            while (i<l) {
                                tofrac+=strArr[i]
                                context.strDevelopment+=strArr[i]
                                i+=1
                            }
                            context.strDevelopment+=res
                            i=l+j
                            tofrac=replacestrs(tofrac)
                            
                            if (change) {
                                if (context.toDecimalVal === 1) {
                                    if (band) {
                                        context.strltx+=tofrac
                                        context.strltx+="color(red)("+rstr2+")"
                                    }
                                }else{
                                    if (band) {
                                        context.strltx+=scanNumbers(tofrac,false)
                                        context.strltx+="color(red)("+scanNumbers(rstr2,false)+")"
                                    }
                                }

                            }else{
                                if (context.toDecimalVal === 1) {
                                    if (band) {
                                        context.strltx+=tofrac
                                        context.strltx+="color(red)("+rstr+")"
                                    }
                                }else{
                                    if (band) {
                                        context.strltx+=scanNumbers(tofrac,false)
                                        context.strltx+="color(red)("+scanNumbers(rstr,false)+")"
                                    }
                                }
                            }
                            tofrac=""
                            while (i<k) {

                                context.strDevelopment+=strArr[i]
                                tofrac+=strArr[i]
                                i+=1

                            }
                            tofrac=replacestrs(tofrac)

                            if (context.toDecimalVal === 1) {
                                if (band) {
                                    context.strltx+=tofrac
                                }
                            }else{
                                if (band) {
                                    context.strltx+=scanNumbers(tofrac,false)
                                }
                            }
                            if (band) {
                                context.strltx+="`</p>"
                            }
                        }


                        if (l<k-j && tofrac === "") {


                            if (strArr[l+j-1]===")") {
                                //strArr=strArr.removeAt(l + j - 1)
                                strArr.splice(l + j - 1, 1)
                                k-=2
                                i=0
                                tofrac=""
                                if (band) {
                                    context.strltx+="`"
                                }

                                while (i<l-1) {
                                    context.strDevelopment+=strArr[i]
                                    tofrac+=strArr[i]
                                    i+=1
                                }
                                context.strDevelopment+=res
                                i=l+j-1
                                tofrac=replacestrs(tofrac)
                                
                                if (change) {
                                    if (context.toDecimalVal === 1) {
                                        if (band) {
                                            context.strltx+=tofrac
                                            context.strltx+="(color(red)("+rstr2+"))"
                                        }
                                    }else{
                                        if (band) {
                                            context.strltx+=scanNumbers(tofrac,false)
                                            context.strltx+="(color(red)("+scanNumbers(rstr2,true)+"))"
                                        }
                                    }

                                }else{
                                    if (context.toDecimalVal === 1) {
                                        if (band) {
                                            context.strltx+=tofrac
                                            context.strltx+="(color(red)("+rstr+"))"
                                        }
                                    }else{
                                        if (band) {
                                            context.strltx+=scanNumbers(tofrac,false)
                                            context.strltx+="(color(red)("+scanNumbers(rstr,true)+"))"
                                        }
                                    }
                                }

                                tofrac=""
                                while (i<k) {
                                    context.strDevelopment+=strArr[i]
                                    tofrac+=strArr[i]
                                    i+=1
                                }
                                tofrac=replacestrs(tofrac)
                                if (context.toDecimalVal === 1) {
                                    if (band) {
                                        context.strltx+=tofrac
                                    }
                                }else{
                                    if (band) {
                                        context.strltx+=scanNumbers(tofrac,false)
                                    }
                                }
                                if (band) {
                                    context.strltx+="`</p>"
                                }
                            }

                        }

                    }else{

                        i=0
                        tofrac=""
                        if (band) {
                            context.strltx+="`"
                        }
                        while (i<l-1) {
                            context.strDevelopment+=strArr[i]
                            tofrac+=strArr[i]
                            i+=1
                        }

                        context.strDevelopment+=res
                        tofrac=replacestrs(tofrac)
                        
                        if (change) {
                            if (context.toDecimalVal === 1) {
                                if (band) {
                                    context.strltx+=tofrac
                                    context.strltx+="color(red)("+rstr2+")"
                                }
                            }else{
                                if (band) {
                                    context.strltx+=scanNumbers(tofrac,false)
                                    context.strltx+="color(red)("+scanNumbers(rstr2,false)+")"
                                }
                            }

                        }else{
                            if (context.toDecimalVal === 1){
                                if (band) {
                                    context.strltx+=tofrac
                                    context.strltx+="color(red)("+rstr+")"
                                }
                            }else{
                                
                                if (band) {
                                    
                                    context.strltx+=scanNumbers(tofrac,false)
                                
                                    context.strltx+="color(red)("+scanNumbers(rstr,false)+")"
                                    
                                }
                            }
                        }

                        i=l+j
                        tofrac=""
                        while (i<k) {
                            context.strDevelopment+=strArr[i]
                            tofrac+=strArr[i]
                            i+=1
                        }
                        tofrac=replacestrs(tofrac)
                        if (context.toDecimalVal === 1) {
                            if (band) {
                                context.strltx+=tofrac
                            }
                        }else{
                            if (band) {
                                context.strltx+=scanNumbers(tofrac,false)
                            }
                        }
                        if (band) {
                            context.strltx+="`</p>"
                        }
                    }
                    context.strDevelopment = context.strDevelopment.split('--').join('+');
                    context.strDevelopment = context.strDevelopment.split('++').join('+');
                    context.strDevelopment = context.strDevelopment.split('-+').join('-');
                    context.strDevelopment = context.strDevelopment.split('+-').join('-');
                    context.strDevelopment = context.strDevelopment.split('/+').join('/');
                    context.strDevelopment = context.strDevelopment.split('*+').join('*');
                    context.strDevelopment = context.strDevelopment.split('(+').join('(');
                    context.strDevelopment = context.strDevelopment.split('c+').join('c');
                    context.strDevelopment = context.strDevelopment.split('s+').join('s');
                    context.strDevelopment = context.strDevelopment.split('t+').join('t');
                    context.strDevelopment = context.strDevelopment.split('+ +').join('+');
                    break;
                }
            }

            l+=1

        }

    }