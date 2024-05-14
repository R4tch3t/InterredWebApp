export const isEqualAfter = (strArr: string | any[], i: number, j: number, k: number, rstr: string, List: string | any[]) => {
    k=k-j
    let x=0
    let flag = List.length!==0
    let auxStr=""
    let OP: any=[]
    
    while (i<=k) {
        x=0;
        auxStr="";
        
        if (/*strArr[i] === "-" ||*/ (strArr.length<(i+1) && strArr[i+1] === "(") || strArr[i] === "("){
            OP.push(strArr[i])
            flag=true
        }
        if(strArr[(i-1)-j]==="-"){
            flag=false
        }
        if (strArr[i] === ")"){
            OP.pop()
            if (OP.length===0){
                if(strArr[i-j-1]! === '^'){
                    return true
                }
                if (flag) {
                    return false
                }
                
            }
            
        }else if(strArr[i-j-1]! === '^'){
            return true
        }
        
        while (x<j){
            auxStr+=strArr[x+i]
            x+=1
            
        }
        

        if (auxStr === rstr && flag){
            return true
        }
        
        i+=1
    }
    
    return false
}

export const nDigits=(n1: string, n2: string) => {
    let c = 0;
    
    if (n1.includes(".")) {
        c = n1.split(".")[1].length
    }

    if (n2.includes(".")) {
        let a = n2.split(".")[1].length
        if (c < a) {
            c = a
        }
    }
    let divisor = Math.pow(10.0, Number(c))
    return divisor
}

export const place=(n1: string,n2: string) => {
    let c = 0;

    if (n1.includes(".")) {
        c = n1.split(".")[1].length
    }

    if (n2.includes(".")) {
        c += n2.split(".")[1].length
    }

    let divisor = Math.pow(10.0, Number(c))
    return divisor
}

