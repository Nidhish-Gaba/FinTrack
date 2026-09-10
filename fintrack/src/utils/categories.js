// Simple category lists shared across the app.
// Using emoji instead of an icon library keeps the project dependency-free.
export const EXPENSE_CATEGORIES = [
  { name: "Food", icon: "🍲" },
  { name: "Transport", icon: "🚌" },
  { name: "Shopping", icon: "🛍️" },
  { name: "Bills", icon: "🧾" },
  { name: "Entertainment", icon: "🎬" },
  { name: "Health", icon: "💊" },
  { name: "Education", icon: "📚" },
  { name: "Other", icon: "🗂️" },
];

export const INCOME_CATEGORIES = [
  { name: "Salary", icon: "💼" },
  { name: "Freelance", icon: "🧑‍💻" },
  { name: "Investment", icon: "📈" },
  { name: "Gift", icon: "🎁" },
  { name: "Other", icon: "🗂️" },
];

// Look up the icon for a category name, regardless of income/expense list.
export function getCategoryIcon(categoryName) {
  const all = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];
  const match = all.find((c) => c.name === categoryName);
  return match ? match.icon : "🗂️";
}
