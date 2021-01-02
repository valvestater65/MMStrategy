import React,{Component} from 'react';
import Compound from './Compounds/Compound';
import RaceData from './RaceData/raceData';

class FormSetup extends Component {

    state = {
        definedCompounds: []
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
                <RaceData/>
                <button onClick={this.createCompoundHandler}>Add Compound</button>
                {this.renderCompounds()}
                <button>Calculate</button>
            </div>
        );
    }

}

export default FormSetup;