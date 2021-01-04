import React from 'react';
import styles from './raceData.module.css';

const RaceData = (props) => 
(
    <div className={styles.RaceData}>
        <div className={styles.formRow}>
            <label>Max Fuel Laps:</label>
            <input type="text" placeholder="Max Fuel Laps" onChange={(ev) => props.fuelLaps(ev)}/>
        </div>
        <div className={styles.formRow}>
            <label>Race Laps:</label>
            <input type="text" placeholder="Race Laps" onChange={(ev) => props.raceLaps(ev)}/>
        </div>
        <div className={styles.formRow}>
            <label>Delta Fuel laps:</label>
            <input type="text" placeholder="Delta Fuel Laps" onChange={(ev) => props.deltaFuel(ev)}/>
        </div>
    </div>
);

export default RaceData;