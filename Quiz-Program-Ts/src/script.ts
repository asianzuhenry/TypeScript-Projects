const Root = document.querySelector("#root") as HTMLDivElement;

interface QuizT {
    id: number,
    question: string,
    optionslist: string[],
    correctoption: string

}

interface QuizGroupT {
    id: number | string,
    title: string,
    subtitle: string,
    img: string
    quizlist: QuizT[]
}

class Quiz implements QuizT {
    // this is the quiz class
    static count: number = 0
    public id: number
    constructor(
        public question: string,
        public optionslist: string[],
        public correctoption: string
    ) {
        this.id = ++Quiz.count
        this.question = question;
        this.optionslist = optionslist;
        this.correctoption = correctoption;
    }
}
class QuizGroup implements QuizGroupT {
    // this is the quizgroup class
    static count: number = 0
    public id: number
    constructor(
        public title: string,
        public subtitle: string,
        public img: string,
        public quizlist: QuizT[]
    ) {
        this.id = ++QuizGroup.count;
        this.title = title;
        this.subtitle = subtitle;
        this.img = img;
        this.quizlist = quizlist;
    }
}
const qz1 = new Quiz("Is the Earth round?", ["true", "false"], "true");
const qz2 = new Quiz("One + two", ["32", "12", "3"], "3");
const qz3 = new Quiz("In which year did Uganda get independance", ["1290", "2024", "note yet", "1962"], "1962");
const qz4 = new Quiz("Whats the young one of a duck called", ["duckie", "duckish", "duckling", "duck"], "duckling");
const qz5 = new Quiz("What rotates around the earth", ["an egg", "the moon", "the sun", "bees"], "the moon");
const qz6 = new Quiz("Is Henry cool", ["His not cool", "His cool"], "His cool");
const qzg1 = new QuizGroup("Python Quiz cohot #9", "lesson 9 Python Lists", "../../assets/img/img2.png", [qz1, qz2, qz3, qz4, qz5, qz6]);
let index: number = 0;
let score: number[] = [];

const App = () => {
    // const imgdf: HTMLImageElement = document.createElement('img')
    const quizCards: HTMLDivElement = document.createElement("div");
    quizCards.className = "quizcards";
    const PageHeader = () => {
        const Header = document.createElement("header")
        const LogoDiv = document.createElement("div")
        const Logo = document.createElement("img")
        const Nav = document.createElement("nav")
        const Ul = document.createElement("ul")
        Header.className = "header"
        LogoDiv.className = "logo"
        Nav.className = "nav"
        const NavItemsList: string[] = ["Manage", "Join Live", "SignIn", "SignUp"]
        NavItemsList.forEach((NavItem: string) => {
            const Li = document.createElement("li")
            const LiBtn = document.createElement("button")
            LiBtn.innerText = NavItem
            if (NavItem === "Manage") {
                LiBtn.addEventListener("click", () => {
                    QuizCard(qzg1)
                })
            }
            Li.append(LiBtn)
            Ul.append(Li)
            Nav.append(Ul)
        })
        Logo.src = "../../assets/img/img2.png"
        LogoDiv.append(Logo)
        Header.append(LogoDiv, Nav)
        return Header
    }
    const LandingPage = () => {
        const PageDiv = document.createElement("div")
        PageDiv.innerText = "Hello TypeScript"
        PageDiv.className = "pagediv"
        return PageDiv
    }
    // displays the quizCards
    const QuizCard = (quiz: QuizGroupT) => {
        const pagediv = document.querySelector(".pagediv");
        const card: HTMLDivElement = document.createElement("div");
        const cardsDiv: HTMLDivElement = document.createElement("div");
        const WrapperDiv: HTMLDivElement = document.createElement("div");
        const cardTitle: HTMLHeadingElement = document.createElement("h2");
        const cardSubTitle: HTMLHeadingElement = document.createElement("h4");
        const cardImg: HTMLImageElement = document.createElement("img");
        const cardQuestionNumber: HTMLDivElement = document.createElement("div");
        card.id = `${quiz.id}`;
        card.className = "card";
        cardsDiv.className = "cards";
        WrapperDiv.className = "wrapper"
        card.addEventListener("click", () =>
            (() => {
                InitQuiz(index, quiz.quizlist);
            })()
        );
        cardTitle.innerText = quiz.title;
        cardSubTitle.innerText = quiz.subtitle;
        cardImg.src = quiz.img;
        cardQuestionNumber.innerText = `${quiz.quizlist.length} - quiz questions`;
        card.append(cardImg, cardTitle, cardSubTitle, cardQuestionNumber);
        cardsDiv.append(card)
        WrapperDiv.append(cardsDiv)
        pagediv?.replaceWith(WrapperDiv);
    };
    // starts the game
    const InitQuiz = (index: number, qz: QuizT[]) => {
        const quizCards = document.querySelector(".wrapper");
        const QzCardWrapper: HTMLDivElement = document.createElement("div");
        const QzCard: HTMLDivElement = document.createElement("div");
        const QzCardQuestion = document.createElement("h2");
        const QzCardOptions = document.createElement("ul");

        if (index <= qz.length - 1) {
            QzCardWrapper.className = "wrapper"
            qz.forEach((qzitem: QuizT) => {
                if (qz[index].id === qzitem.id) {
                    QzCard.id = `${qzitem.id}`
                    QzCard.className = "quizcard"
                    QzCardQuestion.className = "cardquestion"
                    QzCardOptions.className = "cardoptions"
                    QzCardQuestion.innerText = qzitem.question
                    qzitem.optionslist.forEach((opt) => {
                        const QzCardOption = document.createElement("li");

                        QzCardOption.innerText = opt
                        QzCardOption.addEventListener('click', () => {
                            if (opt === qzitem.correctoption) {
                                QzCardOption.classList.add("correct")
                                score.push(5)
                                setTimeout(() => {
                                    index++
                                    InitQuiz(index, qzg1.quizlist)
                                    // NextQuestion(qz)
                                }, 500);
                            } else {
                                QzCardOption.classList.add("wrong")
                                setTimeout(() => {
                                    index++
                                    InitQuiz(index, qzg1.quizlist)
                                    // NextQuestion(qz)
                                }, 500);
                            }
                        })
                        QzCardOptions.append(QzCardOption)
                    })
                    QzCard.append(QzCardQuestion, QzCardOptions)
                    QzCardWrapper.append(QzCard)
                }
            });
            quizCards?.replaceWith(QzCardWrapper)
        } else {
            index = 0
            Results(score, qz)
            score = []
        }
    };
    // displays the results
    const Results = (score: number[], qzl: QuizT[]) => {
        const quizcard = document.querySelector(".quizcard")
        const wrapper = document.querySelector(".wrapper")
        const ResCard = document.createElement('div')
        const ResCardscore = document.createElement('div')
        const ResCardbtndiv = document.createElement('div')
        const Backbtn = document.createElement('button')
        let sd = eval(score.join("+"))
        Backbtn.innerText = "Back"
        ResCard.className = "results"
        ResCardscore.className = "score"
        Backbtn.addEventListener("click", () => {
            ResCardscore.innerText = ""
            sd = ""
            wrapper?.replaceWith(LandingPage())
        })
        ResCardscore.innerText = (Math.round((sd / (5 * qzl.length)) * 100).toFixed(0) + '%')
        if ((((sd / (5 * qzl.length)) * 100) + '%') === "NaN%") {
            ResCardscore.innerText = ('0%')
        }
        ResCardbtndiv.append(Backbtn)
        ResCard.append(ResCardscore, ResCardbtndiv)
        quizcard?.replaceWith(ResCard)
    }
    Root.append(PageHeader(), LandingPage());
    // QuizCard(qzg1);
};
document.addEventListener("DOMContentLoaded", () => App());
