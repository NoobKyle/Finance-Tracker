import { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function CoupleNotesPage() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ text: "" });
    const [editingId, setEditingId] = useState(null);

    // Get user and coupleId from localStorage
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const coupleId = user?.coupleId;
    const userId = user?.id;

    useEffect(() => {
        if (!coupleId) return;
        fetchNotes();
    }, [coupleId]);

    const fetchNotes = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/Comments/byCouple/${coupleId}`);
            setNotes(res.data);
        } catch (err) {
            console.error("Error fetching notes:", err);
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
                // Update existing comment
                const res = await api.put(`/Comments/${editingId}`, { ...form, userId });
                setNotes((prev) =>
                    prev.map((note) => (note.id === editingId ? res.data : note))
                );
                setEditingId(null);
            } else {
                // Create new comment
                const res = await api.post(`/Comments`, { ...form, userId });
                setNotes((prev) => [...prev, res.data]);
            }
            setForm({ text: "" });
        } catch (err) {
            console.error("Error saving note:", err);
        }
    };

    const handleEdit = (note) => {
        setForm({ text: note.text });
        setEditingId(note.id);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/Comments/${id}`);
            setNotes((prev) => prev.filter((note) => note.id !== id));
        } catch (err) {
            console.error("Error deleting note:", err);
        }
    };

    const sortedNotes = [...notes].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    if (loading) return <p className="p-4">Loading...</p>;

    return (
        <div className="max-w-xl mx-auto p-6">
            <h3 className="text-2xl mb-4">Notes for {user?.fullName || "Your Couple"}</h3>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mb-6 space-y-2">
                <textarea
                    name="text"
                    placeholder="Write your note..."
                    value={form.text}
                    onChange={handleChange}
                    className="border rounded p-2 w-full text-black"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {editingId ? "Update Note" : "Add Note"}
                </button>
            </form>

            {/* Notes List */}
            <ul className="space-y-3">
                {sortedNotes.map((note) => (
                    <li
                        key={note.id}
                        className="flex justify-between items-start border p-3 rounded"
                    >
                        <div>
                            <p className="text-white whitespace-pre-wrap">{note.text}</p>
                            <p className="text-sm text-gray-500">
                                {note.userName} • {new Date(note.createdAt).toLocaleString()}
                            </p>
                        </div>
                        <div className="space-x-2">
                           
                            <button
                                onClick={() => handleDelete(note.id)}
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
