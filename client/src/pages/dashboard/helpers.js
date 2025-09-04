
import api from "../../api/axios";


// Fetch couple users + total income
export async function fetchCoupleUsers(coupleId) {
    try {
        const response = await api.get(`/couples/${coupleId}/users`);
        return response.data;
    } catch (error) {
        console.error("Error fetching couple users:", error);
        throw error;
    }
}



export async function getSharedExpenses(coupleId) {
    try {
        const response = await api.get(`/expenses/shared/${coupleId}`);
        
        return response.data.map(expense => ({
            id: expense.id,
            amount: expense.amount,
            category: expense.category,
            date: new Date(expense.date).toLocaleDateString(), 
            isShared: expense.isShared,
            userId: expense.userId,
        }));
    } catch (error) {
        console.error("Error fetching shared expenses:", error);
        throw error;
    }
}