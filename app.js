let COFFEE_URL = "http://dc-coffeerun.herokuapp.com/api/coffeeorders/"
let viewAllBtn = document.getElementById("viewAllBtn")
let searchBtn = document.getElementById("searchBtn")
let ordersUL = document.getElementById("ordersUL")
let createEmailTextBox = document.getElementById("createEmailTextBox")
let createCoffeeTextBox = document.getElementById("createCoffeeTextBox")
let createOrderBtn = document.getElementById("createOrderBtn")


viewAllBtn.addEventListener('click',function(){
  fetch(COFFEE_URL)
  .then(function(response){
    return response.json()
  })
  .then(function(orderInfo){
    let orders = Object.values(orderInfo)
    let ordersDisplay = orders.map(function(order){
      return `  <li>
                <h3>Email: ${order.emailAddress}</h3>
                <span>Coffee Order: ${order.coffee}</span>
                </li>
                <button class="deleteBtn">Delete Order</button>`
    })
  ordersUL.innerHTML = ordersDisplay.join('')
})
fetch(COFFEE_URL)
.then(function(response){
  return response.json()
})
.then(function(orderInfo){
  let orders = Object.values(orderInfo)
  let deleteBtn = document.getElementsByClassName("deleteBtn")
  for(let i = 0; i < deleteBtn.length; i++){
    deleteBtn[i].addEventListener('click', function(){
      let delOrder = orders.filter(function(order){
        if(order.emailAddress == orders[i].emailAddress) {
          return order
        }
      })
    let DELETE_URL = `http://dc-coffeerun.herokuapp.com/api/coffeeorders/${delOrder[0].emailAddress}`
    fetch(DELETE_URL, {
      method: 'DELETE',
    })
  })
  }
})

})

searchBtn.addEventListener('click', function(){
  let searchTextBox = document.getElementById("searchTextBox")
  let INDIVIDUAL_URL = `http://dc-coffeerun.herokuapp.com/api/coffeeorders/${searchTextBox.value}`
  fetch(INDIVIDUAL_URL)
  .then(function(response) {
    return response.json()
  })
  .then(function(orderInfo){
    let orders = Object.values(orderInfo)
    let ordersDisplay = `  <li>
              <h3>Email: ${orderInfo.emailAddress}</h3>
              <span>Coffee Order: ${orderInfo.coffee}</span>
              </li>`
    ordersUL.innerHTML = ordersDisplay
  })
})

createOrderBtn.addEventListener('click', function(){
  let paramsToSend = {emailAddress : createEmailTextBox.value, coffee : createCoffeeTextBox.value}

  fetch('http://dc-coffeerun.herokuapp.com/api/coffeeorders/', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(paramsToSend)
  })
})
