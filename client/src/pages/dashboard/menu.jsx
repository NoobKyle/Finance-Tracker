// src/App.jsx
import React, { useState } from "react";

const App = () => {

    const sections = [
        {
            heading: "Dashboard",
            links: [
                { name: "Return to Dashboard", url: "/" },
            ],
        },
        {
            heading: "Expenses",
            links: [
                { name: "Add Expense", url: "https://twitter.com" },
                { name: "Edit Expense", url: "https://linkedin.com" },
                { name: "Delete Expense", url: "https://github.com" },
            ],
        },
        {
            heading: "Budgets",
            links: [
                { name: "Add Budget", url: "https://twitter.com" },
                { name: "Edit Budget", url: "https://linkedin.com" },
                { name: "Delete", url: "https://github.com" },
            ],
        },
    ];

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-lg w-96 relative">
                      

                        {/* Sections with Links */}
                        {sections.map((section, idx) => (
                            <div key={idx} className="mb-4">
                                <h2 className="text-lg font-bold mb-2 text-black">{section.heading}</h2>
                                <ul className="list-disc pl-5 space-y-1">
                                    {section.links.map((link, linkIdx) => (
                                        <li key={linkIdx}>
                                            <a
                                                href={link.url}
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            
        </div>
    );
};

export default App;
