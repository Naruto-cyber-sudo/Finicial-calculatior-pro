import unittest
import math
from financial_tools.loan_calculator import calculate_monthly_payment

class TestLoanCalculator(unittest.TestCase):

    def test_positive_values(self):
        # Example: $100,000 loan, 5% annual interest, 30 years
        self.assertAlmostEqual(calculate_monthly_payment(100000, 0.05, 30), 536.82, places=2)
        # Example: $20,000 loan, 3.5% annual interest, 5 years
        self.assertAlmostEqual(calculate_monthly_payment(20000, 0.035, 5), 363.83, places=2)

    def test_zero_interest_rate(self):
        # Example: $12,000 loan, 0% annual interest, 1 year
        self.assertAlmostEqual(calculate_monthly_payment(12000, 0, 1), 1000.00, places=2)

    def test_short_term_loan(self):
        # Example: $5,000 loan, 7% annual interest, 1 year
        self.assertAlmostEqual(calculate_monthly_payment(5000, 0.07, 1), 432.63, places=2)

    def test_negative_principal(self):
        with self.assertRaises(ValueError):
            calculate_monthly_payment(-100000, 0.05, 30)

    def test_negative_interest_rate(self):
        with self.assertRaises(ValueError):
            calculate_monthly_payment(100000, -0.05, 30)

    def test_zero_loan_term(self):
        with self.assertRaises(ValueError):
            calculate_monthly_payment(100000, 0.05, 0)
            
    def test_negative_loan_term(self):
        with self.assertRaises(ValueError):
            calculate_monthly_payment(100000, 0.05, -5)

if __name__ == '__main__':
    unittest.main()
