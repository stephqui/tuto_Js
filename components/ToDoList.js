import { createElement } from "../functions/dom.js"

/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */
export class ToDoList {
    /** @type {Todo[]} */
    #todos = []

    /**
     * 
     * @param {Todo} todos 
     */
    constructor(todos) {
        this.#todos = todos
    }

    /**
     * 
     * @param {HTMLElement} element 
     */
    appendTo(element) {
        element.innerHTML = ` <form class="d-flex pb-4">
            <input required="" class="form-control"  id="formToDo" type="text" placeholder="Acheter des patates..." name="title" data-com.bitwarden.browser.user-edited="yes">
            <button id="btnAdd" class="btn btn-primary">Ajouter</button>
        </form>
        <main>
            <div class="btn-group mb-4" role="group">
                <button type="button" class=" btn btn-outline-primary active" data-filter="all">Toutes</button>
                <button type="button" class=" btn btn-outline-primary" data-filter="todo">A faire</button>
                <button type="button" class=" btn btn-outline-primary" data-filter="done">Faites</button>
            </div>
            <ul class="list-group">
            </ul>
        </main>`
        const list = element.querySelector('.list-group')
        for (let todo of this.#todos) {
            const t = new ToDoListItem(todo)
            t.appendTo(list)
        }
    }
}

export class ToDoListItem {
    #element
    /** @type {Todo} */
    constructor(todo) {
        const id = `todo-${todo.id}`
        const li = createElement('li', {
            class: 'todo list-group-item d-flex align-items-center',
        })

        const checkbox = createElement('input', {
            type: 'checkbox',
            class: 'form-check-input',
            id,
            checked: todo.completed ? '' : null
        })

        const label = createElement('label', {
            class: 'ms-2 form-check-label',
            for: id
        })
        label.innerText = todo.title

        const button = createElement('label', {
            class: 'ms-auto btn btn-danger btn-sm'
        })
        button.innerHTML = '<i class="bi-trash"></i>'

        li.append(checkbox)
        li.append(label)
        li.append(button)
        this.#element = li
    }

    /**
     * @param {HTMLElement} element 
     */
    appendTo(element) {
        element.append(this.#element)
    }
}
