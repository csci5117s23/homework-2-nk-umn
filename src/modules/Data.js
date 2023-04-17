//const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const backend_base = "http://localhost:3000/dev/"

export async function getTodos(authToken) {
    const result = await fetch(backend_base+"/todos",{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}


export async function addTodo(authToken, group) {
    const result = await fetch(backend_base+"/todos",{
        'method':'POST',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({name: group})
    })
    return await result.json();
}