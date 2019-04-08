document.addEventListener("DOMContentLoaded", domLoadFunctions)
  //Implement Your Code Here
  function domLoadFunctions(){
    // set those constants
    const burgerMenu = document.getElementById('burger-menu')
    const yourOrder = document.getElementById('order-list')

    // set those event handlers
    document.addEventListener('click', clickHandler)
    document.addEventListener('submit', createNewBurger)

    // call that initial render function
    fetchBurgers()

    // Handler functions
    function clickHandler(e){
      id = e.target.parentNode.dataset.id
      if (id){fetchBurger(id)}
    }

    // Menu render functions ==> fetch Burger Menu
    function fetchBurgers() {
      fetch('http://localhost:3000/burgers')
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        renderAllBurgers(myJson);
      });
    }

    // renders all burgers using the below helper function
    function renderAllBurgers(myJson){
      burgerMenu.innerHTML =''
      myJson.forEach(burgerObject => renderBurger(burgerObject))
    }

    // Menu render function ==> Helper function to render a burger
    function renderBurger(burgerObject) {
      const newDiv = document.createElement("Div")
      burgerMenu.appendChild(newDiv)
      newDiv.innerHTML =
        `<div class="burger" data-id="${burgerObject.id}">
          <h3 class="burger_title">${burgerObject.name}</h3>
            <img src="${burgerObject.image}">
            <p class="burger_description">
              ${burgerObject.description}
            </p>
            <button class="button">Add to Order</button>
        </div>`
      }

      //get that burger from the DOM and call the add burger function (database involved way below)
      function fetchBurger(id){
        burgerName = document.querySelector(`[data-id="${id}"]`).querySelector('h3').innerText
        addBurger(burgerName)
      }

      // lame way involving a database -- FOR NERDS
      // function fetchBurger(id) {
      //   fetch(`http://localhost:3000/burgers/${id}`)
      //   .then(function(response) {
      //     return response.json();
      //   })
      //   .then(function(myJson) {
      //     addBurger(myJson.name);
      //   });
      // }
      //

      //adds a burger from its name to the menu
      function addBurger(name){
        const newLi = document.createElement("li")
        newLi.innerText = name
        yourOrder.appendChild(newLi)
      }

      //takes data from the form when submitted and calls the form
      function createNewBurger(e){
        e.preventDefault()
        const form = e.target
        const burgerObject = {name: document.getElementById("burger-name").value,
        description: document.getElementById("burger-description").value,
        image: document.getElementById("burger-image").value}
        postNewBurger(burgerObject)
      }

      //posts that burger 
      function postNewBurger(burgerObject){
        fetch("http://localhost:3000/burgers", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(burgerObject), // body data type must match "Content-Type" header
        })
        .then(response => response.json())
        .then(fetchBurgers)
      }
  }
