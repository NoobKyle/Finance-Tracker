import { useEffect, useState } from "react";
import api from "../../api/axios"; // axios instance configured with baseURL from env

export default function UsersTest() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get("/Users")
            .then(res => {
                let result = res.data;
                if (typeof result === "string") {
                    try {
                        result = JSON.parse(result);
                    } catch (e) {
                        console.error("Failed to parse JSON string:", e);
                    }
                }
                setUsers(result);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message || "Something went wrong");
                setLoading(false);
            });
    }, []);


    if (loading) return <p>Loading users...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return (
        <div style={{ padding: "1rem" }}>
            <h1>Users API Test</h1>
            {users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            <strong>{user.fullName}</strong> — {user.email}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
}
