var XLSX = require('xlsx');

//array de todos os sheets do workbook recebido

/// TODO
///     para todo worksheet que tiver pegar as suas chaves
///     retornar os valores dessa chave e de qual worksheet se trata
///     poder printar todas as chaves de uma dada chave


///////////Exemplo de testes para o modulo\\\\\\\\\\\

// //recebe em formato JSON o xls
// var w = getWorkbookAsJson('Programa de Excelência em Varejo.xlsx');
// // console.log(w);
// //recebe os nomes dos sheets
// var sheets = getWorksheetNameArray(workbook);
// // console.log(sheets);
// var user = w[sheets[0]];
// var supplychain = w[sheets[1]];
// // console.log(getAllKeys(supplychain));
// // console.log(getAllKeys(user));
// var o = getAllValues(user)
// // console.log(getAllValues(user));
// var q = getSpecifiedAttribute(user, 'Email');
// // console.log(getSpecifiedAttribute(user,'Email'));
// var s = getNumberOfColumns(user);
// var p = getNumberOfRows(user);
// console.log(getNumberOfInvalidValuesForAttribute(user, 'Nome do respondente', ['Teste']));

//*************Inicio Funções auxiliares*****************\\

///////////////////////////////////////
//
//  Função auxiliar que retorna o tipo
//  de uma variavel qualquer
//
///////////////////////////////////////
var toType = function (obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
} //toType

///////////////////////////////////////
//
//  Função que transforma um xls em
//  um objeto json.
//
///////////////////////////////////////
function to_json(workbook) {
    var result = {};
    workbook.SheetNames.forEach(function (sheetName) {
        var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        if (roa.length > 0) {
            result[sheetName] = roa;
        }
    });
    return result;
} //to_json

//*************Fim Funções auxiliares*****************\\

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////


//*************Inicio Funções exportadas pelo módulo*****************\\


/////////////////////////////////////////////////////////
//
//  Recebe o nome/path para o worbook que se deseja
//  Função que inicializa um workbook e retorna 
//  um objeto com dois atributos:
//  workbook: o workbook que se deseja analisar em formato json
//  worksheets: um vetor com os nomes de todos os worksheets
//  referentes a esse workbook
//
////////////////////////////////////////////////////////
function getWorkbookAsJson(workbookName) {
    var workbook = XLSX.readFile(workbookName);
    workbookAsJson = to_json(workbook);
    return workbookAsJson;
} //initializer


/*
* params: arquivo Excel.xls    
* returns: um array com arrays de informação de cada linha do arquivo
*/
function getWorkbookAsArray(workbookFile)
{
    var workbook = XLSX.readFile(workbookFile);
    
    var workbookArray = [];
    var worksheetArray = workbook['SheetNames'];
    
    for (var i = 0; i < worksheetArray.length; i++)
    {
        workbookArray.push(XLSX.utils.sheet_to_json(workbook.Sheets[worksheetArray[i]],{header:1}));
    }
    
    return workbookArray;                                        
    
}

/////////////////////////////////////////////////////////
//
//  Recebe um workbook.
//  Retorna uma lista de strings com os nomes dos
//  worksheets no workbook.
////////////////////////////////////////////////////////
function getWorksheetNameArray(workbook) {
    return workbook['SheetNames'];
}


/////////////////////////////////////////////////////////
//
//  Função que retorna um vetor com todas as chaves 
//  de um worksheet
//
////////////////////////////////////////////////////////
function getAllKeys(sheet) {
    var list = [];
    for (var j in sheet[0]) {
        var sub_key = j;
        var sub_val = sheet[j];
        list.push(sub_key);
    }
    return list.sort();
} //getAllKeys

/////////////////////////////////////////////////////////
//  
//  Recebe o worksheet que se deseja os valores
//  Função que retorna um array de objetos com todos
//  os valores do sheet em questão. Onde cada posição
//  do array possui um array de atributos do mesmo tipo
//
////////////////////////////////////////////////////////
function getAllValues(sheet) {
    var resultList = [];
    var keyList = getAllKeys(sheet);
    for (var j = 0; j < keyList.length; j++) {
        var tempList = [];
        var attribute = keyList[j];
        for (var i = 0; i < sheet.length; i++) {
            tempList.push(sheet[i][attribute]);
        }
        resultList.push(tempList);
    }
    return resultList;
} //getAllValues


/////////////////////////////////////////////////////////
//
//  Recebe um worksheet e o atributo que se deseja analisar.
//  Função que retorna um array com todos os valores de um
//  determinado atributo.
//
////////////////////////////////////////////////////////
function getSpecifiedAttribute(sheet, attributeName) {
    var resultList = [];
    var attribute = attributeName;
    for (var i = 0; i < sheet.length; i++) {
        resultList.push(sheet[i][attribute]);
    }
    return resultList;
} //getSpecifiedAttribute

/////////////////////////////////////////////////////////
//
//  Recebe um worksheet como parâmetro.
//  Retorna o número linhas em um worksheet
//  Não retorna a linha referente aos nomes dos atributos
//  
////////////////////////////////////////////////////////
function getNumberOfRows(sheet) {
    var keyList = getAllKeys(sheet);
    var attribute = keyList[0];
    var count = 0;
    for (var i = 0; i < sheet.length; i++) {
        if (sheet[i][attribute])
            count++;
    }
    return count;
} //getNumberOfRows

/////////////////////////////////////////////////////////
//
//  Recebe um worksheet como parâmetro.
//  Retorna o número de colunas em um worksheet
//  
////////////////////////////////////////////////////////
function getNumberOfColumns(sheet) {
    var count = 0;
    for (var j in sheet[0]) {
        var sub_key = j;
        var sub_val = sheet[j];
        count++;
    }
    return count;
} //getNumberOfRows

/////////////////////////////////////////////////////////
//
//  Recebe um worksheet e o atributo que se deseja analisar.
//  Função que retorna o número de atributos preenchidos
//  "válidos".
//
////////////////////////////////////////////////////////
function getNumberOfInvalidValuesForAttribute(sheet, attributeName, invalidValues) {
    var attribute = attributeName;
    var count = 0;
    var j = 0;
    while (j < invalidValues.length) {
        for (var i = 0; i < sheet.length; i++) {
            var temp = sheet[i][attribute];
            if (temp === invalidValues[j]){
                count++;
            }
        }
        j++;
    }
    return count;
} //getNumberOfValidValuesForAttribute

/////////////////////////////////////////////////////////
//
//  Recebe um worksheet e o valor que se procura encontrar
//  e em qual atributo procurar pelo valor.
//  Função que retorna o número de atributos com o valor
//  igual ao valor passado em "attributeValue".
//
////////////////////////////////////////////////////////
function getNumberOfAttributeEqualsTo(sheet, attributeName, attributeValue) {
    var attribute = attributeName;
    var count = 0;
    var j = 0;
    while (j < attributeValue.length) {
        for (var i = 0; i < sheet.length; i++) {
            var temp = sheet[i][attribute];
            if (temp === attributeValue[j]){
                count++;
            }
        }
        j++;
    }
    return count;
} //getNumberOfValidValuesForAttribute


//*************Fim Funções exportadas pelo módulo*****************\\

exports.getWorkbookAsArray = getWorkbookAsArray;
exports.getWorkbookAsJson = getWorkbookAsJson;
exports.getAllKeys = getAllKeys;
exports.getAllValues = getAllValues;
exports.getSpecifiedAttribute = getSpecifiedAttribute;
exports.getNumberOfRows = getNumberOfRows;
exports.getNumberOfColumns = getNumberOfColumns;
exports.getNumberOfInvalidValuesForAttribute = getNumberOfInvalidValuesForAttribute;
exports.getNumberOfAttributeEqualsTo = getNumberOfAttributeEqualsTo;
