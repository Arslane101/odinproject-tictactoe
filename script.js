function Gameboard() {
  let board = ["", "", "", "", "", "", "", "", ""]
  const update = (choice,position) => {
    let body = document.querySelector("body")
    if(board[position] === ""){
        board[position] = choice
        console.log(typeof(checkWinner(choice)))
        if (typeof checkWinner(choice) === "string") return("Tie")
        else if (typeof checkWinner(choice) === "object") {
                body.style["background-color"] = "green"
                return("🏆  Player " + choice + " is the Winner !")
              }
    
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
    let body = document.querySelector("body")
    
    const display = document.querySelector("#board")
    const paragraph = document.querySelector("#score")
    const menu = document.createElement("div") 
    menu.id = "buttonmenu"
    let restart = document.createElement("button")
    let texte = document.createElement("p")
    let start  = document.createElement("button")
    start.id = "start"
    restart.id = "restart"
    start.textContent= "\u{25B7}"
    restart.textContent = "\u{21BA}"
    paragraph.appendChild(texte)
    menu.appendChild(start)
    menu.appendChild(restart)
    paragraph.appendChild(menu)
    
    texte.textContent = "Welcome to Tic Tac Toe! Press \u{25B7} to start "
    texte.style = "font-size:24px; font-weight: bold"

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
      square.disabled= true 
      xbutton.disabled = true
      obutton.disabled = true
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
          xbutton.hidden = true
          obutton.hidden = true
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
        if(text.textContent === "Tie") body.style["background-color"] = "red"
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
    start.addEventListener("click",() => {
      let container = display.querySelectorAll("button","div")
      start.classList.add("selected")
      container.forEach(child => {
        child.disabled = false
      })
    })
    restart.addEventListener("click",() => {
      body.style["background-color"]= "white"
      start.classList.remove("selected")
      restart.classList.add("selected")
      let container = display.querySelectorAll("p")
      container.forEach(child => {
        child.textContent= ""
        
      })
      texte.textContent = ""


    })

  }
  return {board,update,displayController}
  
}

const gameboard = Gameboard()
gameboard.displayController()