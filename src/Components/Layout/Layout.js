import React, {Component} from 'react';
import Calculator from '../Calculator/Calculator';
import FormSetup from '../FormSetup/FormSetup';

class Layout extends Component{
    state = {
        raceStats:{},
        definedCompounds:[]
    }

    calculateClickHandler = (ev,raceData) => 
    {
        ev.preventDefault();
        this.setState({raceStats: raceData.raceStats, definedCompounds:raceData.definedCompounds});
    }

    render (){
        return(
            <div>
                <h1>Strategy Builder</h1>
                <FormSetup calculateClick = {this.calculateClickHandler}/>
                <Calculator
                    raceStats = {this.state.raceStats}
                    definedCompounds = {this.state.definedCompounds}/>
            </div>
        );
    };
}

export default Layout;