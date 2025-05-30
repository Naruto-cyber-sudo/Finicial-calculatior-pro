import unittest
from financial_tools.simple_interest import calculate_simple_interest

class TestSimpleInterest(unittest.TestCase):

    def test_positive_values(self):
        self.assertAlmostEqual(calculate_simple_interest(1000, 0.05, 2), 100.0)

    def test_zero_principal(self):
        self.assertAlmostEqual(calculate_simple_interest(0, 0.05, 2), 0.0)

    def test_zero_rate(self):
        self.assertAlmostEqual(calculate_simple_interest(1000, 0, 2), 0.0)

    def test_zero_time(self):
        self.assertAlmostEqual(calculate_simple_interest(1000, 0.05, 0), 0.0)

    def test_negative_principal(self):
        with self.assertRaises(ValueError):
            calculate_simple_interest(-1000, 0.05, 2)

    def test_negative_rate(self):
        with self.assertRaises(ValueError):
            calculate_simple_interest(1000, -0.05, 2)

    def test_negative_time(self):
        with self.assertRaises(ValueError):
            calculate_simple_interest(1000, 0.05, -2)

if __name__ == '__main__':
    unittest.main()
