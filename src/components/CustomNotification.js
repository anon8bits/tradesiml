import React from 'react'
import styles from './css/Notification.module.css'
import { Navigate, useNavigate } from 'react-router-dom';

const CustomNotification = ({ title, message }) => {
    const navigate = useNavigate();
    const handleDismiss = () => {
        navigate('/portfolio');
    };

    return (
        <div className={styles['notifications-container']}>
            <div className={styles.success}>
                <div className={styles.flex}>
                    <div className={styles['flex-shrink-0']}>
                        <svg className={styles['succes-svg']} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                    <div className={styles['success-prompt-wrap']}>
                        <p className={styles['success-prompt-heading']}>{title}</p>
                        <div className={styles['success-prompt-prompt']}>
                            <p>{message}</p>
                        </div>
                        <div className={styles['success-button-container']}>
                            <button type="button" className={styles['success-button-main']} onClick={handleDismiss}>Dismiss</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomNotification
