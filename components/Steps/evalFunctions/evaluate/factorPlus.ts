import { EvaluateFrac } from "../mathString/evaluateFrac";

export const powTwoFactor = (auxStr: string, OP: any[][]) => {
    const a:any = [];
    auxStr=auxStr.split("^-").join("^_");
    let split1Aux = auxStr.split("+");
    let c = split1Aux.length-1;    

    while(c>=0){
        if(split1Aux[c].includes('-')){
            let splitMin = split1Aux[c].split('-');
            let ca = splitMin.length-1;
            while(ca>=0){
                let auxChar:any = splitMin[ca].match(/[A-Z]/gi);
                let auxNum:any = ''
                if(splitMin[ca]===(auxChar+"")){
                    auxNum="1"
                }else{
                    auxNum = splitMin[ca].split(auxChar).join("");
                }
                let powNum = auxNum.split('^');
                if(powNum.length>1){
                    auxNum=powNum[0]?powNum[0]:1;
                    powNum[1]=(powNum[1]+"").split("_").join("-");
                    powNum=parseInt(powNum[1]);
                }else{
                    if(auxChar){
                        powNum=1;
                    }else{
                        auxChar=""
                        powNum=0;
                    }
                }

                if(ca>0){
                    auxNum="-"+auxNum
                }

                if(auxNum){
                    a.push([auxNum,auxChar,powNum]);        
                }
                
                ca--;
            }
        }else{
            let auxChar:any = split1Aux[c].match(/[A-Z]/gi);
            let auxNum: any = ''
            if(split1Aux[c]===auxChar+""){
                auxNum="1"
            }else{
                auxNum = split1Aux[c].split(auxChar).join("");
            }
            let powNum = auxNum.split('^');
            if(powNum.length>1){
                auxNum=powNum[0]?powNum[0]:1;
                powNum[1]=(powNum[1]+"").split("_").join("-");
                powNum=parseInt(powNum[1]);
            }else{
                if(auxChar){
                    powNum=1;
                }else{
                    auxChar=""
                    powNum=0;
                }
            }
            a.push([auxNum+"",auxChar,powNum]);
        }
        c--;
    }
    auxStr=auxStr.split("^_").join("^-");
    OP.push(a)
}

export const stepFPlus1 = (OP: string | any[], sign: any) => {
    let a: any = null
    let res = "("
    let c = 0
    let c2 = 0
    //console.log('OP.l: ',OP.length)
    while(c2<OP.length){
        a=OP[c2]
        c = a.length - 1
      //  console.log(' a ',a, ' res ',res)
        while (c > -1) {
            if (a[c][1] === "") {
                if((a[c][0]+"").includes("/")){
                    const arrDiv = a[c][0].split("/");
                    let divInt = parseInt(arrDiv[0])/parseInt(arrDiv[1]);
                    res += divInt > -1 ? "+" + a[c][0] : a[c][0]
                }else{
                    res += parseInt(a[c][0]) > -1 ? "+" + a[c][0] : a[c][0]
                }
            } else {
                if (c === a.length - 1) {
                    if((a[c][0]+"").includes("/")){
                        const arrDiv = a[c][0].split("/")
                        let divInt = parseInt(arrDiv[0])/parseInt(arrDiv[1])
                        res += (((divInt + "") === "1") ? "" : ((divInt + "") === "-1" ? "-" : a[c][0])) + "" + a[c][1] + "" + ((a[c][2] > 1 || a[c][2] < 0) ? ("^" + a[c][2]) : "")
                    }else{
                        res += (((a[c][0] + "") === "1") ? "" : ((a[c][0] + "") === "-1" ? "-" : a[c][0])) + "" + a[c][1] + "" + ((a[c][2] > 1||a[c][2] < 0) ? ("^" + a[c][2]) : "")
                    }
                } else {
                    if((a[c][0]+"").includes("/")){
                        const arrDiv = a[c][0].split("/")
                        let divInt = parseInt(arrDiv[0])/parseInt(arrDiv[1])
                        res += (((divInt + "") === "1") ? "+" : ((divInt + "") === "-1" ? "-" : (divInt > -1 ? "+" + a[c][0] : a[c][0]))) + "" + a[c][1] + "" + ((a[c][2] > 1 || a[c][2] < 0) ? ("^" + a[c][2]) : "")
                    }else{
                        res += (((a[c][0] + "") === "1") ? "+" : ((a[c][0] + "") === "-1" ? "-" : (a[c][0] > -1 ? "+" + a[c][0] : a[c][0]))) + "" + a[c][1] + "" + ((a[c][2] > 1||a[c][2] < 0) ? ("^" + a[c][2]) : "")
                    }
                }
            }

            c--
        }
        c2++
        res += (c2 === OP.length) ? ")" : `)${sign}(`
    }

    return res
}

export const stepFPlus2 = (a: string | any[], b: string | any[], sign: any) => {
    let res = "("
    let c = a.length-1
    while(c>-1){
        if (a[c][1]===""){
            if((a[c][0]+"").includes("/")){
                    const arrDiv = a[c][0].split("/");
                    let divInt = parseInt(arrDiv[0])/parseInt(arrDiv[1]);
                    res += divInt > -1 ? "+" + a[c][0] : a[c][0]
                }else{
                    res += parseInt(a[c][0])>-1 ? "+"+a[c][0] : a[c][0]
                }
        }else{
            if (c === a.length - 1) {
                if((a[c][0]+"").includes("/")){
                    const arrDiv = a[c][0].split("/")
                    let divInt = parseInt(arrDiv[0])/parseInt(arrDiv[1])
                    res += (((divInt + "") === "1") ? "" : ((divInt + "") === "-1" ? "-" : a[c][0])) + "" + a[c][1] + "" + ((a[c][2] > 1||a[c][2] < 0) ? ("^" + a[c][2]) : "");
                }else{
                    res += (((a[c][0] + "") === "1") ? "" : ((a[c][0] + "") === "-1" ? "-" : a[c][0])) + "" + a[c][1] + "" + ((a[c][2] > 1||a[c][2] < 0) ? ("^" + a[c][2]) : "")
                }
            } else {
                if((a[c][0]+"").includes("/")){
                    const arrDiv = a[c][0].split("/")
                    let divInt = parseInt(arrDiv[0])/parseInt(arrDiv[1])
                    res += (((divInt + "") === "1") ? "+" : ((divInt + "") === "-1" ? "-" : (divInt > -1 ? "+" + a[c][0] : a[c][0]))) + "" + a[c][1] + "" + ((a[c][2] > 1||a[c][2] < 0) ? ("^" + a[c][2]) : "")
                }else{
                    res += (((a[c][0] + "") === "1") ? "+" : ((a[c][0] + "") === "-1" ? "-" : (a[c][0] > -1 ? "+" + a[c][0] : a[c][0]))) + "" + a[c][1] + "" + ((a[c][2] > 1||a[c][2] < 0) ? ("^" + a[c][2]) : "")
                }
            }
        }
        c--
    }
    res += `)${sign}(`
    c = b.length - 1
    while (c > -1) {
        if (b[c][1] === "") {
            if((b[c][0]+"").includes("/")){
                const arrDiv = b[c][0].split("/");
                let divInt = parseInt(arrDiv[0])/parseInt(arrDiv[1]);
                res += divInt > -1 ? "+" + b[c][0] : b[c][0]
            }else{
                res += parseInt(b[c][0]) > -1 ? "+" + b[c][0] : b[c][0]
            }
        } else {
            if (c === b.length - 1){
                if((b[c][0]+"").includes("/")){
                    const arrDiv = b[c][0].split("/")
                    let divInt = parseInt(arrDiv[0])/parseInt(arrDiv[1])
                    res += (((divInt + "") === "1") ? "" : ((divInt + "") === "-1" ? "-" : b[c][0])) + "" + b[c][1] + "" + ((b[c][2] > 1||b[c][2] < 0) ? ("^" + b[c][2]) : "")
                }else{
                    res += (((b[c][0] + "") === "1") ? "" : ((b[c][0] + "") === "-1" ? "-" : b[c][0])) + "" + b[c][1] + "" + ((b[c][2] > 1||b[c][2] < 0) ? ("^" + b[c][2]) : "")
                }
            }else{
                if((b[c][0]+"").includes("/")){
                    const arrDiv = b[c][0].split("/")
                    let divInt = parseInt(arrDiv[0])/parseInt(arrDiv[1])
                    res += (((divInt + "") === "1") ? "+" : ((divInt + "") === "-1" ? "-" : (divInt > 0 ? "+" + b[c][0] : b[c][0]))) + "" + b[c][1] + "" + ((b[c][2] > 1||b[c][2] < 0) ? ("^" + b[c][2]) : "")
                }else{
                    res += (((b[c][0] + "") === "1") ? "+" : ((b[c][0] + "") === "-1" ? "-" : (b[c][0] > 0 ? "+" + b[c][0] : b[c][0]))) + "" + b[c][1] + "" + ((b[c][2] > 1||b[c][2] < 0) ? ("^" + b[c][2]) : "")
                }
            }
        }
        c--
    }
    res += ")"
    return res                        
}

export const stepFPlus3 = (a: string | any[], b: string | any[], subRes: any[], powArr: any[][], sign: string) => {
let c = 0;
let c2 = 0;
while(c<a.length){
    const arrA = a[c]
    const charA = arrA[1];
    let powA = arrA[2];
    let consA: any = null;
    let bandFrac = false;
    if((arrA[0]+"").includes("/")){
        consA = arrA[0];
        bandFrac = true;
    }else{
        consA = parseInt(arrA[0]);
    }
    let abyb:any = 0;
    while (c2 < b.length) {
        const arrB = b[c2]
        const charB = arrB[1];
        let powB = arrB[2]
        let consB: any = null;
        if((arrB[0]+"").includes("/")){
            consB = arrB[0];
            abyb=consB;
            bandFrac = true;
        }else{
            consB = parseInt(arrB[0]);
        }

        if(bandFrac){
            if(!(consA+"").includes("/")){
                consA+='/1'
            }
            if(!(consB+"").includes("/")){
                consB+='/1'
            }
            abyb=EvaluateFrac(consA+"*"+consB);
        }else{
            abyb=consA*consB
        }

        let powAB = powA + powB
        let charsA = ""
        let charsB = ""
        let charsPow = ""
        let charsPowAB = ""
        
        if (charB!=="") { 
            powArr.push([powAB, abyb, charB])
            charsB = ((consB === 1) ? "" : (consB === -1 ? "-" : consB)) + charB + ((powB>1||powB<0)?("^"+powB):"")
            if (powAB>1||powAB<1){
                charsPow = (abyb === 1 ? "" : (abyb === -1 ? "-" : abyb)) + "" + charB + "^(color(red)(" + powA + "+" + powB + "))"
                charsPowAB = (abyb === 1 ? "" : (abyb === -1 ? "-" : abyb)) + "" + charB + "^(color(red)(" + powAB + "))"
            } else {
                charsPow = (abyb === 1 ? "" : (abyb === -1 ? "-" : abyb)) + "" + charB
                charsPowAB = (abyb === 1 ? "" : (abyb === -1 ? "-" : abyb)) + "" + charB 
            }
            if (charA !== ""){
                charsA = ((consA === 1) ? "" : (consA === -1 ? "-" : consA)) + charA + ((powA > 1||powA<0) ? ("^" + powA) : "")
            }else{
                charsA = "" + consA + charA
            }
        } else if (charA !== "") {
            powArr.push([powAB, abyb, charA])
            charsA = ((consA === 1) ? "" : (consA === -1 ? "-" : consA)) + charA + ((powA > 1||powA<0) ? ("^" + powA) : "")
            if (powAB > 1||powAB<1) {
                charsPow = (abyb === 1 ? "" : (abyb === -1 ? "-" : abyb)) + "" + charA + "^(color(red)(" + powA + "+" + powB + "))"
                charsPowAB = (abyb === 1 ? "" : (abyb === -1 ? "-" : abyb)) + "" + charA + "^(color(red)(" + powAB + "))"
            }else{
                charsPow = (abyb === 1 ? "" : (abyb === -1 ? "-" : abyb)) + "" + charA
                charsPowAB = (abyb === 1 ? "" : (abyb === -1 ? "-" : abyb)) + "" + charA
            }
            if (charB !== "") {
                charsB = ((consB === 1) ? "" : (consB === -1 ? "-" : consB)) + charB + ((powB > 1||powB < 0) ? ("^" + powB) : "")
            } else {
                charsB = "" + consB + charB
            }
        } else {
            powArr.push([powAB, abyb, ""])
            charsA = "" + consA + charA
            charsB = "" + consB + charB
            charsPow = abyb + "" //(abyb>-1?"+"+abyb:abyb) + ""
            charsPowAB = abyb + ""
        }
        subRes[0] = (c === (a.length-1) && c2 === (b.length-1)?"(color(red)(":"+(color(red)(") + charsA + sign + charsB + "))" + subRes[0]        
        
        if((abyb+"").includes("/")){
            const arrDiv = abyb.split("-").join("").split("/");
            let divInt = parseInt(arrDiv[0])/parseInt(arrDiv[1]);
            subRes[1] = (c === (a.length - 1) && c2 === (b.length - 1) ? "" : divInt>-1?"+":"") + charsPow + "" + subRes[1]
            subRes[2] = (c === (a.length - 1) && c2 === (b.length - 1) ? "" : divInt>-1?"+":"") + charsPowAB + "" + subRes[2]
        }else{
            subRes[1] = (c === (a.length - 1) && c2 === (b.length - 1) ? "" : abyb>-1?"+":"") + charsPow + "" + subRes[1]
            subRes[2] = (c === (a.length - 1) && c2 === (b.length - 1) ? "" : abyb>-1?"+":"") + charsPowAB + "" + subRes[2]
        }
        subRes[1]=subRes[1].split("+-").join("-");
        subRes[2]=subRes[2].split("+-").join("-");       
        c2++

    }
    c2=0
    c++
}
}

export const stepFDiv3 = (a: string | any[], b: string | any[], subRes: any[], powArr: any[][], sign: string) => { 
    let c = 0;
    let c2 = 0;
    while(c<a.length){
        const arrA = a[c]
        const charA = arrA[1];
        let powA = arrA[2]
        if(arrA[0]==='-') arrA[0]='-1';
        let consA = parseInt(arrA[0])
        while (c2 < b.length) {
            const arrB = b[c2]
            const charB = arrB[1];
            let powB = arrB[2]
            if(arrB[0]==='-') arrB[0]='-1';
            let consB = parseInt(arrB[0])
            if((arrA[0]+"").includes("/")){
                const splitA1 = parseInt(arrA[0].split("/")[1])
                consB*=splitA1
            }
            if((arrB[0]+"").includes("/")){
                const splitB1 = parseInt(arrB[0].split("/")[1])
                consA*=splitB1
            }
            let abyb:any = consA + "/" + consB
            let powAB = powA - powB
            let charsA = ""
            let charsB = ""
            let charsPow = ""
            let charsPowAB = ""
            let bandPlus = false;
            
            if(consB<0){
                if(consA>-1){
                    abyb = "-" + consA + "/" + (consB*-1);
                }else{
                    bandPlus = true
                    abyb = (consA*-1) + "/" + (consB*-1);
                }
            }else{
                if(consA<0){
                    abyb = "-" + (consA*-1) + "/" + consB;
                }else{
                    bandPlus = true
                }
            }

            if (charB !== "") {
                powArr.push([powAB, abyb, charB]);
                charsB = ((consB === 1) ? "" : (consB === -1 ? "-" : consB)) + charB + ((powB>1||powB<0)?("^"+powB):"")
                if (powAB>1||powAB<1) {
                    charsPow = (abyb === 1 ? "" : (abyb === -1 ? "-" : abyb)) + "" + charB + "^(color(red)(" + powA + "-" + powB + "))"
                    charsPowAB = (abyb === 1 ? "" : (abyb === -1 ? "-" : abyb)) + "" + charB + "^(color(red)(" + powAB + "))"
                } else {
                    charsPow = (abyb === 1 ? "" : (abyb === -1 ? "-" : abyb)) + "" + charB + "^(color(red)(" + powA + "-" + powB + "))"
                    charsPowAB = (abyb === 1 ? "" : (abyb === -1 ? "-" : abyb)) + "" + charB + "^(color(red)(" + powAB + "))" 
                }
                if (charA !== ""){
                    charsA = ((consA === 1) ? "" : (consA === -1 ? "-" : consA)) + charA + ((powA > 1||powA < 0) ? ("^" + powA) : "")
                }else{
                    charsA = "" + consA + charA
                }

            } else if (charA !== "") {
                powArr.push([powAB, abyb, charA]);
                charsA = ((consA === 1) ? "" : (consA === -1 ? "-" : consA)) + charA + ((powA > 1 || powA < 0) ? ("^" + powA) : "")
                if (powAB>1||powAB<1) {
                    charsPow = (abyb === 1 ? "" : (abyb === -1 ? "-" : abyb)) + "" + charA + "^(color(red)(" + powA + "-" + powB + "))"
                    charsPowAB = (abyb === 1 ? "" : (abyb === -1 ? "-" : abyb)) + "" + charA + "^(color(red)(" + powAB + "))"
                }else{
                    charsPow = (abyb === 1 ? "" : (abyb === -1 ? "-" : abyb)) + "" + charA + "^(color(red)(" + powA + "-" + powB + "))"
                    charsPowAB = (abyb === 1 ? "" : (abyb === -1 ? "-" : abyb)) + "" + charA + "^(color(red)(" + powAB + "))"
                }
                if (charB !== "") {
                    charsB = ((consB === 1) ? "" : (consB === -1 ? "-" : consB)) + charB + ((powB > 1||powB < 0) ? ("^" + powB) : "")
                } else {
                    charsB = "" + consB + charB
                }
            } else {
                powArr.push([powAB, abyb, ""])
                charsA = "" + consA + charA
                charsB = "" + consB + charB
                charsPow = abyb + "" //(abyb>-1?"+"+abyb:abyb) + ""
                charsPowAB = abyb + ""
            }
            subRes[0] = (c === (a.length-1) && c2 === (b.length-1)?"(color(red)(":"+(color(red)(") + "(" +charsA + ")" + sign + "(" + charsB + ")" + "))" + subRes[0]
            subRes[1] = (c === (a.length - 1) && c2 === (b.length - 1) ? "" : (bandPlus)?"+":"") + charsPow + "" + subRes[1]
            subRes[2] = (c === (a.length - 1) && c2 === (b.length - 1) ? "" : (bandPlus)?"+":"") + charsPowAB + "" + subRes[2]
            c2++
        }
        c2=0
        c++
    }
}

export const stepFPlus4 = (powArr: any, subRes: any, resArr: any) => {
    let a:any = [];
    let c=0
    let c2:any=0
    let prevPow = null;
    
    powArr=powArr.sort((a,b)=>{return a[0]-b[0]})
    while(c<powArr.length){
        if(prevPow===powArr[c][0]){
            if((c2+"").includes("/")||(powArr[c][1]+"").includes("/")){
                c2 = powArr[c][1]+"+"+c2
                c2 = c2.split("+-").join("-");
                c2 = EvaluateFrac(c2);
            }else{
                c2 += powArr[c][1]
            }
            const subB = powArr[c][1]
            if (!powArr[c + 1] || prevPow !== powArr[c + 1][0]) {
                if(powArr[c][0]===0){
                    resArr.push([c2, '', powArr[c][0]])
                    a.push([c2, '', powArr[c][0]])
                }else{
                    resArr.push([c2, powArr[c][2], powArr[c][0]])
                    a.push([c2, powArr[c][2], powArr[c][0]])
                }

                if (powArr[c][2]===""){
                    subRes[3] = "color(red)(+" + subB + "" + powArr[c][2] + ((powArr[c][0] > 1) ? "^" + powArr[c][0] : "") + subRes[3]
                }else{
                    if(powArr[c][0]>1||powArr[c][0]<0){
                        subRes[3] = "color(red)(" + ((subB === 1&&(c<powArr.length-1)) ? "+" : (subB === -1 ? "-" : (subB < -1 ? subB : (((c<powArr.length-1)?"+":'') +subB)))) + powArr[c][2] + "^" + powArr[c][0] + subRes[3]
                    } else if (powArr[c][0]===1) {
                        subRes[3] = "color(red)(" + ((subB === 1&&(c<powArr.length-1)) ? "+" : (subB === -1 ? "-" : (subB < -1 ? subB : (((c<powArr.length-1)?"+":'') + subB)))) + powArr[c][2] + subRes[3]
                    }else{
                        subRes[3] = "color(red)(" + ((subB === 1&&(c<powArr.length-1)) ? "+" : (subB === -1 ? "-" : (subB < -1 ? subB : (((c<powArr.length-1)?"+":'') + subB)))) + subRes[3]
                    }
                    
                }
                
                
            }else{
                if(powArr[c][0]===0){
                    powArr[c][2]=''
                }
                subRes[3] = ((subB+"").includes("-")?subB:"+"+subB) + "" + powArr[c][2] + (powArr[c][0] > 1 ? "^" + powArr[c][0] : "") + subRes[3]
            }

        }else{
            c2 = powArr[c][1];
            if (!powArr[c + 1] || (powArr[c][0] !== powArr[c + 1][0])) {
                if(powArr[c][0]===0){
                    
                     resArr.push([c2, '', powArr[c][0]])
                    a.push([c2, '', powArr[c][0]])
                }else{
                    resArr.push([c2, powArr[c][2], powArr[c][0]])
                    a.push([c2, powArr[c][2], powArr[c][0]])
                }
                
                if (powArr[c][2] === "") {
                    subRes[3] = (/*(c2 > -1)*/(!(c2+"").includes("-")) ? ("+" + c2) : c2) + "" + powArr[c][2] + ((powArr[c][0] > 1||powArr[c][0] < 0) ? "^" + powArr[c][0] : "") + subRes[3]
                } else {
                    if(powArr[c][0]>1){
                        subRes[3] = ((c2 === 1) ? "+" : (c2 === -1 ? "-" : (c2 < -1 ? c2 : "+" + c2))) + "" + powArr[c][2] + "^" + powArr[c][0] + subRes[3]
                    }else if(powArr[c][0]<0){
                        subRes[3] = ((c2 === 1) ? "+" : (c2 === -1 ? "-" : (c2 < -1 ? c2 : "+" + c2))) + "" + powArr[c][2] + "^" + powArr[c][0] + subRes[3]
                    } else if(powArr[c][0]===1){
                        subRes[3] = ((c2 === 1) ? "+" : (c2 === -1 ? "-" : (c2 < -1 ? c2 : "+" + c2))) + "" + powArr[c][2] + subRes[3]
                    } else {
                        subRes[3] = ((c2 === 1) ? "+" : (c2 === -1 ? "-" : (c2 < -1 ? c2 : "+" + c2))) + "" + subRes[3]
                    }
                    
                }
                  
            }else{
                if(powArr[c][0]===0){
                    if(c2===1||c2===-1){
                        powArr[c][2]='1'
                    }else{
                        powArr[c][2]=''
                    }
                }
                subRes[3] = ((c2 === 1 ) ? "+" : (c2 === -1 ? "-" :(c2 < -1 ? c2 : "+" + c2))) + "" + powArr[c][2] + ((powArr[c][0] > 1 || powArr[c][0] < 0) ? "^" + powArr[c][0] : "") + ")" + subRes[3]
            }
            
        }

        prevPow = powArr[c][0]
        c++
    }

    subRes[3] = subRes[3].split("+-").join("-");
    subRes[3] = subRes[3].split("");
    if(subRes[3][0]==="+"){
        subRes[3][0] = "";
    }
    subRes[3] = subRes[3].join("");
}