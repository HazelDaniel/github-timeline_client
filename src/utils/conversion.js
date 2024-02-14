
export const formatGraphDateString = (dateString) => {
  const date = new Date(dateString);
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
  let formattedString = dateFormatter.format(date);
  formattedString = formattedString.replace(/\//g, "-");

  return formattedString;
};
