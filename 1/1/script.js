$(document).ready(() => {
  $("<div>", {
    id: "PopupDIV",
    title: "Popup",
  })
    .appendTo("body")
    .html("Popup content");

  $("#PopupDIV").dialog({
    closeText: "",
    show: { effect: "fade", duration: 500 },
    hide: { effect: "fade", duration: 100 },
  });
});
