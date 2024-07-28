import React, { useState } from 'react';
import styles from './css/FAQ.module.css';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "What is paper trading?",
            answer: "Paper trading is a simulated trading process where you can practice buying and selling stocks without using real money. It's a great way to learn trading strategies and get familiar with the stock market without financial risk."
        },
        {
            question: "How do I start paper trading on your website?",
            answer: "To start paper trading on our website, simply create an account and log in. You'll be given a virtual balance to trade with. You can then browse Indian stocks, view their details and real-time prices, and place orders using your virtual money."
        },
        {
            question: "What are the benefits of paper trading?",
            answer: "Paper trading allows you to practice trading strategies, learn about market dynamics, and gain confidence without risking real money. It's an excellent way for beginners to learn and for experienced traders to test new strategies."
        },
        {
            question: "What is the difference between paper trading and real trading?",
            answer: "Paper trading uses virtual money to simulate real trading without any financial risk, while real trading involves actual money and financial risk. Paper trading allows you to test strategies and learn about the market without losing real money."
        },
        {
            question: "Can I make real money with paper trading?",
            answer: "No, you cannot make real money with paper trading since it uses virtual funds. However, the skills and strategies you learn through paper trading can help you become a more successful real trader in the future."
        },
        {
            question: "How accurate is the data used in paper trading?",
            answer: "The data used in Tradesiml has a lag of 5 minutes from the real-time prices due to API rate limits. However, they should be accurate enough for you to test your strategies and plans."
        },
        {
            question: "What factors affect stock prices?",
            answer: "Stock prices are influenced by various factors including company performance, economic conditions, industry trends, political events, and market sentiment. It's important to research and analyze these factors when making trading decisions."
        },
        {
            question: "What types of stocks can I trade on your website?",
            answer: "You can trade a wide variety of Indian stocks listed on the National Stock Exchange (NSE)."
        },
        {
            question: "Do you provide any tools or resources to help with trading strategies?",
            answer: "Yes, our website offers various tools such as charts, technical indicators, and company fundamentals to help you develop and test your trading strategies."
        },
        {
            question: "Can I track my trading performance on your platform?",
            answer: "Yes, you can track your trading performance through your portfolio dashboard, which provides detailed reports of your trades, portfolio, and overall performance."
        },
        {
            question: "Is there a cost to use your paper trading platform?",
            answer: "No, our paper trading platform is completely free to use. You can practice trading without any financial commitment."
        },
        {
            question: "What happens if I lose all my virtual money?",
            answer: "You can add trading money to your account by going to Portfolio > Add Money"
        },
    ];


    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const PlusIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" height="14" width="12.25" viewBox="0 0 448 512">
            <path fill="#000000" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
        </svg>
    );

    const MinusIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" height="14" width="12.25" viewBox="0 0 448 512">
            <path fill="#000000" d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
        </svg>
    );

    return (
        <div className={styles.faqContainer}>
            <h1 className={styles.faqHeading}>Frequently Asked Questions</h1>
            {faqs.map((faq, index) => (
                <div key={index} className={styles.faqItem}>
                    <div className={styles.faqQuestion} onClick={() => toggleFAQ(index)}>
                        <h3>{faq.question}</h3>
                        {activeIndex === index ? <MinusIcon /> : <PlusIcon />}
                    </div>
                    {activeIndex === index && (
                        <div className={styles.faqAnswer}>
                            <p>{faq.answer}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FAQ;