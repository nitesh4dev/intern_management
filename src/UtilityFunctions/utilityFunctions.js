export const timeStampToDateString = (timeStamp) => {
  const dateString = new Date(timeStamp.seconds * 1000)
    .toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, "-");
  return dateString;
};
