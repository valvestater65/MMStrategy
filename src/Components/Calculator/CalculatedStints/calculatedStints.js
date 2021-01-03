import React from 'react';

const calculatedStints = (props) => (
    <div>
        <p>Tyre: {props.tyre}</p>
        <p>Box Lap: {props.laps}</p>
        <p>Fuel: {props.fuel}</p>
    </div>
);

export default calculatedStints;