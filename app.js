const btnContainer_1 = document.querySelector('#con-1');
const btnContainer_2 = document.querySelector('#con-2');
const btnContainer_3 = document.querySelector('#con-3');
const btnContainer_4 = document.querySelector('#con-4');
const btnContainer_5 = document.querySelector('#con-5');
const currentValueDisplay = document.querySelector("#current-value");
const AnswerDisplay = document.querySelector("#current-ans-1");
const HistoryValueConatiner = document.querySelector("#history-value");
// const NodificationSliderBtn = document.querySelector(".nofication");
// const SliderMainCon = document.querySelector(".slide-nodification-con");



let currentvalueStore = "";
let displayValueStore = "";
let TotalArithValue = null;
let SecondFlag = false;
let HistoryContainer = [];

function CreateHistoryContainer(value) {
    const lenOfHistory = HistoryValueConatiner.children.length;
    const body = document.createElement('div');
    const spanSum = document.createElement('span');
    const spanSol = document.createElement('span');
    body.className = `his-${lenOfHistory + 1}`;
    spanSum.innerText = value.sum;
    spanSol.innerText = `= ${value.sol}`;
    body.appendChild(spanSum);
    body.appendChild(spanSol);
    HistoryValueConatiner.appendChild(body);
}

function HistoryInsertValue(sum, solution) {
    const historyObj = { sum: sum, sol: solution }
    HistoryContainer.push(historyObj);
    CreateHistoryContainer(historyObj);
    return

}

function CalculationFun(numvalueAndOperator) {
    const numberConatiner = [];
    const symbolContainer = [];
    let value = "";
    for (let i = 0; i < numvalueAndOperator.length; i++) {
        if (!Number.isInteger(Number(numvalueAndOperator[i]))) {
            symbolContainer.push(numvalueAndOperator[i]);
            numberConatiner.push(Number(value));
            value = "";
        }
        else {
            value += numvalueAndOperator[i];
            if (i === numvalueAndOperator.length - 1) {
                numberConatiner.push(Number(value));
                value = "";
            }
        }
    }

    return { num: numberConatiner, opr: symbolContainer }
}

function RedoStyle() {
    AnswerDisplay.className = "current-ans-2";
    currentValueDisplay.className = "current-value-2";
}

function UndoStyle() {
    AnswerDisplay.className = "current-ans-1";
    currentValueDisplay.classList = "current-value-1"
}

function AnserDisplayFun(value) {
    TotalArithValue = value;
    RedoStyle()
    AnswerDisplay.innerText = TotalArithValue;
}



function CalculationArithmatic(num, opr) {
    let CalculationValue = [];
    let total = 0;
    let oprIndexCount = 0;
    let BreakCount = 0;
    let indexNum = 0
    while (BreakCount <= num.length) {
        if (CalculationValue.length === 2) {
            switch (opr[oprIndexCount]) {
                case "+":
                    total = CalculationValue[0] + CalculationValue[1];
                    oprIndexCount++;
                    CalculationValue = [total, num[indexNum]];
                    // console.log(CalculationValue);
                    indexNum++
                    BreakCount++
                    break;
                case "-":
                    total = CalculationValue[0] - CalculationValue[1];
                    oprIndexCount++;
                    CalculationValue = [total, num[indexNum]];
                    // console.log(CalculationValue);
                    indexNum++
                    BreakCount++
                    break;
                case "×":
                    total = CalculationValue[0] * CalculationValue[1];
                    oprIndexCount++;
                    CalculationValue = [total, num[indexNum]];
                    // console.log(CalculationValue);
                    indexNum++
                    BreakCount++
                    break;
                case "/":
                    total = CalculationValue[0] / CalculationValue[1];
                    oprIndexCount++;
                    CalculationValue = [total, num[indexNum]];
                    // console.log(CalculationValue);
                    indexNum++
                    BreakCount++
                    break;
            }
        } else {
            CalculationValue.push(num[indexNum]);
            indexNum++;
            BreakCount++
        }
    }

    const EndTotal = CalculationValue[0];
    return EndTotal;
}



function EmptyOperation(sym, displaysym) {
    if (currentvalueStore === "" && displayValueStore === "") {
        currentvalueStore = `0${sym}`;
        displayValueStore = `0${displaysym}`
    } else {
        currentvalueStore += sym;
        displayValueStore += displaysym;
    }
    return
}
function FinderSymbol() {
    const symbols = ["+", ".", "/", "*", "-", "%"]
    const last = currentvalueStore[currentvalueStore.length - 1]
    const find = symbols.find(ele => {
        return ele === last;
    })
    return find;
}

function OperationValueSetter(sym, displaysym) {
    const find = FinderSymbol()
    if (!find) {
        if (TotalArithValue !== null && !SecondFlag) {
            currentvalueStore = TotalArithValue;
            displayValueStore = TotalArithValue;
            currentvalueStore += sym;
            displayValueStore += displaysym;
            SecondFlag = true;
            UndoStyle()
        }
        else {
            EmptyOperation(sym, displaysym);
        }
    }

}

function NumberEnterChange(num) {
    if (TotalArithValue !== null && !SecondFlag) {
        currentvalueStore = num;
        displayValueStore = num;
        AnswerDisplay.innerText = "0";
        SecondFlag = true;
        UndoStyle()
    }
    else {
        currentvalueStore += num;
        displayValueStore += num;

    }
}


function AllClearFun() {
    currentvalueStore = "";
    displayValueStore = "";
    TotalArithValue = null;
    AnswerDisplay.innerText = "";
    HistoryContainer = [];
    // alert(HistoryValueConatiner.children.length)
    // let HistorychildCount = HistoryValueConatiner.children.length;
    // let conditionCount = 0;
    // while (conditionCount <= HistorychildCount) {
    //     console.log(HistoryValueConatiner.children[conditionCount])
    //     HistoryValueConatiner.removeChild(HistoryValueConatiner.children[conditionCount]);
    //     conditionCount++;
    // }
    UndoStyle()
    location.reload()

}


function EqualSumSolution() {
    const find = FinderSymbol()
    SecondFlag = false;
    if (find) {
        const currentvalue = currentvalueStore.substring(0, currentvalueStore.length - 1)
        const result = eval(currentvalue);
        HistoryInsertValue(currentvalue, result);
        AnserDisplayFun(result);
    } else {
        const result = eval(currentvalueStore);
        HistoryInsertValue(currentvalueStore, result);
        AnserDisplayFun(result);
    }
}


function Backspace() {
    if (TotalArithValue === null) {
        currentvalueStore = currentvalueStore.substring(0, currentvalueStore.length - 1);
        displayValueStore = displayValueStore.substring(0, displayValueStore.length - 1);
    } else {
        TotalArithValue = null;
        displayValueStore = "";
        currentvalueStore = "";
        AnswerDisplay.innerText = "";
        UndoStyle()
    }

}


function btnClickvalue(btnContainerBody) {
    for (let btncon = 0; btncon < btnContainerBody.length; btncon++) {
        for (let x = 0; x < btnContainerBody[btncon].children.length; x++) {
            btnContainerBody[btncon].children[x].addEventListener('click', () => {
                const value = btnContainerBody[btncon].children[x].children[0];
                console.log(value.className)
                if (value.className === "oper-span") {
                    switch (value.children[0].innerHTML) {
                        case "backspace":
                            Backspace()
                            break;
                        case "close":
                            OperationValueSetter("*", "×")
                            break;
                        case "add":
                            OperationValueSetter("+", "+")
                            break;
                        case "remove":
                            OperationValueSetter("-", "-")
                            break;
                        default:
                            currentvalueStore += value.children[0].innerHTML;
                            break;
                    }
                } else {
                    switch (value.innerText) {
                        case "AC":
                            AllClearFun();
                            break;
                        case "=":
                            EqualSumSolution();
                            break;
                        case "/":
                            OperationValueSetter("/", "/")
                            break;
                        case "1":
                            NumberEnterChange("1")
                            break;
                        case "2":
                            NumberEnterChange("2")
                            break;
                        case "3":
                            NumberEnterChange("3")
                            break;
                        case "4":
                            NumberEnterChange("4")
                            break;
                        case "5":
                            NumberEnterChange("5")
                            break;
                        case "6":
                            NumberEnterChange("6")
                            break;
                        case "7":
                            NumberEnterChange("7")
                            break;
                        case "8":
                            NumberEnterChange("8")
                            break;
                        case "9":
                            NumberEnterChange("9")
                            break;
                        case "0":
                            NumberEnterChange("0")
                            break;

                        default:
                            currentvalueStore += value.innerHTML;
                            displayValueStore += value.innerHTML;
                            break;
                    }
                }

            })
        }
    }

}


function displayConventor(conatinaerstorevalue) {
    conatinaerstorevalue.forEach(element => {
        currentValueDisplay.innerText += " " + element;
    });
}

function DisplayStart() {
    if (displayValueStore === "") {
        currentValueDisplay.innerText = 0;
    } else {
        currentValueDisplay.innerText = displayValueStore;
    }
}



setInterval(() => {
    DisplayStart()

}, 0)


// NodificationSliderBtn.addEventListener('dblclick', () => {
//     setTimeout(() => {
//         SliderMainCon.style.display = "block";
//     }, 1000)
//     SliderMainCon.style.animation = "1s slider linear 1"

// })


btnClickvalue([btnContainer_1, btnContainer_2, btnContainer_3, btnContainer_4, btnContainer_5])










