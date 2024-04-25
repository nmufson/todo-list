export class Todo {
    constructor(name,description,dueDate,priority,project) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.complete = 'no';
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


