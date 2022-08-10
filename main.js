let input=document.querySelector('input')
let submit=document.querySelector('button')
let info=document.getElementById('info')

submit.onmouseenter=function(){
    submit.style.opacity=0.5
}

submit.onmouseleave=function(){
     submit.style.opacity=1
}

submit.onclick=function(event){
    event.preventDefault()
    let zip=input.value
    input.value=""
    
    fetch('https://api.openweathermap.org/geo/1.0/zip?zip='+zip+',US&appid=8e61a85e3b57bba628d9d4ef2f4c94c7')
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            if(data.cod=="400"||data.cod=="404"){
            alert('Invalid zip code!')
        }
        else{
            console.log(data)
            let lat=data.lat
            let lon=data.lon
            console.log(lat,lon)
            fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=8e61a85e3b57bba628d9d4ef2f4c94c7')
                .then(function(response2){
                    return response2.json()
                })
                .then(function(weatherData){
                    console.log(weatherData)
                    console.log(weatherData.weather[0].main)
                    
                    info.innerHTML=""
                    
                    let weatherInfo=document.createElement('div')
                    weatherInfo.id="weatherInfo"
                    info.append(weatherInfo)
                    
                    let weatherMain=document.createElement('p')
                    weatherMain.innerHTML="Weather: "+weatherData.weather[0].main
                    
                    let weatherDesc=document.createElement('p')
                    weatherDesc.innerHTML="Description: "+weatherData.weather[0].description
                    
                    let temp=document.createElement('p')
                    temp.innerHTML="Temperature: "+tempConvert(weatherData.main.temp)
                    
                    let feels=document.createElement('p')
                    feels.innerHTML="Feels Like: "+tempConvert(weatherData.main.feels_like)
                    
                    let humid=document.createElement('p')
                    humid.innerHTML="Humidity: "+weatherData.main.humidity+"%"
                    
                    weatherInfo.append(weatherMain,weatherDesc,temp,feels,humid)
                    
                    console.log(weatherInfo)
            
                })
        }
        
    }   )
}

function tempConvert(kelvin){
    let fahrenheit= String(1.8*(kelvin-273) + 32)
    return fahrenheit.substr(0,6)+"\u00B0"+"F"
}