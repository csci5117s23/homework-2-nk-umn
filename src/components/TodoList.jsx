//import { addGroup, getGroups, deleteGroup } from "@/modules/Data";
import { getGroups } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";

export default function TodoEditor() {
  const [loading, setLoading] = useState(true);
  console.log("loading: ", loading);
//   const [groups, setGroups] = useState([]);
  const { isLoaded, userId, sessionId, getToken } = useAuth();


  const [newName, setNewName] = useState("");

  useEffect(() => {
    async function process() {
      if (userId) {
        const token = await getToken({ template: "codehooks" });
        //setGroups(await getGroups(token));
        setLoading(false);
      }
    // const token = await getToken({ template: "codehooks" });
    // setGroups(await getGroups(token));
    // setLoading(false);
    }
    process();
  }, []);

  async function add() {
    const token = await getToken({ template: "codehooks" });
    const newGroup = await addGroup(token, newName);
    setNewName("");
    setGroups(groups.concat(newGroup));
  }

    return (
        <>
        <ol>
            <input
            ></input>
            <button onClick={add}>add</button>
        </ol>
        </>
    );
}
