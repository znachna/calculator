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
            if(this.length){
                this.length--;
                this.mathView = this.mathView.slice(0, this.length);
                this.screenView = this.screenView.slice(0, this.length);
            }
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
            let result;
            if(this.mathView || this.mathView==0){
                if(this.isOverMaxLength(this.mathView)){
                    if(this.mathView.includes("e")){
                        let temporalView = new String();
                        temporalView = this.mathView.slice(this.mathView.indexOf("e"));
                        this.screenView = this.mathView.slice(0, this.maxLength-temporalView.length) + temporalView;
                    } else this.screenView = this.mathView.slice(0, this.maxLength);
                }
                else this.screenView = this.mathView;
                if(this.isOverMaxLength(this.mathView)){
                    result = this.screenView;
                    this.clearView();
                } 
                else{ 
                    this.mathView = this.screenView;
                    this.length = this.screenView.length;
                    result = this.mathView;
                }
                return result;
            }
            else throw new Error("Ошибка при расчете");
        }
        catch(e){
            this.clearView();
            if(e.message == "Ошибка при расчете") return e.message; 
            return "Неправильный ввод";
        }
        finally{

        }
    },

    getScreenView(){
        if (this.isOverMaxLength(this.screenView)){
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

    isOverMaxLength(view){
        return view.length>this.maxLength;
    }    
}



let screen = new CalculatorScreen(document.getElementById("screen"));
connectButtons(buttons, handler, screen, problem);





