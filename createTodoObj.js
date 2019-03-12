const { resultArray } = require("./getTodo");

const createObj = () => {

    return resultArray.map(item => {

        const fileName = item.match(/[^/]*$/g);


        const commentString = item.match(/[^TODO].*\//g);


        const commentArray = commentString[0].split(";", 3).reverse();

        const comment = commentArray[0].replace('/', '').trim();

        const importanceArray = comment.match(/\!*/g);
        const importance = importanceArray.reduce((a, b) => {
            return a + b;
        }, "");


        return {
            user: commentArray[2] === void 0 ? '' : commentArray[2].trim(),
            date: commentArray[1] === void 0 ? '' : commentArray[1].trim(),
            comment: comment,
            fileName: fileName[0],
            importance: importance
        }
    });
}
module.exports = {
  createTodoObj: createObj()
};