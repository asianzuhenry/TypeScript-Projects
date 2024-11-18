const Root = document.getElementById('root') as HTMLDivElement

const App = () => {
    if (Root) {
        Root.append(WrapperFunc())
    }
}

const WrapperFunc = (): HTMLDivElement => {
    const Wrapper: HTMLDivElement = document.createElement('div')
    const H1: HTMLHeadElement = document.createElement('h1')
    const H2: HTMLHeadElement = document.createElement('h2')
    const H3: HTMLHeadElement = document.createElement('h3')
    const Div1: HTMLDivElement = document.createElement('div')
    const Div2: HTMLDivElement = document.createElement('div')
    const Div3: HTMLDivElement = document.createElement('div')
    const Div4: HTMLDivElement = document.createElement('div')
    const Btn: HTMLButtonElement = document.createElement('button')
    
    let option1: Option = {
        title: 'What color should i use for printing the phone holder?',
        options: [
            'Purple', 'Green', 'Blue', 'Yellow', 'Red', 'Pink', 'Black'
        ]
    }

    Div3.className = 'options'

    for (let index = 0; index < option1.options.length; index++) {
        const P1: HTMLParagraphElement = document.createElement('p')
        P1.className = "option"
        P1.innerText = option1.options[index]
        Div3.append(P1)
    }
    
    Div1.className = "card"
    
    H1.className = 'optiontitle'
    H1.innerText = option1.title

    H2.innerText = "No choice yet..."
    Div4.className = "choicediv"
    Div4.appendChild(H2)
    
    Btn.className = "button"
    Btn.innerText = "Make Choice"
    Btn.onclick = () => ((): number => {
        const P2: HTMLParagraphElement = document.createElement('p')
        const choicesList: string[] = option1.options
        const choice = Math.round(Math.random() * (choicesList.length - 1))

        P2.innerText = option1.options[choice]
        Div4.replaceChildren(`Your choice is: ${P2.innerText}`)
        return choice
    })()
    
    Div1.append(H1, Div3, Btn)

    Wrapper.className = "wrapper"
    Wrapper.append(Div1, Div4)

    return Wrapper
}

document.addEventListener('DOMContentLoaded', () => App())