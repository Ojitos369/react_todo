/* eslint-disable no-unused-vars */
import React from 'react'
import { TodoItem } from './TodoItem'

export function TodoList({todos, toggleTodo, removeTodo}) {
    return (
        <ul className="list-group col-12 col-md-9">
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} removeTodo={removeTodo} toggleTodo={toggleTodo}/>
            ))}
        </ul>
    )
}
