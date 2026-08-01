export const calculateTotalRent = (
  startDate: string,
  endDate: string,
  price: number,
) => {
  if (!startDate || !endDate) return null;

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (end <= start) return { isValid: false, totalDays: 0, totalPrice: 0 };

  const diffTime = Math.abs(end.getTime() - start.getTime());
  const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const dailyRate = price / 30;
  const totalPrice = Math.round(totalDays * dailyRate);

  const months = (totalDays / 30).toFixed(1);

  return { isValid: true, totalDays, totalPrice, months };
};
