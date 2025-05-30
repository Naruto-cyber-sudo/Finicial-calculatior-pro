# Financial Calculator Pro

A Python application providing a collection of tools for common financial calculations.

## Features

This application includes the following financial calculators:

*   **Simple Interest Calculator**: Calculates simple interest based on principal, annual rate, and time in years.
*   **Compound Interest Calculator**: Calculates compound interest based on principal, annual rate, time in years, and compounding frequency per year.
*   **Loan Payment Calculator**: Calculates the fixed monthly payment for a loan based on principal, annual interest rate, and loan term in years.
*   **Investment Future Value Calculator**: Calculates the future value of an investment with an initial principal, annual interest rate, investment duration in years, and a fixed annual contribution.

## Tools Overview

All financial tools are located in the `financial_tools` directory. Each calculator is in its own Python module.

### 1. Simple Interest Calculator

*   **Module**: `financial_tools.simple_interest`
*   **Function**: `calculate_simple_interest(principal, rate, time)`
*   **Description**: Computes simple interest.
*   **Inputs**:
    *   `principal`: The initial amount of money.
    *   `rate`: The annual interest rate (e.g., 0.05 for 5%).
    *   `time`: The duration of the investment or loan, in years.
*   **Returns**: The calculated simple interest.

### 2. Compound Interest Calculator

*   **Module**: `financial_tools.compound_interest`
*   **Function**: `calculate_compound_interest(principal, rate, time, frequency)`
*   **Description**: Computes compound interest, which is interest calculated on the initial principal and also on the accumulated interest of previous periods.
*   **Inputs**:
    *   `principal`: The initial amount of money.
    *   `rate`: The annual interest rate (e.g., 0.05 for 5%).
    *   `time`: The duration of the investment or loan, in years.
    *   `frequency`: The number of times that interest is compounded per year (e.g., 1 for annually, 4 for quarterly, 12 for monthly).
*   **Returns**: The calculated compound interest (total interest, not the final amount).

### 3. Loan Payment Calculator

*   **Module**: `financial_tools.loan_calculator`
*   **Function**: `calculate_monthly_payment(principal, annual_interest_rate, loan_term_years)`
*   **Description**: Calculates the fixed monthly payment required to pay off a loan over a specified term.
*   **Inputs**:
    *   `principal`: The total amount of the loan.
    *   `annual_interest_rate`: The annual interest rate (e.g., 0.05 for 5%).
    *   `loan_term_years`: The duration of the loan, in years.
*   **Returns**: The calculated fixed monthly payment.

### 4. Investment Future Value Calculator

*   **Module**: `financial_tools.investment_calculator`
*   **Function**: `calculate_future_value(principal, annual_rate, years, annual_contribution)`
*   **Description**: Calculates the future value of an investment, considering an initial principal and regular annual contributions. Assumes contributions are made at the end of each year and compounding occurs annually.
*   **Inputs**:
    *   `principal`: The initial investment amount.
    *   `annual_rate`: The annual interest rate (e.g., 0.05 for 5%).
    *   `years`: The number of years the investment will grow.
    *   `annual_contribution`: The fixed amount contributed at the end of each year.
*   **Returns**: The total future value of the investment.

## Usage Example

To use any of these calculators, you can import the respective function into your Python script:

```python
from financial_tools.simple_interest import calculate_simple_interest
from financial_tools.compound_interest import calculate_compound_interest
from financial_tools.loan_calculator import calculate_monthly_payment
from financial_tools.investment_calculator import calculate_future_value

# Simple Interest Example
si = calculate_simple_interest(principal=1000, rate=0.05, time=2)
print(f"Simple Interest: ${si:.2f}") # Output: Simple Interest: $100.00

# Compound Interest Example (compounded annually)
ci = calculate_compound_interest(principal=1000, rate=0.05, time=2, frequency=1)
print(f"Compound Interest: ${ci:.2f}") # Output: Compound Interest: $102.50

# Loan Payment Example
monthly_payment = calculate_monthly_payment(principal=100000, annual_interest_rate=0.05, loan_term_years=30)
print(f"Monthly Loan Payment: ${monthly_payment:.2f}") # Output: Monthly Loan Payment: $536.82

# Investment Future Value Example
fv = calculate_future_value(principal=1000, annual_rate=0.05, years=10, annual_contribution=100)
print(f"Future Value of Investment: ${fv:.2f}") # Output: Future Value of Investment: $2886.68
```

## Running Tests

All tests are located in the `tests` directory. To run the tests, navigate to the root of the repository and execute:

```bash
python -m unittest discover tests
```

This will automatically discover and run all unit tests for the financial tools.
