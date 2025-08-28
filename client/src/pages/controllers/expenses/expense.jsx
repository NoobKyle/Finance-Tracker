import { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function UserExpensePage() {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ amount: "", category: "", date: "", isShared: false });
    const [editingId, setEditingId] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(
        new Date().toISOString().slice(0, 7) // default = current month (YYYY-MM)
    );

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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const utcDate = new Date(form.date).toISOString();

            if (editingId) {
                // Update
                const res = await api.put(`/expenses/${editingId}`, { ...form, date: utcDate, userId });
                setExpenses((prev) =>
                    prev.map((exp) => (exp.id === editingId ? res.data : exp))
                );
                setEditingId(null);
                fetchExpenses();
            } else {
                // Create
                const res = await api.post(`/expenses`, { ...form, date: utcDate, userId });
                setExpenses((prev) => [...prev, res.data]);
            }
            setForm({ amount: "", category: "", date: "", isShared: false });
        } catch (err) {
            console.error("Error saving expense:", err);
        }
    };

    const handleEdit = (expense) => {
        setForm({
            amount: expense.amount,
            category: expense.category,
            date: expense.date.split("T")[0],
            isShared: expense.isShared,
        });
        setEditingId(expense.id);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/expenses/${id}`);
            setExpenses((prev) => prev.filter((exp) => exp.id !== id));
        } catch (err) {
            console.error("Error deleting expense:", err);
        }
    };

    // Filter expenses by selected month
    const filteredExpenses = expenses.filter((exp) => {
        if (!exp.date) return false; // skip if no date
        const expMonth = new Date(exp.date).toISOString().slice(0, 7); // YYYY-MM
        return expMonth === selectedMonth;
    });

    // Sort by date (newest first)
    const sortedExpenses = [...filteredExpenses].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    // Calculate total for the month
    const monthlyTotal = filteredExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

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

            {/* Monthly Total */}
            <div className="mb-6 p-3 border rounded bg-gray-100 text-black">
                <p className="font-bold">Total for {selectedMonth}:</p>
                <p className="text-xl">${monthlyTotal.toFixed(2)}</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mb-6 space-y-2">
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={handleChange}
                    className="border rounded p-2 w-full text-black"
                    required
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={form.category}
                    onChange={handleChange}
                    className="border rounded p-2 w-full text-black"
                    required
                />
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="border rounded p-2 w-full text-black"
                    required
                />
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        name="isShared"
                        checked={form.isShared}
                        onChange={handleChange}
                    />
                    <span>Shared Expense</span>
                </label>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {editingId ? "Update Expense" : "Add Expense"}
                </button>
            </form>

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
                                onClick={() => handleEdit(expense)}
                                className="px-3 py-1 bg-yellow-500 text-white rounded"
                            >
                                Edit
                            </button>
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
