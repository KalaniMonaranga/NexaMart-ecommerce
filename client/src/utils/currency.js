// Currency formatting utility for Sri Lankan Rupees
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount).replace('LKR', 'Rs.');
};

// Alternative simple format for consistency
export const formatCurrencySimple = (amount) => {
  return `Rs. ${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

// Format for display without decimals if whole number
export const formatCurrencyDisplay = (amount) => {
  if (amount % 1 === 0) {
    return `Rs. ${amount.toLocaleString()}`;
  }
  return `Rs. ${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};
