import React from "react";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import SavingsGoalsPage from "../pages/controllers/savings/savings";
import api from "../api/axios";

vi.mock("../api/axios");

describe("SavingsGoalsPage", () => {
    it("shows validation error when target amount is missing", async () => {
        // Mock user in localStorage with coupleId
        localStorage.setItem(
            "user",
            JSON.stringify({ id: 1, fullName: "John Doe", coupleId: 100 })
        );

        // Mock goals fetch
        api.get.mockImplementation((url) => {
            if (url === "/SavingsGoals/byCouple/100")
                return Promise.resolve({ data: [] });
        });

        render(<SavingsGoalsPage />);

        await waitFor(() => expect(api.get).toHaveBeenCalled());

        // Fill only title, leave amount empty
        fireEvent.change(
            screen.getByPlaceholderText(/Goal title \(e.g. House, Vacation\)/i),
            { target: { value: "Buy a Car" } }
        );

        fireEvent.change(screen.getByPlaceholderText(/Target amount/i), {
            target: { value: "" },
        });

        fireEvent.click(screen.getByText(/Add Goal/i));

        // required attribute should make it invalid
        expect(screen.getByPlaceholderText(/Target amount/i)).toBeInvalid();
    });

    it("creates a goal with valid title and target amount, progress starts at 0%", async () => {
        localStorage.setItem(
            "user",
            JSON.stringify({ id: 1, fullName: "John Doe", coupleId: 100 })
        );

        // Mock fetch
        api.get.mockImplementation((url) => {
            if (url === "/SavingsGoals/byCouple/100")
                return Promise.resolve({ data: [] });
        });

        const newGoal = {
            id: 201,
            title: "Buy a Car",
            targetAmount: 5000,
            currentAmount: 0,
        };
        api.post.mockResolvedValueOnce({ data: newGoal });

        render(<SavingsGoalsPage />);

        await waitFor(() => expect(api.get).toHaveBeenCalled());

        // Fill form
        fireEvent.change(
            screen.getByPlaceholderText(/Goal title \(e.g. House, Vacation\)/i),
            { target: { value: "Buy a Car" } }
        );
        fireEvent.change(screen.getByPlaceholderText(/Target amount/i), {
            target: { value: "5000" },
        });

        fireEvent.click(screen.getByText(/Add Goal/i));

        await waitFor(() =>
            expect(api.post).toHaveBeenCalledWith(
                "/SavingsGoals",
                expect.objectContaining({
                    title: "Buy a Car",
                    coupleId: 100,
                    targetAmount: 5000, // should be number
                })
            )
        );

        // Check new goal appears
        const goalList = await screen.findByRole("list");
        expect(within(goalList).getByText(/Buy a Car/i)).toBeInTheDocument();
        expect(within(goalList).getByText(/0 \/ 5000 saved/i)).toBeInTheDocument();
    });
});
