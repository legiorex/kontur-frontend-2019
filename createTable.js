function maxColumn(wightDefault, value, array) {
    const wightValue = [];
    switch (value) {
        case "user":
            array.map(obj => {
                wightValue.push(obj.user.length);
            });
            break;

        case "date":
            array.map(obj => {
                wightValue.push(obj.date.length);
            });
            break;
        case "comment":
            array.map(obj => {
                wightValue.push(obj.comment.length);
            });
            break;
        case "fileName":
            array.map(obj => {
                wightValue.push(obj.fileName.length);
            });
            break;
    }
    return Math.max(...wightValue) > wightDefault ? wightDefault : Math.max(...wightValue);
}

function createLine(stringValue, wightDefault, wightAuto) {
    if (stringValue === "") {
        stringValue = `    `;
    }

    if (stringValue.length > wightDefault) {

        return stringValue.slice(0, wightDefault - 3).padEnd(wightDefault, ".");

    } else {

        return stringValue.padEnd(wightAuto);
    }
}

function createTable(array) {

    const lineArray = array.map(obj => {

        let { user, date, comment, fileName, importance } = obj;

        if (importance === '') {
            importance = ` `
        } else if (importance.match(/!*/g)[0]) {
            importance = "!";
        }

        const strUser = createLine(user, 10, maxColumn(10, "user", array));
        const strDate = createLine(date, 10, maxColumn(10, "date", array));
        const strComment = createLine(comment, 50, maxColumn(50, "comment", array));
        const strFileName = createLine(fileName, 15, maxColumn(15, "fileName", array));
        const strImportance = createLine(importance, 1);

        const result = `  ${strImportance}  |  ${strUser}  |  ${strDate}  |  ${strComment}  |  ${strFileName}  `;

        return result;
    })

    return lineArray;
}
module.exports = {
  createTable
};