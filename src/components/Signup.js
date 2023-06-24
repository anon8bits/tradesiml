import React from 'react'
import styles from './Signup.module.css'
import { Link } from 'react-router-dom'

export default function Signup() {
    // let goBack = () => {
    //     window.history.back();
    // }
    return (
        <div>
            {/* <button className={styles['btn-back']} onClick={goBack}> Back </button> */}``
            <div className={styles["form-container"]}>
                <p className={styles.title}>Sign Up</p>
                <form className={styles.form}>
                    <div className={styles.flex}>
                        <div className={styles['input-group']}>
                            <label htmlFor="fname">First Name</label>
                            <input type="text" name="fname" id="fname" placeholder="" />
                        </div>
                        <div className={styles['input-group']}>
                            <label htmlFor="lname">Last Name</label>
                            <input type="text" name="lname" id="lname" placeholder="" />
                        </div>
                    </div>
                    <div className={styles['input-group']}>
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" placeholder="" />
                    </div>
                    <div className={styles['input-group']}>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="" />
                    </div>
                    <div className={styles['input-group']}>
                        <label htmlFor="password">Confirm Password</label>
                        <input type="password" name="password" id="password" placeholder="" />
                    </div>
                    <button className={styles.sign}>Sign in</button>
                </form>
                <br></br>
                <p className={styles.signup}>Already have an account?
                    <Link rel="noopener noreferrer" to="/login" className=""> Login</Link>
                </p>
            </div>
        </div>
    )
}
