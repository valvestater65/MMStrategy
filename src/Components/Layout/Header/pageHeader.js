import React from 'react';
import styles from './pageHeader.module.css';

const pageHeader = (props) => {
    return (
        <div className={styles.PageHeader}>
            <h1> MM Strategy Builder</h1>
        </div>
    );
}


export default pageHeader;