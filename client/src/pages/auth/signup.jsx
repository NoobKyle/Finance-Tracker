import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function Example() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        fullname: "",
        incomesource: "",
        role: "",
        coupleid: "",
    });

    const [validationErrors, setValidationErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const errors = {};

        // Email
        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Enter a valid email";
        }

        // Password
        if (!formData.password) {
            errors.password = "Password is required";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        // Fullname
        if (!formData.fullname) {
            errors.fullname = "Full name is required";
        } else if (!/^[a-zA-Z\s]+$/.test(formData.fullname)) {
            errors.fullname = "Full name can only contain letters and spaces";
        }

        // Role
        if (!formData.role) {
            errors.role = "Please select a role";
        }

        // Couple ID
        if (!formData.coupleid) {
            errors.coupleid = "Couple ID is required";
        } else if (!/^[0-9]+$/.test(formData.coupleid)) {
            errors.coupleid = "Couple ID must be a number";
        } else if (parseInt(formData.coupleid, 10) <= 0) {
            errors.coupleid = "Couple ID must be a positive number";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const payload = {
            email: formData.email,
            passwordHash: formData.password,
            fullName: formData.fullname,
            incomeSource: "",
            role: formData.role,
            coupleId: Number(formData.coupleid),
            isLinkedToPartner: true,
        };

        try {
            const res = await api.post("/Users", payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("User created:", res.data);

            setSuccessMessage("✅ User created successfully! Redirecting to login...");

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (error) {
            console.error("Error creating user:", error);
            alert("❌ Error creating user");
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
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                    Signup
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {successMessage && (
                    <div className="mb-4 rounded-md bg-green-500 p-3 text-white text-sm text-center">
                        {successMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-gray-500 focus:outline-indigo-500 sm:text-sm/6"
                            />
                            {validationErrors.email && (
                                <p className="mt-1 text-sm text-red-400">{validationErrors.email}</p>
                            )}
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-gray-500 focus:outline-indigo-500 sm:text-sm/6"
                            />
                            {validationErrors.password && (
                                <p className="mt-1 text-sm text-red-400">{validationErrors.password}</p>
                            )}
                        </div>
                    </div>

                    {/* Fullname */}
                    <div>
                        <label htmlFor="fullname" className="block text-sm/6 font-medium text-gray-100">
                            Fullname
                        </label>
                        <div className="mt-2">
                            <input
                                id="fullname"
                                name="fullname"
                                type="text"
                                value={formData.fullname}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-gray-500 focus:outline-indigo-500 sm:text-sm/6"
                            />
                            {validationErrors.fullname && (
                                <p className="mt-1 text-sm text-red-400">{validationErrors.fullname}</p>
                            )}
                        </div>
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm/6 font-medium text-gray-100">
                            Role
                        </label>
                        <div className="mt-2 flex gap-4">
                            <label className="flex items-center gap-2 text-sm text-gray-200">
                                <input
                                    type="radio"
                                    name="role"
                                    value="member"
                                    checked={formData.role === "member"}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                                Member
                            </label>

                            <label className="flex items-center gap-2 text-sm text-gray-200">
                                <input
                                    type="radio"
                                    name="role"
                                    value="admin"
                                    checked={formData.role === "admin"}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-indigo-500 focus:ring-indigo-500"
                                />
                                Admin
                            </label>
                        </div>
                        {validationErrors.role && (
                            <p className="mt-1 text-sm text-red-400">{validationErrors.role}</p>
                        )}
                    </div>

                    {/* Couple ID */}
                    <div>
                        <label htmlFor="coupleid" className="block text-sm/6 font-medium text-gray-100">
                            Couple ID
                        </label>
                        <div className="mt-2">
                            <input
                                id="coupleid"
                                name="coupleid"
                                type="number"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={formData.coupleid}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-gray-500 focus:outline-indigo-500 sm:text-sm/6"
                            />
                            {validationErrors.coupleid && (
                                <p className="mt-1 text-sm text-red-400">{validationErrors.coupleid}</p>
                            )}
                        </div>
                    </div>

                    {/* Submit */}
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-indigo-500"
                        >
                            Sign up
                        </button>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Already have an account?{" "}
                            <a href="/login" className="font-medium text-indigo-500 hover:text-indigo-400">
                                Log in
                            </a>
                        </p>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-400">
                    <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                        Hint
                    </a>
                    -- Use same Couple ID as your partner.
                </p>
            </div>
        </div>
    );
}
