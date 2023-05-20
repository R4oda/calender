const year = 2023;
const month = 5;


window.addEventListener("load", () => {
  console.log(getMonthCalender(year, month));
});



function getMonthCalender(year, month) {
  let firstDate = new Date(year, month - 1, 1);
  let lastDay = new Date(year, (firstDate.getMonth() + 1), 0).getDate();
  console.log(lastDay);
  //日にちの0は前月の最終日を取得する。
  let weekDay = firstDate.getDay();

  let calenderData = [];
  let weekDayCount = weekDay;
  for (let i = 0; i < lastDay; i++) {
    calenderData[i] = {
      day: i + 1,
      weekDay: weekDayCount,
    }
    if (weekDayCount >= 6) {
      weekDayCount = 0;
    } else {
      weekDayCount++;
    }
  }
  return calenderData;
}
