import React from 'react';
import Styles from './calculatedStints.module.css';

const calculatedStints = (props) => {

    const highlightColor = [];

    highlightColor.push(Styles.row);
    
    if (parseInt(props.stint.Compound.minLaps - props.stint.StintLength) === 0)
    {
        highlightColor.push(Styles.warning);
    }
    else
    {
        highlightColor.push(Styles.safe);
    }

    return(
        <div className={Styles.CalculatedStints}>
            <div className={Styles.Compound}>{props.stint.TyreName}</div>
            <div className={Styles.Details}>
                <div className={Styles.row}>
                    <p>Box Lap:</p> 
                    <span>{props.stint.BoxLap}</span>
                </div>
                <div className={Styles.row}>
                    <p>Fuel: </p>
                    <span>{props.stint.Fuel}</span>
                </div>
                <div className={highlightColor.join(' ')}>
                    <p>Diff. Tyre Laps: </p>
                    <span>{props.stint.Compound.minLaps - props.stint.StintLength}</span>
                </div>
                <div className={Styles.row}>
                    <p>Stint Laps:</p>
                    <span>{props.stint.StintLength}</span>
                </div>
            </div>
        </div>
    );
};

export default calculatedStints;