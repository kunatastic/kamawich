const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function timeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  if (hours < 12) {
    return "Morning";
  } else if (hours >= 12 && hours < 17) {
    return "Afternoon";
  } else {
    return "Evening";
  }
}

export function getDay() {
  let outputString;
  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth();
  const dayOfMonth = date.getDate();

  outputString = days[day] + ", " + months[month] + " " + dayOfMonth;
  return outputString;
}

export function formatServerTime(date: string) {
  const dateObj = new Date(date);
  const month = dateObj.getUTCMonth(); //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const hours = dateObj.getUTCHours();
  const minutes = dateObj.getUTCMinutes();

  return `${months[month]} ${day}, ${year} at ${hours}:${minutes}`;
}
