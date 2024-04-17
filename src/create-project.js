//starts with just our general project
//edit project, change complete status 
//delete todo
//move todo from one project to another 


export class Project {
    constructor(title) {
        this.title = title;
        this.todoArray = [];
    }

    editProjectName = (newName) => {
        this.title = newName;
    }

    addTodo = (todo) => {
        this.todoArray.push(todo);
    }

    deleteTodo = (todo) => {
        const indexToRemove = this.indexOf(todo);
        this.splice(indexToRemove,1);
    }

    moveTodo = (todo,targetProject) => {
        this.deleteTodo(todo);
        targetProject.push(todo);
    }
}