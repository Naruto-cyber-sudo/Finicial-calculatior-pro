def calculate_simple_interest(principal, rate, time):
  """Calculates simple interest.

  Args:
    principal: The principal amount.
    rate: The annual interest rate (as a decimal).
    time: The time period in years.

  Returns:
    The simple interest.
  """
  if principal < 0 or rate < 0 or time < 0:
    raise ValueError("Principal, rate, and time must be non-negative.")
  return principal * rate * time
