import React, { useState, useEffect } from 'react';
import './App.css';
import { Calculator, Percent, TrendingUp, DollarSign, Moon, Sun } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Number formatting utility
const formatNumber = (num) => {
  if (!num) return '';
  return new Intl.NumberFormat('en-US').format(num);
};

// EMI Calculator Component
const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [tenureType, setTenureType] = useState('months');
  const [results, setResults] = useState(null);
  const [showAmortization, setShowAmortization] = useState(false);

  const calculateEMI = () => {
    if (!loanAmount || !interestRate || !tenure) return;

    const principal = parseFloat(loanAmount.replace(/,/g, ''));
    const rate = parseFloat(interestRate) / 100 / 12;
    const months = tenureType === 'years' ? parseFloat(tenure) * 12 : parseFloat(tenure);

    if (principal <= 0 || rate < 0 || months <= 0) return;

    const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    const totalAmount = emi * months;
    const totalInterest = totalAmount - principal;

    // Generate amortization schedule
    let balance = principal;
    const schedule = [];
    
    for (let i = 1; i <= months; i++) {
      const interestPayment = balance * rate;
      const principalPayment = emi - interestPayment;
      balance -= principalPayment;

      schedule.push({
        month: i,
        emi: emi,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
      });
    }

    setResults({
      emi: emi,
      totalAmount: totalAmount,
      totalInterest: totalInterest,
      principal: principal,
      schedule: schedule
    });
  };

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, tenure, tenureType]);

  const handleAmountChange = (value) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setLoanAmount(formatNumber(numericValue));
  };

  const pieData = results ? [
    { name: 'Principal', value: results.principal, color: '#3b82f6' },
    { name: 'Interest', value: results.totalInterest, color: '#ef4444' }
  ] : [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Loan Details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Loan Amount (₹)
              </label>
              <input
                type="text"
                value={loanAmount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="10,00,000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Interest Rate (% per annum)
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="8.5"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tenure
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="20"
                />
                <select
                  value={tenureType}
                  onChange={(e) => setTenureType(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="years">Years</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">EMI Breakdown</h3>
            
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <div className="text-sm text-blue-600 dark:text-blue-400">Monthly EMI</div>
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                  ₹{formatNumber(Math.round(results.emi))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                  <div className="text-sm text-green-600 dark:text-green-400">Principal</div>
                  <div className="text-lg font-semibold text-green-700 dark:text-green-300">
                    ₹{formatNumber(Math.round(results.principal))}
                  </div>
                </div>

                <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
                  <div className="text-sm text-red-600 dark:text-red-400">Total Interest</div>
                  <div className="text-lg font-semibold text-red-700 dark:text-red-300">
                    ₹{formatNumber(Math.round(results.totalInterest))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Amount</div>
                <div className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  ₹{formatNumber(Math.round(results.totalAmount))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pie Chart */}
      {results && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Principal vs Interest</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${formatNumber(Math.round(value))}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Amortization Table */}
      {results && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Amortization Schedule</h3>
            <button
              onClick={() => setShowAmortization(!showAmortization)}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              {showAmortization ? 'Hide' : 'Show'} Table
            </button>
          </div>

          {showAmortization && (
            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
                  <tr>
                    <th className="border dark:border-gray-600 p-3 text-left">Month</th>
                    <th className="border dark:border-gray-600 p-3 text-left">EMI</th>
                    <th className="border dark:border-gray-600 p-3 text-left">Principal</th>
                    <th className="border dark:border-gray-600 p-3 text-left">Interest</th>
                    <th className="border dark:border-gray-600 p-3 text-left">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {results.schedule.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/50' : ''}>
                      <td className="border dark:border-gray-600 p-3">{row.month}</td>
                      <td className="border dark:border-gray-600 p-3">₹{formatNumber(Math.round(row.emi))}</td>
                      <td className="border dark:border-gray-600 p-3">₹{formatNumber(Math.round(row.principal))}</td>
                      <td className="border dark:border-gray-600 p-3">₹{formatNumber(Math.round(row.interest))}</td>
                      <td className="border dark:border-gray-600 p-3">₹{formatNumber(Math.round(row.balance))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Simple Interest Calculator
const SimpleInterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [timeUnit, setTimeUnit] = useState('years');
  const [result, setResult] = useState(null);

  const calculateSI = () => {
    if (!principal || !rate || !time) return;

    const p = parseFloat(principal.replace(/,/g, ''));
    const r = parseFloat(rate);
    let t = parseFloat(time);

    if (timeUnit === 'months') t = t / 12;
    else if (timeUnit === 'days') t = t / 365;

    const interest = (p * r * t) / 100;
    const amount = p + interest;

    setResult({ interest, amount, principal: p });
  };

  useEffect(() => {
    calculateSI();
  }, [principal, rate, time, timeUnit]);

  const handlePrincipalChange = (value) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setPrincipal(formatNumber(numericValue));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Investment Details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Principal Amount (₹)
              </label>
              <input
                type="text"
                value={principal}
                onChange={(e) => handlePrincipalChange(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="1,00,000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="7.5"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Time Period
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="5"
                />
                <select
                  value={timeUnit}
                  onChange={(e) => setTimeUnit(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="years">Years</option>
                  <option value="months">Months</option>
                  <option value="days">Days</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {result && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Results</h3>
            
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                <div className="text-sm text-green-600 dark:text-green-400">Simple Interest</div>
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                  ₹{formatNumber(Math.round(result.interest))}
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <div className="text-sm text-blue-600 dark:text-blue-400">Final Amount</div>
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                  ₹{formatNumber(Math.round(result.amount))}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Return Rate</div>
                <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {((result.interest / result.principal) * 100).toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Discount Calculator
const DiscountCalculator = () => {
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountType, setDiscountType] = useState('percentage');
  const [discountValue, setDiscountValue] = useState('');
  const [result, setResult] = useState(null);

  const calculateDiscount = () => {
    if (!originalPrice || !discountValue) return;

    const price = parseFloat(originalPrice.replace(/,/g, ''));
    const discount = parseFloat(discountValue);

    let discountAmount, finalPrice, percentage;

    if (discountType === 'percentage') {
      discountAmount = (price * discount) / 100;
      finalPrice = price - discountAmount;
      percentage = discount;
    } else {
      discountAmount = discount;
      finalPrice = price - discount;
      percentage = (discount / price) * 100;
    }

    setResult({
      originalPrice: price,
      discountAmount,
      finalPrice,
      percentage,
      savings: discountAmount
    });
  };

  useEffect(() => {
    calculateDiscount();
  }, [originalPrice, discountType, discountValue]);

  const handlePriceChange = (value) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setOriginalPrice(formatNumber(numericValue));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Discount Details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Original Price (₹)
              </label>
              <input
                type="text"
                value={originalPrice}
                onChange={(e) => handlePriceChange(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="10,000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Discount Type
              </label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (₹)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Discount {discountType === 'percentage' ? '(%)' : '(₹)'}
              </label>
              <input
                type="number"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder={discountType === 'percentage' ? '20' : '2000'}
                step={discountType === 'percentage' ? '0.1' : '1'}
              />
            </div>
          </div>
        </div>

        {result && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Discount Results</h3>
            
            <div className="space-y-4">
              <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
                <div className="text-sm text-purple-600 dark:text-purple-400">Final Price</div>
                <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                  ₹{formatNumber(Math.round(result.finalPrice))}
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                <div className="text-sm text-green-600 dark:text-green-400">You Save</div>
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                  ₹{formatNumber(Math.round(result.savings))}
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <div className="text-sm text-blue-600 dark:text-blue-400">Discount Percentage</div>
                <div className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                  {result.percentage.toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Profit/Loss Calculator
const ProfitLossCalculator = () => {
  const [costPrice, setCostPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [result, setResult] = useState(null);

  const calculateProfitLoss = () => {
    if (!costPrice || !sellingPrice) return;

    const cp = parseFloat(costPrice.replace(/,/g, ''));
    const sp = parseFloat(sellingPrice.replace(/,/g, ''));
    const qty = parseFloat(quantity) || 1;

    const totalCost = cp * qty;
    const totalSelling = sp * qty;
    const difference = totalSelling - totalCost;
    const percentage = (difference / totalCost) * 100;

    setResult({
      totalCost,
      totalSelling,
      difference,
      percentage,
      isProfit: difference > 0,
      isLoss: difference < 0,
      costPrice: cp,
      sellingPrice: sp,
      quantity: qty
    });
  };

  useEffect(() => {
    calculateProfitLoss();
  }, [costPrice, sellingPrice, quantity]);

  const handleCostPriceChange = (value) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setCostPrice(formatNumber(numericValue));
  };

  const handleSellingPriceChange = (value) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setSellingPrice(formatNumber(numericValue));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Transaction Details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Cost Price (₹)
              </label>
              <input
                type="text"
                value={costPrice}
                onChange={(e) => handleCostPriceChange(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="5,000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Selling Price (₹)
              </label>
              <input
                type="text"
                value={sellingPrice}
                onChange={(e) => handleSellingPriceChange(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="6,000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Quantity (Optional)
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="1"
                min="1"
              />
            </div>
          </div>
        </div>

        {result && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Results</h3>
            
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${
                result.isProfit 
                  ? 'bg-green-50 dark:bg-green-900/30' 
                  : result.isLoss 
                    ? 'bg-red-50 dark:bg-red-900/30' 
                    : 'bg-gray-50 dark:bg-gray-700/50'
              }`}>
                <div className={`text-sm ${
                  result.isProfit 
                    ? 'text-green-600 dark:text-green-400' 
                    : result.isLoss 
                      ? 'text-red-600 dark:text-red-400' 
                      : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {result.isProfit ? 'Profit' : result.isLoss ? 'Loss' : 'Break Even'}
                </div>
                <div className={`text-2xl font-bold ${
                  result.isProfit 
                    ? 'text-green-700 dark:text-green-300' 
                    : result.isLoss 
                      ? 'text-red-700 dark:text-red-300' 
                      : 'text-gray-700 dark:text-gray-300'
                }`}>
                  ₹{formatNumber(Math.round(Math.abs(result.difference)))}
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <div className="text-sm text-blue-600 dark:text-blue-400">Percentage</div>
                <div className={`text-xl font-bold ${
                  result.isProfit 
                    ? 'text-green-700 dark:text-green-300' 
                    : result.isLoss 
                      ? 'text-red-700 dark:text-red-300' 
                      : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {result.percentage >= 0 ? '+' : ''}{result.percentage.toFixed(2)}%
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                  <div className="text-xs text-gray-600 dark:text-gray-400">Total Cost</div>
                  <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    ₹{formatNumber(Math.round(result.totalCost))}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                  <div className="text-xs text-gray-600 dark:text-gray-400">Total Selling</div>
                  <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    ₹{formatNumber(Math.round(result.totalSelling))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [activeTab, setActiveTab] = useState('emi');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const tabs = [
    { id: 'emi', name: 'EMI', icon: Calculator, component: EMICalculator },
    { id: 'si', name: 'Simple Interest', icon: Percent, component: SimpleInterestCalculator },
    { id: 'discount', name: 'Discount', icon: DollarSign, component: DiscountCalculator },
    { id: 'profit', name: 'Profit/Loss', icon: TrendingUp, component: ProfitLossCalculator },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      darkMode ? 'dark bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Financial Calculation Pro
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                5 Essential Finance Tools – No Internet Needed
              </p>
            </div>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        {ActiveComponent && <ActiveComponent />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 px-4 py-2">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-around">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-xs font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default App;