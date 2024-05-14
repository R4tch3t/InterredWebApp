import React, { useState, useEffect } from "react";
import { Grid, Dropdown, Switch, GridItem } from "@nextui-org/react";
import Cog from '../icons/cog'

export const SettingsSteps = ({changeSettings}) => {
    const [BBS, setBBS] = useState(true);
    const [BSC, setBSC] = useState(false);
    const [toDecimalVal, setToDecimalVal] = useState(true);
    const [MoreDVal, setMoreDVal] = useState(false)
    const [DegRad, setDegRad] = useState(false)
    const [FCT, setFCT] = useState(true);
    const [ruffini, setRuffini] = useState(true);
    const [FBP, setFBP] = useState(true);

    useEffect(()=>{
        const BBS = localStorage.getItem('BBS')?.trim(); 
        const BSC = localStorage.getItem('BSC')?.trim(); 
        const toDecimalVal = localStorage.getItem('toDecimalVal')?.trim()
        const MoreDVal = localStorage.getItem('MoreDVal')?.trim()
        const DegRad = localStorage.getItem('DegRad')?.trim()
        const FCT = localStorage.getItem('FCT')?.trim()
        const ruffini = localStorage.getItem('ruffini')?.trim()
        const FBP = localStorage.getItem('FBP')?.trim()
        
        if(BBS){
            setBBS(BBS==="true")
        }
        if(BSC){
            setBSC(BSC==="true")
        }
        if(toDecimalVal){
            setToDecimalVal(toDecimalVal==="1")
        }
        if(MoreDVal){
            setMoreDVal(MoreDVal==="1")
        }
        if(DegRad){
            setDegRad(DegRad==="1")
        }
        if(FCT){
            setFCT(FCT==="true")
        }        
        if(ruffini){
            setRuffini(ruffini==="true")
        }
        if(FBP){
            setFBP(FBP==="true")
        }
    },[]);

    return (
        <Grid itemID="gridSett" >
            
            <Dropdown closeOnSelect={false} >
                <Dropdown.Button id="btnSett" color={"success"} shadow>
                   <Cog /> Settings
                </Dropdown.Button>
                <Dropdown.Menu
                    color={"secondary"}
                    variant="shadow"
                    aria-label="Settings"                    
                >
                <Dropdown.Section key="title0" title={'Preprocess'} />
                <Dropdown.Item key="Braket Solved" >
                    <Switch 
                        id="BBS" 
                        title="Braket Solved"
                        onChange={(e)=>{
                            const band = e.target.checked
                            localStorage.setItem("BBS",band);
                            setBBS(band);
                            localStorage.setItem("BSC",!band);
                            setBSC(!band);
                            changeSettings()
                        }} 
                        checked={BBS}
                        bordered shadow color="primary" /> 
                    <span className="titleSettings" >Braket Solved</span>
                    <div 
                        onClick={(e)=>{
                            localStorage.setItem("BSC",BBS);
                            setBSC(BBS);
                            localStorage.setItem("BBS",!BBS);
                            setBBS(!BBS);        
                            changeSettings()                    
                        }} 
                        className='divClickSettings' />     
                </Dropdown.Item>
                <Dropdown.Item key="Sign Changed">
                    <Switch 
                        id="BSC" 
                        title="Sign Changed"
                        onChange={(e)=>{
                            const band = e.target.checked
                            localStorage.setItem("BSC",band);
                            setBSC(band);
                            localStorage.setItem("BBS",!band);
                            setBBS(!band);
                            changeSettings()
                        }} 
                        checked={BSC}
                        bordered shadow color="primary" /> 
                    <span className="titleSettings" >Sign Changed</span>
                    <div 
                        onClick={(e)=>{
                            localStorage.setItem("BBS",BSC);
                            setBBS(BSC);
                            localStorage.setItem("BSC",!BSC);
                            setBSC(!BSC);    
                            changeSettings()                        
                        }} 
                        className='divClickSettings' />
                </Dropdown.Item>
                
                    <Dropdown.Section key="title1" title={'Preferences'} />
                
                <Dropdown.Item key="To Decimal">
                    <Switch 
                        id="toDecimalVal" 
                        title="To Decimal"
                        onChange={(e)=>{
                            const band = e.target.checked
                            localStorage.setItem("toDecimalVal",band?'1':'0');
                            setToDecimalVal(band);
                            changeSettings();
                        }} 
                        checked={toDecimalVal}
                        bordered shadow color="primary" /> 
                    <span className="titleSettings" >To Decimal</span>
                    <div 
                        onClick={(e)=>{
                            localStorage.setItem("toDecimalVal",toDecimalVal?'0':'1');
                            setToDecimalVal(!toDecimalVal);    
                            changeSettings();                                                    
                        }} 
                        className='divClickSettings' />
                </Dropdown.Item>
                <Dropdown.Item key="More Digits">
                    <Switch 
                        id="MoreDVal" 
                        title="More Digits"
                        onChange={(e)=>{
                            const band = e.target.checked
                            localStorage.setItem("MoreDVal",band?'1':'0');
                            setMoreDVal(band);
                            changeSettings();
                        }} 
                        checked={MoreDVal}
                        bordered shadow color="primary" /> 
                    <span className="titleSettings" >More Digits</span>
                    <div 
                        onClick={(e)=>{
                            localStorage.setItem("MoreDVal",MoreDVal?'0':'1');
                            setMoreDVal(!MoreDVal);         
                            changeSettings();                                               
                        }} 
                        className='divClickSettings' />
                </Dropdown.Item>
                <Dropdown.Item key="Radians">
                    <Switch 
                        id="DegRad" 
                        title="Radians"
                        onChange={(e)=>{
                            const band = e.target.checked
                            localStorage.setItem("DegRad",band?'1':'0');
                            setDegRad(band);
                            changeSettings()
                        }} 
                        checked={DegRad}
                        bordered shadow color="primary" /> 
                    <span className="titleSettings" >Radians</span>
                    <div 
                        onClick={(e)=>{
                            localStorage.setItem("DegRad",DegRad?'0':'1');
                            setDegRad(!DegRad); 
                            changeSettings();                                                       
                        }} 
                        className='divClickSettings' />
                </Dropdown.Item>
                <Dropdown.Section key="title2" title={'Equations'} />
                <Dropdown.Item key="Factorization">
                    <Switch 
                        id="FCT" 
                        title="Factorization"
                        onChange={(e)=>{
                            const band = e.target.checked
                            localStorage.setItem("FCT",band);
                            setFCT(band);
                            changeSettings();
                        }} 
                        checked={FCT}
                        bordered shadow color="primary" /> 
                    <span className="titleSettings" >Factorization</span>
                    <div 
                        onClick={(e)=>{
                            localStorage.setItem("FCT",!FCT);
                            setFCT(!FCT);       
                            changeSettings();                                                 
                        }} 
                        className='divClickSettings' />
                </Dropdown.Item>
                <Dropdown.Item key="Ruffini">
                    <Switch 
                        id="ruffini" 
                        title="Ruffini's rule"
                        onChange={(e)=>{
                            const band = e.target.checked
                            localStorage.setItem("ruffini",band);
                            setRuffini(band);
                            changeSettings();
                        }} 
                        checked={ruffini}
                        bordered shadow color="primary" /> 
                    <span className="titleSettings" >Ruffini's rule</span>
                    <div 
                        onClick={(e)=>{
                            localStorage.setItem("ruffini",!ruffini);
                            setRuffini(!ruffini);       
                            changeSettings();                                                 
                        }} 
                        className='divClickSettings' />
                </Dropdown.Item>
                <Dropdown.Item key="FBP">
                    <Switch 
                        id="FBP" 
                        title="Factor by parts"
                        onChange={(e)=>{
                            const band = e.target.checked
                            localStorage.setItem("FBP",band);
                            setFBP(band);
                            changeSettings();
                        }} 
                        checked={FBP}
                        bordered shadow color="primary" /> 
                    <span className="titleSettings" >Factor by parts</span>
                    <div 
                        onClick={(e)=>{
                            localStorage.setItem("FBP",!FBP);
                            setFBP(!FBP);       
                            changeSettings();                                                 
                        }} 
                        className='divClickSettings' />
                </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>                               
        </Grid>
    )
}