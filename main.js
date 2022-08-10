let form=document.querySelector('form')
let input=document.querySelector('input')
let button=document.querySelector('button')
let text=document.querySelector('h1')
let catDiv=document.getElementById('catDiv')


fetch('https://api.thecatapi.com/v1/images/search?limit=10')
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        button.onclick=function(event){
            event.preventDefault()
            text.innerHTML="My Advice to you: "
            for(let i=0;i<data.length;i++){
            let newDiv=document.createElement('div')

            let newImg=document.createElement('img')
            newImg.src=data[i].url
            newImg.style.width="200px"
            newImg.style.margin="15px"

            newDiv.append(newImg)
            catDiv.append(newDiv)
            document.body.append(catDiv)
            }
            form.outerHTML=""
            
        }
    })

// fetch()