// Formats a number as Indian Rupees, e.g. 45000 -> "₹45,000"
// Intl.NumberFormat with the "en-IN" locale automatically uses the
// Indian lakh/crore grouping (e.g. ₹1,00,000 instead of ₹100,000).
export function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// Formats an ISO date string ("2026-08-05") as "5 Aug 2026"
export function formatDate(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Returns "2026-08" style key used to group transactions by month
export function getMonthKey(isoDate) {
  return isoDate.slice(0, 7);
}
