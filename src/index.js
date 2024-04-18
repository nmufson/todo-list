

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

const generalProject = new Project('general');
const otherProject = new Project('OtherProject')
const sampleTodo = new Todo('Cook','make spaghetti',19990810,'high','general')
generalProject.addTodo(sampleTodo);
const testDate = format(new Date(2014, 1, 11), "yyyy-MM-dd");

export const start = () => {
    const projectArray = [generalProject, otherProject];

    return projectArray;
}

loadPage();


generalProject.moveTodo(sampleTodo,otherProject);

console.log(generalProject.todoArray);
console.log(otherProject.todoArray);
