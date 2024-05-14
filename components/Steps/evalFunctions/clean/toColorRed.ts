import { Context } from "../process/context"

export const toColorRed = (toRedStr: string, replaceBy: string, strToSplit: string, context:Context, onlyReturn?: boolean) => {    
    const split=strToSplit.split(toRedStr)    
    let partReplace = split[split.length-1]
    let c = 1
    while(c<split.length-1){
        split[c]=toRedStr+split[c]
        c++
    }
    split[split.length-1]="color(red)("+toRedStr+")"+partReplace
    const joinRed=split.join("")    
    split[split.length-1]=replaceBy+partReplace
    if(!onlyReturn){
        context.strDevelopment=split.join("")
        context.strltx+="<div class='card divSteps' style='background: transparent' >"
        context.strltx+="<div class='card-body' style='background: transparent' >"
        context.strltx+="<p>`"+context.str1+joinRed+"`</p>"    
    }

    return joinRed
}