export class Todo {
    constructor(name,description,dueDate,priority,project) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }

    editTodo = (property,newValue) => {
        this[property] = newValue;
    }
}


