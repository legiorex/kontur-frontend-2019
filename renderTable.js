const { createTable } = require("./createTable"); // Создает таблицу с нужной шириной колонок
function renderTable(array) {

    const header = { user: "user", date: "date", comment: "comment", fileName: "fileName", importance: "!" };

    array.unshift(header);
    const stringLength = createTable(array)[0].length;

    const symbol = "";
    const separator = symbol.padEnd(stringLength, "-");


    const table = createTable(array);
    table.splice(1, 0, separator)


    if (table[2] !== void 0) {
        table.push(separator);
    }

    const bodyString = table.join("\n");

    const result = `${bodyString}`;
    console.log(result);
    array.shift()
    return result;
}
module.exports = {
  renderTable
};