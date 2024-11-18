const Root = document.querySelector("#root") as HTMLDivElement

type NoteT = {
  id: number | string,
  title: string,
  text: string,
  color: string
}
class Note implements NoteT {
  static count: number = 0
  public id: number
  constructor(
    public title: string,
    public text: string,
    public color: string
  ) {
    this.id = ++Note.count
    this.title = title
    this.text = text
    this.color = color
  }
}
const App = () => {
  const Wrapper: HTMLDivElement = document.createElement("div")

  const Notes: HTMLDivElement = document.createElement("div")

  Wrapper.className = "wrapper"

  let Visibility: boolean = false

  const HeaderFunc = () => {
    const Header = document.createElement("header")
    const LogoDiv: HTMLDivElement = document.createElement("div")
    const LogoText: HTMLHeadingElement = document.createElement("h2")
    const Nav = document.createElement("nav")
    const ToggleFormButton = document.createElement("button")

    LogoText.innerText = "NoteTaker"
    ToggleFormButton.innerText = "Create Note"

    ToggleFormButton.addEventListener("click", () => {
      Visibility = true
      ToggleFormFunc(Visibility, "formarea")
    })

    LogoDiv.append(LogoText)
    Nav.append(ToggleFormButton)
    Header.append(LogoDiv, Nav)

    return Header
  }

  const ToggleFormFunc = (visibility: boolean, parenelm?: string) => {
    const FormArea: HTMLDivElement = document.createElement("div")
    const Form: HTMLDivElement = document.createElement("div")
    const NoteInput: HTMLInputElement = document.createElement("input")
    const TextArea: HTMLTextAreaElement = document.createElement("textarea")
    const ColorsDiv: HTMLDivElement = document.createElement("div")
    const BtnDiv: HTMLDivElement = document.createElement("div")
    const AddNoteBtn: HTMLButtonElement = document.createElement("button")
    const CloseFormBtn: HTMLButtonElement = document.createElement("button")

    BtnDiv.className = "btndiv"
    AddNoteBtn.innerText = "Add Note"
    AddNoteBtn.title = "Add Note"
    AddNoteBtn.id = "AddNote"
    CloseFormBtn.innerText = "Close"
    CloseFormBtn.title = "Close"
    CloseFormBtn.id = "Close"
    NoteInput.type = "text"
    NoteInput.className = "noteinput"
    NoteInput.name = "noteinput"
    NoteInput.id = "noteinput"
    TextArea.className = "textarea"
    TextArea.name = "textarea"
    TextArea.id = "textarea"
    ColorsDiv.className = "colorsdiv"
    NoteInput.placeholder = "Please enter the title here..."
    TextArea.placeholder = "Please enter your text here..."
    Form.className = "form"
    FormArea.className = "formarea"
    Notes.className = "notes"
    const colorsArr: string[] = ["grey", "green", "blue", "yellow", "pink"]
    for (let index: number = 0; index < colorsArr.length; index++) {
      const element: string = colorsArr[index];
      const ColorDiv: HTMLDivElement = document.createElement("div")
      ColorDiv.className = "colordiv"
      ColorDiv.title = `color-${element}`
      ColorDiv.style.backgroundColor = `${element}`
      ColorDiv.addEventListener("click", () => {
        const ColorDivArr = Array.from((document.querySelector(".colorsdiv") as HTMLInputElement).childNodes) as HTMLDivElement[]
        ColorDivArr.forEach(ColorDivItem => {
          (ColorDiv.style.backgroundColor !== ColorDivItem.style.backgroundColor) ?
            ColorDivItem.classList.remove("selectedcolor") :
            ColorDiv.classList.add("selectedcolor")

        })

      })
      ColorsDiv.append(ColorDiv)
    }
    AddNoteBtn.addEventListener("click", () => {
      const NoteInput = document.querySelector(".noteinput") as HTMLInputElement
      const TextArea = document.querySelector(".textarea") as HTMLTextAreaElement
      const ColorDiv = document.querySelector(".selectedcolor") as HTMLDivElement

      if (NoteInput.value !== "" && TextArea.value !== "" && ColorDiv.style.backgroundColor !== "null") {
        const NoteData = new Note(NoteInput.value, TextArea.value, ColorDiv.style.backgroundColor)
        const NoteDiv: HTMLDivElement = document.createElement("div")
        const NoteTitle: HTMLDivElement = document.createElement("h2")
        const NoteText: HTMLParagraphElement = document.createElement("p")

        NoteDiv.id = `${NoteData.id}`
        NoteDiv.className = "notediv"
        NoteDiv.style.backgroundColor = NoteData.color

        NoteTitle.innerText = NoteData.title
        NoteText.innerText = NoteData.text

        NoteDiv.append(NoteTitle, NoteText)

        NoteDiv.addEventListener("dblclick", () => {
          Notes.removeChild(NoteDiv)
        })

        Notes.append(NoteDiv)

        Visibility = false
        const FA = document.querySelector(".formarea") as HTMLDivElement
        FA.style.visibility = "hidden"
      }
    })

    CloseFormBtn.addEventListener("click", () => {
      Visibility = false
      ToggleFormFunc(Visibility, "formarea")
    })

    BtnDiv.append(AddNoteBtn, CloseFormBtn)

    Form.append(NoteInput, TextArea, ColorsDiv, BtnDiv)
    FormArea.append(Form)

    !visibility ? FormArea.style.visibility = "hidden" : FormArea.style.visibility = "visible"
    if (parenelm === "wrapper") {
      const WRP = document.querySelector(`.${parenelm}`) as HTMLDivElement
      WRP.append(FormArea)
    }
    else if (parenelm === "formarea") {
      const oldFormArea = document.querySelector(`.${parenelm}`) as HTMLDivElement
      oldFormArea.replaceWith(FormArea)
    }

  }
  Wrapper.append(HeaderFunc(), Notes)
  Root.append(Wrapper)
  ToggleFormFunc(Visibility, "wrapper")
}
document.addEventListener("DOMContentLoaded", () => App())

// FORM
// input -> title
// input -> content
// input -> color -> [# # # #] => [GRADIENT]
// input -> button