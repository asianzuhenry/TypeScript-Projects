const Root = document.querySelector(".root") as HTMLDivElement

interface TodoT {
    id: string | number,
    todotext: string
}
class Todo implements TodoT {
    static count: number = 0
    public id: string | number
    constructor(
        public todotext: string
    ) {
        this.id = ++Todo.count
        this.todotext = todotext
    }
    static TodoComplete(id: string | number) {
        const TodoComplete = document.getElementById(`${id}`) as HTMLLIElement
        TodoComplete.classList.contains('complete') ?
            TodoComplete.classList.remove('complete') :
            TodoComplete.classList.add('complete')
    }
    static RemoveTodo(id: string | number) {
        const TodoComplete = document.getElementById(`${id}`) as HTMLLIElement
        TodoComplete.remove()
    }
}
const App = () => {
    const Wrapper: HTMLDivElement = document.createElement("div")
    const Container: HTMLDivElement = document.createElement("div")
    const Form: HTMLDivElement = document.createElement("div")
    const FormInput: HTMLInputElement = document.createElement("input")
    const FormButton: HTMLButtonElement = document.createElement("button")
    const Todos: HTMLOListElement = document.createElement("ol")
    Wrapper.className = "wrapper"
    Form.className = "form"
    Todos.className = "todos"
    FormInput.type = "text"
    FormInput.placeholder = "Type Your Todo Here..."
    FormInput.name = "todo"
    FormInput.id = "inputtodo"
    FormButton.innerText = "Add"
    FormButton.id = "addtodo"
    FormButton.addEventListener("click", () => (FormInput.value.trim() !== "") ? HandleTodo() : null)
    const HandleTodo = () => {
        const NewTodo: TodoT = new Todo(FormInput.value)
        const TodoLi: HTMLLIElement = document.createElement("li")
        const TodoP: HTMLParagraphElement = document.createElement("p")
        const Todos = document.querySelector(".todos") as HTMLDivElement
        TodoLi.className = "todo"
        TodoLi.id = `${NewTodo.id}`
        TodoP.innerText = `${NewTodo.todotext}`
        FormInput.value = ""
        TodoLi.append(TodoP)
        TodoLi.addEventListener("click", () => Todo.TodoComplete(TodoLi.id))
        TodoLi.addEventListener("dblclick", () => Todo.RemoveTodo(TodoLi.id))
        Todos.prepend(TodoLi)
    }
    Form.append(FormInput, FormButton)
    Container.append(Form, Todos)
    Wrapper.append(Container)
    Root.append(Wrapper)
}
document.addEventListener("DOMContentLoaded", () => App())

