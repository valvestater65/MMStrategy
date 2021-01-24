import React, {Component} from 'react';
import Calculator from '../Calculator/Calculator';
import FormSetup from '../FormSetup/FormSetup';
import PageHeader from './Header/pageHeader';
import styles from './Layout.module.css';

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
            <div className={styles.Layout}>
                <PageHeader />   
                <FormSetup calculateClick = {this.calculateClickHandler}/>
                <Calculator
                    raceStats = {this.state.raceStats}
                    definedCompounds = {this.state.definedCompounds}/>
            </div>
        );
    };
}

export default Layout;