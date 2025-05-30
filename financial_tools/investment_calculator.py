import math

def calculate_future_value(principal, annual_rate, years, annual_contribution):
  """Calculates the future value of an investment with regular annual contributions.

  Args:
    principal: The initial principal amount.
    annual_rate: The annual interest rate (as a decimal).
    years: The number of years the investment will grow.
    annual_contribution: The amount contributed at the end of each year.

  Returns:
    The future value of the investment.
  """
  if principal < 0 or annual_rate < 0 or years < 0 or annual_contribution < 0:
    raise ValueError("Principal, rate, years, and contribution must be non-negative.")

  # Future value of the initial principal
  fv_principal = principal * math.pow((1 + annual_rate), years)

  # Future value of an ordinary annuity (for contributions)
  if annual_rate == 0:
    fv_contributions = annual_contribution * years
  else:
    fv_contributions = annual_contribution * ((math.pow((1 + annual_rate), years) - 1) / annual_rate)
  
  total_future_value = fv_principal + fv_contributions
  return total_future_value
