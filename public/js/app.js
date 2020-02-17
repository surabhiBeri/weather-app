const weatherForm=document.querySelector('form')
const locationEntered=document.querySelector('input')
const currentLocationButton=document.querySelector('#currentLocation')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const address=locationEntered.value
    const url='http://localhost:3000/weather?address='+address
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent=data.error
            }else{
                messageOne.textContent=address
                messageTwo.textContent=data.forecast
            }
        
        })
    })
})