const ABSENCE_CONTROL_CLASS = "AbsenceControl";

const ABSENCE_ROW_CLASS = "AbsenceRow";
const ABSENCE_ROW_REASON_CLASS = "AbsenceRow_AbsenceReason";
const ABSENCE_ROW_FROM_CLASS = "AbsenceRow_AbsenceFrom";
const ABSENCE_ROW_TO_CLASS = "AbsenceRow_AbsenceTo";
const ABSENCE_ROW_HIDDEN_CLASS = "AbsenceRow_Hidden";

const toggleAbsenceRowsMatching = (month, isActive) => {
  const rows = $(`.${ABSENCE_ROW_CLASS}`);

  for (const row of rows) {
    const fromDate = $(row).children(`.${ABSENCE_ROW_FROM_CLASS}`).text();
    const toDate = $(row).children(`.${ABSENCE_ROW_TO_CLASS}`).text();

    for (const currentRowData of [fromDate, toDate]) {
      if (currentRowData.endsWith(month) === false) {
        continue;
      }

      if (isActive) {
        $(row).removeClass(ABSENCE_ROW_HIDDEN_CLASS);
      } else {
        $(row).addClass(ABSENCE_ROW_HIDDEN_CLASS);
      }
    }
  }
};

const hideAllAbsenceRows = () => {
  const rows = $(`.${ABSENCE_ROW_CLASS}`);

  for (const row of rows) {
    $(row).addClass(ABSENCE_ROW_HIDDEN_CLASS);
  }
};

$(document).ready(() => {
  $(`.${ABSENCE_CONTROL_CLASS}`).on("click", (event) =>
    toggleAbsenceRowsMatching(event.target.value, event.target.checked)
  );

  hideAllAbsenceRows();
});
