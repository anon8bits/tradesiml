import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './css/News.module.css';

const NewsComponent = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`);
                setArticles(response.data.articles);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className={styles.newsContainer}>
            {articles.map((article, index) => (
                <div key={index} className={styles.card}>
                    <div
                        className={styles.image}
                        style={{
                            backgroundImage: `url(${article.urlToImage || '/path/to/placeholder-image.jpg'})`
                        }}
                    ></div>
                    <div className={styles.content}>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                            <h2 className={styles.title}>
                                {article.title}
                            </h2>
                        </a>
                        <p className={styles.desc}>
                            {article.description || 'No description available'}
                        </p>
                        <a className={styles.action} href={article.url} target="_blank" rel="noopener noreferrer">
                            Read more
                            <span aria-hidden="true">
                                →
                            </span>
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NewsComponent;