

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


const checkBoxNodeList = document.querySelectorAll('.check-box-icon');
const checkBoxArray = Array.from(checkBoxNodeList);



const func = (event) => {
    const clickedElement = event.target;
    const index = checkBoxArray.indexOf(clickedElement);
    console.log(index);
}

checkBoxArray.forEach((box) => {
    box.addEventListener('click',func)
})

const editIconNodeList = document.querySelectorAll('.edit-icon');
const editIconArray = Array.from(editIconNodeList);

editIconArray[0].addEventListener('click', () => {
    checkBoxArray.forEach((box) => {
        box.removeEventListener('click',func)
    })
})

const projectUL = document.querySelector('#project-list');
projectUL.addEventListener('click', () => console.log(event.target));







