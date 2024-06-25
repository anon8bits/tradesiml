// Tooltip.js
import React from 'react';
import styles from './css/InfoToolTip.module.css';

const Tooltip = ({ text }) => {
    return (
        <div className={styles.tooltip}>
            <div className={styles.icon}>i</div>
            <div className={styles.tooltiptext}>{text}</div>
        </div>
    );
};

export default Tooltip;