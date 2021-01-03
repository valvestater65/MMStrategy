import React from 'react';
import CalculatedStints from '../CalculatedStints/calculatedStints';

const calculatedStrategies = (props) => 
{
    const renderStints = props.strategy.Stints.map((stint) => 
        {
            return <CalculatedStints key={stint.TyreName+"_"+stint.Laps}
                tyre={stint.TyreName}
                laps={stint.Laps}
                fuel={stint.Fuel} />
        });
    

    return (
        renderStints
    );
}

export default calculatedStrategies;