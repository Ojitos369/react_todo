import React, { useRef } from 'react'
import { TodoList } from './TodoList';

export function TodoItem({todo, toggleTodo, removeTodo}) {
    const todoTaskRef = useRef();
    const {id, text, completed} = todo;
    let estado = completed ? 'pendiente' : 'completado';
    let background = completed ? 'bg-success' : 'bg-danger';
    let li_class = `todo_item list-group-item d-flex justify-content-around ${background}`;
    const handleTodoClick = () => {
        toggleTodo(id);
    }
    const handleRemoveClick = () => {
        removeTodo(id);
    }
    return (
        <li ref={todoTaskRef} className={li_class}>
            <button data-bs-toggle="tooltip" data-bs-placement="top" title="Cambiar Estado" onClick={handleTodoClick} class="btn btn-primary">Cambiar a {estado}</button>
            <h5>{text}</h5>
            <p>{completed ? 'completado' : 'pendiente'} </p>
            <button data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar tarea" onClick={handleRemoveClick}>🚜</button>
        </li>
    )
}
