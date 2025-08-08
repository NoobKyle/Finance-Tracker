using AutoMapper;
using CoupleFinanceTracker.Models;
using CoupleFinanceTracker.DTOs;
using CoupleFinanceTracker.Data;

namespace CoupleFinanceTracker
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{
			// -------- USERS --------
			CreateMap<User, UserReadDto>();
			CreateMap<UserCreateDto, User>();
			CreateMap<UserUpdateDto, User>();

			// -------- COUPLES --------
			CreateMap<Couple, CoupleReadDto>();
			CreateMap<CoupleCreateDto, Couple>();
			CreateMap<CoupleUpdateDto, Couple>();

			// -------- EXPENSES --------
			CreateMap<Expense, ExpenseReadDto>();
			CreateMap<ExpenseCreateDto, Expense>();
			CreateMap<ExpenseUpdateDto, Expense>();

			// -------- INCOMES --------
			CreateMap<Income, IncomeReadDto>();
			CreateMap<IncomeCreateDto, Income>();
			CreateMap<IncomeUpdateDto, Income>();

			// -------- BUDGETS --------
			CreateMap<Budget, BudgetReadDto>();
			CreateMap<BudgetCreateDto, Budget>();
			CreateMap<BudgetUpdateDto, Budget>();

			// -------- SAVINGS GOALS --------
			CreateMap<SavingsGoal, SavingsGoalReadDto>();
			CreateMap<SavingsGoalCreateDto, SavingsGoal>();
			CreateMap<SavingsGoalUpdateDto, SavingsGoal>();

			// -------- RECURRING EXPENSES --------
			CreateMap<RecurringExpense, RecurringExpenseReadDto>();
			CreateMap<RecurringExpenseCreateDto, RecurringExpense>();
			CreateMap<RecurringExpenseUpdateDto, RecurringExpense>();

			// -------- RECEIPTS --------
			CreateMap<Receipt, ReceiptReadDto>();
			CreateMap<ReceiptCreateDto, Receipt>();

			// -------- COMMENTS --------
			CreateMap<Comment, CommentReadDto>();
			CreateMap<CommentCreateDto, Comment>();
			CreateMap<CommentUpdateDto, Comment>();
		}
	}
}
