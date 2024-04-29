import { parseISO, format } from 'date-fns';
import { addNewTodoFuncContainer } from './add-new-todo-dom';
import { deleteTodoFuncContainer } from './delete-todo-dom';
import { editFuncContainer } from './edit-todo-dom';
import { listenerFlags, loadProjectsModule } from './load-projects';
import { Project } from './project';
import { Todo } from './create-todo';

export const loadTodoFuncContainer = (projectArray,projectsObject,mainTodoArray) => {
    const makeDiv = (todo) => {
        const todoListDivContainer = document.querySelector('#todo-list-container');
        const todoDiv = document.createElement('div');
        const middleDiv = document.createElement('div');
        const topDiv = document.createElement('div');
        const topLeftDiv = document.createElement('div');
        const bottomDiv = document.createElement('div');
        const bottomLeftDiv = document.createElement('div');
        const checkBoxDiv = document.createElement('div');
        const topRightDiv = document.createElement('div');
        const iconDiv = document.createElement('div');
        const dueDateDiv = document.createElement('div');
        const priorityDiv = document.createElement('div');
        
        const nameH3 = document.createElement('h3');
        const descriptionPara = document.createElement('p');
        const dueDatePara = document.createElement('p');
        const priorityPara = document.createElement('p');

        const checkBoxIcon = document.createElement('img');
        const editIcon = document.createElement('img');
        const deleteIcon = document.createElement('img');
        const xMarkIcon = document.createElement('img');
    
        todoDiv.classList.add('todo-item');
        checkBoxDiv.classList.add('check-box-div');
        middleDiv.classList.add('middle-div');
        topDiv.classList.add('top-div');
        topLeftDiv.classList.add('top-left-div');
        topRightDiv.classList.add('top-right-div');
        bottomDiv.classList.add('bottom-div');
        bottomLeftDiv.classList.add('bottom-left-div');
        dueDateDiv.classList.add('due-date-div');
        priorityDiv.classList.add('priority-div');
        iconDiv.classList.add('icon-div');
        checkBoxIcon.classList.add('check-box-icon');
        nameH3.classList.add('name-h3');
        descriptionPara.classList.add('description-para');
        dueDatePara.classList.add('due-date-para');
        priorityPara.classList.add('priority-para');
        editIcon.classList.add('edit-icon');
        deleteIcon.classList.add('delete-icon');
        
        todoListDivContainer.appendChild(todoDiv);
        todoDiv.appendChild(checkBoxDiv);
        todoDiv.appendChild(middleDiv);
        todoDiv.appendChild(iconDiv);
        checkBoxDiv.appendChild(checkBoxIcon);
        middleDiv.appendChild(topDiv);
        middleDiv.appendChild(bottomDiv);
        topDiv.appendChild(topLeftDiv);
        topDiv.appendChild(topRightDiv);
        topLeftDiv.appendChild(nameH3);
        bottomDiv.appendChild(bottomLeftDiv);
        bottomLeftDiv.appendChild(descriptionPara);
        topRightDiv.appendChild(dueDateDiv);
        topRightDiv.appendChild(priorityDiv);
        dueDateDiv.appendChild(dueDatePara);
        priorityDiv.appendChild(priorityPara);
        iconDiv.appendChild(editIcon);
        iconDiv.appendChild(deleteIcon);

        if ((todo.description).length > 30) {
            descriptionPara.textContent = (todo.description).slice(0,30) + '...';
        } else {
            descriptionPara.textContent = todo.description;
        }
    
        if (todo.priority) {
            priorityPara.textContent = `${todo.priority} priority`;
        }
        nameH3.textContent = todo.name;

        //will come back to this after finishing add task functionality 
        const date = todo.dueDate;
        if (date) {
            const newDate = new Date(date.slice(0,4),date.slice(5,7)-1,date.slice(8,10));
            dueDatePara.textContent = format(newDate, 'MMM dd');
        }
        
        checkBoxIcon.setAttribute('src', '../src/icons/square.svg');
        editIcon.setAttribute('src', '../src/icons/pencil.svg');
        deleteIcon.setAttribute('src','../src/icons/delete.svg');

        todoDiv.addEventListener('click', (event) => expandTodo(event,todoDiv))
    }

    const expandTodo = (event,todoDiv) => {
        const element = event.target;
        
        if (element.className === 'check-box-icon') return;
        if (element.className === 'xMark-icon') return;
        if (element.className === 'edit-icon') return;
        if (element.className === 'delete-icon') return;
        if (element.textContent === 'Save') return;
        if (element.textContent === 'Cancel') return;
        
        if (!listenerFlags.expandTodoShouldRun) return;
        loadProjectsModule().turnFlagsFalse();

        
        const expandDivCheck = document.querySelector('.expand-todo');
        console.log(element.className);
        
        if (expandDivCheck) {
            expandDivCheck.remove();
        }

        const contentArea = document.querySelector('#content-area');
        const todoNodeList = document.querySelectorAll('.todo-item');
        const todoArray = Array.from(todoNodeList);
        const indexTodo = todoArray.indexOf(todoDiv);

        const projectDivNodeList = document.querySelectorAll('.project-item');
        const projectDivArray = Array.from(projectDivNodeList);
        const currentProjectDiv = document.querySelector('#selected-project-div');
        const indexProject = projectDivArray.indexOf(currentProjectDiv);
        const currentProject = projectArray[indexProject];

        const todo = currentProject.todoArray[indexTodo];
        
        const div = document.createElement('div');
        const topDiv = document.createElement('div');
        const leftDiv = document.createElement('div');
        const rightDiv = document.createElement('div');
        const dueDateDiv = document.createElement('div');
        const priorityDiv = document.createElement('div');

        const deleteIcon = document.createElement('img');
        const closeIcon = document.createElement('img');

        const namePara = document.createElement('p');
        const descriptionPara = document.createElement('p');

        const dueDatePara =  document.createElement('p');
        const dueDate = document.createElement('input');

        dueDate.setAttribute('type','date');

        const priorityPara = document.createElement('p');
        const priorityInput = document.createElement('select');

        editFuncContainer(projectArray,projectsObject,mainTodoArray).generatePriorityInput(priorityInput);

        contentArea.appendChild(div);
        div.appendChild(topDiv);
        div.appendChild(leftDiv);
        div.appendChild(rightDiv);

        topDiv.appendChild(deleteIcon);
        topDiv.appendChild(closeIcon);

        leftDiv.appendChild(namePara);
        leftDiv.appendChild(descriptionPara);

        rightDiv.appendChild(dueDateDiv);
        rightDiv.appendChild(priorityDiv);

        dueDateDiv.appendChild(dueDatePara);
        dueDateDiv.appendChild(dueDate);

        priorityDiv.appendChild(priorityPara);
        priorityDiv.appendChild(priorityInput);
        

        namePara.textContent = todo.name;
        descriptionPara.textContent = todo.description;
        dueDatePara.textContent = 'Due date'
        dueDate.value = todo.dueDate;
        priorityInput.value = todo.priority;
        priorityPara.textContent = 'Priority';

        topDiv.classList.add('top-div-expand');
        leftDiv.classList.add('left-div-expand');
        rightDiv.classList.add('right-div-expand');
        div.classList.add('expand-todo');
        deleteIcon.setAttribute('src','../src/icons/delete.svg');
        closeIcon.setAttribute('src','../src/icons/x-mark.svg');

        const buttonDiv = document.createElement('div');
        const saveButton = document.createElement('button');
        const cancelButton = document.createElement('button');
        saveButton.textContent = 'Save';
        cancelButton.textContent = 'Cancel';

        closeIcon.addEventListener('click', () => {
            div.remove();
            loadProjectsModule().turnFlagsTrue();
            loadTodoItemOuter();
        })

        deleteIcon.addEventListener('click', () => {
            listenerFlags.deleteIconShouldRun = true;
            deleteTodoFuncContainer(projectArray,projectsObject,mainTodoArray).confirmDeletePopUp(event);
        })

        dueDate.addEventListener('change', () => {
            todo.dueDate = dueDate.value;
        })

        priorityInput.addEventListener('change', () => {
            todo.priority = priorityInput.value;
        })

        


        const editNameDescription = () => {
            const nameInput = document.createElement('input');
            const descriptionInput = document.createElement('input');

            leftDiv.classList.add('edit');

            nameInput.setAttribute('type','text');
            descriptionInput.setAttribute('type','text');

            namePara.replaceWith(nameInput);
            descriptionPara.replaceWith(descriptionInput);

            leftDiv.appendChild(buttonDiv);
            buttonDiv.appendChild(saveButton);
            buttonDiv.appendChild(cancelButton);

            nameInput.value = todo.name;
            descriptionInput.value = todo.description;

            saveButton.addEventListener('click', () => {
                todo.name = nameInput.value;
                todo.description = descriptionInput.value;

                namePara.textContent = todo.name;
                descriptionPara.textContent = todo.description;

                nameInput.replaceWith(namePara);
                descriptionInput.replaceWith(descriptionPara);

                saveButton.remove();
                cancelButton.remove();
            })

            cancelButton.addEventListener('click', () => {
                saveButton.remove();
                cancelButton.remove();
                
                nameInput.replaceWith(namePara);
                descriptionInput.replaceWith(descriptionPara);
            })
        }

        namePara.addEventListener('click', editNameDescription);
        descriptionPara.addEventListener('click', editNameDescription);

    }

    const loadTodoItemOuter = () => {
        const todoListDivContainer = document.querySelector('#todo-list-container');
        todoListDivContainer.innerHTML = '';
    
        const projectDivNodeList = document.querySelectorAll('.project-item');
        const projectDivArray = Array.from(projectDivNodeList);
        const currentProjectDiv = document.querySelector('#selected-project-div');
        const index = projectDivArray.indexOf(currentProjectDiv);
        const currentProject = projectArray[index];


    
        const TodoList = currentProject.todoArray;
        TodoList.forEach((todo) => makeDiv(todo))
        addNewTodoFuncContainer(projectArray,projectsObject,mainTodoArray).loadAddNewTodoDiv();
        addDeleteIconListeners();
        addCheckBoxListeners();
        addEditIconListeners();
        loadXMarks();
        loadTodoFuncContainer(projectArray,projectsObject,mainTodoArray).populateStorage();
    }

    const addDeleteIconListeners = () => {
        const deleteIconNodeList = document.querySelectorAll('.delete-icon');
        deleteIconNodeList.forEach((icon) => {
            icon.addEventListener('click', deleteTodoFuncContainer(projectArray,projectsObject,mainTodoArray).confirmDeletePopUp)
        })
    }

    const addCheckBoxListeners = () => {
        const checkBoxIconNodeList = document.querySelectorAll('.check-box-icon');
        checkBoxIconNodeList.forEach((checkBoxIcon) => {
            checkBoxIcon.addEventListener('click', () => {
                alterCheckBox(checkBoxIcon,checkBoxIconNodeList);
                loadTodoFuncContainer(projectArray,projectsObject,mainTodoArray).populateStorage();
            });
        })
    }

    const addEditIconListeners = () => {
        const editIconNodeList = document.querySelectorAll('.edit-icon');
        editIconNodeList.forEach((editIcon) => {
            editIcon.addEventListener('click', () => editFuncContainer(projectArray,projectsObject,mainTodoArray).clickEditIcon(editIcon,editIconNodeList))
        })
    }

    const loadXMarks = () => {
        const checkBoxDivNodeList = document.querySelectorAll('.check-box-div');
        const checkBoxDivArray = Array.from(checkBoxDivNodeList);
        const checkBoxIconNodeList = document.querySelectorAll('.check-box-icon')
        const xMarkNodeList = document.querySelectorAll('.xMark-icon');
        const xMarkArray = Array.from(xMarkNodeList);
        xMarkArray.forEach((xMark) => xMark.remove());
        checkBoxDivArray.forEach((div) => {
            const index = checkBoxDivArray.indexOf(div);
            const currentProject = projectsObject.currentProject;
            const currentTodo = currentProject.todoArray[index];
            const status = currentTodo.complete;
            
            if (status === 'yes') {
                const xMarkIcon = document.createElement('img');
                xMarkIcon.classList.add('xMark-icon');
                xMarkIcon.setAttribute('src', '../src/icons/x-mark.svg')
                div.appendChild(xMarkIcon);
            }
            const xMark = div.querySelector('.xMark-icon');
            const checkBoxIcon = div.querySelector('.check-box-icon');
            if (xMark) {
                xMark.addEventListener('click',() => {
                    alterCheckBox(checkBoxIcon,checkBoxIconNodeList);
                    loadTodoFuncContainer(projectArray,projectsObject,mainTodoArray).populateStorage();
                })
            }
        })
        
    }

    const alterCheckBox = (checkBoxIcon,checkBoxIconNodeList) => {
        if (!listenerFlags.checkBoxShouldRun) return;
        const checkBoxIconArray = Array.from(checkBoxIconNodeList);
        const index = checkBoxIconArray.indexOf(checkBoxIcon);
        const currentProject = projectsObject.currentProject;
        const currentTodo = currentProject.todoArray[index];
        if (currentTodo.complete === 'no') {
            currentTodo.complete = 'yes';
        } else {
            currentTodo.complete = 'no'
        };
        loadXMarks();
    }

    

    const groupAllTodos = () => {
        const length = mainTodoArray.length;
        mainTodoArray.splice(0,length);
        projectArray.forEach((project) => {    
            const array = project.todoArray;
            array.forEach((todo) => {
                mainTodoArray.push(todo);
            })
        })
    }
    
    const populateStorage = () => {
        groupAllTodos();
    
        const sertializedTodos = JSON.stringify(mainTodoArray.map((todo) => ({
            todoName: todo.name,
            todoDescription: todo.description,
            todoDueDate: todo.dueDate,
            todoPriority: todo.priority,
            todoProject: todo.project,
            todoComplete: todo.complete
        })));

        localStorage.setItem('todos',sertializedTodos);

        const retrievedTodos = localStorage.getItem('todos');
        console.log(retrievedTodos);
    }

    const populateProjects = () => {
        groupAllTodos();

        const serializedProjects = JSON.stringify(projectArray.map((project) => ({
            projectName: project.name,
        })));

        localStorage.setItem('projects',serializedProjects);
        console.log(projectArray);
    }

    // const retrieveStorage = () => {
    //     if (!localStorage.getItem('projects')) return;
    //     if (!localStorage.getItem('todos')) return;

    //     const retrievedProjects = localStorage.getItem('projects');
    //     const retrievedTodos = localStorage.getItem('todos');

    //     //converts JSON strings into javascript objects 
    //     const projectsData = JSON.parse(retrievedProjects);
    //     const todosData = JSON.parse(retrievedTodos);

    //     projectsData.splice(0,1);

    //     projectArray = [];
        
    //     projectsData.forEach((project) => {
    //         if (project.projectName) {
    //         const projectInstance = new Project(project.projectName)
    //         projectArray.push(projectInstance);
    //         }
    //     });


    //     todosData.forEach((todo) => {
    //         if (todo.todoName) {
    //             console.log(todo.todoComplete);
    //             const todoInstance = new Todo(todo.todoName, 
    //                 todo.todoDescription, 
    //                 todo.todoDueDate,
    //                 todo.todoPriority,
    //                 todo.todoProject,
    //                 todo.todoComplete
    //             );
    //             //find which object in an array has a certain property
    //             const projectName = todoInstance.project;
    //             const projectInstance = projectArray.find((e) => e.name === projectName);
    //             projectInstance.todoArray.push(todoInstance);
    //         } 
    //     });
    // };

    return { makeDiv, loadTodoItemOuter, populateStorage,populateProjects};
}