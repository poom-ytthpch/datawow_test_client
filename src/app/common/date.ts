import moment from "moment";

const SearchUnit = {
  day: "day",
  days: "days",
  minute: "minute",
  minutes: "minutes",
  hour: "hour",
  hours: "hours",
  year: "year",
  years: "years",
} as const;

export const fromNowFormat = (date: Date): string => {
  const fromNow = moment(date).fromNow();
  const split = fromNow.split(" ");

  const unit = SearchUnit[split[1] as keyof typeof SearchUnit]
    ? split[1].slice(0, 1)
    : split[1].slice(0, 2) + ".";

  const newFormat =
    !Number.isNaN(Number(split[0])) ? split[0] + unit + " " + split[2] : fromNow;

  return newFormat;
};
