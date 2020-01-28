function updateQRCode(row, href) {
  document.getElementById(row + ":QR-a").href = href;
  document.getElementById(row + ":QR-img").src =
    "https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=" +
    encodeURIComponent(href);
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
