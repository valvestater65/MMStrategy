import React, {Component} from 'react';
import Calculator from '../Calculator/Calculator';
import FormSetup from '../FormSetup/FormSetup';

class Layout extends Component{
    state = {
        maxFuel: 0,
        tyreSets : [
            {
                tyreType:"Soft",
                minLaps: 0,
                maxLaps:10
            },
            {
                tyreType:"Medium",
                minLaps: 0,
                maxLaps:10
            }
        ]
    }

    render (){
        return(
            <div>
                <h1>Strategy Builder</h1>
                <FormSetup/>
                <Calculator/>
            </div>
        );
    };
}

export default Layout;