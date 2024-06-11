import React from 'react'
import styles from './Test.module.css'

const Test = () => {
    return (
        <>
            <label className={styles.switch}>
                <input type="checkbox" />
                <div className={styles.slider}></div>
                <div className={styles.slidercard}>
                    <div className={`${styles.sliderCardFace} ${styles.sliderCardFront}`}></div>
                    <div className={`${styles.sliderCardFace} ${styles.sliderCardBack}`}></div>
                </div>
            </label>
        </>
    )
}

export default Test
