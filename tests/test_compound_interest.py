import unittest
import math
from financial_tools.compound_interest import calculate_compound_interest

class TestCompoundInterest(unittest.TestCase):

    def test_positive_values(self):
        # Test with annual compounding
        self.assertAlmostEqual(calculate_compound_interest(1000, 0.05, 2, 1), 102.50)
        # Test with semi-annual compounding
        self.assertAlmostEqual(calculate_compound_interest(1000, 0.05, 2, 2), 103.81, places=2)
        # Test with quarterly compounding
        self.assertAlmostEqual(calculate_compound_interest(1000, 0.05, 2, 4), 104.49, places=2)
        # Test with monthly compounding
        self.assertAlmostEqual(calculate_compound_interest(1000, 0.05, 2, 12), 104.94, places=2)

    def test_zero_principal(self):
        self.assertAlmostEqual(calculate_compound_interest(0, 0.05, 2, 1), 0.0)

    def test_zero_rate(self):
        self.assertAlmostEqual(calculate_compound_interest(1000, 0, 2, 1), 0.0)

    def test_zero_time(self):
        self.assertAlmostEqual(calculate_compound_interest(1000, 0.05, 0, 1), 0.0)

    def test_negative_principal(self):
        with self.assertRaises(ValueError):
            calculate_compound_interest(-1000, 0.05, 2, 1)

    def test_negative_rate(self):
        with self.assertRaises(ValueError):
            calculate_compound_interest(1000, -0.05, 2, 1)

    def test_negative_time(self):
        with self.assertRaises(ValueError):
            calculate_compound_interest(1000, 0.05, -2, 1)

    def test_zero_frequency(self):
        with self.assertRaises(ValueError):
            calculate_compound_interest(1000, 0.05, 2, 0)
            
    def test_negative_frequency(self):
        with self.assertRaises(ValueError):
            calculate_compound_interest(1000, 0.05, 2, -1)

if __name__ == '__main__':
    unittest.main()
