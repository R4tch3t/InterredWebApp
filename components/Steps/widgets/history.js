import React, { useState, useEffect } from "react";
import { Grid, Dropdown, Switch } from "@nextui-org/react";
import {diffDate} from '../helpers'
import Cog from '../icons/history'

export const HistorySteps = ({setFromHistory}) => {
    const [expressions, setExpressions] = useState([]);
    let lastDate = new Date();
    
    const deleteHistory = () => {
        localStorage.removeItem('expressions')
        setExpressions([])
        setFromHistory('',true)
    }
    const loadHistory = () =>{
        lastDate = new Date();
        let expressions = localStorage.getItem('expressions')?.trim(); 
        if(expressions){            
            expressions = JSON.parse(expressions)
            expressions = expressions.reverse();
            setExpressions(expressions)
        }else{
            setExpressions([])
        }
    }
    useEffect(()=>{
        loadHistory();
    },[]);

    return (
        <Grid style={{marginLeft: 30}} >
            <Dropdown closeOnSelect={false} onOpenChange={(isOpen)=>{
                if(isOpen){
                    loadHistory();
                }
            }} >
                <Dropdown.Button color={"primary"} shadow>
                    <Cog />{`History`}
                </Dropdown.Button>
                <Dropdown.Menu
                    color={"success"}
                    variant="shadow"
                    aria-label="History"                    
                >
                {expressions?.length && <Dropdown.Section key="titleToday" title={'Today'} />}
                    {expressions.map((exp,i)=>{
                        let toDay = new Date();
                        const currentDate = new Date(exp.date)
                        let bandChange = false;
                        const dateWrite = diffDate(currentDate,toDay);
                        
                        if(currentDate.getTime()<lastDate.getTime()/*currentDate.getDate()<lastDate.getDate()*/){
                            bandChange=true
                            if(currentDate.getDate()===lastDate.getDate()&&currentDate.getMonth()===lastDate.getMonth()){
                                if(currentDate.getDate()!==toDay.getDate()){
                                    bandChange=false
                                }
                                if(currentDate.getHours()<toDay.getHours()){
                                    if(currentDate.getHours()===lastDate.getHours()){
                                        bandChange=false
                                    }
                                }
                            }
                            
                            lastDate = currentDate;                            
                            
                        }
                        if(currentDate.getTime()===toDay.getTime()){
                            bandChange=false
                        }                        
                        if(!bandChange){
                            return (                                
                                <Dropdown.Item key={`history${i}`} >                                        
                                    {exp.val}
                                    <div 
                                        onClick={(e)=>{
                                            setFromHistory(exp.val)                                            
                                        }} 
                                        className='divClickHistory' /> 
                                </Dropdown.Item>
                            )
                        }

                        return (
                            <Dropdown.Section key={`titleHistory${i}`} title={dateWrite} >                            
                                <Dropdown.Item key={`history${i}`} >                                                                       
                                    {exp.val}
                                    <div 
                                        onClick={(e)=>{
                                            setFromHistory(exp.val)                                            
                                        }} 
                                        className='divClickHistory' /> 
                                </Dropdown.Item>                            
                            </Dropdown.Section>
                        )    
                    })}
                    <Dropdown.Section key="title1" />
                    <Dropdown.Item key={`deleteHistory`} color='error' >
                        Delete History
                        <div 
                            onClick={(e)=>{
                                deleteHistory()                                            
                            }} 
                            className='divClickHistory' />
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Grid>
    )
}