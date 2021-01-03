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
        <div>
            <h2>Calculated Strategy: </h2>
            {renderStints}
        </div>
    );
}

export default calculatedStrategies;