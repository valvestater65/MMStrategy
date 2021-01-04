import React from 'react';
import CalculatedStints from '../CalculatedStints/calculatedStints';
import Styles from './calculatedStrategies.module.css';

const calculatedStrategies = (props) => 
{
    const renderStints = props.strategy.Stints.map((stint) => 
        {
            return <CalculatedStints key={Date.now()}
                stint = {stint}
                />
        });
    

    return (
        <div className={Styles.CalculatedStrategy} >
            <h2>Calculated Strategy: </h2>
            <div className={Styles.stintrow}>
                {renderStints}
            </div>
        </div>
    );
}

export default calculatedStrategies;