import React,{Component} from 'react';
import Compound from './Compounds/Compound';
import RaceData from './RaceData/raceData';

class FormSetup extends Component {

    state = {
        raceStats: {
            fuelLaps:0,
            raceLaps:0
        },
        definedCompounds: []
    }

    fuelLapsHandler = (e) => 
    {
        e.preventDefault();

        let currentStats = this.state.raceStats;
        currentStats.fuelLaps = e.target.value;

        this.setState({raceStats : currentStats});
    }

    raceLapsHandler = (e) => 
    {
        e.preventDefault();
        let currentStats = this.state.raceStats;
        currentStats.raceLaps = e.target.value;

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
            <div>
                <RaceData 
                    fuelLaps = {this.fuelLapsHandler}
                    raceLaps = {this.raceLapsHandler}/>

                <button onClick={this.createCompoundHandler}>Add Compound</button>
                {this.renderCompounds()}
                <button onClick={(event)=> this.props.calculateClick(event,this.state) }>Calculate</button>
            </div>
        );
    }

}

export default FormSetup;