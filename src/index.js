

//creating new todo will be one module/object
//delete todo
//expand todo (DOM manipulation)
//creating new project will be one module/object
//edit project, change complete status 
//delete project 
//DOM manipulation will be separate module 

//page load should bring us to general todos (considered a project)
//with a side bar containing projects
import './style.css'
import { format } from 'date-fns';
import { Todo } from './create-todo.js'
import { Project } from './project.js'
import { loadPage } from './dom-manipulation.js';




// export const start = () => {
//     ;

//     return projectArray;
// }

const load = loadPage();







load.loadProjects();
load.loadTodoItems();













