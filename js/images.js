function changeImage() {
  var URL = $("input[name='1:5']").val();
    $("#1.6").attr("src","https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=" + URL );
}

