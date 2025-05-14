import React from 'react';

interface NotificationProps {
    children: React.ReactNode;
}

export const Notification: React.FC<NotificationProps> = ({ children }) => {
    return <span className="notification">{children}</span>;
};