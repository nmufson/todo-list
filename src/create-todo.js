export class Todo {
    constructor(name,description,dueDate,priority,project,complete = 'no') {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.complete = complete;
    }

    editTodo = (object) => {
        const entries = Object.entries(object);
        entries.forEach((entry) => {
            const key = entry[0];
            const value = entry[1];
            this[key] = value;
    })
    }

    changeCompleteStatus = () => {
        if (this.complete === 'no') {
            this.complete = 'yes';
        } else {
            this.complete = 'no';
        }
        
    }
}


