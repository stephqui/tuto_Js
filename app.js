import { ToDoList, ToDoListItem } from "./components/ToDoList.js"
import { fetchSON } from "./functions/api.js"
import { createElement } from "./functions/dom.js"

try {
    //const todos = await fetchSON('https://jsonplaceholder.typicode.com/todos?_limit=5')
    const todosInStorage = localStorage.getItem('lesTodos')?.toString()
    let todos=[]
    if(todosInStorage){
        todos=JSON.parse(todosInStorage)
    }
    const list = new ToDoList(todos)
    list.appendTo(document.querySelector('#todolist'))
} catch (e) {
    const alertElement = createElement('div', {
        class: 'alert alert-danger m-4',
        role: 'alert'
    })
    alertElement.innerText = 'impossible de charger les éléments'
    document.body.prepend(alertElement)
    console.error(e)
}