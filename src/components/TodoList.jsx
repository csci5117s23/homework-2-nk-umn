import { addTodo, getTodos, deleteGroup, toggleTodoItemDone, deleteTodolist, editTodoText } from "@/modules/Data";
import { getGroups } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { AiFillCheckCircle } from "react-icons/ai";
import { HioutlineXMark } from "react-icons/hi2";
import { HiXMark } from "react-icons/hi2";

export default function TodoEditor() {
  const [loading, setLoading] = useState(true);
  console.log("loading: ", loading);
  const [todos, setTodos] = useState([]);
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [newText, setNewText] = useState("");

  // object containing the todo items that will be commited as "done"
  const [todosMarkedAsDone, setTodosMarkedAsDone] = useState([{}]);

  const [newEditText, setNewEditText] = useState("");

  const [isEditable, setEditable] = useState(false);

  const [isDone, setIsDone] = useState(false);

  const [newName, setNewName] = useState("");

  const noBulletPoints = {
    listStyleType: 'none'
  }

  const router = useRouter();
  const {name} = router.query;

  useEffect(() => {
    async function process() {
      if (userId) {
        const token = await getToken({ template: "codehooks" });
        setTodos(await getTodos(token));
        console.log("setTodos: ", todos)
        setLoading(false);
      }
    }
    process();
  }, [isLoaded]);

  async function addTodoList() {
    const token = await getToken({ template: "codehooks" });
    const newGroup = await addTodo(token, newName, newText, userId, isDone);
    setNewName("");
    setNewText("");
    setTodos(todos.concat(newGroup));
  }

  async function saveNewTodoState() {
    const token = await getToken({ template: "codehooks" });
    Object.entries(todosMarkedAsDone).map(([key, item]) => {
      console.log("key: ", key);
      console.log("key2: ", item);
      // toggleTodoItemDone(token, item);
      if (key !== "0") {
        //toggleTodoItemDone(token, item);
        toggleDone(item);
      }
    })
    setTodos(await getTodos(token));

  }

  async function deleteTodo(todoItem) {
    const token = await getToken({ template: "codehooks" });
    try {
      await deleteTodolist(token, todoItem);
    } catch (e) {
      console.log("ERROR: ", e);
    }
    setTodos(await getTodos(token));
  };

  async function toggleDone(todoItem) {
    const token = await getToken({ template: "codehooks" });
    let newTodoItem = {...todoItem};
    newTodoItem.isDone = todoItem.isDone;
    const test = await toggleTodoItemDone(token, todoItem);
    setTodos(await getTodos(token));
  };

  const handleChange = (todoItem) => {
    if (!todosMarkedAsDone.hasOwnProperty(todoItem._id)) {
      setTodosMarkedAsDone({...todosMarkedAsDone, [todoItem._id]: todoItem});
    } else {
      let newTodoItem = {...todosMarkedAsDone};
      delete newTodoItem[todoItem._id];
      setTodosMarkedAsDone(newTodoItem);
    }

  };

  const todoListItems = todos.filter((isTodoDone) => !isTodoDone.isDone).reverse().map((todo) => (
    <li key={todo.listName} style={noBulletPoints} className="list-inline-item">
      <div className="create-space">
            <span>
              <Link href={"/todo/" + todo._id}>
                <h3>
                    {todo.listName}
                </h3>
                </Link>
                <div>
                  <input
                    type="checkbox"
                    // checked={todosMarkedAsDone.some(item => item.hasOwnProperty(todo._id))}
                    checked={todosMarkedAsDone.hasOwnProperty(todo._id)}
                    onChange={() => handleChange(todo)}
                  >
                  </input> &nbsp;
                  Mark todo done
              </div>
            </span>
            <span
                onClick={() => {
                    deleteTodo(todo);
                }}>
                <HiXMark/>
            </span>
        </div>
      <div>
        <textarea
          name="todoText"
          id="todoTextId"
          defaultValue={todo.listText}
          onChange={(e) => setNewEditText(e.target.value)}
          disabled={true}
          rows={1}
          cols={60}
          resize="non"
          ></textarea>
      </div>
    </li>
  ));

    return (
        <>
        <div className="container">
            <ul className="list-inline d-flex justify-content-center">

            </ul>
            { todoListItems }
        </div>
        <div id="todo-add-page" className="padding-left">
          <div>
          <input type="text"
            placeholder="Enter new Todo name"
            onChange={(e) => setNewName(e.target.value)}
            ></input>
            <button className="btn-spacer" onClick={addTodoList}>Add Todo</button>
          </div>
          <div>
            <textarea
              placeholder="Enter text for todo item"
              onChange={(e) => setNewText(e.target.value)}
              rows={10}
              cols={60}
            ></textarea>
          </div>
          <button className="btn-spacer" onClick={saveNewTodoState}>Save all Todo states</button>
        </div>
        </>
    );
}
