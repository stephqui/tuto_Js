export class ToDoList {
    liClass = 'todo list-group-item d-flex align-items-center'
    inputClass = 'form-check-input'
    inputType='checkbox'
    label1Class='ms-2 form-check-label'
    iClass='bi-trash'
    label2Class='ms-auto btn btn-danger btn-sm'

    constructor(li, input,label1, label2, i) {
        this.label1=label1
        this.label2=label2
    }

}