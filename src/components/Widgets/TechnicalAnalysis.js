import React, { useEffect, useRef } from 'react';
import styles from '../css/stockDetail.module.css';

const TradingViewTechnicalWidget = ({ symbol }) => {
    const container = useRef();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
      {
        "interval": "1h",
        "width": "100%",
        "isTransparent": false,
        "height": 450,
        "symbol": "${symbol}",
        "showIntervalTabs": true,
        "displayMode": "single",
        "locale": "en",
        "colorTheme": "light"
      }
    `;
        container.current.appendChild(script);
    }, [symbol]);

    return (
        <div className={styles.tradingviewWidgetContainer} ref={container}>
            <div className="tradingview-widget-container__widget"></div>
            <div className="tradingview-widget-copyright">
                <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
                    <span className="blue-text">Track all markets on TradingView</span>
                </a>
            </div>
        </div>
    );
};

export default TradingViewTechnicalWidget;