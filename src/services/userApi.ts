import axios from 'axios';
import { UserData, UserScore } from '../types/user';
import { API_URL } from '../config/apiConfig'; 

export const syncUser = async (user: UserData) => {
    try {
        const response = await axios.post(`${API_URL}/api/users/sync`, user);
        return response.data;
    } catch (error) {
        console.error('Error syncing user:', error);
        throw error;
    }
};

export const saveScore = async (scoreData: UserScore) => {
    try {
        const response = await axios.post(`${API_URL}/api/users/score`, scoreData);
        return response.data;
    } catch (error) {
        console.error('Error saving score:', error);
        throw error;
    }
};
export const getLeaderboard = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/users/leaderboard`);
        return response.data;
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        return [];
    }
};
