import { Context } from "../../process/context"

export const matrixSqrt = (divsFactors:any, poli2: [number],middleCount:number, context:Context) => {
    let cFactor = poli2.length-1
    let middleCFactor=(poli2.length-1)/2

    while(middleCFactor>=0){
        const arryDiv = [1,1]
        context?.FFactor![0]?.push([])
        if(!(cFactor%2)){

            //for initial is maybe !(poli2[cFactor-1]%poli2[cFactor-3])
            context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 1')
            if(cFactor>middleCount){
                context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 2')
                if(!(poli2[cFactor-1]%poli2[cFactor-3])){
                    context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 2.1')
                    arryDiv[0]=poli2[cFactor]/(poli2[cFactor-1]/poli2[cFactor-3])
                    arryDiv[1]=poli2[cFactor]/arryDiv[0]
                }else{
                    context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 2.2')
                    arryDiv[0]=poli2[cFactor]/(poli2[cFactor-4]/(poli2[cFactor-3]/poli2[cFactor-1]))
                    arryDiv[1]=poli2[cFactor]/arryDiv[0]
                    if(poli2[cFactor]===poli2[cFactor-1]||(!(poli2[cFactor]%poli2[cFactor-1])&&(poli2[cFactor-1]%poli2[cFactor])
                        ||(!(poli2[cFactor-1]%poli2[cFactor])&&(poli2[cFactor]%poli2[cFactor-1]))
                        ||(poli2[cFactor-1]%poli2[cFactor]&&poli2[cFactor]%poli2[cFactor-1]))){
                        context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 2.3')
                        arryDiv[0]=poli2[cFactor]
                        arryDiv[1]=1
                    }
                }
                
                
            }else{
                context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3')
                
                if(!(poli2[cFactor+1]%poli2[cFactor-1])){
                    context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.4')
                    arryDiv[0]=poli2[cFactor-2]/(divsFactors[0][1]/(poli2[cFactor+1]/poli2[cFactor-1]))
                    arryDiv[1]=poli2[cFactor-2]/arryDiv[0]
                }else{
                    context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.5')
                    arryDiv[0]=poli2[cFactor-2]/(poli2[cFactor-1]/poli2[cFactor+1]) 
                    arryDiv[1]=poli2[cFactor-2]/arryDiv[0]

                    //check for round
                    const splitZ = (arryDiv[0]+"").split('.')
                    if(splitZ.length>1){
                        if(splitZ[1].startsWith('000000')||splitZ[1].startsWith('999999')){
                            arryDiv[0]=Math.round(arryDiv[0])
                        }
                    } 

                    if(poli2[cFactor-2]%arryDiv[0]){
                        //console.log('fFactor: 2,6')
                        context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.6')
                        if(!(poli2[cFactor-2]%(arryDiv[0]%poli2[cFactor-2]))){
                            context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.7')
                            let factorC=arryDiv[0]/(arryDiv[0]%poli2[cFactor-2])
                            arryDiv[1]=poli2[cFactor-2]/(arryDiv[0]%poli2[cFactor-2])
                            divsFactors[0][1]*=factorC
                            divsFactors[0][0]/=factorC
                            divsFactors[1][0]/=factorC
                            arryDiv[0]/=factorC
                        }else{
                            context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.8')
                            if(!(poli2[cFactor-1]%poli2[cFactor-2])){
                                context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.9')
                                
                                let factorC=poli2[cFactor+1]/(poli2[cFactor-1]/poli2[cFactor-2])
                                //if(!(poli2[cFactor-2]%(arryDiv[0]/factorC))){
                                
                                    context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.9.1 factorC:'+factorC+' '+((poli2[cFactor-2]%(arryDiv[0]/factorC)))+" arryDiv[0] ",arryDiv[0])
                                    if(factorC===poli2[cFactor+1]&&poli2[cFactor-1]===poli2[cFactor-2]){
                                        factorC=poli2[cFactor+1]%poli2[cFactor-1]
                                        factorC=poli2[cFactor-1]%factorC
                                        if(!(poli2[cFactor+1]%factorC)){
                                            if(poli2[cFactor-1]%factorC){
                                                factorC=poli2[cFactor-1]%factorC
                                            }
                                            factorC=poli2[cFactor+1]/factorC
                                        }else{
                                            if(!(poli2[cFactor+1]%(poli2[cFactor+1]%factorC))){
                                                factorC=poli2[cFactor+1]/(poli2[cFactor+1]%factorC)
                                            }else{
                                                factorC=poli2[cFactor+1]%poli2[cFactor-1]
                                            }
                                        }
                                    }else if(((poli2[cFactor-2]%(arryDiv[0]/factorC))||arryDiv[0]===factorC)&&(poli2[cFactor+1]%(poli2[cFactor+1]%(poli2[cFactor-1]%poli2[cFactor+1])))===0){
                                        factorC=poli2[cFactor+1]/(poli2[cFactor+1]%(poli2[cFactor-1]%poli2[cFactor+1]))
                                        context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.9.2')
                                    }
                                    if((arryDiv[0]===factorC)&&(poli2[cFactor+1]%(poli2[cFactor-1]%(poli2[cFactor+1]%poli2[cFactor-1])))===0){
                                        context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.9.3')
                                        factorC=poli2[cFactor+1]/(poli2[cFactor-1]%(poli2[cFactor+1]%poli2[cFactor-1]))
                                        //console.log('?? arryDiv[0] factorC ',arryDiv[0]%factorC,' arryDiv[0] ',arryDiv[0],' factorC ',factorC)
                                        if(poli2[cFactor-2]%(arryDiv[0]/factorC)&&(poli2[cFactor+1]%(poli2[cFactor-1]/(poli2[cFactor+1]%poli2[cFactor-2])))===0){
                                            context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.9.3')
                                            factorC=poli2[cFactor+1]/(poli2[cFactor-1]/(poli2[cFactor+1]%poli2[cFactor-2]))
                                        }
                                    }

                                    let subDiv = poli2[cFactor+1]%(poli2[cFactor-1]%poli2[cFactor+1])
                                    if((poli2[cFactor+1]%(poli2[cFactor+1]%subDiv))===0){
                                        
                                        subDiv=(poli2[cFactor+1]/(poli2[cFactor+1]%subDiv))
                                        if((arryDiv[0]%subDiv)===0){
                                           // console.log('3.9AF newFactor? ')
                                            if((poli2[cFactor-2]%(arryDiv[0]/subDiv))===0){
                                                //console.log('3.9 newFactor? ')
                                                factorC=subDiv
                                            }else{
                                                subDiv = poli2[cFactor-1]%(poli2[cFactor+1]%poli2[cFactor-1])
                                                while((poli2[cFactor-1]%subDiv)&&(poli2[cFactor-1]%subDiv)!==1){
                                                    subDiv=(poli2[cFactor-1]%subDiv)
                                                }
                                                //console.log('3.9.2 newFactor? ',subDiv)
                                                if((arryDiv[0]%(poli2[cFactor+1]/subDiv))===0&&(poli2[cFactor+1]%subDiv)===0){
                                                    subDiv=poli2[cFactor+1]/subDiv
                                                    if((poli2[cFactor-2]%(arryDiv[0]/subDiv))===0){
                                                        
                                                        factorC=subDiv
                                                    }
                                                }
                                            }

                                        }
                                    }

                                    //universal factorization
                                    let a = poli2[cFactor+1]
                                    let b = poli2[cFactor-1]
                                    if(poli2[cFactor-1]%poli2[cFactor+1]===poli2[cFactor-1]){
                                        a = poli2[cFactor-1]
                                        b = poli2[cFactor+1]
                                    }
                                    subDiv = a%(b%a)
                                    while(((a%subDiv)&&(a%subDiv)!==1)){
                                        subDiv=(a%subDiv)
                                    }
                                    while(((b%subDiv)&&(b%subDiv)!==1)){
                                        subDiv=(b%subDiv)
                                    }
                                    //console.log('fFactor: 3.9.1.2??',subDiv,' - ',(arryDiv[0]%(poli2[cFactor+1]/subDiv)),' - ',(poli2[cFactor+1]%subDiv))
                                    if((arryDiv[0]%(poli2[cFactor+1]/subDiv))===0&&(poli2[cFactor+1]%subDiv)===0){
                                        subDiv=poli2[cFactor+1]/subDiv
                                        if((poli2[cFactor-2]%(arryDiv[0]/subDiv))===0){
                                            
                                            factorC=subDiv
                                        }
                                    }

                                    arryDiv[0]/=factorC
                                    arryDiv[1]=poli2[cFactor-2]/arryDiv[0]
                                    divsFactors[0][1]*=factorC
                                    divsFactors[0][0]/=factorC
                                    divsFactors[1][0]/=factorC
                                    let secondFactor = arryDiv[1]%divsFactors[0][1]
                                    //console.log('divsFactors[0][1]?secondFactor ',divsFactors[0][1]%secondFactor)
                                    if((divsFactors[0][1]%secondFactor)===0&&(arryDiv[1]%secondFactor)===0){
                                        arryDiv[1]/=secondFactor
                                        arryDiv[0]*=secondFactor
                                        divsFactors[0][1]/=secondFactor
                                        divsFactors[0][0]*=secondFactor
                                        divsFactors[1][0]*=secondFactor
                                    }
                                //}

                            }else {
                                context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.10')
                                if(!(poli2[cFactor-2]%poli2[cFactor-1])){
                                    
                                    let factorC=(poli2[cFactor-2]/poli2[cFactor-1])
                                    context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.11 '+arryDiv[0]+" "+arryDiv[1])
                                    if((poli2[cFactor-2]%(arryDiv[0]/factorC))){
                                        context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.11.1')
                                        
                                            factorC=poli2[cFactor+1]
                                            
                                    }

                                    if(/*(factorC===poli2[cFactor+1])&&*/(poli2[cFactor+1]%(poli2[cFactor+1]%(poli2[cFactor-1]%poli2[cFactor+1])))===0){
                                        context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.11.2')
                                        factorC=poli2[cFactor+1]/(poli2[cFactor+1]%(poli2[cFactor-1]%poli2[cFactor+1]))
                                    }else if ((poli2[cFactor+1]%(poli2[cFactor-2]%poli2[cFactor+1]))===0){
                                        context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.11.3')
                                        factorC=poli2[cFactor+1]/(poli2[cFactor-2]%poli2[cFactor+1])
                                        if((poli2[cFactor-2]%(arryDiv[0]/factorC))&&(poli2[cFactor+1]%(poli2[cFactor-1]%(poli2[cFactor-2]%poli2[cFactor+1])))===0){
                                            factorC=(poli2[cFactor+1]/(poli2[cFactor-1]%(poli2[cFactor-2]%poli2[cFactor+1])))
                                        }

                                    }else if ((poli2[cFactor+1]%(poli2[cFactor-1]%(poli2[cFactor+1]%poli2[cFactor-1])))===0){
                                        context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.11.4')
                                        factorC=(poli2[cFactor+1]/(poli2[cFactor-1]%(poli2[cFactor+1]%poli2[cFactor-1])))
                                    }
                                        
                                        arryDiv[0]/=factorC
                                        arryDiv[1]=poli2[cFactor-2]/arryDiv[0]
                                        divsFactors[0][1]*=factorC
                                        divsFactors[0][0]/=factorC
                                        divsFactors[1][0]/=factorC
                                        let secondFactor = arryDiv[1]%divsFactors[0][1]
                                        context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.11.? '+secondFactor+" ?? "+arryDiv[1])
                                        if(!(divsFactors[0][1]%secondFactor)){
                                            arryDiv[1]/=secondFactor
                                            arryDiv[0]*=secondFactor
                                            divsFactors[0][1]/=secondFactor
                                            divsFactors[0][0]*=secondFactor
                                            divsFactors[1][0]*=secondFactor
                                        }
                                    
                                }else if (poli2[cFactor-2]%poli2[cFactor-1]===poli2[cFactor-2]){
                                    

                                    //arryDiv[1]=poli2[cFactor-1]%poli2[cFactor-2]
                                    let factorC=(poli2[cFactor-2]/(poli2[cFactor-1]%poli2[cFactor-2]))
                                    context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.12 '+poli2[cFactor-2]%(arryDiv[0]/factorC))

                                    if((poli2[cFactor-2]%(arryDiv[0]/factorC))&&!(poli2[cFactor+1]%(poli2[cFactor-1]%poli2[cFactor-2]))){
                                        context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.12.1 ')
                                        factorC=(poli2[cFactor+1]/(poli2[cFactor-1]%poli2[cFactor-2]))
                                    }else if((poli2[cFactor-2]%(arryDiv[0]/factorC))&&!(poli2[cFactor-1]%(poli2[cFactor-1]%poli2[cFactor-2]))){
                                        
                                        factorC=(poli2[cFactor-1]/(poli2[cFactor-1]%poli2[cFactor-2]))
                                        context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.12.2 '+((poli2[cFactor-2]%(arryDiv[0]/factorC))))
                                        if((poli2[cFactor-2]%(arryDiv[0]/factorC))&&!(poli2[cFactor+1]%(factorC))){
                                            factorC=(poli2[cFactor+1]/(factorC))
                                        }
                                        

                                    }else if((poli2[cFactor-2]%(arryDiv[0]/factorC))&&!(poli2[cFactor-1]%(poli2[cFactor-2]%(poli2[cFactor-1]%poli2[cFactor-2])))){
                                        
                                        factorC=(poli2[cFactor-1]/(poli2[cFactor-2]%(poli2[cFactor-1]%poli2[cFactor-2])))
                                        context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.12.3 '+factorC+" "+(poli2[cFactor-2]%(arryDiv[0]/factorC)))
                                        //console.log('fFactor: 3.12.3 '+factorC+" "+(poli2[cFactor-2]%(arryDiv[0]/factorC)))
                                        if((poli2[cFactor-2]%(arryDiv[0]/factorC))&&!(poli2[cFactor-2]%(poli2[cFactor-2]%(poli2[cFactor-1]%poli2[cFactor-2])))){
                                            context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.12.4')
                                            factorC=(poli2[cFactor-2]/(poli2[cFactor-2]%(poli2[cFactor-1]%poli2[cFactor-2])))
                                        }
                                                                                

                                    }
                                    if (/*(poli2[cFactor-2]%(arryDiv[0]/factorC))&&!*/(poli2[cFactor+1]%(poli2[cFactor-1]%(poli2[cFactor+1]%poli2[cFactor-1])))===0){
                                        context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.12.5')
                                        factorC=poli2[cFactor+1]/(poli2[cFactor-1]%(poli2[cFactor+1]%poli2[cFactor-1]))
                                        
                                    }

                                    if((poli2[cFactor-2]%(arryDiv[0]/factorC))&&(poli2[cFactor-1]%(poli2[cFactor-1]%poli2[cFactor-2]))===0){
                                        context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.12.6')
                                        if((poli2[cFactor+1]%(poli2[cFactor-1]/(poli2[cFactor-1]%poli2[cFactor-2])))===0){
                                            context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.12.7')
                                            factorC=poli2[cFactor+1]/(poli2[cFactor-1]/(poli2[cFactor-1]%poli2[cFactor-2]))
                                            //console.log('fFactor: 3.12.7 '+factorC+" arryDiv[0] ",arryDiv[0])
                                            if((poli2[cFactor+1]%factorC)===0&&(poli2[cFactor-1]%(poli2[cFactor-1]%factorC))===0&&(poli2[cFactor+1]%((poli2[cFactor-1]%factorC)))===0){
                                                //console.log('fFactor: 3.12.8 '+factorC+" arryDiv[0] ",arryDiv[0])
                                                factorC=poli2[cFactor+1]/(poli2[cFactor-1]%factorC)
                                                if((poli2[cFactor-2]%(arryDiv[0]/factorC))&&(poli2[cFactor+1]%(poli2[cFactor-1]%poli2[cFactor-2]))===0){
                                                    context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.12.8.1')
                                                    factorC=(poli2[cFactor+1]/(poli2[cFactor-1]%poli2[cFactor-2]))
                                                    if(arryDiv[0]%factorC){
                                                        let divFactor = poli2[cFactor-1]/(poli2[cFactor-1]%poli2[cFactor-2])
                                                        factorC=poli2[cFactor+1]/divFactor
                                                    }
                                                }
                                            }else if((poli2[cFactor-2]%(poli2[cFactor-2]%factorC))===0){
                                                //console.log('fFactor: 3.12.9 '+factorC+" arryDiv[0] ",arryDiv[0])
                                                let subDiv = (poli2[cFactor-2]/(poli2[cFactor-2]%factorC))
                                                if((poli2[cFactor-1]%subDiv)===0){
                                                    factorC=poli2[cFactor-1]/subDiv
                                                    if((poli2[cFactor+1]%factorC)===0){
                                                        factorC=poli2[cFactor+1]/factorC
                                                    }
                                                    
                                                }
                                            }
                                             if (poli2[cFactor-1]%(poli2[cFactor-1]%(poli2[cFactor-1]%(poli2[cFactor+1]%poli2[cFactor-1])))===0){
                                                let subDiv=poli2[cFactor+1]/(poli2[cFactor-1]%(poli2[cFactor-1]%(poli2[cFactor+1]%poli2[cFactor-1])))
                                                if((arryDiv[0]%subDiv)===0){
                                                    if((poli2[cFactor-2]%(arryDiv[0]/subDiv))===0){
                                                        factorC=subDiv
                                                    }
                                                }
                                            }
                                        }
                                    }else if((poli2[cFactor-2]%(arryDiv[0]/factorC))&&(poli2[cFactor-1]%(poli2[cFactor-1]%(poli2[cFactor-1]%poli2[cFactor-2])))===0){
                                        context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.12.10')
                                        let divFactor = poli2[cFactor-1]/(poli2[cFactor-1]%(poli2[cFactor-1]%poli2[cFactor-2]))
                                        //console.log('fFactor: 3.12.10',divFactor)
                                        if((poli2[cFactor+1]%divFactor)===0){
                                            context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.12.10.1')
                                            factorC=poli2[cFactor+1]/divFactor
                                            //console.log('fFactor: 3.12.10??0',factorC,"aD_ ",arryDiv[0])
                                            if(poli2[cFactor-1]%factorC&&((poli2[cFactor+1]%factorC)===0)&&(arryDiv[0]%factorC)){
                                                context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.12.10.2')
                                                factorC=poli2[cFactor-1]%factorC
                                                //console.log('fFactor: 3.12.10??',factorC)
                                            }
                                            
                                        }

                                        divFactor = (poli2[cFactor-2]%(poli2[cFactor-1]%poli2[cFactor-2]))                                        

                                        if((poli2[cFactor-2]%divFactor)===0&&(poli2[cFactor-1]%divFactor)===0&&(poli2[cFactor+1]%divFactor)===0){

                                            if((arryDiv[0]%(poli2[cFactor+1]/divFactor))===0){
                                                context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.12.10.3')
                                                factorC=poli2[cFactor+1]/divFactor
                                            }
                                        }

                                        if(arryDiv[0]%factorC&&(arryDiv[0]%(poli2[cFactor+1]%poli2[cFactor-2]))===0){
                                            factorC=poli2[cFactor+1]%poli2[cFactor-2]
                                            context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.12.10.4')
                                        }else if (poli2[cFactor-1]%(poli2[cFactor-1]%(poli2[cFactor-1]%(poli2[cFactor+1]%poli2[cFactor-1])))===0){
                                            let subDiv=poli2[cFactor+1]/(poli2[cFactor-1]%(poli2[cFactor-1]%(poli2[cFactor+1]%poli2[cFactor-1])))
                                            if((arryDiv[0]%subDiv)===0){
                                                if((poli2[cFactor-2]%(arryDiv[0]/subDiv))===0){
                                                    factorC=subDiv
                                                }
                                            }
                                            context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.12.10.5')
                                        }

                                    }

                                    let subDiv = poli2[cFactor-1]%poli2[cFactor+1]
                                    if((poli2[cFactor+1]%(poli2[cFactor+1]%subDiv))===0){
                                        subDiv=(poli2[cFactor+1]/(poli2[cFactor+1]%subDiv))
                                        if((arryDiv[0]%subDiv)===0){
                                            factorC=subDiv
                                            //console.log('newFactor 3.12??: ',factorC)
                                            context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.12.10.6')
                                        }
                                    }else if ((poli2[cFactor+1]%(poli2[cFactor+1]%(poli2[cFactor+1]%subDiv)))===0){
                                        subDiv=(poli2[cFactor+1]/(poli2[cFactor+1]%(poli2[cFactor+1]%subDiv)))
                                        if((arryDiv[0]%subDiv)===0){
                                            if((poli2[cFactor-2]%(arryDiv[0]/subDiv))===0){
                                                factorC=subDiv
                                                //console.log('newFactor 3.12?2?: ',factorC)
                                                context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.12.10.7')
                                            }
                                        }
                                    }

                                    //universal factorization
                                    let a = poli2[cFactor+1]
                                    let b = poli2[cFactor-1]
                                    if(poli2[cFactor-1]%poli2[cFactor+1]===poli2[cFactor-1]){
                                        a = poli2[cFactor-1]
                                        b = poli2[cFactor+1]
                                    }
                                    subDiv = a%(b%a)
                                    while(((a%subDiv)&&(a%subDiv)!==1)){
                                        subDiv=(a%subDiv)
                                    }
                                    while(((b%subDiv)&&(b%subDiv)!==1)){
                                        subDiv=(b%subDiv)
                                    }
                                    //console.log('fFactor: 3.12.10.2??',subDiv,' - ',(arryDiv[0]%(poli2[cFactor+1]/subDiv)),' - ',(poli2[cFactor+1]%subDiv))
                                    if((arryDiv[0]%(poli2[cFactor+1]/subDiv))===0&&(poli2[cFactor+1]%subDiv)===0){
                                        subDiv=poli2[cFactor+1]/subDiv
                                        //console.log('subdiv wile?: ',subDiv,' - ',(poli2[cFactor-2]%(arryDiv[0]/subDiv)))
                                        if((poli2[cFactor-2]%(arryDiv[0]/subDiv))===0){
                                            
                                            factorC=subDiv
                                        }
                                    }
                                    

                                    arryDiv[0]/=factorC
                                    arryDiv[1]=poli2[cFactor-2]/arryDiv[0]
                                    divsFactors[0][1]*=factorC
                                    divsFactors[0][0]/=factorC
                                    divsFactors[1][0]/=factorC
                                    let secondFactor = arryDiv[1]%divsFactors[0][1]
                                    //console.log('divsFactors[0][1]? ',divsFactors[0][1],' ',secondFactor,' - ',(divsFactors[0][1]%secondFactor))
                                    //console.log('??: ',(poli2[cFactor-2]/arryDiv[0]))
                                    if(!(divsFactors[0][1]%secondFactor)){
                                        arryDiv[1]/=secondFactor
                                        arryDiv[0]*=secondFactor
                                        divsFactors[0][1]/=secondFactor
                                        divsFactors[0][0]*=secondFactor
                                        divsFactors[1][0]*=secondFactor
                                    }

                                }else if (poli2[cFactor-1]%poli2[cFactor-2]===poli2[cFactor-1]){
                                    
                                    let factorC=(poli2[cFactor-2]/(poli2[cFactor-2]%poli2[cFactor-1]))
                                    context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.13 '+factorC)

                                    if(poli2[cFactor-2]%(arryDiv[0]/factorC)&&!(poli2[cFactor+1]%(poli2[cFactor-1]/(poli2[cFactor-2]%poli2[cFactor-1])))){
                                        factorC=(poli2[cFactor+1]/(poli2[cFactor-1]/(poli2[cFactor-2]%poli2[cFactor-1])))
                                        context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.13.1 '+factorC+" arryDiv[0] "+arryDiv[0])
                                    }
                                    
                                    if(arryDiv[0]%factorC&&(poli2[cFactor+1]%(poli2[cFactor+1]%(poli2[cFactor-1]%poli2[cFactor+1])))===0){
                                        
                                        factorC=poli2[cFactor+1]/(poli2[cFactor+1]%(poli2[cFactor-1]%poli2[cFactor+1]))
                                        context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.13.2 '+factorC+" arryDiv[0] "+arryDiv[0])
                                        //console.log('fFactor: 3.13.2 '+factorC+" arryDiv[0] "+arryDiv[0])
                                    }else if(arryDiv[0]%factorC&&(poli2[cFactor+1]%(poli2[cFactor-1]%(poli2[cFactor-2]%poli2[cFactor-1])))===0){
                                        context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.13.3 '+factorC+" arryDiv[0] "+arryDiv[0])
                                        
                                        factorC=poli2[cFactor+1]/(poli2[cFactor-1]%(poli2[cFactor-2]%poli2[cFactor-1]))
                                        //console.log('fFactor: 3.13.3 '+factorC+" arryDiv[0] "+arryDiv[0])
                                    }
                                    
                                    if ((poli2[cFactor+1]%(poli2[cFactor-1]%(poli2[cFactor+1]%poli2[cFactor-1])))===0){
                                        context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.13.4 '+factorC+" arryDiv[0] "+arryDiv[0])
                                        
                                        factorC=poli2[cFactor+1]/(poli2[cFactor-1]%(poli2[cFactor+1]%poli2[cFactor-1]))
                                        //console.log('fFactor: 3.13.4 '+factorC+" arryDiv[0] "+arryDiv[0])
                                        if(poli2[cFactor-2]%(arryDiv[0]/factorC)&&(poli2[cFactor+1]%(poli2[cFactor-1]%(poli2[cFactor-1]%(poli2[cFactor+1]%poli2[cFactor-1]))))===0){
                                            context?.FFactor[0][context.FFactor[0]?.length-1]?.push('fFactor: 3.13.5 '+factorC+" arryDiv[0] "+arryDiv[0])
                                            factorC=poli2[cFactor+1]/(poli2[cFactor-1]%(poli2[cFactor-1]%(poli2[cFactor+1]%poli2[cFactor-1])))
                                            //console.log('factor 3.13.5 ',factorC)
                                        }
                                    }

                                    let subDiv = poli2[cFactor-1]%poli2[cFactor+1]
                                    if((poli2[cFactor+1]%(poli2[cFactor+1]%subDiv))===0){
                                        subDiv=(poli2[cFactor+1]/(poli2[cFactor+1]%subDiv))
                                        if((arryDiv[0]%subDiv)===0){
                                            factorC=subDiv
                                        }
                                        //console.log('newFactor: ',factorC)
                                    }else if ((poli2[cFactor+1]%(poli2[cFactor+1]%(poli2[cFactor+1]%subDiv)))===0){
                                        subDiv=(poli2[cFactor+1]/(poli2[cFactor+1]%(poli2[cFactor+1]%subDiv)))
                                        //console.log('newFactor2?: ',subDiv,arryDiv[0])
                                        if((arryDiv[0]%subDiv)===0){
                                            if((poli2[cFactor-2]%(arryDiv[0]/subDiv))===0){
                                                factorC=subDiv
                                                
                                            }else{
                                                let subDiv = poli2[cFactor-1]%(poli2[cFactor+1]%poli2[cFactor-1])
                                                while((poli2[cFactor-1]%subDiv)&&(poli2[cFactor-1]%subDiv)!==1){
                                                    subDiv=(poli2[cFactor-1]%subDiv)
                                                }
                                                //console.log('fFactor: 3.13.6.2??',subDiv)
                                                if((arryDiv[0]%(poli2[cFactor+1]/subDiv))===0&&(poli2[cFactor+1]%subDiv)===0){
                                                    subDiv=poli2[cFactor+1]/subDiv
                                                    if((poli2[cFactor-2]%(arryDiv[0]/subDiv))===0){
                                                        
                                                        factorC=subDiv
                                                    }
                                                }
                                            }
                                        }
                                        
                                    }

                                    //universal factorization
                                    let a = poli2[cFactor+1]
                                    let b = poli2[cFactor-1]
                                    if(poli2[cFactor-1]%poli2[cFactor+1]===poli2[cFactor-1]){
                                        a = poli2[cFactor-1]
                                        b = poli2[cFactor+1]
                                    }
                                    subDiv = a%(b%a)
                                    while((a%subDiv)&&(a%subDiv)!==1){
                                        subDiv=(a%subDiv)
                                    }
                                    while((b%subDiv)&&(b%subDiv)!==1){
                                        subDiv=(b%subDiv)
                                    }
                                    //console.log('fFactor: 3.13.10.2??',subDiv)
                                    if((arryDiv[0]%(poli2[cFactor+1]/subDiv))===0&&(poli2[cFactor+1]%subDiv)===0){
                                        subDiv=poli2[cFactor+1]/subDiv
                                        if((poli2[cFactor-2]%(arryDiv[0]/subDiv))===0){
                                            
                                            factorC=subDiv
                                        }
                                    }

                                    arryDiv[0]/=factorC
                                    arryDiv[1]=poli2[cFactor-2]/arryDiv[0]
                                    divsFactors[0][1]*=factorC
                                    divsFactors[0][0]/=factorC
                                    divsFactors[1][0]/=factorC
                                    let secondFactor = arryDiv[1]%divsFactors[0][1]
                                    //console.log('secondF ',(divsFactors[0][1]%secondFactor))
                                    if(!(divsFactors[0][1]%secondFactor)){
                                        arryDiv[1]/=secondFactor
                                        arryDiv[0]*=secondFactor
                                        divsFactors[0][1]/=secondFactor
                                        divsFactors[0][0]*=secondFactor
                                        divsFactors[1][0]*=secondFactor
                                    }

                                }

                            }
                        }

                    }
                }                                
                
            }
        }else{
            context?.FFactor[0][context.FFactor[0].length-1].push('fFactor: 4')
            arryDiv[1]=0
            if(!arryDiv[1]){
                context?.FFactor[0][context.FFactor[0].length-1].push('fFactor: 4.1')
                arryDiv[0]=poli2[cFactor]/(poli2[cFactor+1]/divsFactors[0][0])          
            }
            
        }

        divsFactors.push(arryDiv)
        cFactor--
        middleCFactor--
    }
}