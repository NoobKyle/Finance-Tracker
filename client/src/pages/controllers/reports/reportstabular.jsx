import { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function ReportsPage() {
    const [incomeVsExpense, setIncomeVsExpense] = useState(null);
    const [expenseTrend, setExpenseTrend] = useState([]);
    const [monthlyView, setMonthlyView] = useState([]);
    const [goalBreakdown, setGoalBreakdown] = useState([]);
    const [savingsVsSpending, setSavingsVsSpending] = useState(null);


    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const coupleId = user?.coupleId;

    useEffect(() => {
        if (!coupleId) return;
        fetchAllReports();
    }, [coupleId]);

    async function fetchAllReports() {
        try {
            const [
                incExpRes,
                expTrendRes,
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

            setIncomeVsExpense(incExpRes.data);
            setExpenseTrend(expTrendRes.data);
            setMonthlyView(monthlyViewRes.data);
            setGoalBreakdown(goalBreakdownRes.data);
            setSavingsVsSpending(savingsVsSpendingRes.data);
        } catch (err) {
            console.error("Error fetching reports", err);
        }
    }

    if (!incomeVsExpense) return <p className="p-4">Loading reports…</p>;

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-10">
            <h1 className="text-3xl font-bold mb-6">Reports Dashboard</h1>

            {/* Income vs Expense */}
            <section className="bg-white p-4 rounded shadow text-black">
                <h2 className="text-xl font-semibold mb-2">Income vs Expense</h2>
                <table className="table-auto w-full border">
                    <tbody>
                        <tr className="border-b">
                            <td className="p-2">Total Income</td>
                            <td className="p-2">{incomeVsExpense.totalIncome}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-2">Total Expense</td>
                            <td className="p-2">{incomeVsExpense.totalExpense}</td>
                        </tr>
                        <tr>
                            <td className="p-2 font-bold">Net</td>
                            <td className="p-2 font-bold">{incomeVsExpense.net}</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Expense Trend */}
            <section className="bg-white p-4 rounded shadow text-black">
                <h2 className="text-xl font-semibold mb-2">Expense Trend</h2>
                <table className="table-auto w-full border">
                    <thead>
                        <tr>
                            <th className="p-2 border-b">Period</th>
                            <th className="p-2 border-b">Total Expense</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenseTrend.map((row) => (
                            <tr key={row.periodLabel} className="border-b">
                                <td className="p-2">{row.periodLabel}</td>
                                <td className="p-2">{row.totalExpense}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Monthly View */}
            <section className="bg-white p-4 rounded shadow text-black">
                <h2 className="text-xl font-semibold mb-2">Monthly View</h2>
                <table className="table-auto w-full border">
                    <thead>
                        <tr>
                            <th className="p-2 border-b">Period</th>
                            <th className="p-2 border-b">Total Income</th>
                            <th className="p-2 border-b">Total Expense</th>
                            <th className="p-2 border-b">Net</th>
                        </tr>
                    </thead>
                    <tbody>
                        {monthlyView.map((row) => (
                            <tr key={row.period} className="border-b">
                                <td className="p-2">{row.period}</td>
                                <td className="p-2">{row.totalIncome}</td>
                                <td className="p-2">{row.totalExpense}</td>
                                <td className="p-2">{row.net}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Goal Contribution Breakdown */}
            <section className="bg-white p-4 rounded shadow text-black">
                <h2 className="text-xl font-semibold mb-2">Goal Contribution Breakdown</h2>
                <table className="table-auto w-full border">
                    <thead>
                        <tr>
                            <th className="p-2 border-b">Goal</th>
                            <th className="p-2 border-b">User Id</th>
                            <th className="p-2 border-b">Total Contributed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {goalBreakdown.map((row, idx) => (
                            <tr key={idx} className="border-b">
                                <td className="p-2">{row.goalTitle}</td>
                                <td className="p-2">{row.userId}</td>
                                <td className="p-2">{row.totalContributed}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Savings vs Spending */}
            <section className="bg-white p-4 rounded shadow text-black">
                <h2 className="text-xl font-semibold mb-2">Savings vs Spending</h2>
                <table className="table-auto w-full border">
                    <tbody>
                        <tr className="border-b">
                            <td className="p-2">Total Savings</td>
                            <td className="p-2">{savingsVsSpending.totalSavings}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-2">Total Spending</td>
                            <td className="p-2">{savingsVsSpending.totalSpending}</td>
                        </tr>
                        <tr>
                            <td className="p-2">Savings Rate</td>
                            <td className="p-2">
                                {(savingsVsSpending.savingsRate * 100).toFixed(1)}%
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
}
