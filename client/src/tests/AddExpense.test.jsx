import React from "react";
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest'; // Vitest APIs
import '@testing-library/jest-dom'; // extends expect
import UserExpensePage from '../pages/controllers/expenses/expense';
import api from '../api/axios';

// Mock the axios wrapper with Vitest
vi.mock('../api/axios');

describe('UserExpensePage', () => {
    it('shows validation error when amount is missing', async () => {
        // Mock user in localStorage
        localStorage.setItem('user', JSON.stringify({ id: 1, fullName: 'John Doe' }));

        // Mock categories + expenses fetch
        api.get.mockImplementation((url) => {
            if (url === '/configs/expense_type') return Promise.resolve({ data: [] });
            if (url === '/expenses/user/1') return Promise.resolve({ data: [] });
        });

        render(<UserExpensePage />);

        // wait for initial fetch
        await waitFor(() => expect(api.get).toHaveBeenCalled());

        // leave amount empty
        fireEvent.change(screen.getByPlaceholderText(/Amount/i), { target: { value: '' } });

        // set a valid date (assuming input[type="date"] exists)
        const dateInput = screen.getByLabelText(/date/i)
            || screen.getByPlaceholderText(/date/i);
        fireEvent.change(dateInput, { target: { value: '2025-09-29' } });

        fireEvent.click(screen.getByText(/Add Expense/i));

        // required validation should make amount invalid
        expect(screen.getByPlaceholderText(/Amount/i)).toBeInvalid();
    });

    it('adds expense with valid data and shows in list', async () => {
        localStorage.setItem('user', JSON.stringify({ id: 1, fullName: 'John Doe' }));

        api.get.mockImplementation((url) => {
            if (url === '/configs/expense_type') {
                return Promise.resolve({ data: [{ id: 1, name: 'Food' }] });
            }
            if (url === '/expenses/user/1') {
                return Promise.resolve({ data: [] });
            }
        });

        const newExpense = {
            id: 101,
            amount: 10,
            category: 'Food',
            date: new Date().toISOString(),
            isShared: false,
        };
        api.post.mockResolvedValueOnce({ data: newExpense });

        render(<UserExpensePage />);

        await waitFor(() => expect(api.get).toHaveBeenCalled());

        // Fill amount
        fireEvent.change(screen.getByPlaceholderText(/Amount/i), { target: { value: '10' } });

        // Fill date
        const dateInput = screen.getByLabelText(/date/i)
            || screen.getByPlaceholderText(/date/i);
        fireEvent.change(dateInput, { target: { value: '2025-09-29' } });

        // Select category
        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Food' } });

        // Submit
        fireEvent.click(screen.getByText(/Add Expense/i));

        await waitFor(() =>
            expect(api.post).toHaveBeenCalledWith(
                '/expenses',
                expect.objectContaining({
                    amount: '10',
                    category: 'Food',
                    userId: 1,
                })
            )
        );

        // Assert new expense shows in UI
        const expenseList = await screen.findByRole("list");
        expect(within(expenseList).getByText(/Food/i)).toBeInTheDocument();
        expect(within(expenseList).getByText(/\$10/i)).toBeInTheDocument();
    });
});
