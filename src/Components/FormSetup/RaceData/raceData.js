import React from 'react';

const RaceData = (props) => 
(
    <div>
        <input type="text" placeholder="Max Fuel Laps" onChange={(ev) => props.fuelLaps(ev)}/>
        <input type="text" placeholder="Race Laps" onChange={(ev) => props.raceLaps(ev)}/>
    </div>
);

export default RaceData;