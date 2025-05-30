import math

def calculate_compound_interest(principal, rate, time, frequency):
  """Calculates compound interest.

  Args:
    principal: The principal amount.
    rate: The annual interest rate (as a decimal).
    time: The time period in years.
    frequency: The number of times interest is compounded per year.

  Returns:
    The compound interest.
  """
  if principal < 0 or rate < 0 or time < 0 or frequency <= 0:
    raise ValueError("Principal, rate, and time must be non-negative, and frequency must be positive.")
  
  amount = principal * math.pow((1 + rate / frequency), (frequency * time))
  interest = amount - principal
  return interest
