
function updateQRCode(row,href){
	document.getElementById(row+":QR-a").href = href;
	document.getElementById(row+":QR-img").src = "https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl="+encodeURIComponent(href);

}

function loadMemberId(id) {
	window.location.search = "?memberId=" + id;
}