import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
export default function Todo() {
    let [todos, setTodos] = useState([]);
    let [newTodo, setNewTodo] = useState("");

    function addNewTodo(event) {
        setNewTodo(event.target.value);
    } 
    function updateTodo() {
        if(newTodo === "") {
            return;
        }
        setTodos((todos)=>{
            return [...todos, {task:newTodo,id:uuidv4(),done:false}]
        });
        setNewTodo("");
    }
    function deleteTodo(id) {
        setTodos((todos)=>{
            return todos.filter((todo)=>{
                return todo.id !== id;
            })
        })
    }

    function allDone() {
        setTodos((todos)=>{
            return todos.map((todo)=>{
                return {...todo,done:true}
            })
        })
    }
    function doneOne(id) {
        setTodos((todos)=>{
            return todos.map((todo)=>{
                if(todo.id === id) {
                    return {...todo,done:true}
                } else {
                    return todo;
                }
            })
        })
    }
    return (
        <div>
            <h1>Todo App</h1>
            <input type="text" placeholder="Add task here" value={newTodo} onChange={addNewTodo} className="add-todo"></input>&nbsp; 
            <button onClick={updateTodo}>Add</button><br></br>
            <hr></hr>
            <p>Todo List</p>
            <ul>
                {todos.map((todo) => {
                    return <li key={todo.id}><span style={{textDecoration: todo.done ? "line-through" : "none"}}>{todo.task}</span> &nbsp;<button onClick={()=>deleteTodo(todo.id)}>Delete</button> &nbsp; <button onClick={()=>doneOne(todo.id)}>Mark As Done</button></li>
                })}
            </ul>
            <button onClick={allDone}>All Done</button>
        </div>
    )
}