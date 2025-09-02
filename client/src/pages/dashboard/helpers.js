
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