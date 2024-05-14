import React, { Component } from 'react';
import { printBackgroundSVG } from './evalFunctions/animation'
import { Preprocess } from './evalFunctions/process/preProcess';
import { Input } from "@nextui-org/react";
import { SettingsSteps, HistorySteps, TestSteps  } from './widgets';


class Steps extends Component {
    state={
        expressions:[{val: '', date: new Date()}],
        context:{

        },
        

    }
    
    componentDidMount(){
        const sa = document.getElementById('steps-area');
        let html = printBackgroundSVG();
        const expressions = this.changeSettings(true)
        if(!expressions?.length){
            html+="<p style='text-align:center; font-size: 32px'>`color(green)(RR = Write quad an quad e x pression. )`</p>"
        }else{
            const {context} = this.state
            Preprocess(expressions[expressions.length-1].val,context);
            html+=context.strltx;
            expressions.push({val: '', date: new Date()})
            this.setState({...this.state,expressions})             
        }

        //Inject the Latex-HTML
        sa.innerHTML=html
        renderJax();
    }

    changeSettings = (isInits) => {
        let BBS = localStorage.getItem('BBS')?.trim(); 
        let BSC = localStorage.getItem('BSC')?.trim(); 
        let toDecimalVal = localStorage.getItem('toDecimalVal')?.trim()
        let MoreDVal = localStorage.getItem('MoreDVal')?.trim()
        let DegRad = localStorage.getItem('DegRad')?.trim()
        let FCT = localStorage.getItem('FCT')?.trim()
        let ruffini = localStorage.getItem('ruffini')?.trim()
        let FBP = localStorage.getItem('FBP')?.trim()
        
        if(!BBS){
            BBS="true"
        }
        if(!BSC){
            BSC="false"
        }
        if(!toDecimalVal){
            toDecimalVal="1"
        }
        if(!MoreDVal){
            MoreDVal="0"
        }
        if(!DegRad){
            DegRad="0"
        }
        if(!FCT){
            FCT="true"
        }
        if(!ruffini){
            ruffini="true"
        }
        if(!FBP){
            FBP="true"
        }
        BBS=BBS==="true"
        BSC=BSC==="true"
        toDecimalVal=toDecimalVal==="1"?1:0
        MoreDVal=MoreDVal==="1"?1:0
        DegRad=DegRad==="1"?1:0
        FCT=FCT==="true"
        ruffini=ruffini==="true"
        FBP=FBP==="true"
        
        this.state.context={
            BBS,
            BSC,
            toDecimalVal,
            MoreDVal,
            DegRad,
            FCT,
            ruffini,
            FBP,
            FFactor:[]
        }
        let expressions = localStorage.getItem('expressions')?.trim()
        if(expressions){
            expressions = JSON.parse(expressions);        
            document.getElementById('asciiBar').value=expressions[expressions?.length-1].val
        }
        if(!isInits){            
            this.evaluateASCII(expressions[expressions?.length-1].val);
        }            
            return expressions
        
    }

    evaluateASCII = (str) => {        
        const sa = document.getElementById('steps-area');
        let html=printBackgroundSVG();         
        const {context} = this.state
        Preprocess(str,context);
        //console.log('contextASCII ',context)        
        html+=context.strltx
        sa.innerHTML=html
        renderJax();
    }

    testFactors=() => {
        const initialL = 5
        const limitL = 10
        let a = initialL
        let b = initialL
        let c = initialL
        let d = initialL
        let e = initialL
        const contextTests={...this.state.context}
        const contextTestsF={...this.state.context, FFactor: []}
        const resultTests = {
            bandAllOk: true,
            strs: [],
            error: {strs:[]}
        }

        while(a<=limitL){
            while(b<=limitL){
                while(c<=limitL){
                    while(d<=limitL){
                        while(e<=limitL){
                            let str=`(${a}x^2+${b})(${c}x^2+${d}x+${e})`
                            Preprocess(str,contextTests);
                            str=str.split('(1x').join('(x')
                            str=str.split('+1x').join('+x')
                            Preprocess(contextTests.res,contextTestsF);
                            if(str!==contextTestsF.res){
                                resultTests.bandAllOk=false
                                resultTests.error.strs.push({str, unFactored:contextTests.res, factored:contextTestsF.res, ffactor: contextTestsF.FFactor[0] })
                                //alert('error on: '+str)
                                //break;
                            }else{
                                resultTests.strs.push({unFactored:contextTests.res, factored:contextTestsF.res })
                            }
                            e++
                        }
                        e=initialL
                        d++
                    }
                    d=initialL
                    c++
                }
                c=initialL
                b++
            }
            a++
            b=initialL
        }
        //console.log(resultTests)       
        //console.log('contextTests ',contextTests)
        //console.log('contextTestsF ',contextTestsF)
    }

    changeASCIIBar = (e) => {
        const {expressions} = this.state; 
        const lastIndex = expressions?.length-1        
        expressions[lastIndex].val = e.target.value         
        localStorage.setItem('expressions',JSON.stringify(expressions));
        /*setTimeout(()=>{
            const text = document.getElementById('asciiBar').value
            this.evaluateASCII(text);
        },1000)*/
        this.evaluateASCII(e.target.value);
    }

    setFromHistory = (str, deleteHistory) => {
        this.evaluateASCII(str);
        document.getElementById('asciiBar').value=str
        if(deleteHistory){
            this.state.expressions=[{val: '', date: new Date()}]
        }
    }

    
    render() {

        let { pageTitle, homePageUrl, homePageText, activePageText } = this.props;
        
        return (
            <div>
                <div className="page-title-area item-bg1" style={{paddingTop: 100}} >
                    <div className="container">
                        <div className="page-title-content">
                            <h2>{pageTitle}</h2>                            
                        
                        </div>
                    </div>
                </div>
                
                {/* Steps Input Title */}
                <div className='steps-wtitle' >
                    <h3>Write an expression</h3>
                </div>

                <div className='steps-settings'  >
                    <SettingsSteps changeSettings={this.changeSettings} />   
                    <HistorySteps setFromHistory={this.setFromHistory} />  
                    {/*<TestSteps testFactors={this.testFactors} />*/}                                   
                </div>
                
                
                

                {/* Steps Input */}
                <div className="steps-input">                    
                    <Input 
                        id='asciiBar'
                        clearable 
                        onChange={this.changeASCIIBar}
                        placeholder="Type something..." 
                        aria-labelledby='asciiBar'
                        initialValue={this.state?.expressions[this.state.expressions?.length-2]?.val} 
                        width='100%' />
                </div>

                {/* Steps Area Results */}
                <div id='steps-area' className='steps-area' style={{overflowY: 'auto'}} >
                                    
                </div>

            </div>
        );
    }
}

export default Steps;