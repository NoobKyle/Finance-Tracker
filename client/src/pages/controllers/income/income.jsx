import { useEffect, useState } from "react";
import api from "../../../api/axios";



export default function UserIncomePage() {
    const [incomes, setIncomes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ source: "", amount: "", date:"" });
    const [editingId, setEditingId] = useState(null);
    const [incomeTypes, setIncomeTypes] = useState([]);

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user?.id;

    useEffect(() => {
        if (!userId) return;
        fetchIncomes();
        fetchIncomeTypes();
    }, [userId]);

    const fetchIncomes = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/incomes/user/${userId}`);
            setIncomes(res.data);
        } catch (err) {
            console.error("Error fetching incomes:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchIncomeTypes = async () => {
        try {
            const res = await api.get("/configs/income_type");
            setIncomeTypes(res.data);
        } catch (err) {
            console.error("Error fetching income types:", err);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const utcDate = new Date(form.date).toISOString();

            if (editingId) {
                // Update
                const res = await api.put(`/incomes/${editingId}`, { ...form, date: utcDate, userId});
                setIncomes((prev) =>
                    prev.map((inc) => (inc.id === editingId ? res.data : inc))
                );
                setEditingId(null);
            } else {
                // Create
                const res = await api.post(`/incomes`, { ...form, date: utcDate, userId });
                setIncomes((prev) => [...prev, res.data]);
            }
            setForm({ source: "", amount: "", date:"" });
        } catch (err) {
            console.error("Error saving income:", err);
        }
    };

    const handleEdit = (income) => {
        setForm({ source: income.source, amount: income.amount, date: income.date.split("T")[0] });
        setEditingId(income.id);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/incomes/${id}`);
            setIncomes((prev) => prev.filter((inc) => inc.id !== id));
        } catch (err) {
            console.error("Error deleting income:", err);
        }
    };

    if (loading) return <p className="p-4">Loading...</p>;

    return (
        <div className="max-w-xl mx-auto p-6">
            <h3 className="text-2xl mb-4">Income for {user.fullName}</h3>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mb-6 space-y-2">
                <select
                    name="source"
                    value={form.source}
                    onChange={handleChange}
                    className="border rounded p-2 w-full text-black"
                    required
                >
                    <option value="">Select Income Type</option>
                    {incomeTypes.map((type) => (
                        <option key={type.id} value={type.name}>
                            {type.name}
                        </option>
                    ))}
                </select>

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
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="border rounded p-2 w-full text-black"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {editingId ? "Update Income" : "Add Income"}
                </button>
            </form>

            {/* Income List */}
            <ul className="space-y-3">
                {incomes.map((income) => (
                    <li
                        key={income.id}
                        className="flex justify-between items-center border p-3 rounded"
                    >
                        <div>
                            <p className="font-medium">{income.source}</p>
                            <p>${income.amount}</p>
                            <p className="text-sm text-gray-500">
                                {new Date(income.date).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => handleEdit(income)}
                                className="px-3 py-1 bg-yellow-500 text-white rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(income.id)}
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
