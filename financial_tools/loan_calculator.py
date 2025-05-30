import math

def calculate_monthly_payment(principal, annual_interest_rate, loan_term_years):
  """Calculates the monthly payment for a loan.

  Args:
    principal: The loan principal amount.
    annual_interest_rate: The annual interest rate (as a decimal).
    loan_term_years: The loan term in years.

  Returns:
    The monthly loan payment.
  """
  if principal <= 0 or annual_interest_rate < 0 or loan_term_years <= 0:
    raise ValueError("Principal and loan term must be positive, and interest rate must be non-negative.")

  if annual_interest_rate == 0:
    return principal / (loan_term_years * 12)

  monthly_interest_rate = annual_interest_rate / 12
  number_of_payments = loan_term_years * 12

  monthly_payment = principal * (monthly_interest_rate * math.pow(1 + monthly_interest_rate, number_of_payments)) / (math.pow(1 + monthly_interest_rate, number_of_payments) - 1)
  return monthly_payment
