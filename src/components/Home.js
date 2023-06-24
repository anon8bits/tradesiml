import React from 'react'
import styles from './Home.module.css'
import {useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate  = useNavigate();
    const clickHandle=()=>{
        navigate('/login');
    }
    return (
        <>
            <div className={styles['home-page']}>
                <section className={styles.hero}>
                    <div className={styles['hero-content']}>
                        <h1>Welcome to TradeSiml</h1>
                        <p>Are you ready to experience the excitement of the financial markets in a risk-free environment?</p>
                        {/* <Link className="btn" to="/login">Get Started</Link> */}
                        <button className={styles.hbutton} onClick={clickHandle}> <span>Get Started</span>
                        </button>
                    </div>
                </section>

                <section className={styles.features}>
                    <div className={styles["feature"]}>
                        <h2>Virtual Trading</h2>
                        <p>Trade with virtual money in real-time market conditions. Practice buying and selling stocks, commodities, cryptocurrencies, and more, without any financial risk.</p>
                    </div>
                    <div className={styles["feature"]}>
                        <h2>Real-Time Market Data</h2>
                        <p>Access up-to-date market data, including live prices, charts, and news, to make informed trading decisions. Stay updated with the latest market trends and developments.</p>
                    </div>
                    <div className={styles["feature"]}>
                        <h2>Portfolio Management</h2>
                        <p>Build and manage your virtual portfolio. Monitor your trades, track your performance, and analyze your investment strategies. Learn to balance risk and reward effectively.</p>
                    </div>
                </section>
            </div>
        </>
    )
}
