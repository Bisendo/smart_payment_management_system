export const formatCurrency = (amount, currency = 'TZS', locale = 'en-TZ') => {
    if (isNaN(amount)) return amount;
  
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  