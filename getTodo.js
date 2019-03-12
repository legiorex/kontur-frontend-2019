const { getAllFilePathsWithExtension, readFile } = require('./fileSystem');

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');

    return filePaths.map(path => readFile(path));
}

getFiles();

const getTodo = () => {

    const arrayFilePaths = getAllFilePathsWithExtension(process.cwd(), "js");

    const arrayString = getFiles().map(item => {

        return item.split(/\n/);
    });
    

    const arrayTodo = arrayString.map(item => {

        return item.filter(string => string.match(/\/\/\sTODO/gi));

    });
    
    const clearArray = arrayTodo.map(item => {

        return item.map(string => string.replace(/.+TODO/gi, "TODO"));

    })

    const addFilePaths = clearArray.map((item, index) => {

        return item.concat(arrayFilePaths[index]);
    });


    const addFileName = addFilePaths.map(item => {

        return item.map(string => {

            const fileName = item[item.length - 1].match(/\/(.+)+js/g);

            return string + fileName[0];
        });
    });


    const delLastItem = addFileName.map(item => {
        item.pop()
        return item;
    })


    const resultArray = delLastItem.reduce((a, b) => {
        return a.concat(b);
    });


    return resultArray;

}
module.exports = {
    resultArray: getTodo()
};
