import { ChartConfig } from "@/components/ui/chart";

// Pie chart
const genderChartConfig = {
  male: { label: "Male" },
  female: { label: "Female" },
} satisfies ChartConfig;

const statusChartConfig = {
  workers: { label: "Workers" },
  members: { label: "Members" },
} satisfies ChartConfig;

// Bar chart
const attendanceChartConfig = {
  attendance: { label: "Attendance" },
} satisfies ChartConfig;

// Line chart
const revenueExpenseChartData = [
  { month: "January", revenue: 200000, expenses: 100000 },
  { month: "February", revenue: 400000, expenses: 250000 },
  { month: "March", revenue: 250000, expenses: 150000 },
  { month: "April", revenue: 420000, expenses: 320000 },
  { month: "May", revenue: 150000, expenses: 50000 },
  { month: "June", revenue: 400000, expenses: 250000 },
  { month: "July", revenue: 350000, expenses: 150000 },
];

const revenueExpenseChartConfig = {
  revenue: {
    label: "Revenue",
    color: "#27AE60",
  },
  expenses: {
    label: "Expenses",
    color: "#FF9674",
  },
} satisfies ChartConfig;

export {
  attendanceChartConfig,
  genderChartConfig,
  revenueExpenseChartConfig,
  revenueExpenseChartData,
  statusChartConfig,
};
