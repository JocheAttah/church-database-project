import { format } from "date-fns";

export default function formatDate(date: string | Date) {
  if (!date) return "N/A";
  return format(new Date(date), "do MMMM, yyyy");
}
