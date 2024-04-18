export const deleteTodo = (currentProject,todo) => {
    const indexToRemove = currentProject.todoArray.indexOf(todo);
    currentProject.todoArray.splice(indexToRemove,1);
}