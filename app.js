import { fetchSON } from "./functions/api.js"
import { createElement } from "./functions/dom.js"

try {
    const todos = await fetchSON('https://jsonzplaceholder.typicode.com/todos?_limit=5')
    
} catch (e) {
    const alertElement = createElement('div', {
        class: 'alert alert-danger m-4',
        role: 'alert'
    })
    alertElement.innerText = 'impossible de charger les éléments'
    document.body.prepend(alertElement)
}