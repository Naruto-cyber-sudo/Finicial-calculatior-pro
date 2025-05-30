import unittest
import math
from financial_tools.investment_calculator import calculate_future_value

class TestInvestmentCalculator(unittest.TestCase):

    def test_positive_values(self):
        # $1000 initial, 5% rate, 10 years, $100 annual contribution
        expected_fv = 1000 * math.pow(1.05, 10) + 100 * ((math.pow(1.05, 10) - 1) / 0.05)
        self.assertAlmostEqual(calculate_future_value(1000, 0.05, 10, 100), expected_fv, places=2)

        # $0 initial, 7% rate, 20 years, $500 annual contribution
        expected_fv_no_principal = 0 * math.pow(1.07, 20) + 500 * ((math.pow(1.07, 20) - 1) / 0.07)
        self.assertAlmostEqual(calculate_future_value(0, 0.07, 20, 500), expected_fv_no_principal, places=2)
        
        # $5000 initial, 3% rate, 5 years, $0 annual contribution
        expected_fv_no_contribution = 5000 * math.pow(1.03, 5) + 0 * ((math.pow(1.03, 5) - 1) / 0.03)
        self.assertAlmostEqual(calculate_future_value(5000, 0.03, 5, 0), expected_fv_no_contribution, places=2)

    def test_zero_rate(self):
        # $1000 initial, 0% rate, 10 years, $100 annual contribution
        # FV = Principal + (Contribution * Years)
        self.assertAlmostEqual(calculate_future_value(1000, 0, 10, 100), 1000 + (100 * 10), places=2)

    def test_zero_years(self):
        # $1000 initial, 5% rate, 0 years, $100 annual contribution
        # FV should be just the principal
        self.assertAlmostEqual(calculate_future_value(1000, 0.05, 0, 100), 1000.00, places=2)
        
    def test_zero_principal_and_contribution(self):
        self.assertAlmostEqual(calculate_future_value(0, 0.05, 10, 0), 0.00, places=2)

    def test_negative_principal(self):
        with self.assertRaises(ValueError):
            calculate_future_value(-1000, 0.05, 10, 100)

    def test_negative_rate(self):
        with self.assertRaises(ValueError):
            calculate_future_value(1000, -0.05, 10, 100)

    def test_negative_years(self):
        with self.assertRaises(ValueError):
            calculate_future_value(1000, 0.05, -10, 100)
            
    def test_negative_contribution(self):
        with self.assertRaises(ValueError):
            calculate_future_value(1000, 0.05, 10, -100)

if __name__ == '__main__':
    unittest.main()
