// notificationService.js
import axios from 'axios';

export const getListNotification = async (page = 0, pageSize = 22) => {
    try {
        const response = await axios.get(`/notification?page=${page}&size=${pageSize}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return { error: 'Failed to fetch notifications.' };
    }
};

export const seenNotification = async (notificationId, page = 0, pageSize = 5) => {
    try {
        const response = await axios.get(`/seen-notification/${notificationId}?page=${page}&size=${pageSize}`);
        return response.data;
    } catch (error) {
        console.error('Error marking notifications as seen:', error);
        return { error: 'Failed to mark notifications as seen.' };
    }
};
