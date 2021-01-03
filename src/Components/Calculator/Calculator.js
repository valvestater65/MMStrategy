import React,{Component} from 'react';
import CalculatedStint from '../../Models/CalculatedStint';
import RaceStrategy from '../../Models/RaceStrategy';
import CalculatedStrategies from './CalculatedStrategies/calculatedStrategies';


class Calculator extends Component 
{
    definedCompounds = this.props.definedCompounds;
    raceStats = this.props.raceStats;

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
        console.log('calculating strategies');
        if (this.definedCompounds.length > 0)
        {
            console.log('we got compoounds!');
            //while(this.compoundsAvailable())
            //{
                let strategy = this.calculateStrategyStints(new RaceStrategy());
                let calculatedStrategies = this.state.raceStrategies;
                calculatedStrategies.push(strategy);
                this.setState({raceStrategies:calculatedStrategies});
            //}
            console.log('end loop');
        }
    }

    calculateStrategyStints(strategy) 
    {
        
        let currentLap = 0;
        let compoundIndex = 0;

        this.definedCompounds.sort((a,b) => {return a.speedFactor - b.speedFactor});

        while (currentLap < this.raceStats.raceLaps)
        {
            let remainingStints = Math.round((this.raceStats.raceLaps - currentLap) / this.raceStats.fuelLaps);
            let optimalStintLaps = (this.raceStats.raceLaps / remainingStints).toFixed(2);

            if (!this.canCompoundBeUsed(this.definedCompounds[compoundIndex]))
            {
                compoundIndex++;
            }


            //let compound = this.definedCompounds[compoundIndex];
            let compound = this.findOptimalCompound(optimalStintLaps,this.raceStats.fuelLaps);

            strategy.Stints.push(
                new CalculatedStint(compound.tyreType.name,
                        compound.minLaps,
                        compound.speedFactor,
                        10)
            );

            this.updateCompoundUsage(compound);
            currentLap = currentLap + compound.minLaps;
            console.log('currentLap:' + currentLap);
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
            let usedCompound = this.usedCompounds.find((el) => el.compoundId === compound.id);
            if (usedCompound)
            {
                usedCompound.used+=1;
                
                this.usedCompounds.slice(this.usedCompounds.findIndex((el)=> el.compoundId === compound.id),1,usedCompound);
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
            let element = this.usedCompounds.find((el) => el.compoundId === compound.id);

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
        console.log("here");
        console.log(this.state.raceStrategies);
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