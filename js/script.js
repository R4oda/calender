let year = 2023;
let month = 5;

window.addEventListener("load", () => {
  let data = generateMonthcalendar(year, month);
  document.querySelector("#calendar").append(data);
});

function generateMonthcalendar(year, month) {
  let weekdayData = [`日`, `月`, `火`, `水`, `木`, `金`, `土`];
  //getMonthcalendar関数を実行して戻り値をcalendarDataに格納。
  let calendarData = getMonthcalendar(year, month); 

  //5月1日の曜日を取得
  let iFD = calendarData[0]["weekDay"];
  while (iFD > 0) {
    //2023年5月は月曜日からスタートするため、最初（日曜日）を空白で埋める必要がある的なニュアンス。
    iFD--;
    calendarData.unshift({
      day: "",
      weekday: iFD,
    });
  }
  //5月31日の曜日を取得
  let iLD = calendarData[calendarData.length - 1]["weekDay"];
  // 指定した月が土曜日終わりでない場合、残りの日にちを空白で埋める
  while (iLD < 6) {
    iLD++;
    calendarData.push({
      day: ``,
      weekDay: iLD,
    });
  }
  // tableタグを作成、classを付与
  let cTable = document.createElement(`table`);
  cTable.className = `calendar-table`;

  // insertDataというtableタグに入れ込む箱を作成
  let insertData = ``;

  // 箱に要素を1つづつ足していく
  insertData += "<thead>";
  insertData += "<tr>";

  // 日曜日から土曜日までを画面で横並びに出力する記述。
  for (let i = 0; i < weekdayData.length; i++) {
    insertData += "<th>";
    insertData += weekdayData[i];
    insertData += "</th>";
  }

  // 箱に要素を1つづつ足していく（曜日部分の閉じタグ）
  insertData += "</tr>";
  insertData += "</thead>";



  // 日付部分の生成
  // 日付部分の大枠の箱を作成
  insertData += "<tbody>";

  // 選択した月の日数分だけ、ループを命令
  for (let i = 0; i < calendarData.length; i++) {
    // 週の最初の日にちの前に<tr>タグを入れる
    if (calendarData[iFD]["weekDay"] <= 0) {
      insertData += "<tr>";
    }
    insertData += "<td>";
    // 日にちを挿入
    insertData += calendarData[i]["day"];
    insertData += "</td>";
    // 週終わりの日にちの番が来たら、</tr>タグを入れる。
    if (calendarData[i]["weekDay"] >= 6) {
      insertData += "</tr>";
    }
  }
  insertData += "</tbody>";

  // tableタグの中にinsertDataを入れる。
  cTable.innerHTML = insertData;
  // generateMonthcalendar関数の戻り値として、cTableエレメントを返す。
  return cTable;
}

function getMonthcalendar(year, month) {
  let firstDate = new Date(year, month - 1, 1); // 2023年5月1日
  let lastDay = new Date(year, firstDate.getMonth() + 1, 0).getDate(); //日にちの0は前月の最終日を取得する。2023年5月31日
  let weekDay = firstDate.getDay(); //5月1日の曜日を取得。1(月曜日)がweekDayに設定される。

  let calendarData = []; //calendarDataという空の配列を作成。のちにこの中に日にちと曜日のデータを格納。
  let weekDayCount = weekDay;
  for (let i = 0; i < lastDay; i++) {
    //31日分の日にちと曜日のデータをcalendarDataに格納する。
    calendarData[i] = {
      day: i + 1,
      weekDay: weekDayCount,
    };
    if (weekDayCount >= 6) {
      //曜日が土曜日（6）になったら、日曜日（0）に戻す。それ以外は+1
      weekDayCount = 0;
    } else {
      weekDayCount++;
    }
  }
  return calendarData; //ループが終了したら、作成したデータを返す。
}
