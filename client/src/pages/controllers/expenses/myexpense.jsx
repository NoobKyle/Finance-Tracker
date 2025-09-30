import { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function UserExpensePage() {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState(
        new Date().toISOString().slice(0, 7) // current month (YYYY-MM)
    );
    const [searchTerm, setSearchTerm] = useState("");

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user?.id;

    useEffect(() => {
        if (!userId) return;
        fetchExpenses();
    }, [userId]);

    const fetchExpenses = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/expenses/user/${userId}`);
            setExpenses(res.data);
        } catch (err) {
            console.error("Error fetching expenses:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/expenses/${id}`);
            setExpenses((prev) => prev.filter((exp) => exp.id !== id));
        } catch (err) {
            console.error("Error deleting expense:", err);
        }
    };

    // Filter by month + search term
    const filteredExpenses = expenses.filter((exp) => {
        if (!exp.date) return false;
        const expMonth = new Date(exp.date).toISOString().slice(0, 7); // YYYY-MM
        const matchesMonth = expMonth === selectedMonth;

        const lowerSearch = searchTerm.toLowerCase();
        const matchesSearch =
            exp.category.toLowerCase().includes(lowerSearch) ||
            exp.amount.toString().includes(lowerSearch);

        return matchesMonth && matchesSearch;
    });

    // Sort by date (newest first)
    const sortedExpenses = [...filteredExpenses].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    // Monthly total
    const monthlyTotal = filteredExpenses.reduce(
        (sum, exp) => sum + Number(exp.amount),
        0
    );

    if (loading) return <p className="p-4">Loading...</p>;

    return (
        <div className="max-w-xl mx-auto p-6">
            <h3 className="text-2xl mb-4">Expenses for {user.fullName}</h3>

            {/* Month Selector */}
            <div className="mb-6">
                <label className="block mb-2 font-medium">Select Month:</label>
                <input
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="border rounded p-2 text-black"
                />
            </div>

            {/* Search Filter */}
            <div className="mb-6">
                <label className="block mb-2 font-medium">Search:</label>
                <input
                    type="text"
                    placeholder="Search by category or amount..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded p-2 w-full text-black"
                />
            </div>

            {/* Monthly Total */}
            <div className="mb-6 p-3 border rounded bg-gray-100 text-black">
                <p className="font-bold">Total for {selectedMonth}:</p>
                <p className="text-xl">${monthlyTotal.toFixed(2)}</p>
            </div>

            {/* Expense List */}
            <ul className="space-y-3">
                {sortedExpenses.map((expense) => (
                    <li
                        key={expense.id}
                        className="flex justify-between items-center border p-3 rounded"
                    >
                        <div>
                            <p className="font-medium">{expense.category}</p>
                            <p>${expense.amount}</p>
                            <p className="text-sm text-gray-500">
                                {new Date(expense.date).toLocaleDateString()}
                            </p>
                            <p className="text-xs">
                                {expense.isShared ? "Shared" : "Personal"}
                            </p>
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => handleDelete(expense.id)}
                                className="px-3 py-1 bg-red-600 text-white rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
