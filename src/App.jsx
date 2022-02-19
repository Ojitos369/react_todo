/* eslint-disable no-unused-vars */
import React, {Fragment, useState, useRef, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid'
import { TodoList } from './components/TodoList'
import './assets/css/todo.css'

const KEY = 'todosListApp'

export function App() {
    const [todos, setTodos] = useState([
    ]);

    const todoTaskRef = useRef();
    let tareas_pendientes = todos.filter(todo => !todo.completed).length;
    let delete_button_class = "btn col-12 col-md-4 m-2 btn-danger"
    if (tareas_pendientes === todos.length) {
        delete_button_class = "btn col-12 col-md-4 m-2 btn-outline-danger";
    }
    let text_class_color = 'text-success';
    let main_text = "No hay tareas pendientes";
    if (tareas_pendientes > 0 && tareas_pendientes < 5) {
        main_text = `Tu puedes solo quedan ${tareas_pendientes} tareas`;
        text_class_color = 'text-info';
    } else if (tareas_pendientes >= 5) {
        main_text = `No deberias dejar que se junte tanto ya son ${tareas_pendientes} tareas`;
        text_class_color = 'text-warning';
    }
    let text_class = `text-center ${text_class_color}`;

    useEffect(() => {
        const todosList = JSON.parse(localStorage.getItem(KEY));
        if (todosList) {
            setTodos(todosList);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos));
    }, [todos])

    const toggleTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find(todo => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    }

    const addTodo = () => {
        const text = todoTaskRef.current.value;
        if (text === '') return;

        setTodos(prevTodos => {
            return [
                ...prevTodos,
                {id: uuidv4(), text, completed: false}
            ];
        });
        todoTaskRef.current.value = null;
    }

    const removeTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find(todo => todo.id === id);
        newTodos.splice(newTodos.indexOf(todo), 1);
        setTodos(newTodos);
    }

    const clearCompleted = () => {
        const newTodos = [...todos];
        const newTodos2 = newTodos.filter(todo => !todo.completed);
        setTodos(newTodos2);
    }

    const editTodo = (id, button) => {
        const newTodos = [...todos];
        const todo = newTodos.find(todo => todo.id === id);
        button.current.onclick = () => saveTodo(id);
        todoTaskRef.current.value = todo.text;
        todoTaskRef.current.focus();
        function saveTodo(id) {
            const newTodos = [...todos];
            const todo = newTodos.find(todo => todo.id === id);
            todo.text = todoTaskRef.current.value;
            setTodos(newTodos);
            button.current.onclick = () => editTodo(id, button);
        }
    }

    return (
        <div className="main_container d-flex align-items-center">
            <div className="container">
                <div className="row justify-content-center mb-3">
                    <h1 className={text_class} >{ main_text }</h1>
                </div>
                <div className="row justify-content-center mb-3">
                    <TodoList className="col-12 col-md-8" todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo} editTodo={editTodo}/>
                </div>
                <div className="row justify-content-center">
                    <input className="col-12 col-md-9" ref={todoTaskRef} type="text" placeholder="Nueva Tarea"/>
                </div>
                <div className="row justify-content-center">
                    <button className="btn col-12 col-md-4 m-2 btn-success" onClick={addTodo} data-bs-toggle="tooltip" data-bs-placement="top" title="Añadir Tarea">➕</button>
                    <button className={delete_button_class} onClick={clearCompleted} data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar Completadas">🗑️</button>
                </div>
            </div>
        </div>
    )
}
