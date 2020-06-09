function startTime() {
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
  
    var n = weekday[d.getDay()];



    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTimeFormat(m);
    s = checkTimeFormat(s);
    if(h >= 5 && h <= 12){

        document.querySelector('#time').innerHTML = n + " : " + h + " : " + m + " : " + s + `<i class="fa fa-sun-o"></i>`;
        var t = setTimeout(startTime, 500);
    }else if(h >= 12 && h <= 19){
        document.querySelector('#time').innerHTML = n + " : " + h + " : " + m + " : " + s + `<i class="fa fa-sun-o"></i>`;
        var t = setTimeout(startTime, 500);
    }else if(h >19 && h < 5){
        document.querySelector('#time').innerHTML = n + " : " + h + " : " + m + " : " + s + `<i class="fa fa-moon-o"></i>`;
        var t = setTimeout(startTime, 500);
    }
  }
  function checkTimeFormat(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }
