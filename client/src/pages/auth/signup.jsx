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

    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            email: formData.email,
            passwordHash: formData.password,
            fullName: formData.fullname,
            incomeSource: formData.incomesource,
            role: formData.role,
            coupleId: Number(formData.coupleid),
            isLinkedToPartner: true
        };

        try {
            const res = await api.post("/Users", payload, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("User created:", res.data);

            // Show success message
            setSuccessMessage("✅ User created successfully! Redirecting to login...");

            // Delay redirect
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
                        </div>
                    </div>

                    {/* Income Source */}
                    <div>
                        <label htmlFor="incomesource" className="block text-sm/6 font-medium text-gray-100">
                            Income Source
                        </label>
                        <div className="mt-2">
                            <input
                                id="incomesource"
                                name="incomesource"
                                type="text"
                                value={formData.incomesource}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-gray-500 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    {/* Role */}
                    <div>
                        <label htmlFor="role" className="block text-sm/6 font-medium text-gray-100">
                            Role
                        </label>
                        <div className="mt-2">
                            <input
                                id="role"
                                name="role"
                                type="text"
                                value={formData.role}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-gray-500 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
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
                                type="text"
                                value={formData.coupleid}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-gray-500 focus:outline-indigo-500 sm:text-sm/6"
                            />
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
