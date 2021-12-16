console.log("Client side javascript is loaded")
// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })
// fetch("http://localhost:3000/weather?address=hanoi").then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#msg-01')
const messageTwo = document.querySelector('#msg-02')
const messageThree = document.querySelector('#msg-03')



weatherForm.addEventListener('submit', (e) =>{
    messageOne.textContent="Loading ..."
    messageTwo.textContent = ''
    messageThree.textContent = ''
    e.preventDefault()
    const location = search.value
    
    fetch("/weather?address=" + location).then((response) =>{
        console.log(location)
        response.json().then((data) =>{
            if(data.error){
                messageOne.textContent = data.error

            }else{
                console.log(data)
                messageOne.textContent= "Location: " + data.location,
                messageTwo.textContent= "Date: " + data.date,
                messageThree.textContent= "Tempature: " + data.forecastTemp
            }
            
        })
    })
    console.log('get weather')
})
