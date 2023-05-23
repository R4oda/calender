let year = 2023;
let month = 5;

window.addEventListener("load", () => {
  let data = generateMonthcalendar(year, month);
  document.querySelector("#calendar").append(data);
});

function generateMonthcalendar(year, month) {
  let weekdayData = [`日`, `月`, `火`, `水`, `木`, `金`, `土`];
  let calendarData = getMonthcalendar(year, month); //getMonthcalendar関数を実行して戻り値をcalendarDataに格納。
  let i = calendarData[0]["weekDay"]; //5月1日の曜日を取得
  while(i > 0) { //2023年5月は月曜日からスタートするため、最初（日曜日）を空白で埋める必要がある的なニュアンス。完成版のカレンダー見たらわかる。
    i--;
    calendarData.unshift({
        day: '',
        weekday: i
    });
}
}

function getMonthcalendar(year, month) {
  let firstDate = new Date(year, month - 1, 1); // 2023年5月1日
  let lastDay = new Date(year, firstDate.getMonth() + 1, 0).getDate();  //日にちの0は前月の最終日を取得する。2023年5月31日
  let weekDay = firstDate.getDay(); //5月1日の曜日を取得。1(月曜日)がweekDayに設定される。


  let calendarData = []; //calendarDataという空の配列を作成。のちにこの中に日にちと曜日のデータを格納。
  let weekDayCount = weekDay;
  for (let i = 0; i < lastDay; i++) { //31日分の日にちと曜日のデータをcalendarDataに格納する。
    calendarData[i] = {
      day: i + 1,
      weekDay: weekDayCount,
    };
    if (weekDayCount >= 6) { //曜日が土曜日（6）になったら、日曜日（0）に戻す。それ以外は+1
      weekDayCount = 0;
    } else {
      weekDayCount++;
    }
  }
  return calendarData; //ループが終了したら、作成したデータを返す。
}
