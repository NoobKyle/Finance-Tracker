import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";
import Menu from "./menu.jsx";

import {
    fetchCoupleUsers, getSharedExpenses, getSharedExpensesTotal, getUserExpenses, getSavingsGoals} from "./helpers.js";

const Dashboard = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [connectedUsers, setConnectedUsers] = useState({ "coupleId": 0, "users": [{ "fullName": "No Users", "email": "test@email.com" }], "totalIncome": 0 });
    const [expenses, setExpenses] = useState([]);
    const [savings, setSavings] = useState([]);
    const [total, setTotal] = useState(0);
    const [userExpense, setUserExpense] = useState({ count: 0, total: 0 });

    const [title, setTitle] = useState("Total Income");
    const [description, setDescription] = useState("This value represents the sum of all incomes for all connected partners.");
    const [value, setValue] = useState(0);
    const [buttonText, setButtonText] = useState("Edit Income");
    const [link, setLink] = useState("/income");

    const [option, setOption] = useState("Total Income");
    const changeHandler = (e) => {
        const value = e.target.value;
        setOption(value);


        if (value === "Expenses") {
            billsClicked();
        } else if (value === "Total Income") {
            totalIncomeClicked();
        } else if (value === "My Transactions") {
            myTransactionsClicked();
        } else if (value === "Notes") {
            miscClicked();
        }
    };

    const totalIncomeClicked = (e) => {

        if (e) {
            e.preventDefault();
        }
        setTitle("Total Income");
        setDescription("This value represents the sum of incomes for all connected partners.");
        setValue(connectedUsers.totalIncome);
        setButtonText("Edit Income");
        setLink("/income")
    }
    const billsClicked = (e) => {

        if (e) {
            e.preventDefault();
        }
        setTitle("Expenses");
        setDescription("This value represents the sum of shared expenses for all connected partners.");
        setValue(total)
        setButtonText("View More");
        setLink("/expenses")
    }
    const myTransactionsClicked = (e) => {

        if (e) {
            e.preventDefault();
        }
        setTitle("My Transactions");
        setDescription("This value represents the sum of all your transactions.");
        setValue(userExpense.total)
        setButtonText("View More");
        setLink("/myexpenses")
    }
    const miscClicked = (e) => {

        if (e) {
            e.preventDefault();
        }
        setTitle("Notes");
        setDescription("Leave a note, read a note !");
        setValue(0)
        setButtonText("View Notes");
        setLink("/notes")
    }


    useEffect(() => {
        async function loadData() {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                if (!user || !user.coupleId) {
                    return;
                }
                const result = await fetchCoupleUsers(user.coupleId);
                setConnectedUsers(result);
                setValue(result.totalIncome);

                const result2 = await getSharedExpenses(user.coupleId);
                setExpenses(result2)

                const result3 = await getSharedExpensesTotal(user.coupleId);
                setTotal(result3)

                const result4 = await getUserExpenses(user.id)
                setUserExpense(result4)

                const result5 = await getSavingsGoals(user.coupleId)
                setSavings(result5)
            } catch (err) {
                console.log("Error Fetching User Income Data");
            }
        }

        loadData();
    }, []);

    

    return (
        <div className="container w-screen h-screen ">
            <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-3 sm:py-0 dark:bg-neutral-900 mb-4">
                <nav className="max-w-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <p
                            className="flex-none font-semibold text-xl text-black focus:outline-hidden focus:opacity-80 dark:text-white"
                            aria-label="Brand"
                        >
                            Couple Finance Tracker
                        </p>

                        <Link
                            to="/user"
                            className="p-2 text-gray-600 hover:text-indigo-500 dark:text-gray-300 dark:hover:text-indigo-400"
                            aria-label="Settings"
                        >
                            <Settings className="w-6 h-6" />
                        </Link>
                    </div>
                </nav>
            </header>





            <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
            {/* Select (Mobile only) */}
            <div className="sm:hidden">
                    <label htmlFor="hs-card-nav" className="sr-only">Select a nav</label>
                    <select name="hs-card-nav" id="hs-card-nav" onChange={changeHandler} className="block w-full border-t-0 border-x-0 border-gray-300 rounded-t-xl focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
                        <option defaultValue="">Total Income</option>
                        <option>Expenses</option>
                    <option>My Transactions</option>
                    <option>Notes</option>
                </select>
            </div>
            {/* End Select (Mobile only) */}

            {/* Nav (Device only) */}
            <div className="hidden sm:block">
                    <nav className="relative z-0 flex border-b border-gray-200 rounded-xl divide-x divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
                        <a className="group relative min-w-0 flex-1 bg-white py-4 px-4 border-b-2 border-b-blue-600 text-gray-900 rounded-ss-xl text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 focus:z-10 dark:bg-neutral-900 dark:border-b-blue-500 dark:text-neutral-300" aria-current="page" onClick={totalIncomeClicked}>
                        Total Income
                    </a>

                        <a className="group relative min-w-0 flex-1 bg-white py-4 px-4 text-gray-500 hover:text-gray-700 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 focus:z-10 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-500 dark:hover:text-neutral-400 dark:focus:bg-neutral-800 dark:focus:text-neutral-400" onClick={billsClicked}>
                        Expenses
                    </a>

                        <a className="group relative min-w-0 flex-1 bg-white py-4 px-4 text-gray-500 hover:text-gray-700 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 focus:z-10 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-500 dark:hover:text-neutral-400 dark:focus:bg-neutral-800 dark:focus:text-neutral-400" onClick={myTransactionsClicked}>
                        My Transactions
                    </a>

                        <a className="group relative min-w-0 flex-1 bg-white py-4 px-4 text-gray-500 hover:text-gray-700 rounded-se-xl text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 focus:z-10 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-500 dark:hover:text-neutral-400 dark:focus:bg-neutral-800 dark:focus:text-neutral-400" onClick={miscClicked}>
                        Notes
                    </a>
                </nav>
            </div>
            {/* End Nav (Device only) */}

            <div className="p-4 text-center md:py-7 md:px-5">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        {title}
                </h3>
                    <p className="mt-2 text-gray-500 dark:text-neutral-400">
                        {description}
                    </p>

                    <p className="dark:text-white"><strong>$ {value}</strong></p>

                    <a className="mt-3 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent  text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" href={link}>
                        {buttonText}
                </a>
            </div>
            </div>

            <div className=" bg-gray-100 dark:bg-neutral-900 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white ml-4">
                    Connected Accounts
                </h2>

                <ul className="max-w-xs flex flex-col divide-y divide-gray-200 dark:divide-neutral-700 mt-4 ml-4 bg-white dark:bg-neutral-800 rounded-lg shadow">
                    {connectedUsers.users.map((user, idx) => (
                        <li
                            key={idx}
                            className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium text-gray-800 dark:text-white"
                        >
                            <div className="flex justify-between w-full">
                                {user.fullName}
                                <span className="inline-flex items-center py-1 px-2 text-xs font-medium text-white bg-blue-600 rounded-md">
                                    {user.email}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>

               
            </div>


            <div className=" bg-gray-100 dark:bg-neutral-900 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white ml-4">
                    Shared Expenses
                </h2>

                <ul className="max-w-xs flex flex-col divide-y divide-gray-200 dark:divide-neutral-700 mt-4 ml-4 bg-white dark:bg-neutral-800 rounded-lg shadow">
                    {expenses.map(exp => (
                        <li
                            key={exp.id}
                            className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium text-gray-800 dark:text-white"
                        >
                            <div className="flex justify-between w-full">
                                {exp.category}
                                <span className="inline-flex items-center py-1 px-2 text-xs font-medium text-white  rounded-md">
                                    {exp.amount}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>

               
            </div>


            <div className="bg-gray-100 dark:bg-neutral-900 p-6">
                <div className="flex items-center ml-4 mr-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mr-20">
                        Savings
                    </h2>
                    <Link
                        to="/savings"
                        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        Manage savings
                    </Link>
                </div>

                <ul className="max-w-xs flex flex-col divide-y divide-gray-200 dark:divide-neutral-700 mt-4 ml-4 bg-white dark:bg-neutral-800 rounded-lg shadow">
                    {savings.map((exp) => (
                        <li
                            key={exp.id}
                            className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium text-gray-800 dark:text-white"
                        >
                            <div className="flex justify-between w-full">
                                {exp.title}
                                <span className="inline-flex items-center py-1 px-2 text-xs font-medium text-white rounded-md">
                                    {exp.currentAmount} / {exp.targetAmount}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>



            <div className="bg-gray-100 dark:bg-neutral-900 p-6">
                <div className="flex items-center ml-4 mr-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mr-20">
                        Reports
                    </h2>
                    
                </div>

                <ul className="max-w-xs flex flex-col divide-y divide-gray-200 dark:divide-neutral-700 mt-4 ml-4 bg-white dark:bg-neutral-800 rounded-lg shadow">
                        <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium text-gray-800 dark:text-white">
                            <div className="flex justify-between w-full">
                                Generate Reports to get an overview of your accounts !
                            </div>
                        </li>
                        <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium text-gray-800 dark:text-white">
                            <div className="flex justify-between w-full">
                            <Link
                                to="/reports"
                                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                Generate Graphic Reports
                            </Link>
                            </div>
                        </li>
                        <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium text-gray-800 dark:text-white">
                            <div className="flex justify-between w-full">
                            <Link
                                to="/reportstabular"
                                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                Generate Tabular Reports
                            </Link>
                            </div>
                        </li>
                </ul>
            </div>




       


            {isOpen && ( <Menu /> )}

            <button onClick={() => setIsOpen(true)} className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300" >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
            </button>

        </div>
    )
}

export default Dashboard;