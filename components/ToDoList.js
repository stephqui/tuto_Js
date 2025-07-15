import { createElement, cloneTemplate } from "../functions/dom.js"

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
        element.append(cloneTemplate('todolist-layout') )
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
        const li = cloneTemplate('todolist-item').firstElementChild
        this.#element = li

        const checkbox = li.querySelector('input')
        checkbox.setAttribute('id', id)
        if(todo.completed){
            checkbox.setAttribute('checked', '')
        }
        const label = li.querySelector('label')
        label.setAttribute('for', id)
        label.innerText = todo.title

        const button = li.querySelector('button')
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
