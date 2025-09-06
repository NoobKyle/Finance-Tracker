
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


export async function getSharedExpensesTotal(coupleId) {
    try {
        const response = await api.get(`/expenses/shared/${coupleId}`);
        const expenses = response.data;

        if (!Array.isArray(expenses)) return 0;

        const total = expenses
            .filter(exp => exp.isShared)
            .reduce((sum, exp) => sum + (exp.amount || 0), 0);

        return total;
    } catch (error) {
        console.error("Error fetching shared expenses:", error);
        return 0;
    }
}


export async function getUserExpenses(userId) {
    try {
        const response = await api.get(`/expenses/user/${userId}`);
        const expenses = response.data;

        if (!Array.isArray(expenses)) {
            return { count: 0, total: 0 };
        }

        const count = expenses.length;
        const total = expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);

        return { count, total };
    } catch (error) {
        console.error("Error fetching user expense summary:", error);
        return { count: 0, total: 0 };
    }
}