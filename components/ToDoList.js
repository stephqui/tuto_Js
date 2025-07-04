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

    /** @type {HTMLUListElement} */
    #listeElement = []

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
        this.#listeElement = element.querySelector('.list-group')
        for (let todo of this.#todos) {
            const t = new ToDoListItem(todo)
            this.#listeElement.append(t.element)
        }
        element.querySelector('form').addEventListener('submit', e => this.#onSubmit(e))
        element.querySelectorAll('.btn-group button').forEach(button => {
            button.addEventListener('click', e => this.#toggleFilter(e))
        })

    }

    /**
     * 
     * @param {SubmitEvent} e 
     */
    #onSubmit(e) {
        e.preventDefault()
        const formTarget = e.currentTarget
        const title = new FormData(formTarget).get('title').toString().trim()
        if (title === '') {
            return
        }
        const todo = {
            id: Date.now(),
            title,
            completed: false
        }

        const item = new ToDoListItem(todo)
        this.#listeElement.prepend(item.element)
        formTarget.reset()
    }

    /**
     * 
     * @param {PointerEvent} e 
     */
    #toggleFilter(e) {
        e.preventDefault()
        const filter = e.currentTarget.getAttribute('data-filter')
        e.currentTarget.parentElement.querySelector('.active').classList.remove('active')
        e.currentTarget.classList.add('active')
        if (filter === 'todo') {
            this.#listeElement.classList.add('hide-completed')
            this.#listeElement.classList.remove('hide-todo')
        } else if (filter === 'done') {
            this.#listeElement.classList.add('hide-todo')
            this.#listeElement.classList.remove('hide-completed')
        } else {
            this.#listeElement.classList.remove('hide-todo')
            this.#listeElement.classList.remove('hide-completed')
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

        this.#element = li

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
        this.toggle(checkbox)

        button.addEventListener('click', e => this.remove(e))
        checkbox.addEventListener('change', e => this.toggle(e.currentTarget))

    }

    /**
     * @return {HTMLElement} element 
     */
    get element() {
        return this.#element
    }

    /**
     * 
     * @param {PointerEvent} e 
     */
    remove(e) {
        e.preventDefault()
        this.#element.remove()
    }

    /**
     * Change l'état "à faire/ fait" de la tache
     * @param {HTMLInputElement} checkbox 
     */
    toggle(checkbox) {
        if (checkbox.checked) {
            this.#element.classList.add('is-completed')
        } else {
            this.#element.classList.remove('is-completed')
        }
    }
}
