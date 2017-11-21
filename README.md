# Custom Node Libraries

###### Simple plug-and-use libraries that use reference node modules

##  ArrowLib

###### Makes node operations with any Appcelerator ArrowDB solution easy

**Initialize**
```
var arrowLib = require('./lib/arrowLib');
var arrowApiKey = 'mykey';
arrowLib.initialize(arrowApiKey);
```

**Example: login**
```
arrowLib.userLogin({
    login: 'myemail',
    password: 'mypassword'
    }, function(){
        console.log("callback called on success");
});
```

**Example: query all custom objects (multiple requests since limit is 1000)**
```
var queryOptions = {
    classname: 'object_classname',
    where: {} //required
};

arrowLib.queryAllCustomObjects(queryOptions,[],function(response)
{
    console.log(JSON.stringify(response)); //all custom objects of the specified classname
});
```

## Email

###### Send an email in node in 2 easy steps

**Set up transporter**
```
var Email = new EmailSender();

var email = 'suport@mycompany.com';
var password = 'aGoodPassword';

Email.setTransporter({
    service: 'Gmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: email,
        pass: password
    }
});
```
**Send email**
```
Email.sendEmail({
    to: 'me@companyname.com',
    subject: 'Default subject',
    html:
        '<p>My friend,</p>' +
        '<p>How are you today?</p>' + 
        '<p>Hope to hear from you soon,</p>' + 
        '<p>Your standard node dev</p>' + 
        '<p><b>This is an automatic email</b></p>',

    // An array of attachments
    attachments: [
        // Excel attachment
        {
            filename: 'progress_report.xlsx',
            path: filePath
        }
    ]
  }, function() //callback on success
   {
       //Deletes file if success
       FileSystem.unlink(filePath,function(error)
       {
            if (error)
            {
                return console.log(err);    
            }

            console.log('File deleted successfully.');
       });  
});
```

## Excel Generator

###### Generates a simple Excel worksheet with column names

**Create an Excel workbook with a single sheet**
```
var ExcelGenerator = require('./lib/excelGenerator');
var Excel = new ExcelGenerator();

Excel.addSheet({ //Allows creation of multiple sheets (just keep add more before saving)
    worksheetName:"My Worksheet", //Sheet name
    worksheetOptions: { //Formatting and other options
        sheetFormat:{
            baseColWidth: 35    
        }    
     },
    columnNames: ["Column 1","Column 2","Column 3"],
    data: [ ["Line 1 Column 1","Line 1 Column 2","Line 1 Column 3"], ["Line 2 Column 1","Line 2 Column 2","Line 2 Column 3"], ["Line 3 Column 1","Line 3 Column 2","Line 3 Column 3"]
});    


Excel.saveFile("My Excel File",function()
{
    console.log("Saved!");
});
```

## Utils

###### Random utility stuff

**Date to String**

```
var Utils = require('./lib/utils');

//receives a date in string format and turns it into a date in dd/MM/yyyy hh:mm:ss
var formattedDate = Utils.dateToString(dateString); 
console.log(formattedDate);
```
