function Button(content, id){
    return {
        content,
        id,

        getMathView(){
            if (this.content=="^") return "**";
            else return this.getScreenView();
        },

        getScreenView(){
            return this.content;
        },
    }
}
function CalculatorScreen(extern){
    return{
        extern,

        showProblem(problemView){
            this.extern.innerHTML= problemView;
        },
    }
}
function handler(button, calcScreen, mathProblem){
    if (button.id=="equal"){
        calcScreen.showProblem(mathProblem.getAnswer());
    }
    else{
        problem.newInput(button);
        calcScreen.showProblem(mathProblem.getScreenView());
    }
}
function connectButtons(buttons, handler, calcScreen, mathProblem){
    for (let button of buttons){
        button.extern = document.getElementById(button.id);
        button.extern.onclick = function(){
            handler(button, calcScreen, mathProblem);
        }
    }
}
let buttons = new Array( new Button(0, "zero"), new Button(1, "one"), new Button(2, "two"), new Button(3, "three"), new Button(4, "four"),
                         new Button(5, "five"), new Button(6, "six"), new Button(7, "seven"), new Button(8, "eight"), new Button(9, "nine"),
                         new Button("+", "addition"), new Button("-", "subtraction"), new Button("*", "multiplication"), new Button("/", "division"),
                         new Button("(", "leftBracket"), new Button(")", "rightBracket"), new Button("^", "exp"), new Button("=", "equal"), new Button("C", "clean"),
                         new Button ("", "deleteSymbol"));
let problem = {
    mathView: "",
    screenView: "",
    length: 0,
    maxLength:18, 

    newInput(button){
        if (button.id=="clean"){
            this.clearView();
        }
        else if(button.id=="deleteSymbol"){
            this.length--;
            this.mathView = this.mathView.slice(0, this.length);
            this.screenView = this.screenView.slice(0, this.length);
        }
        else{
            this.length++;
            this.mathView+=button.getMathView();
            this.screenView+=button.getScreenView();
        }
    },

    getAnswer(){
        try{
            this.mathView = eval(this.mathView).toString();
            if(this.mathView || this.mathView==0){
                if(this.isOverMaxLength(this.mathView.length)){
                    if(this.mathView.includes("e")){
                        let temporalView = new String();
                        temporalView = this.mathView.slice(this.mathView.indexOf("e"));
                        this.mathView = this.mathView.slice(0, this.maxLength-temporalView.length);
                        return this.mathView + temporalView;
                    }
                    return this.mathView.slice(0, this.maxLength);
                }
                else return this.mathView;
            }
            else return "Ошибка при расчете";
        }
        catch{
            return "Неправильный ввод";
        }
        finally {
            this.clearView();
        }
    },

    getScreenView(){
        if (this.isOverMaxLength(this.length)){
            this.clearView();
            return "Длинное выражение";
        }
        else return this.screenView;
    },

    clearView(){
        this.length = 0;
        this.mathView = "";
        this.screenView = "";
    },

    isOverMaxLength(length){
        return length>this.maxLength;
    }    
}



let screen = new CalculatorScreen(document.getElementById("screen"));
connectButtons(buttons, handler, screen, problem);





