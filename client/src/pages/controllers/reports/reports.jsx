import { useEffect, useState } from "react";
import api from "../../../api/axios";
import {
    PieChart, Pie, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    BarChart, Bar,
} from "recharts";

export default function FullReportsPage() {
    const [incomeVsExpenses, setIncomeVsExpenses] = useState([]);
    const [expenseTrend, setExpenseTrend] = useState([]);
    const [monthlyView, setMonthlyView] = useState([]);
    const [goalBreakdown, setGoalBreakdown] = useState([]);
    const [savingsVsSpending, setSavingsVsSpending] = useState([]);
    const [loading, setLoading] = useState(true);

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const coupleId = user?.coupleId;

    useEffect(() => {
        if (!coupleId) return;
        fetchAllReports();
    }, [coupleId]);

    const fetchAllReports = async () => {
        try {
            setLoading(true);

            const [
                incomeRes,
                expenseTrendRes,
                monthlyViewRes,
                goalBreakdownRes,
                savingsVsSpendingRes,
            ] = await Promise.all([
                api.get(`/reports/income-vs-expense`, { params: { coupleId } }),
                api.get(`/reports/expense-trend`, { params: { coupleId, period: "monthly" } }),
                api.get(`/reports/monthly-view`, { params: { coupleId } }),
                api.get(`/reports/goal-contribution-breakdown`, { params: { coupleId } }),
                api.get(`/reports/savings-vs-spending`, { params: { coupleId } }),
            ]);

            // Convert server objects to chart data
            const incExp = incomeRes.data;
            setIncomeVsExpenses([
                { name: "Income", value: incExp.totalIncome },
                { name: "Expense", value: incExp.totalExpense },
            ]);

            const expTrend = expenseTrendRes.data.map(e => ({
                month: e.periodLabel,
                amount: e.totalExpense,
            }));
            setExpenseTrend(expTrend);

            const monthly = monthlyViewRes.data.map(m => ({
                label: m.period,
                income: m.totalIncome,
                expense: m.totalExpense,
                net: m.net,
            }));
            setMonthlyView(monthly);

            const goal = goalBreakdownRes.data.map(g => ({
                name: `${g.goalTitle} (User ${g.userId})`,
                value: g.totalContributed,
            }));
            setGoalBreakdown(goal);

            const savingsSpending = savingsVsSpendingRes.data;
            setSavingsVsSpending([
                { label: "Savings", amount: savingsSpending.totalSavings },
                { label: "Spending", amount: savingsSpending.totalSpending },
            ]);

        } catch (err) {
            console.error("Error fetching reports:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p className="p-4">Loading reports...</p>;

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-10">
            <h2 className="text-3xl mb-6 font-bold text-gray-800 dark:text-white">
                Reports Dashboard for {user?.fullName || "Your Couple"}
            </h2>

            <div className="flex flex-col md:flex-row gap-6">
            {/* Income vs Expenses */}
                <div className="bg-white p-6 rounded shadow ">
                <h3 className="text-xl mb-4 text-black">Income vs Expenses</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie dataKey="value" data={incomeVsExpenses} cx="50%" cy="50%" outerRadius={100} label />
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Expense Trend */}
            <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-xl mb-4 text-black">Expense Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={expenseTrend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="amount" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Monthly View */}
            <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-xl mb-4 text-black">Monthly View</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyView}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="income" fill="#82ca9d" name="Income" />
                        <Bar dataKey="expense" fill="#8884d8" name="Expense" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Goal Contribution Breakdown */}
            <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-xl mb-4 text-black">Goal Contribution Breakdown</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie dataKey="value" data={goalBreakdown} cx="50%" cy="50%" outerRadius={100} label />
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Savings vs Spending */}
            <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-xl mb-4 text-black ">Savings vs Spending</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={savingsVsSpending}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
