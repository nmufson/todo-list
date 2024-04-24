
import { makeTodoDiv } from "./make-todo-div.js";
import { loadProjectsModule } from "./load-projects.js";
import { Project } from './project.js';
import { Todo } from './create-todo.js';




export const loadPage = () => {
    const contentArea = document.createElement('div');
    const projectBar = document.createElement('div');
    const todoListDivContainer = document.createElement('div');
    contentArea.id = 'content-area';
    projectBar.id = 'project-bar';
    todoListDivContainer.id = 'todo-list-container';

    document.body.appendChild(projectBar);
    document.body.appendChild(contentArea);
    contentArea.appendChild(todoListDivContainer);
    
    const generalProject = new Project('general');
    const otherProject = new Project('OtherProject');
    
    const projectArray = [generalProject, otherProject];
    const projectsObject = { 
        currentProject: projectArray[0]
    }

    const sampleTodo = new Todo('Clean','sweep the floor','2024-04-28','high',projectsObject.currentProject);
    const todo1 = new Todo('Cook','make spaghetti','2024-04-28','high','general');
    const todo2 = new Todo('Exercise','lift weights at Crunch','2024-04-28','high','general');
    const todo3 = new Todo('Spanish','practice spanish on youtube','2024-04-28','high','general');
    const todo4 = new Todo('Da Livy un besito','Livy es muy bonita','2024-04-28','high','OtherProject');
    
    
    
    otherProject.addTodo(sampleTodo);
    generalProject.addTodo(todo1);
    generalProject.addTodo(todo2);
    generalProject.addTodo(todo3);
    otherProject.addTodo(todo4);
    

    const listenerObject = {
        projectDivs: [],
        deleteIcons: [],
        editIcons: [],
        addProject: []
    }
    
    const loadProjects = () => {
        loadProjectsModule(listenerObject,projectArray,projectsObject).loadProject(projectArray);
        loadProjectsModule(listenerObject,projectArray,projectsObject).pushChangeProjectInstances(projectArray,projectsObject,listenerObject);
        console.log(listenerObject.projectDivs);
        loadProjectsModule(listenerObject,projectArray,projectsObject).addChangeProjectListeners(listenerObject);
        loadProjectsModule(listenerObject,projectArray,projectsObject).loadAddNewProjectListItem();
        loadProjectsModule(listenerObject,projectArray,projectsObject).addNewProjectEventListener(listenerObject);
        
    }

    const loadTodoItems = () => {
        makeTodoDiv(projectArray,listenerObject,projectsObject).loadTodoItemOuter();
        makeTodoDiv(projectArray,listenerObject,projectsObject).pushDeleteInstances(projectsObject,listenerObject);
        makeTodoDiv(projectArray,listenerObject,projectsObject).addDeleteIconListeners(listenerObject);
    }

    console.log(projectArray);

    
    
    document.addEventListener('click', () => {
        console.log(projectsObject.currentProject.name);
        console.log(projectArray)
    });

    
    
    
    
    
    
    return {loadProjects, loadTodoItems, projectsObject, projectArray}    
}










const removeAllEventListeners = (nodeList) => {
    nodeList.forEach((node) => {
        const clone = node.cloneNode(true);
        node.parentNode.replaceChild(clone, node);
    })
    
} 











