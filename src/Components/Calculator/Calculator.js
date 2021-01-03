import React,{Component} from 'react';
import CalculatedStint from '../../Models/CalculatedStint';
import RaceStrategy from '../../Models/RaceStrategy';
import CalculatedStrategies from './CalculatedStrategies/calculatedStrategies';


class Calculator extends Component 
{
    definedCompounds = this.props.definedCompounds;
    raceStats = parseInt(this.props.raceStats);

    state = {
        raceStrategies: []
    }

    usedCompounds = [];
    currentStrategy = null;

    componentDidUpdate(prevProps)
    {
        if (this.props.definedCompounds !== prevProps.definedCompounds)
        {
            this.definedCompounds = this.props.definedCompounds;
            this.raceStats = this.props.raceStats;
            this.calculateRaceStrategies();
        }
    }

    calculateRaceStrategies() 
    {
        if (this.definedCompounds.length > 0)
        {
            //while(this.compoundsAvailable())
            //{
                let strategy = this.calculateStrategyStints(new RaceStrategy());
                let calculatedStrategies = this.state.raceStrategies;
                calculatedStrategies.push(strategy);
                this.setState({raceStrategies:calculatedStrategies});
            //}
        }
    }

    calculateStrategyStints(strategy) 
    {
        
        let currentLap = 0;

        while (currentLap < this.raceStats.raceLaps)
        {
            let remainingLaps = (parseInt(this.raceStats.raceLaps) - currentLap);
            let remainingStints = Math.ceil((remainingLaps) / this.raceStats.fuelLaps);
            let optimalStintLaps = (remainingLaps / remainingStints).toFixed(2);
            console.log('remainingLaps: ' + remainingLaps);
            console.log('remainingStints: ' + remainingStints);
            console.log('optimalStintLaps: ' + optimalStintLaps);

            let compound = this.findOptimalCompound(optimalStintLaps,this.raceStats.fuelLaps);
            if (compound){

                console.log('compound determined: ' + compound.tyreType.name);
                strategy.Stints.push(
                    new CalculatedStint(compound.tyreType.name,
                            currentLap,
                            compound.speedFactor,
                            10)
                );

                currentLap = currentLap + (compound.minLaps > this.raceStats.fuelLaps?this.raceStats.fuelLaps:compound.minLaps);
                this.updateCompoundUsage(compound);
                console.log('used compounds');
                console.log(this.usedCompounds);
            }
            else{
                //No compounds found
                currentLap = this.raceStats.raceLaps;
            }
        }

        return strategy;
    }

    findOptimalCompound(optimalStintLaps,fuelLaps) 
    {
        //Find optimal compound:
            /*
                Rules are: 
                    - Available Compound MinLaps >= FuelLaps || optimalStintLaps check if optimalStintLaps > Fuel Laps
                    - For the given candidates, the one with smallest speedfactor.
                    - If no candidates the compound with smallest speedfactor. 
            */

        let candidates = [];
        let compoundMinLaps = (optimalStintLaps > fuelLaps)? fuelLaps:optimalStintLaps;
        console.log('compoundMinLaps:' + compoundMinLaps);

        this.definedCompounds.forEach(element => {
            if (this.canCompoundBeUsed(element))
            {
                if(element.minLaps >= compoundMinLaps)
                {
                    candidates.push(element);
                }
            }
        });

        if (candidates.length === 0)
        {
            this.definedCompounds.forEach(element => {
                if (this.canCompoundBeUsed(element))
                {
                    candidates.push(element);
                }
            }); 

        }
        return candidates.sort((a,b) => a.tyreType.speedFactor - b.tyreType.speedFactor)[0];
        
    }

    compoundsAvailable()
    {
        return this.definedCompounds.some((compound) => this.canCompoundBeUsed(compound));
    }

    updateCompoundUsage(compound)
    {
        if (this.usedCompounds.length === 0)
        {
            this.usedCompounds.push({
                compoundId: compound.id,
                used:1
            });
        }
        else
        {
            let usedCompound = this.usedCompounds.find((el) => parseInt(el.compoundId) === parseInt(compound.id));
            if (usedCompound)
            {
                usedCompound.used+=1;
                
                this.usedCompounds.slice(this.usedCompounds.findIndex((el)=> parseInt(el.compoundId) === parseInt(compound.id)),1,usedCompound);
            }
            else{

                this.usedCompounds.push({
                    compoundId: compound.id,
                    used:1
                });
            }
        }
    }

    canCompoundBeUsed(compound)
    {
        if (this.usedCompounds.length === 0)
        {
            return true;
        }
        else
        {
            let element = this.usedCompounds.find((el) => parseInt(el.compoundId) === parseInt(compound.id));

            if (!element)
            {
                return true;
            }
            else
            {
                return element.used < compound.available;
            }
        }
    }

    renderCalculatedStints()
    {
        if (this.state.raceStrategies.length > 0)
        {
            return this.state.raceStrategies.map((strategy) => {
                return <CalculatedStrategies key={Date.now} strategy={strategy} />
            })
        }
        else{
            return <p>provide data</p>;
        }
    }


    render () {
        return (this.renderCalculatedStints());
    }
}

export default Calculator;