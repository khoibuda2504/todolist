import React, { useState,useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {
  useEffect(()=> {
    const todos = JSON.parse(localStorage.getItem('todos'))
    if (todos) setTodos(todos)
  },[])
  const [todos, setTodos] = useState([]);

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [...todos,todo];
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos))
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    const updatedTodo = todos.map(item => (item.id === todoId ? newValue : item))
    setTodos(updatedTodo);
    localStorage.setItem('todos', JSON.stringify(updatedTodo))
  };

  const removeTodo = id => {
    const removedArr = todos.filter(todo => todo.id !== id);
    setTodos(removedArr);
    localStorage.setItem('todos', JSON.stringify(removedArr))
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
  };

  return (
    <>
      <h1>Todolist dành cho couple cute</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;
