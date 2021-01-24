import React,{Component} from 'react';
import CalculatedStint from '../../Models/CalculatedStint';
import RaceStrategy from '../../Models/RaceStrategy';
import CalculatedStrategies from './CalculatedStrategies/calculatedStrategies';
import style from './Calculator.module.css';


class Calculator extends Component 
{
    definedCompounds = null;
    raceStats = parseInt(this.props.raceStats);
    usedCompounds = [];
    currentStrategy = null;
    raceStrategies = [];


    constructor(props)
    {
        super(props);
        this.state = {render:false};
    }

    componentDidUpdate()
    {
        if (this.definedCompounds !== this.props.definedCompounds)
        {
            this.raceStrategies = [];
            this.usedCompounds = [];
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
                this.raceStrategies.push(strategy);
                this.setState({render:true});

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
            

            let compound = this.findOptimalCompound(optimalStintLaps,this.raceStats.fuelLaps);
            if (compound){

                let stintLaps = this.getStintLaps(currentLap,compound);
                let stintFuel = this.getStintFuel(strategy,stintLaps);

                strategy.Stints.push(
                    new CalculatedStint(compound.tyreType.name,
                            currentLap,
                            compound.speedFactor,
                            stintFuel,
                            compound,
                            stintLaps
                            )
                );

                currentLap = currentLap + (compound.minLaps > this.raceStats.fuelLaps?this.raceStats.fuelLaps:compound.minLaps);
                this.updateCompoundUsage(compound);
            }
            else{
                //No compounds found
                currentLap = this.raceStats.raceLaps;
            }
        }

        return strategy;
    }

    getStintLaps(currentLap,compound)
    {
        if ((this.raceStats.raceLaps - currentLap) > compound.minLaps)
        {
            return (compound.minLaps > this.raceStats.fuelLaps?this.raceStats.fuelLaps:compound.minLaps);
        }

        return (this.raceStats.raceLaps - currentLap);
    }

    getStintFuel(strategy,stintLaps)
    {
        if (strategy.Stints.length === 0)
        {
            //First stint we go full fuel. 
            return this.raceStats.fuelLaps;
        }
        else
        {
            let previousStint = strategy.Stints[strategy.Stints.length - 1];
            let remainingFuel = previousStint.Fuel - previousStint.StintLength;
            let calculatedFuel = stintLaps - remainingFuel + this.raceStats.deltaFuel;

            return (calculatedFuel>this.raceStats.fuelLaps)? this.raceStats.fuelLaps : calculatedFuel;
        }
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
        if (this.raceStrategies.length > 0)
        {
            return this.raceStrategies.map((strategy,index) => {
                return <CalculatedStrategies 
                    key={index} 
                    strategy={strategy}
                    />
            })
        }
        else{
            return <p>Provide data first.</p>;
        }
    }


    render () {
        return (
            <div className={style.Calculator}>
                {this.renderCalculatedStints()}
            </div>
            );
    }
}

export default Calculator;