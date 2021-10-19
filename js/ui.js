function updateQRCode(row, href) {
  if (row != null) {
    document.getElementById(row + ":QR-a").href = href;
    document.getElementById(row + ":QR-img").src =
      "https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=" +
      encodeURIComponent(href);
    console.debug("updated QR-Code");
  }
}

function loadMemberId(id) {
  window.location.search = "?memberId=" + id;
}

function populateSelect(myArray, selectName, defaultSelection) {
  // Get dropdown element from DOM
  var sel = document.getElementById(selectName);
  // Loop through the array
  for (var i = 0; i < myArray.length; ++i) {
    // Append the element to the end of Array list
    var opt = document.createElement("option");
    opt.innerHTML = myArray[i];
    opt.value = myArray[i];
    sel.appendChild(opt);
  }
  if (typeof defaultSelection !== "undefined") {
    sel.value = defaultSelection;
  }
}

function clearTable() {
  for (var row = 0; row < 2; row++) {
    for (var column = 0; column < 10; column++) {
      document.getElementById(row + ":" + column).value = "";
    }
  }
}
