

export class Todo {
    constructor(title,description,dueDate,priority,project = currentProject) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }

    editTodo = (property,newValue) => {
        this[property] = newValue;
    }
}



