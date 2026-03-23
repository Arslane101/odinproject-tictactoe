function Gameboard() {
  let board = ["", "", "", "", "", "", "", "", ""]
  const update = (choice,position) => {
    if(board[position] === ""){
        board[position] = choice
        console.log(typeof(checkWinner(choice)))
        if (typeof checkWinner(choice) === "string") return("Tie")
        else if (typeof checkWinner(choice) === "object") return("Player " + choice + " is the Winner !")
    }
    
  }
  const checkWinner = (value) => {
    let positions = [[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]]
    for (const elt of positions){
      if (elt.every(number => board[number] === value)){
        return elt
      } 
    }
    if (board.every(val => val !== "") === true) return("Tie") 
  }
  
  const displayController = () => {
    const display = document.querySelector("#board")
    const paragraph = document.querySelector("#score")
    let texte = document.createElement("p")
    paragraph.appendChild(texte)
    texte.textContent = ""
    display.style.flex = "1 1 calc( 100% /"+"3"+")"
    for (i=0;i<board.length;i++){
      let square = document.createElement("div")
      let divbutton = document.createElement("div")
      let text = document.createElement("p")
      text.style.width = "90%"
      text.id = "position"+i
      text.style.height = "90%"
      square.appendChild(text)
      let xbutton = document.createElement("button")
      let obutton = document.createElement("button")
      xbutton.textContent = "X"
      xbutton.id = i
      obutton.id = i
      xbutton.name = "btn"+i
      obutton.name = "btn"+i
      xbutton.hidden = true
      obutton.hidden = true
      square.addEventListener("mousemove",() => {
        xbutton.hidden = false
        obutton.hidden = false
     })
      square.addEventListener("mouseleave",() => {
          if( xbutton.disabled != true )xbutton.hidden = true
          if (obutton.disabled != true) obutton.hidden = true
      })
      xbutton.addEventListener("click",()=> {
        toedit = document.querySelector("#position"+xbutton.id)
        toedit.textContent = "X" 
        texte.textContent =  update(toedit.textContent,parseInt(obutton.id))
        if(text.textContent === "Tie" && text.textContent !== "") {
          let buttons = document.querySelectorAll("button")
          buttons.forEach(btn => {
            btn.disabled="true"
          })
        }
        toedit.style["font-size"]= "120px"
        button = document.getElementsByName("btn"+xbutton.id)
        button.forEach(btn => {
          btn.disabled = "true"
        })
      })
      obutton.addEventListener("click",()=> {
        toedit = document.querySelector("#position"+obutton.id)
        toedit.textContent = "O" 
        texte.textContent = update(toedit.textContent,parseInt(obutton.id))
        toedit.style["font-size"]= "120px"
        if(text.textContent === "Tie" && text.textContent !== "") {
          let buttons = document.querySelectorAll("button")
          buttons.forEach(btn => {
            btn.disabled="true"
          })
        }
        let liste = document.getElementsByName("btn"+obutton.id)
        liste.forEach((btn) => {
          btn.disabled = "true"
          btn.hidden = "false"
        })
      })
      obutton.textContent = "O"
      square.id="square"
      divbutton.id= "buttondivs"
      divbutton.appendChild(xbutton)
      divbutton.appendChild(obutton)
      square.appendChild(divbutton)
      display.appendChild(square)
    }

  }
  return {board,update,displayController}
  
}

const gameboard = Gameboard()
gameboard.displayController()