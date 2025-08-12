import { useEffect, useState } from "react";
import api from "../../api/axios"; // axios instance configured with baseURL from env

export default function UsersTest() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // You can change this to a dynamic id if needed
    const userId = 12;

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
                setLoading(false);
            })
            .catch(err => {
                setError(err.message || "Something went wrong");
                setLoading(false);
            });
    }, [userId]);

    if (loading) return <p>Loading user info...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    if (!user) return <p>No user data found.</p>;

    return (
        <div className="fixed top-50 start-50 z-80 overflow-x-hidden overflow-y-auto pointer-events-none">
            <div className="max-h-full overflow-hidden flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl pointer-events-auto dark:bg-neutral-900 dark:border-neutral-800 dark:shadow-neutral-700/70">
                <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200 dark:border-neutral-800">
                    <h3 className="font-bold text-gray-800 dark:text-neutral-200">
                        User Information
                    </h3>
                </div>

                <div className="p-4 overflow-y-auto">
                    <div className="sm:divide-y divide-gray-200 dark:divide-neutral-700">
                        <div className="py-3 sm:py-6">
                            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                                {/* Full Name */}
                                <div className="bg-white p-4 transition duration-300 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                                    <div className="flex gap-x-6">
                                        <div className="mt-1.5 flex justify-center shrink-0 rounded-s-xl">
                                            <svg
                                                className="size-5 text-gray-800 dark:text-neutral-200"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M3 4.5h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H3zM1 2a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 2zm0 12a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 14z"></path>
                                            </svg>
                                        </div>
                                        <div className="grow">
                                            <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-500">
                                                Full Name
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-600 dark:text-neutral-500">
                                                {user.fullName}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="bg-white p-4 transition duration-300 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                                    <div className="flex gap-x-6">
                                        <div className="mt-1.5 flex justify-center shrink-0 rounded-s-xl">
                                            <svg
                                                className="size-5 text-gray-800 dark:text-neutral-200"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                            >
                                                <path
                                                    d="M12.4077 1H12.9077C14.0123 1 14.9077 1.89543 14.9077 3V13C14.9077 14.1046 14.0123 15 12.9077 15H2.90771C1.80315 15 0.907715 14.1046 0.907715 13V3C0.907715 1.89543 1.80314 1 2.90771 1H5.10034C5.83943 1 6.43858 1.59915 6.43858 2.33824C6.43858 3.07732 7.03773 3.67647 7.77681 3.67647H14.4077M8.5 1H8.90771C10.0123 1 10.9077 1.89543 10.9077 3V3.5M3.90771 8H9.90771M3.90771 11.5H11.9077"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                ></path>
                                            </svg>
                                        </div>
                                        <div className="grow">
                                            <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-500">
                                                Email
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-600 dark:text-neutral-500">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Couple ID */}
                                <div className="bg-white p-4 transition duration-300 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                                    <div className="flex gap-x-6">
                                        <div className="mt-1.5 flex justify-center shrink-0 rounded-s-xl">
                                            <svg
                                                className="size-5 text-gray-800 dark:text-neutral-200"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="grow">
                                            <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-500">
                                                Couple ID
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-600 dark:text-neutral-500">
                                                {user.coupleId}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Income Source */}
                                <div className="bg-white p-4 transition duration-300 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                                    <div className="flex gap-x-6">
                                        <div className="mt-1.5 flex justify-center shrink-0 rounded-s-xl">
                                            <svg
                                                className="size-5 text-gray-800 dark:text-neutral-200"
                                                width="16"
                                                height="16"
                                                fill="none"
                                                viewBox="0 0 16 16"
                                            >
                                                <path
                                                    d="M8 6.00002V13M3 8.00002H6M10 8.00002H13M3 11H6M10 11H13M1 5.50002V13.5C1 14.6046 1.89543 15.5 3 15.5H13C14.1046 15.5 15 14.6046 15 13.5V5.50002C15 4.39545 14.1046 3.5 13 3.5H3C1.89543 3.5 1 4.39545 1 5.50002Z"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                ></path>
                                            </svg>
                                        </div>
                                        <div className="grow">
                                            <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-500">
                                                Income Source
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-600 dark:text-neutral-500">
                                                {user.incomeSource}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Role */}
                                <div className="bg-white p-4 transition duration-300 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                                    <div className="flex gap-x-6">
                                        <div className="mt-1.5 flex justify-center shrink-0 rounded-s-xl">
                                            <svg
                                                className="size-5 text-gray-800 dark:text-neutral-200"
                                                width="16"
                                                height="16"
                                                fill="none"
                                                viewBox="0 0 16 16"
                                            >
                                                <path
                                                    d="M8 15L8 8M12 15L12 8M3 3L5 3M3 6L5 6M3 9L5 9M3 12L5 12M5 3L5 12M8 15L8 8M12 15L12 8M8 8L12 8M8 15L12 15"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                ></path>
                                            </svg>
                                        </div>
                                        <div className="grow">
                                            <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-500">
                                                Role
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-600 dark:text-neutral-500">
                                                {user.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Is Linked to Partner */}
                                <div className="bg-white p-4 transition duration-300 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                                    <div className="flex gap-x-6">
                                        <div className="mt-1.5 flex justify-center shrink-0 rounded-s-xl">
                                            <svg
                                                className="size-5 text-gray-800 dark:text-neutral-200"
                                                width="16"
                                                height="16"
                                                fill="none"
                                                viewBox="0 0 16 16"
                                            >
                                                <circle
                                                    cx="8"
                                                    cy="8"
                                                    r="7"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                />
                                                <path
                                                    d="M6 8L7.5 9.5L10 6"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                        <div className="grow">
                                            <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-500">
                                                Linked To Partner
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-600 dark:text-neutral-500">
                                                {user.isLinkedToPartner ? "Yes" : "No"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
