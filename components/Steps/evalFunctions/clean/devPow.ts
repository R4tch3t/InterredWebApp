import { Context } from "../process/context";

export const DevPow = (str: string, context: Context) => {
    
    try{
    
    let revStr = str.split(')^')//everse();
    let i = 0;    
    
    if(revStr.length>1){
        revStr.map( e => {
            let match1Str = e.match(/[-+*/]/gi);
            let match2Str = e.match(/[^]/gi);
            
            i++;
            if(i<revStr.length){
                let numbPow = parseInt(revStr[i])
               
                context.bandMatchFactor=match2Str?true:false
                if(match1Str&&numbPow&&!match2Str){
                    if(numbPow<16){
                        e+=")"
                        str=e;
                        while(numbPow>1){
                            str+="*"+e
                            numbPow--;
                        }
                    }
                    
                }
            }
                    
        });
    }else{
        revStr = str.split(')*')
        
        if(revStr.length<2){
            revStr=str.split(")")
        }
        if(revStr.length>1){
            while(revStr.length>0){
                const r = revStr.pop()
                let matchStr:any = (r+"").match(/[A-Z]/gi);
                matchStr = matchStr?matchStr[0]:'x'
                context.bandMatchFactor=r?.includes(matchStr+"^")!
                if(context.bandMatchFactor){
                    revStr=[];
                }
            }
        }else{
            let matchStr:any = (str+"").match(/[A-Z]/gi);
                matchStr = matchStr?matchStr[0]:'x';
                context.bandMatchFactor=str.includes(matchStr+"^")&&(str.includes(")(")||str.includes(")*(")||str.includes(")/("));
            
        }
    }
    }catch(e){
        console.log(e)
    }
    
    return str
}