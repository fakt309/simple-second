//------------------------------------------------
//Valdimir Gaidadei
//Version 0.1.0
//You can use, change as you want for any purpose.
//------------------------------------------------

function Ss(str) {
  if (typeof str == "undefined") {
    this.timestamp = Math.round((1000/864)*(Date.now()-2*60*60*1000)+((1492*365+477*366)*100000000));
    return this;
  } else if (typeof str == "number") {
    this.timestamp = str;
    return this;
  } else if (typeof str == "string") {
    if (/^(\-|\+)?(\d|now)*-(\d|now)*-(\d|now)* ((\d+(\.\d*)?)|now)$/g.test(str)) {
      var sign = 1;
      if (str.substr(0, 1) == "-") {
        sign = -1;
        str = str.slice(1);
      } else if (str.substr(0, 1) == "+") {
        str = str.slice(1);
      }
      var p = str.split(" ");
      var l = p[0].split("-");
      var r = p[1];

      var y = 0;
      if (l[0] == "now") {
        y = new Ss().getYear();
      } else {
        y = parseInt(l[0]);
      }
      var m = 0;
      if (l[1] == "now") {
        m = new Ss().getMonth();
      } else {
        m = parseInt(l[1]);
      }
      var d = 0;
      if (l[2] == "now") {
        d = new Ss().getDay();
      } else {
        d = parseInt(l[2]);
      }
      var t = 0;
      if (r == "now") {
        t = new Ss().getTime();
      } else {
        t = parseFloat(r);
      }

      if (m > 5 || (m > 4 && ((y%4 != 0 || y%100 == 0) && (y%400 != 0))) || (m == 5 && d != 0) || d > 72 || t > 99999) {
        this.timestamp = null;
        console.error("There can be no such date, please check if your date is correct.");
        return false;
      }

      var currDays = 0;
      for (var i = 0; i < y; i++) {
        if ((i%4 == 0 && i%100 != 0) || (i%400 == 0)) {
          currDays += 366;
        } else {
          currDays += 365;
        }
      }

      this.timestamp = sign*((currDays+m*73+d)*100000+t)*1000;
      return this;
    } else {
      this.timestamp = null;
      console.error("The line must strictly match the format yyyy-mm-dd t for example +2020-3-62 30234.234");
      return false;
    }
  }
}
Ss.prototype.getYear = function() {
  var ts = this.timestamp;
  var sign = 1;
  if (ts < 0) {
    sign = -1;
    ts = -1*ts;
  }
  for (var t = 0; 1; t++) {
    if ((t%4 == 0 && t%100 != 0) || (t%400 == 0)) {
      ts -= 366*(100000*1000);
    } else {
      ts -= 365*(100000*1000);
    }

    if (ts < 0) {
      return sign*t;
      break;
    }
  }
}
Ss.prototype.getMonth = function() {
  var ts = this.timestamp;
  var sign = 1;
  if (ts < 0) {
    sign = -1;
    ts = -1*ts;
  }
  for (var t = 0; 1; t++) {
    if ((t%4 == 0 && t%100 != 0) || (t%400 == 0)) {
      if (ts-366*(100000*1000) < 0) {
        return sign*(parseInt(parseInt(ts/(100000*1000))/73));
        break;
      } else {
        ts -= 366*(100000*1000);
      }
    } else {
      if (ts-365*(100000*1000) < 0) {
        return sign*(parseInt(parseInt(ts/(100000*1000))/73));
        break;
      } else {
        ts -= 365*(100000*1000);
      }
    }
  }
}
Ss.prototype.getDay = function() {
  var ts = this.timestamp;
  var sign = 1;
  if (ts < 0) {
    sign = -1;
    ts = -1*ts;
  }
  for (var t = 0; 1; t++) {
    if ((t%4 == 0 && t%100 != 0) || (t%400 == 0)) {
      if (ts-366*(100000*1000) < 0) {
        return sign*(parseInt(ts/(100000*1000))%73);
        break;
      } else {
        ts -= 366*(100000*1000);
      }
    } else {
      if (ts-365*(100000*1000) < 0) {
        return sign*(parseInt(ts/(100000*1000))%73);
        break;
      } else {
        ts -= 365*(100000*1000);
      }
    }
  }
}
Ss.prototype.getTime = function() {
  var ts = this.timestamp;
  var sign = 1;
  if (ts < 0) {
    sign = -1;
    ts = -1*ts;
  }
  return sign*((ts%(100000*1000))/1000);
}
Ss.prototype.get = function() {
  var sign = "";
  if (this.timestamp < 0) {
    sign = "-";
  }
  var y = this.getYear();
  var m = this.getMonth();
  var d = this.getDay();
  var t = this.getTime();
  if (y < 0) { y = -1*y; }
  if (m < 0) { m = -1*m; }
  if (d < 0) { d = -1*d; }
  if (t < 0) { t = -1*t; }
  return sign+y+"-"+m+"-"+d+" "+t;
}
Ss.prototype.add = function(date) {
  return new Ss(this.timestamp+date.timestamp);
}
Ss.prototype.subtract = function(date) {
  return new Ss(this.timestamp-date.timestamp);
}
