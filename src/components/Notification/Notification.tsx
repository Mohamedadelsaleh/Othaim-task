import React from 'react';
import styles from './Notification.module.scss';

interface NotificationProps {
    message: string;
    visible: boolean;
    icon?: string;
    type?: 'success' | 'error'; 
}

const Notification: React.FC<NotificationProps> = ({ message, visible, icon, type = 'success' }) => {
    return (
        <div className={`${styles.notification} ${visible ? styles.visible : ''} ${type === 'error' ? styles.error : ''}`}>
            {icon && <img src={icon} alt="Notification Icon" className={styles.icon} />}
            {message}
        </div>
    );
};

export default Notification;
