var XLSX = require('xlsx');


var workbook = XLSX.readFile('Programa de Excelência em Varejo.xlsx');
//array de todos os sheets do workbook recebido
worksheetArray = workbook['SheetNames'];
/// TODO
///     para todo worksheet que tiver pegar as suas chaves
///     retornar os valores dessa chave e de qual worksheet se trata
///     poder printar todas as chaves de uma dada chave


///////////main stuff\\\\\\\\\\\

//recebe em formato JSON o xls
var w = getWorkbookAsJson('Programa de Excelência em Varejo.xlsx');
// console.log(w);
//recebe os nomes dos sheets
var sheets = getWorksheetNameArray(workbook);
// console.log(sheets);
var user = w[sheets[0]];
var supplychain = w[sheets[1]];
// console.log(getAllKeys(supplychain));
// console.log(getAllKeys(user));
var o = getAllValues(user)
// console.log(getAllValues(user));

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
    var keyList = getAllKeys(sheet);
    //console.log(keyList);
    console.log(keyList.length);
    for (var j = 0; j < keyList.length; j++) {
        var atribute = keyList[j];
        for (i = 0; i < sheet.length; i++) {
            // console.log(keyList[i]);
            console.log(sheet[i]);
            //.keyList[i]
        }
    }
    // return list.sort();
} //getAllValues

/////////////////////////////////////////////////////////
//
//  Recebe um worksheet como parâmetro
//  Função que retorna um array com os pares chave-valor
//  para cada item no worksheet
//
////////////////////////////////////////////////////////
function getAllPairKeyValue(sheet) {

} //getAllPairKeyValue

/////////////////////////////////////////////////////////
//
//  Recebe um worksheet e o atributo que se deseja analisar.
//  Função que retorna um array com todos os valores de um
//  determinado atributo.
//
////////////////////////////////////////////////////////
function getSpecifiedAttribute(sheet, atributeName) {

} //getSpecifiedAttribute

/////////////////////////////////////////////////////////
//
//  Recebe um worksheet como parâmetro.
//  Retorna o número linhas em um worksheet
//  
////////////////////////////////////////////////////////
function getNumberOfRows(sheet) {

} //getNumberOfRows

/////////////////////////////////////////////////////////
//
//  Recebe um worksheet como parâmetro.
//  Retorna o número de colunas em um worksheet
//  
////////////////////////////////////////////////////////
function getNumberOfColumns(sheet) {

} //getNumberOfRows

/////////////////////////////////////////////////////////
//
//  Recebe um worksheet e o atributo que se deseja analisar.
//  Função que retorna o número de atributos preenchidos
//  "válidos".
//
////////////////////////////////////////////////////////
function getNumberOfValidValuesForAttribute(sheet, attributeName) {

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

} //getNumberOfValidValuesForAttribute

/////////////////////////////////////////////////////////
//
//  Recebe um worksheet e o atributo que será analisado.  
//  Função que retorna o número de linhas não preenchidos
//
////////////////////////////////////////////////////////
function getNumberOfUnfilledValuesForAttribute(sheet, attributeName) {

} //getNumberOfUnfilledValuesForAttribute





//*************Fim Funções exportadas pelo módulo*****************\\

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////


exports.getWorkbookAsJson = getWorkbookAsJson;
exports.getAllKeys = getAllKeys;
exports.getAllValues = getAllValues;
exports.getAllPairKeyValue = getAllPairKeyValue;
exports.getSpecifiedAttribute = getSpecifiedAttribute;
exports.getNumberOfRows = getNumberOfRows;
exports.getNumberOfColumns = getNumberOfColumns;
exports.getNumberOfValidValuesForAttribute = getNumberOfValidValuesForAttribute;
exports.getNumberOfAttributeEqualsTo = getNumberOfAttributeEqualsTo;
exports.getNumberOfUnfilledValuesForAttribute = getNumberOfUnfilledValuesForAttribute;
