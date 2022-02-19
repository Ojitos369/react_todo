/* eslint-disable no-unused-vars */
import React from 'react'
import { TodoItem } from './TodoItem'

export function TodoList({todos, toggleTodo, removeTodo, editTodo}) {
    return (
        <ul className="list-group col-12 col-md-10">
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} removeTodo={removeTodo} editTodo={editTodo} toggleTodo={toggleTodo}/>
            ))}
        </ul>
    )
}
