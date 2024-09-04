import { format } from "date-fns";

export default function formatDate(
  date: string | Date | null | undefined,
  formatStr?: string,
) {
  if (!date) return "N/A";
  return format(new Date(date), formatStr ?? "do MMMM, yyyy");
}
