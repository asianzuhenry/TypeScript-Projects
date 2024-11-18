const Root = document.getElementById('root') as HTMLDivElement

const App = () => {
    if (Root) {
        Root.append(WrapperFunc())
    }
}



const WrapperFunc = (): HTMLDivElement => {
    const Wrapper: HTMLDivElement = document.createElement('div')
    const Input: HTMLInputElement = document.createElement('input')
    const Div1: HTMLDivElement = document.createElement('div')
    const Div2: HTMLDivElement = document.createElement('div')
    const Div3: HTMLDivElement = document.createElement('div')
    const Div4: HTMLDivElement = document.createElement('div')

    // Attributes
    Wrapper.className = "wrapper"
    Input.type = "text"
    Input.className = "input"

    Div1.className = "calc"
    Div2.className = "inputdiv"
    Div3.className = "buttondiv"
    Div4.className = "resultdiv"
    Div4.innerText = "0"

    Div2.append(Input, Div4)

    const BtnValArr: string[] = [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "*", "-", "+", "/", ".", "ans", "=", "clear"
    ]

    for (let index: number = 0; index < BtnValArr.length; index++) {
        const Button: HTMLButtonElement = document.createElement('button')
        Button.innerText = BtnValArr[index]
        Button.className = "button"
        Button.onclick = () =>(() => {
            let result: string = Div4.innerText
            if (Button.textContent === "=") {
                Input.value = eval(Input.value)
                Div4.innerText = Input.value
                Input.value = ""
            } else if (Button.textContent === "clear") {
                Input.value = ""
            } else if (Button.textContent === "ans") {
                Input.value = result
            } else {
                Input.value += Button.textContent
            }
        })()
        Div3.append(Button)
    }

    Div1.append(Div2, Div3)
    Wrapper.append(Div1)

    return Wrapper
}

document.addEventListener('DOMContentLoaded', () => App())
