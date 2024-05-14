import { Pstrltx } from '../evaluate/evaluate';
import { powTwoFactor, stepFPlus1, stepFPlus2, stepFDiv3, stepFPlus3, stepFPlus4 } from '../evaluate/factorPlus';
import { factorPow } from '../evaluate/factorPow';
import { factorSum } from '../evaluate/factorSum';
import strToLang from '../lang';
import { Context } from '../process/context';
import { DepurarI, DepurarR, PrefF } from './clean';
import { cleanstrDF, removeStrokesDevs } from './cleanstrDF';
import { StepLatex } from './stepLatex';
export const genSltx = (str1: string,str2: any,res: string,str1N: string,redRes: string, context: Context) => {
    
    context.strltx += "<div class='card divSteps' style='background: transparent' >"
    context.strltx += "<div class='card-body' style='background: transparent' >"
    context.strltx += "<p>`" + str1 + redRes + "`</p>"
    
    Pstrltx(str1N, context)        

    context.strltx += "</div>"
    context.strltx += "</div>"
}

export const StepsFactor = (str: any, context: Context) => {
    
    //Entrada de datos
    let STR: any[]=[]
    let OP: any[]=[]
    let S: any[]=[]
    context.res = ""
    context.str1 = ""
    context.str2 = ""
    context.str3 = ""
    context.change = false
    
    try{
        context.res=strToLang("DigitEx")
        //Data clean
        if (context.BSC){
            STR=DepurarI(str,context)
        }
        else{
            STR=DepurarR(str,context)
        }

        
        while (STR.length>0) {
            switch (PrefF(STR[STR.length-1])) {
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
                    while (OP.length > 0 && PrefF(OP[OP.length-1]) >= PrefF(STR[STR.length-1])) {
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
        OP = []
        //console.log('stepsF: ',STR)
        if(context.bandMatchFactor){
            STR=cleanstrDF(STR+"",context);
        }
        //console.log('stepsFB: ',STR,' strltx ',context.strltx)
        while (STR.length>0) {            
            /*if(STR[STR.length-1].startsWith('+^')){

            }else*/
            switch (STR[STR.length-1]) {
            case "-":
            case "+":
                factorSum(STR, S, OP,context);
                //console.log('afFS: ',STR)
                break
            case "/":
            case "·":
            case "⋅":
            case "×":
            case "*":    
                let sign = STR.pop()
                let auxStr = S[S.length - 1] === undefined ? '' : S.pop();
                let aux1Str = S[S.length - 1] === undefined ? '' : S.pop();
                auxStr=auxStr!.split("+-").join("-");
                aux1Str=aux1Str!.split("+-").join("-");
                //let arrStr = auxStr.split("");
               // let arr1Str = aux1Str.split("");               
                let c = 0
                let c2 = 0
                let prevPow = -1
                let resArr = []
                let bandMul = true
                let powArr = []
                const subRes = ["", "", "", ""]
                const numberArr = []
                const charArr = [];
                let charStr = auxStr.match(/[A-Z]/gi);
                let char1Str = aux1Str.match(/[A-Z]/gi);
                const charStr0 = (charStr?charStr[0]:"");
                const char1Str0 = (char1Str?char1Str[0]:"");
                let splitAux = auxStr.split(charStr0+"^");
                let split1Aux = aux1Str.split(char1Str0+"^");
                //console.log('op.l0: ',OP.length)
                if(split1Aux.length>1){
                    powTwoFactor(aux1Str,OP);
                    if(splitAux.length<2){
                       OP=OP.reverse();
                    }
                }

                if(splitAux.length>1){
                    powTwoFactor(auxStr,OP);
                }
                
                //console.log('auxStr ',auxStr,' splitAux ',splitAux)
                //console.log('aux1Str ',aux1Str,' split1Aux ',split1Aux)
                //console.log('OP ',OP[0],' OP.l ',OP.length)
                if(OP.length<2){
                    let a: any[] = [];
                    let auxChar:string | null = null;
                    let auxNum:string | null = null;
                    
                    if(!aux1Str.includes(char1Str0+"^")){

                        let auxPow = 1;
                        auxChar = aux1Str.match(/[A-Z]/gi);
                        //auxChar = auxChar ? auxChar:'' 
                        if(!auxChar){
                            auxChar="";
                            auxPow=0;
                        }
                        auxNum = aux1Str.split(auxChar).join("");
                        if(auxNum===""){
                            auxNum="1"
                        }
                        
                        if(!auxNum!.includes("+")/*&&!auxNum.includes("-")*/){
                            a.push([auxNum+"",auxChar,auxPow]);
                            OP.push(a);
                        }
                        a = [];
                    }
                    //console.log('OP.<2L ',OP.length,' OP[2] ',OP[1])
                    //console.log(' auxStr ',auxStr)
                    if(!auxStr.includes(charStr0+"^")&&OP.length<2){
                        let auxPow = 1;
                        auxChar = auxStr.match(/[A-Z]/gi);
                        if(!auxChar){
                            auxChar="";
                            auxPow=0;
                        }
                        auxNum = auxStr.split(auxChar).join("");
                        if(auxNum===""){
                            auxNum="1"
                        }

                        if(!auxNum!.includes("+")/*&&!auxNum.includes("-")*/){
                            a.push([auxNum+"",auxChar,auxPow]);
                            OP.push(a);
                        }

                    }
                }


                if (/*!STR.length &&*/ OP.length > 0) {
                    let a = null//OP.shift()//.reverse()
                    let b = null//OP.shift().reverse()
                    //console.log('res*0: ',context.res)
                    context.res = stepFPlus1(OP, sign);
                   // console.log('res*FPL1: ',context.res)
                   // OP.map(v=>{
                   //     console.log(v)
                   // })
                    context.res = context.res.split("(+").join("(").split("+-").join("-");
                    if(sign!=="/"){
                        if(!auxStr.includes("+")&&!auxStr.includes("-")){
                            context.res=context.res.replace("("+auxStr+")",auxStr);
                        }
                        if(!aux1Str.includes("+")&&!aux1Str.includes("-")){
                            context.res=context.res.replace("("+aux1Str+")",aux1Str);
                        }
                    }else{

                        if(aux1Str.includes('-')){

                                context.strDevelopment=context.strDevelopment.split(aux1Str+"/"+auxStr).join("+("+aux1Str+")/("+auxStr+")");
                                context.strDevelopment=context.strDevelopment.split("+((+").join("+((");
                                context.strDevelopment=context.strDevelopment.split("+(+").join("+(");
                            
                        }else{
                            context.strDevelopment=context.strDevelopment.split(aux1Str+"/"+auxStr).join("("+aux1Str+")/("+auxStr+")");
                        }
                    }
                    
                    context.strDevelopment=context.strDevelopment.split(" ").join("")
                    
                    if(!context.res.includes(auxStr)||!context.res.includes(aux1Str)){
                        if(context.strDevelopment.includes(context.res)){
                            context.strDevelopment=context.res;
                        }else{
                            if(sign==='/'){
                                context.strDevelopment=context.strDevelopment.replace("(("+aux1Str+"))","("+aux1Str+")");  
                            }
                            context.strDevelopment=context.strDevelopment.replace("("+aux1Str+")"+sign+"("+auxStr+")",context.res)
                            context.strDevelopment=context.strDevelopment.replace("("+aux1Str+")"+sign+""+auxStr+"",context.res)
                            context.strDevelopment=context.strDevelopment.replace(""+aux1Str+""+sign+"("+auxStr+")",context.res)
                            context.strDevelopment=context.strDevelopment.replace(""+aux1Str+""+sign+""+auxStr+"",context.res)
                        }

                    }else if(!context.strDevelopment.includes(context.res)){ 
                        removeStrokesDevs(context.res, auxStr, aux1Str, char1Str0,context)
                        if(!context.strDevelopment.includes(context.res)){
                            context.res=context.strDevelopment;
                        }
                    }else if(STR.length>0){
                        if(context.strDevelopment.includes(context.res+"/")){
                            context.strDevelopment=context.strDevelopment.split(context.res).join("("+context.res+")");
                            context.res=context.strDevelopment;
                        }
                    }

                    context.StepsC += 1;
                    context.str1 = strToLang("Paso") + context.StepsC.toString() + ": quad"
                    context.str2 = context.strDevelopment
                    context.str2=context.str2.split("+-").join("-");
                    StepLatex(context.str1, context.strDevelopment, context.res, context.str3, context.res, context.change, true, context);
                    context.str1 = "-> "
                    context.str2 = "[ " + context.str2 + " ]"
                    context.str1 = context.str1 + context.str2 + " = " + context.strDevelopment
                    Pstrltx(context.str1, context)
                    context.strltx += "</div>"
                    context.strltx += "</div>"   
                    
                    c=0
                    c2=0
                    a=OP.shift()
                    b=OP.shift()
                    while(bandMul){
                        bandMul = OP.length>0;
                            context.res = stepFPlus2(a!,b!,sign);
                            context.res = context.res.split("+-").join("-");
                        if(sign==="/"){
                                stepFDiv3(a!,b!,subRes,powArr,sign);
                        }else{
                            stepFPlus3(a!,b!,subRes,powArr,sign);
                        }
                        stepFPlus4(powArr,subRes,resArr);
                        
                        
                        context.StepsC += 1;
                        context.str1 = strToLang("Paso") + context.StepsC.toString() + ": quad"

                        context.str2 = context.res
                        context.str2=context.str2.split("(+").join("(");
                        const firstLot = resArr.pop()
                        context.res = (firstLot![0] === 1 ? "" : firstLot![0] === -1?"-":firstLot![0]);

                        if(firstLot![2]>1){
                            context.res += "" + firstLot![1] + "^" + firstLot![2];
                        }else if(firstLot![2]<2){
                            context.res += "" + firstLot![1];
                        }

                        if(firstLot![2]<0){
                            
                            context.res = context.res.split('/');
                            const nPow = firstLot![2]*-1; 
                            context.res = context.res[0] + "/(" + context.res[1] + firstLot![1] + (nPow>1? "^" + nPow +")":")");
                            
                        }

                        while (resArr.length) {
                            const lot:any = resArr.pop()
                            let nFirst:any = lot![0]+""
                            
                            if(nFirst&&nFirst.includes("/")){
                                const arrL = lot[0].split("/")
                                nFirst = parseInt(arrL[0])/parseInt(arrL[1])
                                if(nFirst>-1&&nFirst<0){
                                    nFirst=-2;
                                }
                                if(arrL[1]==='0'){
                                    nFirst=0;
                                }
                            }
                            
                            if (lot[1]===""){
                                context.res += ((nFirst > -1) ? "+" + lot[0] : ((nFirst < 0) ? ("" + lot[0]) : lot[0] )) + ""
                            }else{
                                context.res += (nFirst === 1 ? "+" : nFirst === -1 ? ("-") : (nFirst > -1 ? ("+" + (nFirst > -1 ? lot[0]:'')) : (nFirst < 0 ? (lot[0]) : lot[0]))) 
                                context.res += ((lot[2] > 1 || lot[2] < 0) ? lot[1] + "^" + lot[2] : (lot[2]===1?lot[1]:""))
                            }
                        }

                        context.res = context.res.split("xx").join("x").split('+-').join('-');
                        if(sign!=="/"){
                            if(!auxStr.includes("+")&&!auxStr.includes("-")){
                                context.str2=context.str2.replace("("+auxStr+")",auxStr);
                            }
                            if(!aux1Str.includes("+")&&!aux1Str.includes("-")){
                                context.str2=context.str2.replace("("+aux1Str+")",aux1Str);
                            }
                        }
                        
                        let str1N = "-> "
                        str1N += "[ "+context.str2+" ] =" + " [ " + subRes[0] + " ] "
                        let redRes = '';

                        if(!context.strDevelopment.includes(context.str2)){
                            context.str2=context.strDevelopment;
                            redRes = "color(red)("+context.strDevelopment+")";
                        }else{
                            redRes = context.strDevelopment.replace(context.str2,"color(red)("+context.str2+")")
                        }
                        context.res=context.res.split("+1x").join("+x").split("+1y").join("+y").split("+1z").join("+z");
                        context.res=context.res.split("-1x").join("-x").split("-1y").join("-y").split("-1z").join("-z");
                        context.strDevelopment = context.strDevelopment.replace(context.str2,"color(red)(" + context.res + ")");

                        genSltx(context.str1,context.str2,context.str2,str1N,redRes, context);

                        context.StepsC += 1;
                        context.str1 = strToLang("Paso") + context.StepsC.toString() + ": quad"
                        let newRes = "color(red)(" + subRes[0] + ")"
                        context.strDevelopment = context.strDevelopment.replace("color(red)(" + context.res + ")","("+newRes+")")
                        context.str2 = context.strDevelopment
                        context.str1 = context.str1 + context.str2
                        str1N = "-> "
                        str1N += "[ "+newRes+" ] =" + " [ " + subRes[1] + " ] "
                        genSltx(context.str1,context.str2,newRes,str1N,'',context);
                        
                        context.StepsC += 1;
                        context.str1 = strToLang("Paso") + context.StepsC.toString() + ": quad"
                        newRes = " " + subRes[1] + " "
                        context.strDevelopment = context.strDevelopment.replace("color(red)(" + subRes[0] + ")",newRes)
                        if(sign==="/"){
                            if(aux1Str.includes('-')/*&&!newRes.includes("^(color(red)")*/){  
                                const subNewRes = subRes[1]
                                if(!newRes.includes("^(color(red)")){
                                    subRes[1]="color(red)("+newRes+")";
                                }
                                context.strDevelopment = context.strDevelopment.replace("+(" + newRes + ")",subRes[1]);
                                context.strDevelopment = context.strDevelopment.split("+("+aux1Str+")/("+auxStr+")").join(subRes[1]);
                            }
                        }
                        context.str2 = context.strDevelopment
                        context.str1 = context.str1 + context.str2
                        str1N = "-> "
                        str1N += "[ "+newRes+" ] =" + " " + subRes[2] + " "
                        genSltx(context.str1,context.str2,newRes,str1N,'',context);
                        
                        context.StepsC += 1;
                        context.str1 = strToLang("Paso") + context.StepsC.toString() + ": quad"
                        newRes = "color(red)(" + subRes[2] + ")"
                        context.strDevelopment = context.strDevelopment.replace("" + subRes[1],newRes)
                        if(sign==="/"){
                            //if(parseInt(aux1Str)&&parseInt(aux1Str)<0){
                            if(aux1Str.includes('-')/*&&!newRes.includes("^(color(red)")*/){    
                                context.strDevelopment = context.strDevelopment.split("" + subRes[1]).join(subRes[2]);
                                if(newRes.includes("^(color(red)")){
                                    let bandSplit = true;
                                    let splitRes = aux1Str.split('+');
                                    if(splitRes.length>1){
                                        bandSplit = false
                                    }
                                    splitRes = aux1Str.split('-');
                                    if(splitRes.length>2){
                                        bandSplit = false
                                    }
                                    if(bandSplit){
                                        context.strDevelopment = context.strDevelopment.split("( "+newRes+" )").join(newRes);
                                    }
                                }
                            }
                        }
                        context.str2 = context.strDevelopment
                        context.str1 = context.str1 + context.str2
                        str1N = "-> "
                        str1N += "[ "+newRes+" ] =" + " " + subRes[3] + " "
                        genSltx(context.str1,context.str2,newRes,str1N,'',context);
                        
                        context.StepsC += 1;
                        context.str1 = strToLang("Paso") + context.StepsC.toString() + ": quad"
                        newRes = " " + subRes[3] + " "
                        context.strDevelopment = context.strDevelopment.replace("color(red)(" + subRes[2] + ")",newRes)
                        context.str2 = context.strDevelopment
                        context.str1 = context.str1 + context.str2
                        str1N = "-> "
                        str1N = "[ "+newRes+" ] =" + " " + context.res + " "
                        genSltx(context.str1,context.str2,newRes,str1N,'',context);
                        context.res = context.res.replace(" ","");
                        
                        if(!subRes[3].includes("+")&&!subRes[3].includes("-")){
                            context.strDevelopment = context.strDevelopment.split(" ").join('');
                            context.strDevelopment = context.strDevelopment.replace("(" + subRes[3] + ")",context.res);
                        }else{
                            context.strDevelopment = context.strDevelopment.replace("" + subRes[3],context.res);
                        }

                        S.push(context.res)
                        b=OP.shift();
                        resArr=[];
                        powArr=[];
                        c2=0;
                        subRes[0]=""
                        subRes[1]=""
                        subRes[2]=""
                        subRes[3]=""
                      //  console.log('STR* ',STR)
                    }
                }
                break
            case "√":
                STR.pop()
                break
            case "^":
                factorPow(STR, S, OP,context);   
                break
            case 'log':
            case "ln":
                STR.pop()
                break
            case "log10":
                STR.pop()
                break
            case "log2":
                STR.pop()

                break
            case "c":
                STR.pop()

                break
            case "s":
                STR.pop()

                break
            case "t":
                STR.pop()

                break
            case "%":
                STR.pop()

                break
            default:
                S.push(STR.pop()+"")
            //break
            }
        }
        //console.log("ResSS: "+S)
    }catch(e){
        console.log(e)
    }
    if(S[S.length-1]===undefined){
        S.push(strToLang("DigitEx"))
    }
    return S[S.length-1].split('pi').join(Math.PI.toString());
}