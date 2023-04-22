import { addTodo, getTodos, deleteGroup, toggleTodoItemDone, deleteTodolist, editTodoText, getSpecificTodo } from "@/modules/Data";
import { getGroups } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { HioutlineXMark } from "react-icons/hi2";
import { HiXMark } from "react-icons/hi2";

export default function TodoEditor( {individualTodo} ) {
  const [loading, setLoading] = useState(true);
  console.log("loading: ", loading);
  const [todos, setTodos] = useState({});
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [newText, setNewText] = useState("");

  // object containing the todo items that will be commited as "done"
  const [todosMarkedAsDone, setTodosMarkedAsDone] = useState([{}]);

  const [newEditText, setNewEditText] = useState("");

  const [isEditable, setEditable] = useState(true);

  const [isTodoDone, setIsTodoDone] = useState(individualTodo.isDone || false);

  useEffect(() => {
    async function process() {
      if (userId) {
        console.log("useffect called");
        const token = await getToken({ template: "codehooks" });
        setTodos(await getSpecificTodo(token, individualTodo.id));
        console.log("setTodos: ", todos)
        setLoading(false);
      }
    }
    process();
  }, [isLoaded]);

  async function saveNewTodoState() {
    console.log("from savenewtodostate: ", todos);
    let newTodoItem = {...todos};
    console.log("todo item1: ", newTodoItem, todos);
    newTodoItem.isDone = !todos.isDone;
    console.log("todo item2: ", newTodoItem, todos);
    const token = await getToken({ template: "codehooks" });
    const test = await toggleTodoItemDone(token, todos);
    setTodos(newTodoItem);
    console.log("after new todos: ", todos)

  }

  const handleChange = (todoItem) => {
    console.log("todo id from change: ", todoItem._id);
    console.log("todos marked as done1: ", todos.isDone);

    let newTodoItem = {...todos};
    newTodoItem.isDone = !todos.isDone;
    setTodos(newTodoItem);
    console.log("todo item: ", newTodoItem, todos);
    saveNewTodoState();
    setIsTodoDone(!isTodoDone);
  };

  async function editText(todoItem) {
    setEditable(!isEditable);
  };

  async function saveNewText(todoItem) {
    if (newEditText != "") {
      const token = await getToken({ template: "codehooks" });
      const test = await editTodoText(token, todoItem, newEditText);
      setNewEditText("");
      setEditable(true);
      setTodos(await getSpecificTodo(token, individualTodo.id));
    }
  };
  
  if (loading) {
    return <span> loading... </span>;
  } else {
    return (
        <>
        <div className="create-space padding-left">
            <span>
                <h3>
                    {todos.listName}
                </h3>
                <div>
                  <input
                    type="checkbox"
                    // checked={todosMarkedAsDone.some(item => item.hasOwnProperty(todo._id))}
                    checked={todos.isDone}
                    onChange={() => handleChange(todos)}
                  >
                  </input> &nbsp;
                  Mark todo done
              </div>
            </span>
        </div>

        <div className="padding-left">
          <div>
            Todo info
          </div>
          <textarea
            name="todoText"
            id="todoTextId"
            defaultValue={todos?.listText}
            onChange={(e) => setNewEditText(e.target.value)}
            disabled={isEditable}
            rows={10}
            cols={60}
            ></textarea>
        </div>
        <div className="padding-left">
          <button onClick={() => editText(todos)}>{ isEditable ? "Edit" : "Cancel" } </button>
          <button onClick={() => saveNewText(todos)}>save</button>
        </div>
        </>
    );
  }
}
