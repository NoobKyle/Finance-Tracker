import { useEffect, useState } from "react";
import api from "../../api/axios"; // axios instance configured with baseURL from env

export default function UsersTest() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [updateForm, setUpdateForm] = useState({
        fullName: "",
        email: "",
        coupleId: "",
        incomeSource: "",
        role: "",
        isLinkedToPartner: false,
    });

    let userId = 0;
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
        userId = storedUser.id;
    }

    useEffect(() => {
        api.get(`/users/${userId}`)
            .then(res => {
                let result = res.data;
                if (typeof result === "string") {
                    try {
                        result = JSON.parse(result);
                    } catch (e) {
                        console.error("Failed to parse JSON string:", e);
                    }
                }
                setUser(result);
                setUpdateForm({
                    fullName: result.fullName || "",
                    email: result.email || "",
                    coupleId: result.coupleId || "",
                    incomeSource: result.incomeSource || "",
                    role: result.role || "",
                    isLinkedToPartner: result.isLinkedToPartner || false,
                });
                setLoading(false);
            })
            .catch(err => {
                setError(err.message || "Something went wrong");
                setLoading(false);
            });
    }, [userId]);

    const handleUpdateUser = () => setShowUpdateModal(true);
    const handleDeleteUser = () => setShowDeleteModal(true);

    const confirmDelete = async () => {
        if (!user) return;
        try {
            setDeleting(true);
            await api.delete(`/users/${user.id}`);
            alert("User deleted successfully");
            setShowDeleteModal(false);
            setUser(null);
        } catch (err) {
            alert("Failed to delete user: " + (err.response?.data?.message || err.message));
        } finally {
            setDeleting(false);
        }
    };

    const confirmUpdate = async () => {
        if (!user) return;
        try {
            setUpdating(true);
            await api.put(`/users/${user.id}`, updateForm);
            alert("User updated successfully");
            setShowUpdateModal(false);
            setUser(prev => ({ ...prev, ...updateForm }));
        } catch (err) {
            alert("Failed to update user: " + (err.response?.data?.message || err.message));
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <p className="text-gray-500">Loading user info...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;
    if (!user) return <p className="text-gray-500">No user data found.</p>;

    return (
        <>
            {/* User Info Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl w-96 max-w-full overflow-hidden">
                    <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-neutral-700">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-100">
                            User Information
                        </h3>
                        <button onClick={() => setShowUpdateModal(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
                    </div>
                    <div className="p-4 space-y-2">
                        <p><span className="font-medium">Full Name:</span> {user.fullName}</p>
                        <p><span className="font-medium">Email:</span> {user.email}</p>
                        <p><span className="font-medium">Couple ID:</span> {user.coupleId}</p>
                        <p><span className="font-medium">Income Source:</span> {user.incomeSource}</p>
                        <p><span className="font-medium">Role:</span> {user.role}</p>
                        <p><span className="font-medium">Linked to Partner:</span> {user.isLinkedToPartner ? "Yes" : "No"}</p>
                    </div>
                    <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-neutral-700">
                        <button
                            onClick={handleUpdateUser}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Update
                        </button>
                        <button
                            onClick={handleDeleteUser}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-lg w-80">
                        <h2 className="text-lg font-semibold mb-2">Confirm Deletion</h2>
                        <p className="mb-4">Are you sure you want to delete <strong>{user.fullName}</strong>?</p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                disabled={deleting}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg disabled:opacity-50 hover:bg-red-700"
                            >
                                {deleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Update Modal */}
            {showUpdateModal && (
                <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-lg w-96 max-w-full">
                        <h2 className="text-lg font-semibold mb-4">Update User</h2>
                        <form className="space-y-3">
                            <input
                                type="text"
                                value={updateForm.fullName}
                                onChange={(e) => setUpdateForm({ ...updateForm, fullName: e.target.value })}
                                placeholder="Full Name"
                                className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900 dark:bg-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="email"
                                value={updateForm.email}
                                onChange={(e) => setUpdateForm({ ...updateForm, email: e.target.value })}
                                placeholder="Email"
                                className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900 dark:bg-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                value={updateForm.coupleId}
                                onChange={(e) => setUpdateForm({ ...updateForm, coupleId: e.target.value })}
                                placeholder="Couple ID"
                                className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900 dark:bg-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                value={updateForm.incomeSource}
                                onChange={(e) => setUpdateForm({ ...updateForm, incomeSource: e.target.value })}
                                placeholder="Income Source"
                                className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900 dark:bg-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                value={updateForm.role}
                                onChange={(e) => setUpdateForm({ ...updateForm, role: e.target.value })}
                                placeholder="Role"
                                className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900 dark:bg-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={updateForm.isLinkedToPartner}
                                    onChange={(e) => setUpdateForm({ ...updateForm, isLinkedToPartner: e.target.checked })}
                                    className="w-4 h-4"
                                />
                                Linked to Partner
                            </label>
                        </form>
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setShowUpdateModal(false)}
                                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmUpdate}
                                disabled={updating}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700"
                            >
                                {updating ? "Updating..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
