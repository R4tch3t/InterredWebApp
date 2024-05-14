import { isNumber } from '../mathString/mathString';
import { Context } from '../process/context';
export const cleanstrD = (s: string, context:Context) => {
    let previusUnichar = 0
    let changePolarid=false
    let str=s.split('')
    var s=""
    let OP:string[]=[]
    
    while (str.length>0) {
        var char = str.shift();
        var uniChar = char?.charCodeAt(0)!
        var nextUnichar = 0

        if (str.length>0) {
            nextUnichar = str[0].charCodeAt(0)
        }
        
        if ((uniChar > 47 && uniChar<58) || uniChar===46 || uniChar===120703 || uniChar === 960) {//Si es numero
            if (previusUnichar === 41 || previusUnichar === 120703 || previusUnichar === 960) {
                s+=",*,"
                context.strDevelopment+="*"
            }

            if (uniChar === 120703 || uniChar === 960) {
                s+="pi"
                context.strDevelopment+="pi"
            }else{
                s+=char
                context.strDevelopment+=char
            }

            if (nextUnichar === 120703 || nextUnichar === 960) {
                s+=",*,"
                context.strDevelopment+="*"
            }

            if (nextUnichar === 40) {
                s+=",*"
                context.strDevelopment+="*"
            }
            
            
        }
        
        if (((uniChar > 36 && uniChar<46) || uniChar===47 || uniChar===94 || uniChar===183 || uniChar===215 || uniChar===8730 || uniChar===8901 || (uniChar>94 && uniChar<123)) && uniChar !== 44) {//Si es simbolo
            
            if (uniChar === 45 && ((nextUnichar > 47 && nextUnichar < 58) || (nextUnichar > 96 && nextUnichar < 123) || nextUnichar === 46 || nextUnichar === 120703 || nextUnichar === 960) && ((previusUnichar > 47 && previusUnichar < 58) || (previusUnichar > 96 && previusUnichar < 123) || previusUnichar === 41 || previusUnichar === 46 || previusUnichar === 120703 || previusUnichar === 960)) { //Si a - b= a + -b
                if(context.BSC){
                    s+=","+char+","
                    context.strDevelopment+=char
                }else{
                    s+=",+,"+char
                    context.strDevelopment+=char
                }
            }
            else if (uniChar === 45 && (((nextUnichar > 47 && nextUnichar < 58) || (nextUnichar > 96 && nextUnichar < 123) || nextUnichar === 46) && !(((previusUnichar > 47 && previusUnichar < 58) || (previusUnichar > 96 && previusUnichar < 123) || previusUnichar === 41) || previusUnichar === 46))) { //Si a -[.-+*()..]b
                s+=","+char
                context.strDevelopment+=char
            }else if (previusUnichar !== 44 && uniChar === 45 && nextUnichar === 40 && context.BSC){
                //+-*/()-(0-9[aA-zZ])
                char = str.shift()!
                uniChar = char.charCodeAt(0)
                OP.push(char)
                
                if (str.length>0) {
                    nextUnichar = str[0].charCodeAt(0)
                }
                if (((previusUnichar > 47 && previusUnichar<58 || previusUnichar===46))||previusUnichar === 41) {
                    s+=",+,"
                    context.strDevelopment+="+"
                }
                s+=","+char+","
                context.strDevelopment+=char
                if ((nextUnichar > 47 && nextUnichar<58 || nextUnichar===46)){
                    s+="-"
                    context.strDevelopment+="-"
                }
                var numStr="";
                changePolarid=true
                while (OP.length>0 && str.length>0) {
                    previusUnichar=uniChar
                    char = str.shift()!
                    uniChar = char.charCodeAt(0)
                    if (str.length>0) {
                        nextUnichar = str[0].charCodeAt(0)
                    }
                    if (uniChar === 45 && nextUnichar === 40) {
                        if (previusUnichar !== 42 && previusUnichar !== 215 && previusUnichar !== 47) {
                            changePolarid=false
                        }
                        else{
                            changePolarid=true
                        }
                    }
                    if (uniChar === 43 && nextUnichar === 40) {
                        changePolarid=true
                    }
                    
                    if ((uniChar === 47 || uniChar === 42 || uniChar === 215) && nextUnichar === 40) {
                        changePolarid=false
                    }
                    
                    if (uniChar === 40) {
                        OP.push(char)
                        
                        s+=","+char+","
                        context.strDevelopment+=char
                        
                        if ((nextUnichar > 47 && nextUnichar<58 || nextUnichar===46) && changePolarid){
                            s+="-"
                            context.strDevelopment+="-"
                        }
                        numStr=""
                    }else
                        if (uniChar === 41) {
                            OP.pop()
                            if (isNumber(numStr)) {
                                if (numStr.includes(".")) {
                                    s+=numStr+","
                                    context.strDevelopment+=numStr
                                }else{
                                    s+=numStr+","
                                    context.strDevelopment+=numStr
                                }
                                numStr=""
                            }
                            changePolarid=true
                            s+=","+char+","
                            context.strDevelopment+=char
                        }else if ((uniChar > 47 && uniChar<58 || uniChar===46)){
                            numStr+=char
                        }else if (uniChar === 43) {
                            if (isNumber(numStr)) {
                                if (numStr.includes(".")) {
                                    s+=numStr+","
                                    context.strDevelopment+=numStr
                                }else{
                                    s+=numStr+","
                                    context.strDevelopment+=numStr
                                }
                                numStr=""
                            }
                            if (nextUnichar === 40 || !changePolarid) {
                                s+="+,"
                                context.strDevelopment+="+"
                            }else{
                                s+="+,-"
                                context.strDevelopment+="-"
                            }
                        }
                        else if (uniChar === 45) {
                            if (isNumber(numStr)) {
                                if (numStr.includes(".")) {
                                    s+=numStr+","
                                    context.strDevelopment+=numStr
                                }else{
                                    s+=numStr+","
                                    context.strDevelopment+=numStr
                                }
                                numStr=""
                            }
                            if ((previusUnichar !== 42 && previusUnichar !== 215 && previusUnichar !== 47) && changePolarid) {
                                if (previusUnichar !== 40) {
                                    s+="+,"
                                    context.strDevelopment+="+"
                                }
                            }else{
                                if (nextUnichar !== 40){
                                    if  ((previusUnichar > 47 && previusUnichar<58 || previusUnichar===46) ){
                                        s+=",+,"
                                    }
                                    s+="-"
                                    context.strDevelopment+="-"
                                }else{
                                    if (previusUnichar !== 40 && previusUnichar !== 47 && previusUnichar !== 42 && previusUnichar !== 215) {
                                        s+="+,"
                                        context.strDevelopment+="+"
                                    }
                                    else if (previusUnichar === 47 || previusUnichar === 42) {
                                        
                                    }
                                }
                            }
                            
                        }
                        else{
                            if (isNumber(numStr)) {
                                if (numStr.includes(".")) {
                                    s+=numStr+","
                                    context.strDevelopment+=numStr
                                }else{
                                    s+=numStr+","
                                    context.strDevelopment+=numStr
                                }
                                numStr=""
                            }
                            s+=","+char+","
                            context.strDevelopment+=char
                    }
                    
                }
                
                    
            } else if (uniChar>94 && uniChar<123) {
                if ((nextUnichar > 47 && nextUnichar < 58) || nextUnichar === 46) {
                    s += char + ","
                } else {
                    s += char
                }
                //s+=char
                context.strDevelopment+=char
            } else if (uniChar === 8730 && previusUnichar !== 41 && !(previusUnichar > 47 && previusUnichar < 58)) {
                    s+="2,"+char+","
                    context.strDevelopment+="2"+char
               
            } else {
                s+=","+char+","
                context.strDevelopment+=char
            }
            
        }
        
        previusUnichar=uniChar
        
    }
    return s
}