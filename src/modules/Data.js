const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function getTodos(authToken) {
    const result = await fetch(backend_base+"/todos",{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

export async function getSpecificTodo(authToken, todoId) {
    const result = await fetch(backend_base+"/todos/" + todoId,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    console.log("results: ", result)
    return await result.json();
}


export async function addTodo(authToken, name, text, id, done) {
    const result = await fetch(backend_base+"/todos",{
        'method':'POST',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({
            listName: name,
            listText: text,
            userId: id,
            isDone: done
        })
    })
    return await result.json();
}

export async function deleteTodolist(authToken, todoItem) {
    const result = await fetch(backend_base+"/todos/"+todoItem._id,{
        'method':'DELETE',
        'headers': {'Authorization': 'Bearer ' + authToken},
    })
    return await result.json();
}

export async function toggleTodoItemDone(authToken, todoItem) {
    const result = await fetch(backend_base+"/todos/" + todoItem._id,{
        'method':'PATCH',
        'headers': {'Authorization': 'Bearer ' + authToken, 'Content-type': 'application/json'},
        'body': JSON.stringify({ isDone: !todoItem.isDone })
    })
    return await result.json();
}

export async function editTodoText(authToken, todoItem, newText) {
    const result = await fetch(backend_base+"/todos/" + todoItem._id,{
        'method':'PATCH',
        'headers': {'Authorization': 'Bearer ' + authToken, 'Content-type': 'application/json'},
        'body': JSON.stringify({ listText: newText })
    })
    return await result.json();
}