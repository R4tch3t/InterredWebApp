import { toColorRed } from "../../clean/toColorRed"
import strToLang from "../../lang"
import { Context } from "../../process/context"
import { Pstrltx } from "../evaluate"
import { matrixSqrt } from "./matrixSqrt"

export const FactorByParts = (poli2: [number],context:Context,prevFactor:string) => {
    let c = poli2.length-1
    //let lastConst = poli2[c]
    let middleCount = c/2
    c--
    let pow = 1
    let arrayFactors: any = []
    let countOfFactor = 1
    let stackResRed:any=["","",[],[]]
    //(x^2) % constant || x^0 for first two divisiores
    let divsFactors:any = []
    //console.log('-----FIRSTfindFactors----')

    //try cicle search a factor divs for all vars    
    context?.FFactor?.unshift([])

    matrixSqrt(divsFactors,poli2,middleCount,context)
    //divsFactors=matrixSqrt()
    //lastConst = divsFactors[0][0]       

    //pushing the last and first constants
    arrayFactors.unshift([[poli2[poli2.length-1]],[false],0,[poli2[poli2.length-1]],[poli2[poli2.length-1]]])

    //console.log('arrayFactorsF! ',arrayFactors[0][1]+"")
    //console.log('-----findFactors----')
    while(c>0){
        middleCount--      

        if(countOfFactor%2===0){
            //x^2 par           
                let destrucs = [divsFactors[1][1]*divsFactors[1][0]]
                let destrucsStr: any = []
                let subC=countOfFactor
                let subStr = ""
                

                if(destrucs[destrucs.length-1]===-1){
                    subStr = "-x^"+pow
                }else if(destrucs[destrucs.length-1]===1){
                    subStr = "x^"+pow
                }else{
                    subStr = destrucs[destrucs.length-1]+"x^"+pow
                }
                
                destrucsStr.push(subStr)              
                    
                    while(subC>0){
                        if(!(subC%2)){
                            destrucs.unshift(divsFactors[0][0]*divsFactors[2][1])
                        }else{
                            destrucs.push(divsFactors[0][1]*divsFactors[2][0])
                        }
                        if(!(subC%2)){
                            if(destrucs[0]===-1){
                                subStr += "-x^"+pow
                                destrucsStr.unshift("-x^"+pow)
                            }else if(destrucs[0]===1){
                                subStr += "+x^"+pow
                                destrucsStr.unshift("x^"+pow)
                            }else{
                                subStr += "+"+destrucs[0]+"x^"+pow
                                destrucsStr.unshift(destrucs[0]+"x^"+pow)
                            }
                        }else{
                            if(destrucs[destrucs.length-1]===-1){
                                subStr += "-x^"+pow
                                destrucsStr.push("-x^"+pow)
                            }else if(destrucs[destrucs.length-1]===1){
                                subStr += "+x^"+pow
                                destrucsStr.push("x^"+pow)
                            }else{
                                subStr += "+"+destrucs[destrucs.length-1]+"x^"+pow
                                destrucsStr.push(destrucs[destrucs.length-1]+"x^"+pow)
                            }
                        }
                        subC--
                    }
               
                //console.log(subStr)
                arrayFactors.push([[poli2[c],poli2[c]+"x^"+pow],[subStr,true],pow,destrucs,destrucsStr])
                countOfFactor++
            
        }else{
            //x^3, x
            if(pow>1){
                
                    let destrucs = [divsFactors[1][0]*divsFactors[2][1]]
                    let destrucsStr: any = []
                    let subStr = ""
                    let bandUnshift = false                    
                    
                    if(destrucs[destrucs.length-1]===-1){
                        subStr = "-x^"+pow
                    }else if(destrucs[destrucs.length-1]===1){
                        subStr = "x^"+pow
                    }else{
                        subStr = destrucs[destrucs.length-1]+"x^"+pow
                    }
                    destrucsStr.push(subStr)

                    
                    bandUnshift = !(divsFactors[1][1]%divsFactors[0][1]) //true 
                    
                    let diff = divsFactors[2][0]*divsFactors[1][1]
                   
                        destrucs.push(diff)                

                    if(diff===-1){
                        
                            destrucsStr.push("-x^"+pow)
                    
                        subStr += "-x^"+pow
                    }else if(diff===1){
                       
                            destrucsStr.push("x^"+pow)
                        
                        subStr += "+x^"+pow
                    }else{
                       
                            destrucsStr.push(diff+"x^"+pow)
                        
                        subStr += "+"+diff+"x^"+pow
                    }
                    //console.log('pow>1 dest',destrucs)
                    //console.log(subStr)
                    arrayFactors.push([[poli2[c],poli2[c]+"x^"+pow],[subStr,true],pow,destrucs,destrucsStr])
                    countOfFactor++
                
            }else{
                
                    let destrucs = [divsFactors[0][0]*divsFactors[1][1]]
                    let destrucsStr: any = []
                    let subStr = ""                    

                    if(destrucs[destrucs.length-1]===-1){
                        subStr = "-x"
                    }else if(destrucs[destrucs.length-1]===1){
                        subStr = "x"
                    }else{
                        subStr = destrucs[destrucs.length-1]+"x"
                    }
                    destrucsStr.push(subStr)

                    destrucs.push(poli2[c]-destrucs[destrucs.length-1])
                    if(destrucs[destrucs.length-1]===-1){
                        subStr = "-x+" + subStr
                        destrucsStr.push("-x")
                    }else if(destrucs[destrucs.length-1]===1){
                        subStr = "x+" + subStr
                        destrucsStr.push("x")
                    }else{
                        subStr = destrucs[destrucs.length-1]+"x+" + subStr
                        destrucsStr.push(destrucs[destrucs.length-1]+"x")
                    }

                    //console.log(subStr)
                    arrayFactors.push([[poli2[c],poli2[c]+"x"],[subStr,true],pow,destrucs,destrucsStr])
                    countOfFactor++                
            }
        }
        
        pow++
        c--
    }
    
    //console.log('arrayFactors ',arrayFactors[0][1]+" divsFactors ",divsFactors)
    
    //printting factors for destruct
    c=0    
    while(c<arrayFactors.length){
        const part = arrayFactors[c]
        //console.log('part? ',part)
        if(part && part[1][part[1].length-1]){
            
            context.StepsC += 1;
            context.str1 = strToLang("Paso") + context.StepsC.toString() + ": quad"    
            
            part[1][0]=part[1][0].split('+-').join('-')        
            context.str2 = part[0][1]
            if(context.str2.startsWith('1x')){
                context.str2=context.str2.split('1x').join('x')
            }
            if(context.str2.startsWith('-1x')){
                context.str2=context.str2.split('-1x').join('-x')
            }
            toColorRed(context.str2,part[1][0],context.strDevelopment,context)
            context.strDevelopment=context.strDevelopment.split('+-').join('-')
            //console.log('contextres: ',context.res,' dev',context.strDevelopment)
            
            context.str1 = "-> "
            context.str2 = "[ " + context.str2 + " ] = [ "+part[1][0]+" ]"
            
            context.str1 = context.str1 + context.str2 + " = " + context.strDevelopment
            context.str1 = context.str1.split(part[1][0]).join("color(red)("+part[1][0]+")")
            context.str1=context.str1.split('+color(red)(-').join("color(red)(-")

            Pstrltx(context.str1, context)
            context.strltx += "</div>"
            context.strltx += "</div>"
        }
        c++
    }

    //console.log('arrayFactors?? ',arrayFactors[0]+"",context)
    //Identify the parts to factorize and replace
    c=0
    //let subRes = ["color(red)("+poli2[poli2.length-1]+")"]
    let resRed2 = ""
    let lengthFactors = arrayFactors.length
    if(lengthFactors>poli2.length-2){
        lengthFactors = poli2.length-2
    }
    //console.log('lengthFactors ',lengthFactors)

    if(poli2[0]===1){
        //arrayFactors.push([["x^"+(poli2.length-1)]])
        arrayFactors.push([poli2.length-1,[poli2[0]],["x^"+(poli2.length-1)]])
    }else if(poli2[0]===1){
        //arrayFactors.push([["-x^"+(poli2.length-1)]])
        arrayFactors.push([poli2.length-1,[poli2[0]],["-x^"+(poli2.length-1)]])
    }else{
        //arrayFactors.push([[poli2[0]+"x^"+(poli2.length-1)]])
        arrayFactors.push([poli2.length-1,[poli2[0]],[poli2[0]+"x^"+(poli2.length-1)]])
    }
    let factorToSplit = ""
    context.strDevelopment="("+context.strDevelopment+")"
    context.strDevelopment=context.strDevelopment.split('((').join("")
    context.strDevelopment=context.strDevelopment.split('))').join("")
    
    while(arrayFactors.length){
        let part = arrayFactors[0] 
        if(part){
            let c2 = 0
            let nextCount = 0
            //let resRed = context.strDevelopment
            let resRed = ""
            resRed2 = context.strDevelopment
            let redToSplit = ""    
            let minPow=0
            context.StepsC += 1;
            context.str1 = strToLang("Paso") + context.StepsC.toString() + ": quad"            
            
            while(c2<lengthFactors){
                if(part){
                    const pow = part[part.length-3]
                    let consToRed = part[part.length-1].shift()
                    const consToRedResult = part[part.length-2].shift()
                    if(!part[part.length-1].length){
                        arrayFactors.shift()
                        nextCount=0                    
                    }else{
                        nextCount++
                    }
                    //console.log('part?? ',part[part.length-1]+"")
                    
                    //resRed = "color(red)("+consToRed+")"+resRed
                    let subC=part[part.length-1].length-1
                    //while(subC<part[part.length-1].length){
                        //stackResRed[1].push(part[part.length-1][subC])
                        if(part[part.length-1][subC]){
                            resRed=part[part.length-1][subC]+"+"+resRed
                            stackResRed[1] = part[part.length-1][subC]+"+"+stackResRed[1] 
                        }
                        //subC++
                    //}
                    /*if(lengthFactors%2===0){
                        resRed += "color(red)("+consToRed+")"
                    }else{*/
                        if(part[part.length-1].length>1){
                            /*if(lengthFactors%2===0){
                                if(c===0&&c2===0){
                                    resRed=part[part.length-1][0] + resRed +"+color(red)("+consToRed+")+"                                    
                                }else{
                                    resRed=part[part.length-1][0]+"+color(red)("+consToRed+")+" + resRed                                    
                                }
                                stackResRed[1] = part[part.length-1][0]+"+"+stackResRed[1]
                            }else{*/
                                resRed=part[part.length-1][0]+"+color(red)("+consToRed+")+" + resRed
                                stackResRed[1] = part[part.length-1][0]+"+"+stackResRed[1]
                            //}
                        }else{
                            if(lengthFactors%2===0&&resRed&&c===0){
                                resRed+="color(red)("+consToRed+")"
                            }else{
                                if(!resRed){
                                    resRed="color(red)("+consToRed+")"
                                }else{
                                    resRed="color(red)("+consToRed+")+" + resRed
                                }
                            }
                        }
                    //}
                    if(!stackResRed[0]){
                        stackResRed[0] = consToRed 
                    }else{
                        stackResRed[0] = consToRed+"+"+stackResRed[0] 
                    }
                    //resRed += "color(red)("+consToRed+")"
                    if(!redToSplit){
                        //redToSplit=consToRed
                        minPow=pow
                        if(c===0){
                            redToSplit=((consToRedResult/divsFactors[c][0]))+""
                        }else{
                            if((pow-minPow)>1){
                                redToSplit=((consToRedResult/(divsFactors[c][0])))+"x^"+(pow-minPow)
                            }else if((pow-minPow)<1){
                                redToSplit=((consToRedResult/(divsFactors[c][0])))+""//+"1"
                            }else{
                                redToSplit=((consToRedResult/(divsFactors[c][0])))+"x"
                            }
                        }
                    }else{
                        if((pow-minPow)>1){
                            redToSplit=((consToRedResult/divsFactors[c][0]))+"x^"+(pow-minPow)+"+"+redToSplit
                        }else if((pow-minPow)<1){
                            redToSplit=((consToRedResult/divsFactors[c][0]))+"1"+"+"+redToSplit
                        }else{
                            redToSplit=((consToRedResult/divsFactors[c][0]))+"x"+"+"+redToSplit
                        }
                    }
                    part=arrayFactors[nextCount]
                    //console.log('consToRed ',consToRed)                    
                    //stackResRed[0].push("+color(red)("+consToRed+")")
                    /*let subC=0
                    while(subC<part[part.length-1].length){
                        stackResRed[1].push(part[part.length-1][subC])
                        subC++
                    }*/
                    //console.log('resRed ',resRed)
                    //if(c2===0){
                    //    resRed += "color(red)("+consToRed+")"
                    /*}else{
                        resRed = "color(red)("+consToRed+")+"+resRed
                    }*/
                    //resRed = toColorRed(consToRed,consToRed,resRed,context,true)
                    //resRed2 = resRed.split('+color(red)('+consToRed+")").join("")
                   // resRed2 = toColorRed(consToRed,consToRed,resRed2,context,true)
                   // resRed2 = resRed2.split('+color(red)('+consToRed+")").join("")
                   // resRed2 = resRed2.split('color(red)('+consToRed+")+").join("")
                }else if (part===null){
                    arrayFactors.shift()
                    part = arrayFactors[0]
                }
                c2++
            }

            //printing the rest of const
            let lastRes = ""
            if(part){
                while(nextCount<arrayFactors.length){
                    let subPart = arrayFactors[nextCount]
                    let subC=subPart[subPart.length-1].length-1
                    while(subC>=0){
                        resRed=subPart[subPart.length-1][subC]+"+"+resRed
                        stackResRed[1] = subPart[subPart.length-1][subC]+"+"+stackResRed[1]
                        subC--
                    }
                    nextCount++
                }
            } 
                context.strDevelopment=stackResRed[1]+"+"+stackResRed[0]            
            
            let subC=0
            while(subC<stackResRed[2].length){
                if(subC===0){
                    lastRes+=stackResRed[2][subC]
                }else{
                    lastRes+="+"+stackResRed[2][subC]
                }
                subC++
            }
            
            redToSplit=redToSplit.split('+-').join('-')
            if(c===0){
                //context.strDevelopment += "+color(red)("+divsFactors[c][0]+"("+redToSplit+"))"
                stackResRed[2].unshift(divsFactors[c][0]+"("+redToSplit+")")
                resRed2=stackResRed[1]+"color(red)("+stackResRed[2][0]+")"
                
            }else if (c === 1){
                stackResRed[2].unshift(divsFactors[c][0]+"x("+redToSplit+")")
                resRed2=stackResRed[1]+"color(red)("+stackResRed[2][0]+")"
                //context.strDevelopment += "+color(red)("+divsFactors[c][0]+"x("+redToSplit+"))"
            }else{
                stackResRed[2].unshift(divsFactors[c][0]+"x^"+c+"("+redToSplit+")")
                resRed2=stackResRed[1]+"color(red)("+stackResRed[2][0]+")"
                //context.strDevelopment += "+color(red)("+divsFactors[c][0]+"x^"+c+"("+redToSplit+"))"
            }

            stackResRed[1] += "color(red)("+stackResRed[0]+")"
            if(lastRes){
                resRed+="+"+lastRes
                stackResRed[1] += "+"+lastRes
                resRed2 += "+"+lastRes
            }

            resRed=resRed.split('+-').join('-')
            resRed=resRed.split('+color(red)(-').join('color(red)(-')
            resRed2=resRed2.split('(1x').join('(x')
            resRed2=resRed2.split('(-1x').join('(-x')
            resRed2=resRed2.split('+1x^0').join('+1')
            resRed2=resRed2.split('-1x^0').join('-1')
            resRed2=resRed2.split('+1x').join('+x')
            resRed2=resRed2.split('-1x').join('-x')
            resRed2=resRed2.split('x^0').join('')
            resRed2=resRed2.split('+-').join('-')
            resRed2=resRed2.split('+color(red)(-').join('color(red)(-')

            stackResRed[1]=stackResRed[1].split('+-').join('-')
            stackResRed[1]=stackResRed[1].split('+color(red)(-').join('color(red)(-')

            //console.log('resRed: ',resRed,' stackResRed ',part+"")
            
            context.strltx+="<div class='card divSteps' style='background: transparent' >"
            context.strltx+="<div class='card-body' style='background: transparent' >"
            context.strltx+="<p>`"+context.str1+"("+resRed+")`</p>"
            
            context.str1 = "-> "
            context.str2 = "[ " + resRed + " ] = [ "+stackResRed[1]+" ]"            
            context.str1 = context.str1 + context.str2 + " = (" + resRed2 + ")"

            Pstrltx(context.str1, context)
            context.strltx += "</div>"
            context.strltx += "</div>"
            stackResRed[0]=""
            stackResRed[1]="" 
            c++       
            if(c===1){
                factorToSplit=redToSplit
            }
            //console.log("redToSplit ",redToSplit)
        }else if (part===null){
            arrayFactors.shift()
        }
        
    }
    //console.log('factorToSplit',factorToSplit,'- ',resRed2)
    //prepare the Result factored
    //factorToSplit=factorToSplit.split('+0x').join('')
    factorToSplit='('+factorToSplit
    factorToSplit=factorToSplit.split('(1x').join('(x')
    factorToSplit=factorToSplit.split('(-1x').join('(-x')
   
    //last step split the factors
    context.res = resRed2.split(factorToSplit+"))").join(factorToSplit+")")
    context.res = context.res.split('color(red)(').join('')    

    context.StepsC += 1;
    context.str1 = strToLang("Paso") + context.StepsC.toString() + ": quad"    
    context.strltx+="<div class='card divSteps' style='background: transparent' >"
    context.strltx+="<div class='card-body' style='background: transparent' >"
    context.strltx+="<p>`"+context.str1+"("+context.res+")`</p>"

    context.res=context.res.split(factorToSplit+")").join('color(red)('+factorToSplit+"))")
    context.str1 = "-> "
    context.str2 = "[ " + context.res             
    
    context.res=context.res.split('color(red)('+factorToSplit+"))").join("")
    context.res="color(red)("+factorToSplit+"))("+context.res+")"
    context.str2+=" ] = [ "+context.res+" ]"
    
    context.res=context.res.split("color(red)("+factorToSplit+"))").join(factorToSplit+")")
    if(prevFactor){
        context.res=prevFactor+"("+context.res+")"
    }
    context.res=context.res.split("+0x").join('')
    context.str1 = context.str1 + context.str2 + " = " + context.res 


    Pstrltx(context.str1, context)
    context.strltx += "</div>"
    context.strltx += "</div>"
    
    
}