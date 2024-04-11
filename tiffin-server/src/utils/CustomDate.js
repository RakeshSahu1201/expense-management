function getLastDateTimeOfMonth() {
  // Initialize today date object
  const today = new Date();
  const _year = today.getFullYear();
  const _month = today.getMonth();
  // Initialize a new Date object with the next month's first day
  const nextMonthFirstDay = new Date(_year, _month + 1, 1);
  // Subtract one millisecond from the next month's first day to get the last millisecond of the current month
  const lastMillisecondOfMonth = new Date(nextMonthFirstDay.getTime() - 1);

  const temp = new Date(lastMillisecondOfMonth);

  const year = temp.getFullYear();
  const month = temp.getMonth() + 1;
  const day = temp.getDate();
  const hour = temp.getHours();
  const minute = temp.getMinutes();

  // const temp = new Date();
  // temp.setMinutes(temp.getMinutes() + 5);

  // const year = temp.getFullYear();
  // const month = temp.getMonth() + 1;
  // const day = temp.getDate();
  // const hour = temp.getHours();
  // const minute = temp.getMinutes();

  return { minute, hour, day, month, year };
}

module.exports = { getLastDateTimeOfMonth };
