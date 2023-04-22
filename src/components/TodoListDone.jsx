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

  const todoListItems = todos.filter((isTodoDone) => isTodoDone.isDone).reverse().map((todo) => (
    <li key={todo.listName} style={noBulletPoints} className="list-inline-item">
        <div className="create-space">
            <span>
                <Link href={"/todo/" + todo._id}>
                <h3>
                    <AiFillCheckCircle/>
                    {todo.listName}
                </h3>
                </Link>
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
        </>
    );
}
