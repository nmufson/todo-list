
import { makeTodoDiv } from "./make-todo-div.js";
import { loadProjectsModule } from "./load-projects.js";
import { Project } from './project.js';
import { Todo } from './create-todo.js';
import { loadTodoFuncContainer } from "./load-divs-dom.js";




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

    const sampleTodo = new Todo('Clean','sweep the floor','2024-04-28','High',projectsObject.currentProject);
    const todo1 = new Todo('Cook','make spaghetti','2024-04-28','Medium','general');
    const todo2 = new Todo('Exercise','lift weights at Crunch, probably going to do chest and tris. Should involve bench and dips.','2024-04-28','High','general');
    const todo3 = new Todo('Spanish','practice spanish on youtube','2024-04-28','High','general');
    const todo4 = new Todo('Da Livy un besito','Livy es muy bonita','2024-04-28','High','OtherProject');
    
    
    
    otherProject.addTodo(sampleTodo);
    generalProject.addTodo(todo1);
    generalProject.addTodo(todo2);
    generalProject.addTodo(todo3);
    otherProject.addTodo(todo4);
    
    const loadProjects = () => {
        loadProjectsModule(projectArray,projectsObject).loadProject(projectArray);
    }

    const loadTodoItems = () => {
        loadTodoFuncContainer(projectArray,projectsObject).loadTodoItemOuter();
    }

    return {loadProjects, loadTodoItems, projectsObject, projectArray}    
}






















