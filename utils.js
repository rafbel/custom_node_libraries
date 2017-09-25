function dateToString(dateString)
{
    var date = new Date(dateString);

    var month = date.getMonth() + 1;
    if (month < 10) {month = "0" + month;}

    var hours = date.getHours();
    if (hours < 10) {hours = "0" + hours;}

    var mins = date.getMinutes();
    if (mins < 10){mins = "0" + mins;}

    var secs = date.getSeconds();
    if (secs < 10){secs = "0" + secs;}

    return (date.getDate() + "/" + month  + "/" + date.getFullYear() + " " + hours + ":" + mins + ":" + secs);
    
}

exports.dateToString = dateToString;