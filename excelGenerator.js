/* 
*   @author: Rafael Bellotti 
*   @version: 1.1
*   @last_update: 19/09/2017 - 16:06
*   @changelog: Definição de opções da planilha
*/

/*
*Pattern type value must be one of darkDown, darkGray, darkGrid, darkHorizontal, darkTrellis, darkUp, darkVerical, gray0625, gray125, lightDown, lightGray, *lightGrid, lightHorizontal, lightTrellis, lightUp, lightVertical, mediumGray, none, solid
*/

var Excel4Node = require('excel4node');

function Excel()
{
    //Initializes the workbook
    var workbook = new Excel4Node.Workbook();
    
    var defaultDataStyle = {
        font: {
            color: "#000000",
            size: 12
        },
        numberFormat: '$#,##0.00; ($#,##0.00); -',
        alignment: {
            shrinkToFit: true,
            wrapText: true,
            vertical: 'center',
            horizontal: 'left'
        }
    };
    
    var defaultHeaderStyle = {
        font: {
            color: "#000000",
            size: 13
        },
        numberFormat: '$#,##0.00; ($#,##0.00); -',
        alignment: {
            shrinkToFit: true,
            wrapText: true,
            vertical: 'center',
            horizontal: 'left'
        },
        fill: {
            type: 'pattern',
            patternType: 'solid',
            fgColor: "#d4d4db"
        }
    };
    
    var defaultOptions = {};
    
    //Adds a worksheet to the created workbook
    //Data is added can only be written as string
    this.addSheet = function(_configuration)
    {
        var worksheetOptions = (typeof _configuration.worksheetOptions != 'undefined') ? _configuration.worksheetOptions : defaultOptions;
        
        var worksheet = workbook.addWorksheet(_configuration.worksheetName, worksheetOptions);
    
        var headerStyle = (typeof _configuration.headerStyle != 'undefined') ? workbook.createStyle(_configuration.headerStyle) : workbook.createStyle(defaultHeaderStyle);
        var dataStyle = (typeof _configuration.dataStyle != 'undefined') ? workbook.createStyle(_configuration.dataStyle) : workbook.createStyle(defaultDataStyle);
        
        //Writes the column names on the Excel sheet
        for (var i = 0; i < _configuration.columnNames.length; i++)
        {
            worksheet.cell(1,i + 1).string(_configuration.columnNames[i]).style(headerStyle);    
        }
        
        //Writes the data on the sheet
        for (var i = 0; i < _configuration.data.length; i++)
        {
            var j = 1;
            for (var key in _configuration.data[i])
            {
                
                var value = _configuration.data[i][key];
                
                if (_configuration.data[i].hasOwnProperty(key))
                {
                    value = _configuration.data[i][key];
                }

                worksheet.cell(i + 2,j).string(value).style(dataStyle); 
                
                j++;
            }
        }
    };
    
    //Saves the workbook with the file name as specified (extension is not to be provided in the parameter)
    this.saveFile = function(fileName,onSuccess)
    {
        var newFileName = fileName + ".xlsx";
        workbook.write(newFileName , function (error, stats) 
        {
            if (error) 
            {
                console.log("Error: " + error);
            }
            else
            {
                console.log("Excel file " + newFileName + " created.");
                onSuccess();
            }
        });
    };
}

module.exports = Excel;