import { useState } from "react";
import api from "../../api/axios";

export default function Example() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [validationErrors, setValidationErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        // Email validation
        if (!email) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = "Enter a valid email";
        }

        // Password validation
        if (!password) {
            errors.password = "Password is required";
        } else if (password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setValidationErrors({});

        if (!validateForm()) return;

        try {
            // 1️⃣ Login request
            const loginRes = await api.get("/Users/login", {
                params: { email, password },
            });

            const userId = loginRes.data; // adjust key if API returns differently

            // 2️⃣ Fetch account info
            const accountRes = await api.get(`/Users/${userId}`);
            const accountData = accountRes.data;

            // 3️⃣ Save to localStorage
            localStorage.setItem("user", JSON.stringify(accountData));

            console.log("Login successful. User data saved:", accountData);

            // Optionally redirect after login
            window.location.href = "/user";
        } catch (err) {
            console.error("Login failed:", err);
            setError("Invalid email or password.");
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Couple Finance Tracker"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
                    Login to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-100">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
                            />
                            {validationErrors.email && (
                                <p className="mt-1 text-sm text-red-400">{validationErrors.email}</p>
                            )}
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-100">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
                            />
                            {validationErrors.password && (
                                <p className="mt-1 text-sm text-red-400">{validationErrors.password}</p>
                            )}
                        </div>
                    </div>

                    {/* API error (invalid login) */}
                    {error && <p className="text-red-400 text-sm">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-indigo-500"
                        >
                            Login
                        </button>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Don’t have an account?{" "}
                            <a href="/signup" className="font-medium text-indigo-500 hover:text-indigo-400">
                                Sign up
                            </a>
                        </p>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-400">
                    <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                        Hint
                    </a>
                    -- Password might be 'root'
                </p>
            </div>
        </div>
    );
}
