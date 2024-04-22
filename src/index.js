

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
const otherProject = new Project('OtherProject');
const sampleTodo = new Todo('Clean','sweep the floor',19990810,'high','general');
const todo1 = new Todo('Cook','make spaghetti',19990810,'high','general');
const todo2 = new Todo('Exercise','lift weights at Crunch',19990810,'high','general');
const todo3 = new Todo('Spanish','practice spanish on youtube',19990810,'high','general');
const todo4 = new Todo('Da Livy un besito','Livy es muy bonita',19990810,'high','OtherProject');



otherProject.addTodo(sampleTodo);
generalProject.addTodo(todo1);
generalProject.addTodo(todo2);
generalProject.addTodo(todo3);
otherProject.addTodo(todo4);


const testDate = format(new Date(2014, 1, 11), "yyyy-MM-dd");

export const start = () => {
    const projectArray = [generalProject, otherProject];

    return projectArray;
}

const load = loadPage();

load.loadProjects();
load.loadTodoItems();







