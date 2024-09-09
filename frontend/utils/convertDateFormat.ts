import { format, isValid, parse } from "date-fns";

const convertDateFormat = (dateString: string): string | null => {
  const formats = ["dd/MM/yyyy", "MM/dd/yyyy", "yyyy-MM-dd"];

  for (const dateFormat of formats) {
    const parsedDate = parse(dateString, dateFormat, new Date());
    if (isValid(parsedDate)) {
      return format(parsedDate, "yyyy-MM-dd");
    }
  }

  return null;
};

export default convertDateFormat;
