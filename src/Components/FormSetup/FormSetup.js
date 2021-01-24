import React,{Component} from 'react';
import Compound from './Compounds/Compound';
import RaceData from './RaceData/raceData';
import style from './FormSetup.module.css';

class FormSetup extends Component {

    state = {
        raceStats: {
            fuelLaps:0,
            raceLaps:0,
            deltaFuel:0
        },
        definedCompounds: []
    }

    fuelLapsHandler = (e) => 
    {
        e.preventDefault();

        let currentStats = this.state.raceStats;
        currentStats.fuelLaps = parseInt(e.target.value);

        this.setState({raceStats : currentStats});
    }

    raceLapsHandler = (e) => 
    {
        e.preventDefault();
        let currentStats = this.state.raceStats;
        currentStats.raceLaps = parseInt(e.target.value);

        this.setState({raceStats : currentStats});
    }

    deltaFuelHandler = (e) => 
    {
        e.preventDefault();
        let currentStats = this.state.raceStats;
        currentStats.deltaFuel = parseInt(e.target.value);

        this.setState({raceStats : currentStats});
    }

    addCompoundHandler = (compound) => 
    {
        let currCompounds = this.state.definedCompounds;

        let existingCompound = currCompounds.find((el) => {return el.id === compound.id});

        if (existingCompound)
        {
            let elementIndex = currCompounds.indexOf(existingCompound);
            currCompounds.splice(elementIndex,1,compound);
            this.setState({definedCompounds:currCompounds});
        }
        else{
            console.log("element not found: " + compound);
        }
        
    }

    createCompoundHandler = () => 
    {
        let currCompounds = this.state.definedCompounds;
        currCompounds.push({
            id: Date.now(),
            tyreType: '',
            maxLaps:0,
            minLaps:0
        });

        this.setState({definedCompounds:currCompounds})
    }

    renderCompounds= () => 
    {
        return this.state.definedCompounds.map((compound) => {
            return <Compound key={compound.id} id={compound.id} setCompound={this.addCompoundHandler}/>
        });
    }

    render (){
        return (
            <div className={style.FormSetup}>
                <div>
                    <p>Setup your main race parameters here. Once done, add compound</p> 
                </div>
                <RaceData 
                    fuelLaps = {this.fuelLapsHandler}
                    raceLaps = {this.raceLapsHandler}
                    deltaFuel = {this.deltaFuelHandler}/>

                <button onClick={this.createCompoundHandler}>Add Compound</button>
                <div className={style.CompoundRow}>
                    {this.renderCompounds()}
                </div>
                <button onClick={(event)=> this.props.calculateClick(event,this.state) }>Calculate</button>
            </div>
        );
    }

}

export default FormSetup;