import { ChartConfig } from "@/components/ui/chart";

// Pie chart
const genderChartData = [
  { gender: "male", value: 77, fill: "#044FA6" },
  { gender: "female", value: 23, fill: "#9165BD" },
];

const genderChartConfig = {
  male: { label: "Male" },
  female: { label: "Female" },
} satisfies ChartConfig;

const statusChartData = [
  { status: "workers", value: 72, fill: "#FAA307" },
  { status: "members", value: 28, fill: "#38B000" },
];

const statusChartConfig = {
  workers: { label: "Workers" },
  members: { label: "Members" },
} satisfies ChartConfig;

// Bar chart
const meetingChartData = [
  { meeting: "Sunday", attendance: 710, fill: "#FAA307" },
  { meeting: "Midweek", attendance: 423, fill: "#FAA307" },
  { meeting: "Fellowship", attendance: 456, fill: "#FAA307" },
  { meeting: "Prayer group", attendance: 356, fill: "#FAA307" },
];

const meetingChartConfig = {
  Sunday: { label: "Sunday" },
  Midweek: { label: "Midweek" },
  Fellowship: { label: "Fellowship" },
  "Prayer group": { label: "Prayer group" },
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
  genderChartConfig,
  genderChartData,
  meetingChartConfig,
  meetingChartData,
  revenueExpenseChartConfig,
  revenueExpenseChartData,
  statusChartConfig,
  statusChartData,
};