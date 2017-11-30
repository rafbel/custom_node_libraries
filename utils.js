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

function getSquareRoot(x)
{
    var s = 0;
    var e = x;
    
    var precision = 0.00001;
    
    var m = (s + e)/2;
    
    while (precision < (e - s))
    {
        m = (s + e)/2;
        
        if (Math.pow(m,2) > x)
        {
            e = m;
        }
        else
        {
            s = m;
        }
        
    }
    
    return m;
}


exports.dateToString = dateToString;
exports.getSquareRoot = getSquareRoot;
