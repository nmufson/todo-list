//starts with just our general project
//edit project, change complete status 
//delete todo
//move todo from one project to another 


export class Project {
    constructor(name) {
        this.name = name;
        this.todoArray = [];
    };

    editProjectName = (newName) => {
        this.name = newName;
    };

    addTodo = (todo) => {
        this.todoArray.push(todo);
    };
    
    removeTodo = (todo) => {
        deleteTodo(this, todo);
    };
    
    moveTodo = (todo,newProject) => {
        deleteTodo(this,todo);
        newProject.todoArray.push(todo);
    }
}

