import React, { useState, useEffect } from "react";
import { Grid, Dropdown, Switch, GridItem } from "@nextui-org/react";
import Cog from '../icons/cog'

export const TestSteps = ({testFactors}) => {
    

    return (
        <Grid itemID="gridTests" >
            
            <Dropdown closeOnSelect={false} >
                <Dropdown.Button id="btnSett" color={"success"} shadow>
                   <Cog /> TestFactors
                </Dropdown.Button>
                <Dropdown.Menu
                    color={"secondary"}
                    variant="shadow"
                    aria-label="Settings"                    
                >
                
                
                <Dropdown.Item key="To Decimal">
                     
                    <span className="titleSettings" >Test Factors</span>
                    <div 
                        onClick={(e)=>{
                            testFactors()                        
                        }} 
                        className='divClickSettings' />
                </Dropdown.Item>
                
                </Dropdown.Menu>
            </Dropdown>                               
        </Grid>
    )
}