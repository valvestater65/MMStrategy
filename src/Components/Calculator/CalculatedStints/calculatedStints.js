import React from 'react';
import Styles from './calculatedStints.module.css';

const calculatedStints = (props) => (
    <div className={Styles.CalculatedStints}>
        <p>Tyre: {props.tyre}</p>
        <p>Box Lap: {props.laps}</p>
        <p>Fuel: {props.fuel}</p>
    </div>
);

export default calculatedStints;