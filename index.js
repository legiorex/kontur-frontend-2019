const { readLine } = require("./console");
const { createTodoObj } = require("./createTodoObj"); // Итоговый объект с задачами, с ним будут работать команды из консоли
const { renderTable } = require("./renderTable"); // Вывод таблицы в консоль

app();

function app() {  

  console.log("Please, write your command!");

  readLine(processCommand);
}

function show() {
    renderTable(createTodoObj);   
}

function important() {
    const arrayImp = createTodoObj.filter(obj => {
        return obj.importance !== '';
    });
    
    renderTable(arrayImp);
}

function filterUser(command) {
       
    const userSearch = command.replace(/user/gi, '').trim();   
    
    switch (userSearch) {
      case "":
        console.log("Please, write user name");
        break;

      default:
        filter();
        break;
    }
        
    function filter() {
        
        const arrayUser = createTodoObj.filter(obj => {
            
            const arrayUserName = obj.user.split(" ");
            
            
            let stringName = "";
            return arrayUserName.some(item => {                
                stringName = item;
                return stringName.trim().toLowerCase().startsWith(userSearch.toLowerCase());                
            })
        })

        renderTable(arrayUser);  
    }   
    
}

function filterDate(date) {
    
    const clearDate = date.replace(/date/gi, '').trim();
    
    function checkDate(clearDate) {
        const reg = /(19|20)\d\d((-((0[1-9]|1[012]))?(-(0[1-9]|[12]\d)|(0[13-9]|1[012])-30|(0[13578]|1[02])-31)?)?)/gi;
        return clearDate.match(reg) ? clearDate.match(reg)[0].toLowerCase() : null;
    }
    
    switch (clearDate) {
        case checkDate(clearDate):
        filter();
        break;

      default:
            console.log('Please enter a valid date.');
        break;
    }

    
    function filter() {
        const getDate = Date.parse(date.split(" "));
        
        const arrayFilterDate = createTodoObj.filter(obj => {
            return Date.parse(obj.date) >= getDate;
        })

        const compare = (a, b) => {
            if (a.date < b.date) return -1;
            if (a.date > b.date) return 1;
            return 0;
        };
        arrayFilterDate.sort(compare);

        renderTable(arrayFilterDate);   
    }
       
}

function sortImportance() {
    
    const compare = (a, b) => {
        if (a.importance < b.importance) return 1;
        if (a.importance > b.importance) return -1;
        return 0;
    }    
    createTodoObj.sort(compare);
    renderTable(createTodoObj);    
}

function sortDate() {
    const compare = (a, b) => {
        if (a.date < b.date) return 1;
        if (a.date > b.date) return -1;
        return 0;
    }
    createTodoObj.sort(compare);
    renderTable(createTodoObj);   
}

function sortUser() {

    const compare = (a, b) => {
        
        if (b.user === '') return -1;
        if (a.user === '') return 1;
        if (a.user.toLowerCase() < b.user.toLowerCase()) return -1;        
        if (a.user.toLowerCase() > b.user.toLowerCase()) return 1;
        return 0;
    }
    createTodoObj.sort(compare);
    renderTable(createTodoObj);
}

function processCommand (command) {

    const user = () => (command.match(/user.*/gi) ? command.match(/user.*/gi)[0].toLowerCase() : null);
    
    
    const date = command => (command.match(/date.*/gi) ? command.match(/date.*/gi)[0].toLowerCase() : null);

    switch (command.toLowerCase()) {
      case "exit":
        process.exit(0);
        break;

      case "show":
        show();
        break;

      case "important":
        important();
        break;

      case user():
        filterUser(command);
        break;

      case date(command):
        filterDate(command);
        break;        

      case "sort importance":
        sortImportance();
        break;

      case "sort date":
        sortDate();
        break;

      case "sort user":
        sortUser();
        break;
        

      default:
        console.log("wrong command");
        break;
    }
}
// TODO you can do it!