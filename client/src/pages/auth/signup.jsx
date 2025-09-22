import { useState, useEffect } from "react";
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

    const [roles, setRoles] = useState([]);
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

        const email = formData.email.trim();
        const password = formData.password.trim();
        const fullname = formData.fullname.trim();
        const role = formData.role.trim();
        const coupleid = formData.coupleid.trim();

        if (!email) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = "Enter a valid email address";
        } else if (email.length > 256) {
            errors.email = "Email cannot exceed 256 characters";
        }

        if (!password) {
            errors.password = "Password is required";
        } else if (password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        } else if (password.length > 64) {
            errors.password = "Password cannot exceed 64 characters";
        }

        if (!fullname) {
            errors.fullname = "Full name is required";
        } else if (!/^[a-zA-Z\s]+$/.test(fullname)) {
            errors.fullname = "Full name can only contain letters and spaces";
        } else if (fullname.length > 100) {
            errors.fullname = "Full name cannot exceed 100 characters";
        }

        if (!role) {
            errors.role = "Please select a role";
        }

        if (!coupleid) {
            errors.coupleid = "Couple ID is required";
        } else if (!/^[0-9]+$/.test(coupleid)) {
            errors.coupleid = "Couple ID must be a number";
        } else if (parseInt(coupleid, 10) <= 0) {
            errors.coupleid = "Couple ID must be a positive number";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const payload = {
            email: formData.email.trim(),
            passwordHash: formData.password.trim(),
            fullName: formData.fullname.trim(),
            incomeSource: formData.incomesource.trim(),
            role: formData.role.trim(),
            coupleId: Number(formData.coupleid.trim()),
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

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await api.get("/configs/user_role");
                setRoles(res.data);
            } catch (err) {
                console.error("Error fetching roles:", err);
            }
        };
        fetchRoles();
    }, []);

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
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-gray-500 focus:outline-indigo-500 sm:text-sm/6"
                            />
                            {validationErrors.fullname && (
                                <p className="mt-1 text-sm text-red-400">{validationErrors.fullname}</p>
                            )}
                        </div>
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm/6 font-medium text-gray-100">Role</label>
                        <div className="mt-2 flex flex-col gap-2">
                            {roles.map((role) => (
                                <label key={role.id} className="flex items-center gap-2 text-sm text-gray-200">
                                    <input
                                        type="radio"
                                        name="role"
                                        value={role.name}
                                        checked={formData.role === role.name}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-indigo-500 focus:ring-indigo-500"
                                    />
                                    {role.name}
                                </label>
                            ))}
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
