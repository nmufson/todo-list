import { addDeleteListener } from "./dom-manipulation";

export const makeDiv = (todo) => {
    const todoListDivContainer = document.querySelector('#todo-list-container');
    const todoDiv = document.createElement('div');
    const TextDiv = document.createElement('div');
    const Header = document.createElement('h3');
    const para = document.createElement('p');
    const iconDiv = document.createElement('div');
    const checkBoxIcon = document.createElement('img');
    const editIcon = document.createElement('img');
    const deleteIcon = document.createElement('img');

    todoDiv.classList.add('todo-item');
    checkBoxIcon.classList.add('check-box-icon');
    editIcon.classList.add('edit-icon');
    deleteIcon.classList.add('delete-icon');

    todoListDivContainer.appendChild(todoDiv);
    todoDiv.appendChild(checkBoxIcon);
    todoDiv.appendChild(TextDiv);
    todoDiv.appendChild(iconDiv);
    TextDiv.appendChild(Header);
    TextDiv.appendChild(para);
    iconDiv.appendChild(editIcon);
    iconDiv.appendChild(deleteIcon);
    
    
    Header.textContent = todo.title;
    para.textContent = todo.description;
    checkBoxIcon.setAttribute('src', '../src/icons/square.svg')
    editIcon.setAttribute('src', '../src/icons/pencil.svg');
    deleteIcon.setAttribute('src','../src/icons/delete.svg')
}