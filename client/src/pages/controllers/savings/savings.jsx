import { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function SavingsGoalsPage() {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ title: "", targetAmount: "" });
    const [editingId, setEditingId] = useState(null);
    const [contributionForms, setContributionForms] = useState({});

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const coupleId = user?.coupleId;

    useEffect(() => {
        if (!coupleId) return;
        fetchGoals();
    }, [coupleId]);

    const fetchGoals = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/SavingsGoals/byCouple/${coupleId}`);
            setGoals(res.data);
        } catch (err) {
            console.error("Error fetching savings goals:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                const res = await api.put(`/SavingsGoals/${editingId}`, {
                    ...form,
                    targetAmount: parseFloat(form.targetAmount),
                });
                setGoals((prev) =>
                    prev.map((g) => (g.id === editingId ? res.data : g))
                );
                setEditingId(null);
            } else {
                const res = await api.post(`/SavingsGoals`, {
                    ...form,
                    coupleId,
                    targetAmount: parseFloat(form.targetAmount),
                });
                setGoals((prev) => [...prev, res.data]);
            }
            setForm({ title: "", targetAmount: "" });
        } catch (err) {
            console.error("Error saving savings goal:", err);
        }
    };

    const handleEdit = (goal) => {
        setForm({
            title: goal.title,
            targetAmount: goal.targetAmount,
        });
        setEditingId(goal.id);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/SavingsGoals/${id}`);
            setGoals((prev) => prev.filter((g) => g.id !== id));
        } catch (err) {
            console.error("Error deleting savings goal:", err);
        }
    };

    const handleContributionChange = (goalId, value) => {
        setContributionForms((prev) => ({
            ...prev,
            [goalId]: value,
        }));
    };

    const handleAddContribution = async (goalId) => {
        const amount = parseFloat(contributionForms[goalId]);
        if (isNaN(amount) || amount <= 0) return;

        try {
            const res = await api.post(`/SavingsGoals/${goalId}/contributions`, {
                amount,
            });

            setGoals((prev) =>
                prev.map((g) => (g.id === goalId ? res.data : g))
            );

            setContributionForms((prev) => ({ ...prev, [goalId]: "" }));
        } catch (err) {
            console.error("Error adding contribution:", err);
        }
    };

    if (loading) return <p className="p-4">Loading...</p>;

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h3 className="text-2xl mb-4">
                Savings Goals for {user?.fullName || "Your Couple"}
            </h3>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mb-6 space-y-2">
                <input
                    type="text"
                    name="title"
                    placeholder="Goal title (e.g. House, Vacation)"
                    value={form.title}
                    onChange={handleChange}
                    className="border rounded p-2 w-full text-black"
                    required
                />
                <input
                    type="number"
                    step="0.01"
                    name="targetAmount"
                    placeholder="Target amount"
                    value={form.targetAmount}
                    onChange={handleChange}
                    className="border rounded p-2 w-full text-black"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {editingId ? "Update Goal" : "Add Goal"}
                </button>
            </form>

            {/* Goals List */}
            <ul className="space-y-3">
                {goals.map((goal) => {
                    const progress =
                        goal.targetAmount > 0
                            ? (goal.currentAmount / goal.targetAmount) * 100
                            : 0;

                    return (
                        <li
                            key={goal.id}
                            className="border p-4 rounded bg-gray-900 text-white"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="text-lg font-semibold">{goal.title}</h4>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => handleEdit(goal)}
                                        className="px-3 py-1 bg-yellow-500 text-white rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(goal.id)}
                                        className="px-3 py-1 bg-red-600 text-white rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <p>
                                {goal.currentAmount} / {goal.targetAmount} saved
                            </p>

                            {/* Progress Bar */}
                            <div className="w-full bg-gray-700 rounded h-3 mt-1">
                                <div
                                    className="bg-green-500 h-3 rounded"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>

                            {/* Contribution Form */}
                            <div className="mt-3 flex space-x-2">
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="Contribution"
                                    value={contributionForms[goal.id] || ""}
                                    onChange={(e) =>
                                        handleContributionChange(goal.id, e.target.value)
                                    }
                                    className="border rounded p-2 text-black flex-1"
                                />
                                <button
                                    onClick={() => handleAddContribution(goal.id)}
                                    className="bg-green-600 text-white px-4 py-2 rounded"
                                >
                                    Add
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
