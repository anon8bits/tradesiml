import styles from './css/Order.module.css';

const ConfirmModal = ({ orderDetails, onConfirm, onCancel }) => {
    const isStopLossZero = orderDetails.stopLoss === 0;
    const formatNumber = (num) => {
        return Number(num).toFixed(2);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2 className={styles.title}>Confirm Order</h2>
                <p>Please confirm your order details:</p>
                <ul>
                    <li>Symbol: <strong>{orderDetails.symbol}</strong></li>
                    <li>Order Type: <strong>{orderDetails.orderType}</strong></li>
                    <li>Entry Price: <strong>₹{formatNumber(orderDetails.entryPrice)}</strong></li>
                    <li>Quantity: <strong>{orderDetails.orderQuantity}</strong></li>
                    <li>Target Price: <strong>₹{formatNumber(orderDetails.targetPrice)}</strong></li>
                    <li>Stop Loss: <strong>₹{formatNumber(orderDetails.stopLoss)}</strong></li>
                    <li>Time Frame: <strong>{orderDetails.timeFrame} days</strong></li>
                    <li>Total Amount: <strong>₹ {(formatNumber(orderDetails.entryPrice)* formatNumber(orderDetails.orderQuantity))}</strong></li>
                </ul>
                {isStopLossZero && (
                    <p className={styles.warning}>
                        You haven't applied stop loss on your order. In real-life scenarios, this may lead to heavy losses!
                    </p>
                )}
                <div className={styles.modalButtons}>
                    <button onClick={onConfirm}>Confirm</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
