const hoursSpanElement = document.querySelector('.hours-span-element');
const minutesSpanElement = document.querySelector('.minutes-span-element');
const secondsSpanElement = document.querySelector('.seconds-span-element');
const suffixSpanElement = document.querySelector('.suffix-span-element');
// ---------------- || --------------------- //
const dateStringParagraph = document.querySelector('.date-text-content');
// ---------------- || --------------------- //
const toggleTimeModeButton = document.querySelector('.btn');
// ---------------- || --------------------- //
let isTwelveHourClockActive = false;
// ---------------- || --------------------- //
setInterval(renderTimeAndDate, 1000);
// ---------------- || --------------------- //
const parseMonthName = function (num) {
  return num === 0
    ? 'January'
    : num === 1
    ? 'February'
    : num === 2
    ? 'March'
    : num === 3
    ? 'April'
    : num === 4
    ? 'May'
    : num === 5
    ? 'June'
    : num === 6
    ? 'July'
    : num === 7
    ? 'August'
    : num === 8
    ? 'September'
    : num === 9
    ? 'October'
    : num === 10
    ? 'November'
    : 'December';
};

const parseDayName = function (num) {
  return num === 0
    ? 'Sunday'
    : num === 1
    ? 'Monday'
    : num === 2
    ? 'Tuesday'
    : num === 3
    ? 'Wednesday'
    : num === 4
    ? 'Thursday'
    : num === 5
    ? 'Friday'
    : 'Saturday';
};

const ordinalNumberSuffix = function (date) {
  return date === 1 || date === 21 || date === 31
    ? 'st'
    : date === 2 || date === 22
    ? 'nd'
    : date === 3 || date === 23
    ? 'rd'
    : 'th';
};

function renderTimeAndDate() {
  const now = new Date();
  // ---------------- || --------------------- //
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  // ---------------- || --------------------- //
  const dayOfWeek = now.getDay();
  const date = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();
  // ---------------- || --------------------- //
  // I chose to render time with span elements because of indentation.
  // With p `${...}` entire paragraph moved when any of the hours, minutes or seconds === 11
  // Thats why spans have inline-block display and fixed widths, to prevent indentation
  // ---------------- || --------------------- //
  hoursSpanElement.textContent = String(hours).padStart(2, 0);
  minutesSpanElement.textContent = String(minutes).padStart(2, 0);
  secondsSpanElement.textContent = String(seconds).padStart(2, 0);
  // ---------------- || --------------------- //

  if (isTwelveHourClockActive) {
    suffixSpanElement.style.visibility = 'visible';
    suffixSpanElement.textContent = hours < 12 ? 'a.m.' : 'p.m.';
    hoursSpanElement.textContent =
      hours === 00 || hours === 12
        ? 12
        : hours < 12
        ? String(hours)
        : String(hours - 12);
  } else {
    suffixSpanElement.style.visibility = 'hidden';
  }
  // ---------------- || --------------------- //

  dateStringParagraph.textContent = `${parseDayName(
    dayOfWeek
  )}, ${date}${ordinalNumberSuffix(date)} of ${parseMonthName(month)}, ${year}`;
}

toggleTimeModeButton.addEventListener('click', function () {
  !isTwelveHourClockActive
    ? (isTwelveHourClockActive = true)
    : (isTwelveHourClockActive = false);
});

renderTimeAndDate();
