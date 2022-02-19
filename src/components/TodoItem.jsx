import React, { useRef } from 'react'
import { TodoList } from './TodoList';

export function TodoItem({todo, toggleTodo, removeTodo, editTodo}) {
    const todoTaskRef = useRef();
    const buttonRef = useRef();
    const todoText = useRef();
    const {id, text, completed} = todo;
    let estado = completed ? 'pendiente' : 'completado';
    let background = completed ? 'bg-success' : 'bg-danger';
    let text_color = completed ? 'text-dark' : 'text-white';
    let div_li_class = `todo_li list-group-item d-flex justify-content-between`;
    let li_class = `todo_item col-12 col-lg list-group-item d-flex justify-content-around ${background} ${text_color}`;
    const handleTodoClick = () => {
        toggleTodo(id);
    }
    const handleRemoveClick = () => {
        removeTodo(id);
    }
    const handleEditClick = () => {
        editTodo(id, buttonRef);
    }
    return (
        <div className={div_li_class}>
            <div class="container">
                <div class="row">
                    <button data-bs-toggle="tooltip" data-bs-placement="top" title="Cambiar Estado" onClick={handleTodoClick} className="btn btn-primary col-12 col-lg-2">Toggle</button>
                    <li ref={todoTaskRef} className={li_class}>
                        <h5 ref={todoText}>{text}</h5>
                        <button data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar tarea" onClick={handleRemoveClick}>🗑️</button>
                    </li>
                    <button ref={buttonRef} data-bs-toggle="tooltip" data-bs-placement="top" title="Editar Tarea" onClick={handleEditClick} className="btn btn-info col-12 col-lg-1">Edit</button>
                </div>
            </div>
        </div>
    )
}
